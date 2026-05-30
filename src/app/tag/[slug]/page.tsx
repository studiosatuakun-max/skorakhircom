import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowLeft, Tag } from 'lucide-react';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import SafeImage from '@/components/shared/SafeImage';
import { fetchWP } from '@/lib/wp-graphql';

export const revalidate = 60;

async function getTagData(slug: string) {
  const query = `
    query GetTagWithPosts($id: ID!) {
      tag(id: $id, idType: SLUG) {
        name
        description
        posts(first: 24) {
          nodes {
            id
            title
            slug
            date
            excerpt
            featuredImage {
              node {
                sourceUrl
              }
            }
            categories {
              nodes {
                name
              }
            }
          }
        }
      }
    }
  `;
  try {
    const data = await fetchWP(query, { variables: { id: slug } });
    return data?.tag || null;
  } catch (error) {
    console.error('Error fetching tag:', error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tagData = await getTagData(slug);
  
  if (!tagData) {
    return { title: 'Topik Tidak Ditemukan | SkorAkhir' };
  }
  
  return {
    title: `Topik: ${tagData.name} | SkorAkhir`,
    description: tagData.description || `Kumpulan berita terbaru dan terupdate dengan topik #${tagData.name} di SkorAkhir.`,
  };
}

export default async function TagPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tagData = await getTagData(slug);

  if (!tagData) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
          <div className="text-center max-w-lg">
            <span className="bg-red-500 text-white font-black px-4 py-1.5 text-xs uppercase tracking-widest mb-6 inline-block">
              Error 404
            </span>
            <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter text-white uppercase mb-6">
              Topik Tidak Ditemukan
            </h1>
            <p className="text-slate-400 font-bold mb-8">
              Topik (Tag) yang Anda cari tidak ada atau telah dihapus.
            </p>
            <Link href="/" className="inline-flex items-center gap-2 bg-slate-800 text-white font-black text-xs uppercase tracking-widest px-6 py-3 hover:bg-orange-500 hover:text-slate-900 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Kembali ke Beranda
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const posts = tagData.posts?.nodes || [];

  return (
    <>
      <Header />
      <main className="py-8 sm:py-12 flex flex-col container mx-auto px-4 min-h-screen">
        {/* Tag Header */}
        <div className="mb-10 sm:mb-16 border-b border-slate-800 pb-8 sm:pb-12 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-6 justify-center sm:justify-start">
            <Link href="/" className="text-slate-500 hover:text-orange-500 transition-colors p-2 bg-slate-900 rounded-full hidden sm:block">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <span className="flex items-center gap-2 bg-slate-800 border border-slate-700 text-slate-300 font-black px-4 py-1.5 text-[10px] sm:text-xs uppercase tracking-widest rounded-md">
              <Tag className="w-3 h-3 text-orange-500" /> Kumpulan Berita Topik
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black italic tracking-tighter text-white uppercase">
            #{tagData.name}
          </h1>
          {tagData.description && (
            <p className="text-slate-400 mt-4 max-w-2xl font-medium leading-relaxed mx-auto sm:mx-0">
              {tagData.description}
            </p>
          )}
        </div>

        {/* Posts Grid */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {posts.map((post: any) => {
              const imgUrl = post.featuredImage?.node?.sourceUrl?.replace(/^https:\/\//i, 'http://') || '/images/placeholder.png';
              const categoryName = post.categories?.nodes?.[0]?.name || 'UMUM';
              
              return (
                <Link key={post.id} href={`/berita/${post.slug}`} className="group flex flex-col gap-4">
                  <div className="relative aspect-[4/3] bg-slate-900 overflow-hidden rounded-xl border border-slate-800 group-hover:border-slate-600 transition-colors shadow-lg">
                    <SafeImage 
                      src={imgUrl} 
                      alt={post.title} 
                      fill 
                      className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" 
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest">
                        {categoryName}
                      </span>
                      <span className="text-slate-600">•</span>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                        {new Date(post.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                    <h2 className="text-lg sm:text-xl font-black italic leading-tight text-slate-100 group-hover:text-orange-500 transition-colors line-clamp-3">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p 
                        className="text-sm text-slate-400 mt-3 line-clamp-2 font-medium leading-relaxed" 
                        dangerouslySetInnerHTML={{ __html: post.excerpt }} 
                      />
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center bg-slate-900/50 rounded-2xl border border-slate-800/50">
            <Tag className="w-12 h-12 text-slate-700 mb-4" />
            <h3 className="text-2xl font-black italic text-slate-500 mb-3">Belum ada berita</h3>
            <p className="text-slate-400 font-medium">Belum ada artikel yang diterbitkan dengan topik #{tagData.name}.</p>
            <Link href="/" className="mt-8 text-sm font-bold uppercase tracking-widest text-orange-500 hover:text-white transition-colors">
              Kembali ke Beranda
            </Link>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
