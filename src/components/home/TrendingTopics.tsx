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
      <div className="flex items-center gap-2 mb-6 sm:mb-8 border-b-2 border-slate-800 pb-3">
        <div className="w-3 h-3 bg-yellow-400"></div>
        <h2 className="text-xl sm:text-2xl font-black italic uppercase tracking-tight text-white">Terpopuler</h2>
      </div>

      <div className="flex flex-col">
        {topNews.length > 0 ? (
          topNews.map((news, index) => (
            <Link key={news.id} href={`/berita/${news.slug}`} className="group flex gap-5 items-start py-5 border-b border-slate-800/50 first:pt-0 last:border-0 last:pb-0">
              <span 
                className="text-[80px] font-light leading-[0.7] min-w-[50px] text-center transition-all duration-300 group-hover:[-webkit-text-stroke:1px_#facc15]"
                style={{
                  WebkitTextStroke: '1px #64748b', /* slate-500 for a subtler outline */
                  color: 'transparent'
                }}
              >
                {index + 1}
              </span>
              <div className="flex-1 mt-2">
                <h3 className="text-[15px] font-bold leading-relaxed text-slate-300 group-hover:text-yellow-400 transition-colors">
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
