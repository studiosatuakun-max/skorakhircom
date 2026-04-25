import React from 'react';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import TrendingTopics from '@/components/home/TrendingTopics'; 
import LeagueCarousel from '@/components/home/LeagueCarousel'; // Import LeagueCarousel
import { Metadata } from 'next';
import Link from 'next/link';
import { Share2, BookmarkPlus, ArrowLeft, ArrowRight } from 'lucide-react';
import AdBanner from '@/components/shared/AdBanner';

import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';

async function getArticle(slug: string) {
  const { data: article, error } = await supabase
    .from('news')
    .select('*, categories(name)')
    .eq('slug', slug)
    .single();

  if (error || !article) return null;
  
  return {
    title: article.title,
    slug: article.slug,
    category: article.categories?.name || 'UMUM',
    date: article.created_at,
    author: article.author || 'Tim Redaksi',
    content: article.content,
    image: article.featured_image || 'https://via.placeholder.com/1200x630/1e293b/facc15?text=SkorAkhir',
    tags: [article.categories?.name || 'SPORT'],
  };
}

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    return { title: 'Halaman Tidak Ditemukan - SkorAkhir' };
  }

  return {
    title: `${article.title} - SkorAkhir`,
    description: article.content.substring(0, 150).replace(/<[^>]+>/g, '') + '...',
    openGraph: {
      title: article.title,
      description: article.content.substring(0, 150).replace(/<[^>]+>/g, '') + '...',
      url: `https://skorakhir.com/berita/${article.slug}`,
      siteName: 'SkorAkhir',
      images: [
        {
          url: article.image,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
      type: 'article',
      publishedTime: article.date,
      authors: [article.author],
    },
  };
}

export default async function NewsDetail({ params }: Props) {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) return notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    image: [article.image],
    datePublished: article.date,
    dateModified: article.date,
    author: [{
      '@type': 'Person',
      name: article.author,
    }],
    publisher: {
      '@type': 'Organization',
      name: 'SkorAkhir',
      logo: {
        '@type': 'ImageObject',
        url: 'https://skorakhir.com/logo.png',
      },
    },
  };

  const renderContent = (htmlOrText: string) => {
    if (/<[a-z][\s\S]*>/i.test(htmlOrText)) {
      return htmlOrText;
    }
    return htmlOrText
      .split('\n')
      .filter(line => line.trim().length > 0)
      .map(line => `<p>${line}</p>`)
      .join('');
  };

  const processedContent = renderContent(article.content);

  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen pt-8 pb-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Kolom Kiri: Artikel */}
            <article className="lg:col-span-8">
              <nav aria-label="breadcrumb" className="mb-6 flex items-center font-bold text-xs uppercase text-slate-500 gap-2">
                <Link href="/" className="hover:text-yellow-400 transition-colors flex items-center gap-1">
                  <ArrowLeft className="w-3 h-3" /> Beranda
                </Link>
                <span>/</span>
                <span className="text-slate-300">{article.category}</span>
              </nav>

              <AdBanner />

              <header className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-red-600 text-white px-3 py-1 text-xs font-black uppercase tracking-wider">
                    {article.category}
                  </span>
                  <time dateTime={article.date} className="text-xs font-bold text-slate-400">
                    {new Intl.DateTimeFormat('id-ID', { dateStyle: 'full', timeStyle: 'short' }).format(new Date(article.date))}
                  </time>
                </div>
                
                <h1 className="text-3xl md:text-5xl font-black italic tracking-tight leading-[1.1] mb-6 text-white">
                  {article.title}
                </h1>
                
                <div className="flex items-center justify-between border-y border-slate-800 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center font-black text-slate-500">
                      {article.author.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-200">Oleh <span className="text-yellow-400">{article.author}</span></p>
                      <p className="text-[10px] uppercase font-bold text-slate-500">Jurnalis SkorAkhir</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="p-2 bg-slate-900 border border-slate-800 hover:border-slate-600 rounded text-slate-400 hover:text-white transition-all active:scale-95" aria-label="Simpan Artikel">
                      <BookmarkPlus className="w-5 h-5" />
                    </button>
                    <button className="p-2 bg-slate-900 border border-slate-800 hover:border-slate-600 rounded text-slate-400 hover:text-white transition-all active:scale-95" aria-label="Bagikan Artikel">
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </header>

              <figure className="mb-10 w-full aspect-video bg-slate-900 overflow-hidden relative border border-slate-800">
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-full object-cover"
                />
                <figcaption className="absolute bottom-2 right-2 bg-slate-950/80 px-2 py-1 text-[9px] font-bold text-slate-400">
                  Ilustrasi: {article.title}
                </figcaption>
              </figure>

              <div 
                className="prose prose-invert prose-lg max-w-none prose-headings:font-black prose-headings:italic prose-a:text-yellow-400 prose-blockquote:border-yellow-400 prose-blockquote:bg-slate-900 prose-blockquote:p-4 prose-blockquote:not-italic"
                dangerouslySetInnerHTML={{ __html: processedContent }}
              />
              <style>{`
                .prose p { margin-bottom: 1.5rem; color: #cbd5e1; line-height: 1.8; font-size: 1.125rem; }
                .prose h2 { font-size: 2rem; font-weight: 900; font-style: italic; color: #fff; margin-top: 3rem; margin-bottom: 1.5rem; letter-spacing: -0.025em; }
                .prose blockquote { border-left: 4px solid #facc15; padding: 1.5rem; background-color: #1e293b; margin: 2rem 0; font-weight: 700; color: #f8fafc; font-size: 1.25rem; line-height: 1.6; }
              `}</style>

              <div className="mt-12 flex flex-wrap gap-2 pt-6 border-t border-slate-800 mb-12">
                <span className="text-xs font-black uppercase text-slate-500 py-2 mr-2">Topik Terkait:</span>
                {article.tags.map((tag) => (
                  <Link key={tag} href="#" className="px-3 py-1.5 bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300 hover:bg-yellow-400 hover:text-slate-950 hover:border-yellow-400 transition-colors uppercase">
                    #{tag}
                  </Link>
                ))}
              </div>

              {/* Section Artikel Terkait */}
              <section aria-labelledby="related-articles">
                <div className="flex items-center gap-2 mb-6 border-b-2 border-white/20 pb-2">
                  <h2 id="related-articles" className="text-xl sm:text-2xl font-black italic tracking-tight uppercase text-white">Artikel Terkait</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[1, 2].map((i) => (
                    <Link key={i} href="#" className="group flex flex-col bg-slate-900 border border-slate-800 hover:border-slate-600 transition-colors">
                      <div className="aspect-video bg-slate-800 relative overflow-hidden" />
                      <div className="p-4 flex-1 flex flex-col">
                        <span className="text-[10px] font-bold text-red-500 mb-2">{article.category}</span>
                        <h3 className="text-base font-black italic text-slate-100 group-hover:text-yellow-400 transition-colors leading-snug line-clamp-2">
                          Analisis Potensi Mario Aji di Sisa Putaran Grand Prix Benua Erasia
                        </h3>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
              
              <AdBanner />
            </article>

            {/* Kolom Kanan: Sidebar */}
            <aside className="lg:col-span-4 mt-8 lg:mt-0 flex flex-col gap-12">
              <TrendingTopics />
              {/* Optional: Add an ad slot or another widget here later */}
            </aside>
            
          </div>
        </div>

        {/* Global Bottom Section */}
        <div className="container mx-auto px-4 mt-16">
          <LeagueCarousel />
        </div>
      </main>

      <Footer />
    </>
  );
}
