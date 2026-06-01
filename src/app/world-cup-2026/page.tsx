import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowLeft, Trophy, Calendar, Globe2, Activity } from 'lucide-react';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import SafeImage from '@/components/shared/SafeImage';
import { fetchWP } from '@/lib/wp-graphql';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'World Cup 2026 Corner | SkorAkhir',
  description: 'Liputan eksklusif, jadwal, klasemen, dan berita terbaru seputar Piala Dunia 2026 dari kacamata SkorAkhir.',
};

async function getWorldCupData() {
  const query = `
    query GetWorldCupPosts {
      category(id: "piala-dunia-2026", idType: SLUG) {
        posts(first: 20) {
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
          }
        }
      }
    }
  `;
  try {
    const data = await fetchWP(query);
    // Jika kategori belum ada, balikin array kosong
    return data?.category?.posts?.nodes || [];
  } catch (error) {
    console.error('Error fetching World Cup articles:', error);
    return [];
  }
}

export default async function WorldCupCorner() {
  const posts = await getWorldCupData();
  const getImgUrl = (url?: string) => url?.replace(/^https:\/\//i, 'http://') || '/images/placeholder.png';

  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-950 pb-20">
        
        {/* HERO SECTION - MEGAH & EPIC */}
        <section className="relative w-full min-h-[60vh] md:min-h-[70vh] flex items-center border-b border-orange-500/20 overflow-hidden">
          <div className="absolute inset-0 z-0">
            {/* Background Dummy (Warna gradient + pattern) */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-orange-950/40"></div>
            <div className="absolute inset-0 opacity-10 mix-blend-overlay bg-[url('/images/pattern.svg')]"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-500/20 rounded-full blur-[120px]"></div>
          </div>

          <div className="container relative z-10 mx-auto px-4 pt-20">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-500/10 border border-orange-500/20 rounded-full mb-6">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest">Hub Eksklusif</span>
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black italic tracking-tighter text-white uppercase leading-[0.9] mb-6">
                World Cup<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-500">
                  2026 Corner
                </span>
              </h1>
              <p className="text-lg md:text-xl text-slate-300 font-medium max-w-2xl leading-relaxed mb-10 border-l-4 border-orange-500 pl-4">
                Pusat komando liputan Piala Dunia 2026. Ikuti persaingan, intip strategi ruang ganti, dan pantau perjuangan wakil Asia menuju puncak dunia.
              </p>
              
              <div className="flex flex-wrap items-center gap-4">
                <div className="bg-slate-900/80 backdrop-blur border border-slate-700 rounded-xl p-4 flex items-center gap-4 min-w-[200px]">
                  <Trophy className="w-8 h-8 text-yellow-500" />
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tuan Rumah</div>
                    <div className="text-white font-black italic uppercase">AMERIKA 2026</div>
                  </div>
                </div>
                <div className="bg-slate-900/80 backdrop-blur border border-slate-700 rounded-xl p-4 flex items-center gap-4 min-w-[200px]">
                  <Calendar className="w-8 h-8 text-orange-500" />
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Kick-Off</div>
                    <div className="text-white font-black italic uppercase">Juni 2026</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTENT HUB */}
        <section className="container mx-auto px-4 -mt-10 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* LATEST NEWS */}
            <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-8 border-b border-slate-800 pb-4">
                <Globe2 className="w-6 h-6 text-orange-500" />
                <h2 className="text-2xl font-black italic tracking-tighter text-white uppercase">Kabar Terkini</h2>
              </div>

              {posts.length > 0 ? (
                <div className="flex flex-col gap-6">
                  {posts.map((post: any, index: number) => (
                    <Link key={post.id} href={`/berita/${post.slug}`} className={`group flex flex-col md:flex-row gap-6 ${index !== posts.length - 1 ? 'border-b border-slate-800 pb-6' : ''}`}>
                      <div className="w-full md:w-1/3 aspect-video md:aspect-square bg-slate-950 rounded-xl overflow-hidden relative border border-slate-800 group-hover:border-slate-600 transition-colors shrink-0">
                        <SafeImage 
                          src={getImgUrl(post.featuredImage?.node?.sourceUrl)}
                          alt={post.title}
                          fill
                          className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-center">
                        <div className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-2">
                          {new Date(post.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </div>
                        <h3 className="text-xl md:text-2xl font-black italic tracking-tight text-white group-hover:text-orange-500 transition-colors leading-tight mb-3 line-clamp-3">
                          {post.title}
                        </h3>
                        {post.excerpt && (
                          <p 
                            className="text-sm text-slate-400 line-clamp-2 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: post.excerpt }}
                          />
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="py-20 text-center bg-slate-950 rounded-xl border border-dashed border-slate-700">
                  <Activity className="w-10 h-10 text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-400 font-bold">Liputan khusus Piala Dunia 2026 sedang disiapkan oleh Tim Redaksi.</p>
                </div>
              )}
            </div>

            {/* SIDEBAR WIDGETS */}
            <div className="lg:col-span-4 flex flex-col gap-8">
              {/* Klasemen Dummy */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                  <Activity className="w-5 h-5 text-orange-500" />
                  <h2 className="text-lg font-black italic tracking-tighter text-white uppercase">Road to 2026</h2>
                </div>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center gap-4 bg-slate-950 p-3 rounded-lg border border-slate-800">
                      <div className="w-6 font-black text-slate-500 text-center">{i}</div>
                      <div className="flex-1 font-bold text-white uppercase text-sm">Tim Kualifikasi {i}</div>
                      <div className="text-orange-500 font-black text-sm">--</div>
                    </div>
                  ))}
                  <div className="text-center pt-4 border-t border-slate-800">
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">*Klasemen kualifikasi segera hadir</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
