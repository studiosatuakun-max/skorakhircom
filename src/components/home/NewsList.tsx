import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import SafeImage from '@/components/shared/SafeImage';
import { fetchWP } from '@/lib/wp-graphql';
import QuickReadModal from './QuickReadModal';

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
        category: node.categories?.nodes?.[0]?.name || 'UMUM'
      };
    }) || [];
  } catch (error) {
    console.error('Failed to fetch news from WP:', error);
  }

  if (!latestNews || latestNews.length === 0) {
    return <div className="text-slate-400 py-10">Belum ada berita yang diterbitkan...</div>;
  }

  // Trik Cerdas: Kalau artikel di WordPress belum sampai 6 (karena baru testing),
  // kita gandakan (duplicate) artikel yang ada biar layout Bento Grid tetep full 100%.
  const paddedNews = [...latestNews, ...latestNews, ...latestNews, ...latestNews].slice(0, 6);
  
  const heroMain = paddedNews[0];
  const heroSide1 = paddedNews[1];
  const heroSide2 = paddedNews[2];
  const bottomNews = paddedNews.slice(3, 6);

  return (
    <section aria-labelledby="latest-news" className="flex flex-col gap-6">
      <div className="flex items-center justify-between border-b-2 border-white/20 pb-2">
        <h2 id="latest-news" className="text-2xl sm:text-3xl font-black italic tracking-tight uppercase text-white">Top Stories</h2>
        <Link href="#" className="hidden text-sm font-bold text-slate-400 hover:text-orange-500 md:flex flex-row items-center gap-1 transition-colors group">
          Lihat Semua <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* HERO BENTO GRID (TOP 3) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Main Hero (Left 8 cols) */}
        <div className="md:col-span-8 relative rounded-xl overflow-hidden group aspect-[4/3] md:aspect-auto border border-slate-800 hover:border-orange-500 transition-colors">
          <Link href={`/berita/${heroMain.slug}`} className="block w-full h-full relative">
            <SafeImage src={heroMain.featured_image || '/images/placeholder.png'} alt={heroMain.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <span className="bg-yellow-400 text-slate-900 text-[10px] font-black uppercase px-2 py-1 tracking-wider mb-3 inline-block">
                {heroMain.category}
              </span>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black italic text-white leading-[1.1] group-hover:text-orange-400 transition-colors drop-shadow-lg">
                {heroMain.title}
              </h3>
            </div>
          </Link>
          <QuickReadModal article={heroMain} />
        </div>

        {/* Side Stacked Heroes (Right 4 cols) */}
        <div className="md:col-span-4 flex flex-col gap-4">
          {[heroSide1, heroSide2].map((news, idx) => (
            <div key={`${news.id}-${idx}`} className="relative flex-1 rounded-xl overflow-hidden group aspect-video border border-slate-800 hover:border-orange-500 transition-colors">
              <Link href={`/berita/${news.slug}`} className="block w-full h-full relative">
                <SafeImage src={news.featured_image || '/images/placeholder.png'} alt={news.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                  <span className="text-yellow-400 text-[9px] font-black uppercase tracking-wider mb-2 block">
                    {news.category}
                  </span>
                  <h3 className="text-sm sm:text-base font-black italic text-white leading-tight group-hover:text-orange-400 transition-colors line-clamp-3">
                    {news.title}
                  </h3>
                </div>
              </Link>
              <QuickReadModal article={news} />
            </div>
          ))}
        </div>
      </div>

      {/* BOTTOM NEWS LIST (NEXT 3) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-2">
        {bottomNews.map((news, idx) => (
          <div key={`${news.id}-${idx}`} className="group relative flex flex-col gap-3 pb-4 border-b md:border-b-0 md:border-r border-slate-800 md:pr-6 last:border-0 last:pr-0">
            <Link href={`/berita/${news.slug}`} className="block relative w-full aspect-video rounded-lg overflow-hidden bg-slate-800 mb-2">
              <SafeImage src={news.featured_image || '/images/placeholder.png'} alt={news.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100" />
            </Link>
            <QuickReadModal article={news} />
            
            <div className="flex-1 flex flex-col">
              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 mb-2">
                <span className="text-yellow-400">{news.category}</span>
                <span>•</span>
                <span>{new Date(news.created_at).toLocaleDateString('id-ID')}</span>
              </div>
              <Link href={`/berita/${news.slug}`}>
                <h3 className="text-base font-black italic leading-tight text-slate-200 group-hover:text-orange-500 transition-colors line-clamp-3">
                  {news.title}
                </h3>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
