import React from 'react';
import Link from 'next/link';
import SafeImage from '@/components/shared/SafeImage';
import { fetchWP } from '@/lib/wp-graphql';
import { FileText, ArrowRight, BookOpen } from 'lucide-react';

async function getBenchArticles() {
  const query = `
    query GetBenchPosts {
      tag(id: "timnas-indonesia", idType: SLUG) {
        posts(first: 3) {
          nodes {
            id
            title
            slug
            excerpt
            date
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
    return data?.tag?.posts?.nodes || [];
  } catch (error) {
    console.error('Error fetching Bench articles:', error);
    return [];
  }
}

export default async function TheBenchSegment() {
  const articles = await getBenchArticles();

  if (!articles || articles.length === 0) return null;

  const mainArticle = articles[0];
  const sideArticles = articles.slice(1, 3);

  const getImgUrl = (url?: string) => url?.replace(/^https:\/\//i, 'http://') || '/images/placeholder.png';

  return (
    <section className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden my-12 shadow-2xl">
      <div className="bg-slate-900 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-950 rounded-lg flex items-center justify-center border border-slate-800">
            <BookOpen className="w-5 h-5 text-orange-500" />
          </div>
          <div>
            <h2 className="text-xl font-black italic tracking-tighter text-white uppercase">The Bench</h2>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Fokus Timnas Indonesia</p>
          </div>
        </div>
        <Link href="/tag/timnas-indonesia" className="hidden sm:flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-orange-500 hover:text-white transition-colors">
          Lihat Semua <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Main Deep-Dive Article */}
        <div className="lg:col-span-8 p-6 md:p-8 border-b lg:border-b-0 lg:border-r border-slate-800 flex flex-col justify-center">
          <Link href={`/berita/${mainArticle.slug}`} className="group block">
            <div className="relative aspect-video w-full rounded-xl overflow-hidden mb-6 border border-slate-800 group-hover:border-slate-600 transition-colors">
              <SafeImage 
                src={getImgUrl(mainArticle.featuredImage?.node?.sourceUrl)}
                alt={mainArticle.title}
                fill
                className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute top-4 left-4 bg-orange-500 text-slate-900 text-[10px] font-black px-3 py-1 uppercase tracking-widest rounded-sm">
                Fokus Utama
              </div>
            </div>
            
            <h3 className="text-2xl md:text-4xl font-black italic tracking-tight text-white group-hover:text-orange-500 transition-colors leading-[1.1] mb-4">
              {mainArticle.title}
            </h3>
            
            {mainArticle.excerpt && (
              <p 
                className="text-slate-400 font-medium leading-relaxed line-clamp-3 text-sm md:text-base mb-6"
                dangerouslySetInnerHTML={{ __html: mainArticle.excerpt }}
              />
            )}

            <div className="flex items-center gap-4 text-xs font-bold text-slate-500">
              <span>{new Date(mainArticle.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              <span className="flex items-center gap-1 text-orange-500"><FileText className="w-3 h-3"/> Long Read</span>
            </div>
          </Link>
        </div>

        {/* Side Articles */}
        <div className="lg:col-span-4 flex flex-col">
          {sideArticles.map((article: any, index: number) => (
            <Link 
              key={article.id} 
              href={`/berita/${article.slug}`}
              className={`group flex flex-col justify-center p-6 md:p-8 flex-1 ${index === 0 ? 'border-b border-slate-800' : ''} hover:bg-slate-900/50 transition-colors`}
            >
              <h4 className="text-lg md:text-xl font-black italic tracking-tight text-slate-200 group-hover:text-orange-500 transition-colors leading-tight mb-3 line-clamp-3">
                {article.title}
              </h4>
              <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-4">
                <span>{new Date(article.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}</span>
              </div>
            </Link>
          ))}
          <div className="p-6 md:p-8 bg-slate-900 flex-1 flex flex-col justify-center border-t border-slate-800">
            <h4 className="text-slate-400 text-sm font-bold mb-4">Ingin berdiskusi lebih dalam?</h4>
            <Link href="/anggota/daftar" className="bg-slate-800 hover:bg-orange-500 text-white hover:text-slate-900 text-xs font-black uppercase tracking-widest py-3 px-4 rounded-lg text-center transition-colors border border-slate-700 hover:border-orange-500">
              Gabung VIP Lounge
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
