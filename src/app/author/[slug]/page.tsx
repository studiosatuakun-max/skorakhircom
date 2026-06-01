import React from 'react';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import type { Metadata } from 'next';
import { fetchWP } from '@/lib/wp-graphql';
import { User, BadgeCheck, FileText, Calendar } from 'lucide-react';
import Link from 'next/link';
import SafeImage from '@/components/shared/SafeImage';
import { notFound } from 'next/navigation';

export const revalidate = 60; // Cache 1 minute

async function getAuthorData(slug: string) {
  const query = `
    query GetAuthorData($id: ID!) {
      user(id: $id, idType: SLUG) {
        name
        description
        avatar {
          url
        }
        posts(first: 20, where: { orderby: { field: DATE, order: DESC } }) {
          nodes {
            id
            title
            slug
            date
            excerpt
            categories {
              nodes {
                name
                slug
              }
            }
            featuredImage {
              node {
                sourceUrl
              }
            }
          }
        }
      }
    }
  `;

  try {
    const data = await fetchWP(query, { variables: { id: slug } });
    return data?.user || null;
  } catch (error) {
    console.error('Error fetching author data:', error);
    return null;
  }
}

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const author = await getAuthorData(slug);
  
  if (!author) {
    return { title: 'Author Tidak Ditemukan - SkorAkhir' };
  }

  return {
    title: `Artikel oleh ${author.name} | SkorAkhir`,
    description: author.description || `Berita olahraga, hasil pertandingan, dan analisis eksklusif yang ditulis oleh ${author.name} di SkorAkhir.com.`,
  };
}

export default async function AuthorPage({ params }: Props) {
  const { slug } = await params;
  const author = await getAuthorData(slug);
  
  if (!author) {
    notFound();
  }

  const posts = author.posts?.nodes || [];
  const getImgUrl = (url?: string) => url?.replace(/^https:\/\//i, 'http://') || '/images/placeholder.png';

  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-950 pb-20">
        
        {/* AUTHOR PROFILE HEADER */}
        <section className="relative w-full pt-20 pb-16 border-b border-slate-800 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-950"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-orange-500/10 rounded-full blur-[120px]"></div>
          </div>
          
          <div className="container relative z-10 mx-auto px-4 text-center">
            <div className="w-32 h-32 md:w-40 md:h-40 mx-auto bg-slate-900 border-4 border-slate-800 rounded-full flex items-center justify-center mb-6 shadow-2xl relative overflow-hidden group">
              {author.avatar?.url ? (
                <SafeImage src={author.avatar.url} alt={author.name} fill className="object-cover" />
              ) : (
                <User className="w-16 h-16 text-slate-500 group-hover:text-orange-500 transition-colors" />
              )}
            </div>
            
            <div className="inline-flex items-center gap-2 mb-2">
              <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter text-white uppercase">{author.name}</h1>
              <BadgeCheck className="w-8 h-8 text-blue-500" />
            </div>
            
            <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-6">Verified Journalist</p>
            
            {author.description && (
              <p className="text-lg text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
                {author.description}
              </p>
            )}
            
            <div className="flex items-center justify-center gap-6 mt-8">
              <div className="flex items-center gap-2 text-slate-300">
                <FileText className="w-5 h-5 text-slate-500" />
                <span className="font-bold">{posts.length} Artikel</span>
              </div>
            </div>
          </div>
        </section>

        {/* AUTHOR ARTICLES */}
        <section className="container mx-auto px-4 py-12">
          <div className="flex items-center gap-3 mb-10 border-b border-slate-800 pb-4">
            <span className="w-2 h-8 bg-yellow-400 block"></span>
            <h2 className="text-2xl font-black italic tracking-tighter text-white uppercase">Artikel Terbaru</h2>
          </div>

          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post: any) => (
                <Link href={`/berita/${post.slug}`} key={post.id} className="group bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-600 transition-colors flex flex-col h-full shadow-xl">
                  <div className="aspect-video w-full bg-slate-950 relative overflow-hidden">
                    <SafeImage 
                      src={getImgUrl(post.featuredImage?.node?.sourceUrl)} 
                      alt={post.title}
                      fill
                      className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                    />
                    <div className="absolute top-4 left-4 bg-orange-500 text-slate-950 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-sm">
                      {post.categories?.nodes?.[0]?.name || 'Berita'}
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-black italic text-white uppercase leading-tight group-hover:text-yellow-400 transition-colors mb-4 line-clamp-3">
                      {post.title}
                    </h3>
                    <div className="mt-auto flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-widest pt-4 border-t border-slate-800/50">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(post.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-slate-900 border border-slate-800 border-dashed rounded-2xl">
              <p className="text-slate-400 font-bold">Belum ada artikel yang diterbitkan oleh penulis ini.</p>
            </div>
          )}
        </section>
        
      </main>
      <Footer />
    </>
  );
}
