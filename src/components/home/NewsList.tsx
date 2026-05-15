import { Flag, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import SafeImage from '@/components/shared/SafeImage';
import FeaturedCarousel from './FeaturedCarousel';
import { fetchWP } from '@/lib/wp-graphql';

export const revalidate = 60; // Cache for 60 seconds

export default async function NewsList() {
  const query = `
    query GetLatestNews {
      posts(first: 6, where: { orderby: { field: DATE, order: DESC } }) {
        nodes {
          id
          title
          slug
          date
          excerpt
          categories(first: 1) {
            nodes {
              name
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
  `;

  let latestNews: any[] = [];
  try {
    const data = await fetchWP(query);
    latestNews = data?.posts?.nodes?.map((node: any) => {
      // FIX SEMENTARA: Paksa image ke http:// karena SSL di CMS belum ijo
      let imgUrl = node.featuredImage?.node?.sourceUrl || null;
      if (imgUrl && process.env.WORDPRESS_API_URL?.startsWith('http://')) {
        imgUrl = imgUrl.replace('https://', 'http://');
      }

      return {
        id: node.id,
        title: node.title,
        slug: node.slug,
        excerpt: node.excerpt ? node.excerpt.replace(/<[^>]+>/g, '').trim() : '',
        featured_image: imgUrl,
        created_at: node.date,
        categories: {
          name: node.categories?.nodes?.[0]?.name || 'UMUM'
        }
      };
    }) || [];
  } catch (error) {
    console.error('Failed to fetch news from WP:', error);
  }

  if (!latestNews || latestNews.length === 0) {
    return <div className="text-slate-400 py-10">Belum ada berita yang diterbitkan...</div>;
  }

  // Trik Cerdas: Kalau artikel di WordPress belum sampai 6 (karena baru testing),
  // kita gandakan (duplicate) artikel yang ada biar layout Carousel & Sidebar tetep full 100%.
  // Nanti kalau artikel aslinya udah lebih dari 6, dia bakal normal ngambil 6 artikel terbaru tanpa duplikat.
  const paddedNews = [...latestNews, ...latestNews, ...latestNews, ...latestNews].slice(0, 6);
  
  // 3 artikel untuk slide (carousel), 3 sisanya untuk sidebar
  const carouselNews = paddedNews.slice(0, 3);
  const sidebarNews = paddedNews.slice(3, 6);

  return (
    <section aria-labelledby="latest-news">
      <div className="flex items-center justify-between mb-4 border-b-2 border-white/20 pb-2">
        <h2 id="latest-news" className="text-2xl sm:text-3xl font-black italic tracking-tight uppercase text-white">Berita Terkini</h2>
        <Link href="#" className="hidden text-sm font-bold text-slate-400 hover:text-orange-500 md:flex flex-row items-center gap-1 transition-colors group">
          Lihat Semua <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 sm:gap-8">
        {/* Featured Article Substituted by Carousel */}
        <div className="xl:col-span-7 w-full overflow-hidden">
          <FeaturedCarousel newsList={carouselNews} />
        </div>

        {/* Sidebar News List */}
        <div className="xl:col-span-5 flex flex-col gap-4 sm:gap-6 mt-4 xl:mt-0 xl:border-l xl:border-slate-800 xl:pl-6">
          {sidebarNews.map((news) => (
            <Link href={`/berita/${news.slug}`} key={news.id} className="group cursor-pointer flex gap-3 sm:gap-4 pb-4 border-b border-slate-800 last:border-0 last:pb-0 block">
              <div className="w-24 sm:w-32 aspect-square bg-slate-800 shrink-0 relative overflow-hidden">
                <SafeImage src={news.featured_image || '/images/placeholder.png'} alt={news.title} fill sizes="120px" className="object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              
              <div className="flex-1 flex flex-col justify-center">
                <div className="flex items-center gap-2 text-[9px] sm:text-[10px] font-bold text-slate-500 mb-1">
                  <span className="text-yellow-400">{news.categories?.name || 'UMUM'}</span>
                  <span>•</span>
                  <span>{new Date(news.created_at).toLocaleDateString('id-ID')}</span>
                </div>
                <h3 className="text-sm sm:text-base font-black italic leading-tight text-slate-50 group-hover:text-orange-500 transition-colors line-clamp-3">
                  {news.title}
                </h3>
              </div>
            </Link>
          ))}
          
          {/* Mobile 'Lihat Semua' fallback */}
          <Link href="#" className="md:hidden mt-2 flex items-center justify-center w-full py-3 border border-slate-700 text-slate-300 font-bold text-xs uppercase hover:bg-slate-800 hover:text-white transition-colors active:scale-95">
            Lihat Semua Berita
          </Link>
        </div>
      </div>
    </section>
  );
}
