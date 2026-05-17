import Link from 'next/link';
import { fetchWP } from '@/lib/wp-graphql';

export const revalidate = 60;

export default async function TrendingTopics() {
  let topNews: any[] = [];
  try {
    const query = `
      query GetTrending {
        posts(first: 5, where: { orderby: { field: DATE, order: DESC } }) {
          nodes {
            id
            title
            slug
            categories(first: 1) {
              nodes {
                name
              }
            }
          }
        }
      }
    `;
    const data = await fetchWP(query);
    topNews = (data?.posts?.nodes || []).map((post: any) => ({
      id: post.id,
      title: post.title,
      slug: post.slug,
      categories: { name: post.categories?.nodes?.[0]?.name || 'UMUM' },
    }));
  } catch (error) {
    console.error('Failed to fetch trending news:', error);
  }

  return (
    <div className="bg-slate-950 border border-slate-800 p-5 sm:p-6">
      <div className="flex items-center gap-2 mb-4 sm:mb-6 border-b-2 border-white/20 pb-2">
        <div className="w-3 h-3 bg-yellow-400"></div>
        <h2 className="text-xl sm:text-2xl font-black italic uppercase tracking-tight text-white">Trending Top 5</h2>
      </div>

      <div className="flex flex-col gap-4">
        {topNews.length > 0 ? (
          topNews.map((news, index) => (
            <Link key={news.id} href={`/berita/${news.slug}`} className="group flex gap-4 items-start pb-4 border-b border-slate-800 last:border-0 last:pb-0">
              <span className="text-4xl font-black text-slate-700 group-hover:text-orange-500 transition-colors leading-none min-w-[24px] text-center">
                {index + 1}
              </span>
              <div className="flex-1">
                <span className="text-[9px] sm:text-[10px] font-bold text-yellow-400 block mb-1">
                  {news.categories?.name || 'SPORT'}
                </span>
                <h3 className="text-sm font-black italic group-hover:text-yellow-400 transition-colors leading-snug line-clamp-2 sm:line-clamp-3 text-slate-200">
                  {news.title}
                </h3>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-sm text-slate-500 italic">Belum ada trending bulan ini.</p>
        )}
      </div>
    </div>
  );
}
