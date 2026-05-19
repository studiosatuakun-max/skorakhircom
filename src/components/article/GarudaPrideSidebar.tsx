import Link from 'next/link';
import SafeImage from '@/components/shared/SafeImage';
import { fetchWP } from '@/lib/wp-graphql';

export const revalidate = 60;

export default async function GarudaPrideSidebar() {
  let garudaNews = [];
  try {
    const query = `
      query GetGarudaPride {
        posts(first: 3, where: { categoryName: "garuda-pride" }) {
          nodes {
            id
            title
            slug
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
    const data = await fetchWP(query);
    garudaNews = (data?.posts?.nodes || []).map((post: any) => ({
      id: post.id,
      title: post.title,
      slug: post.slug,
      categories: { name: post.categories?.nodes?.[0]?.name || 'SPORT' },
      featured_image: post.featuredImage?.node?.sourceUrl?.replace(/^https:\/\//i, 'http://') || '/images/placeholder.png',
    }));
  } catch (error) {
    console.error('Failed to fetch Garuda Pride news:', error);
  }

  if (!garudaNews || garudaNews.length === 0) return null;

  return (
    <div className="flex flex-col gap-4 bg-slate-900/50 border border-slate-800 hover:border-yellow-500/50 transition-colors rounded-xl overflow-hidden shadow-lg p-5">
      <div className="flex items-center gap-2 mb-2 pb-3 border-b border-slate-800">
        <h3 className="font-black italic tracking-widest text-lg uppercase text-white">
          🦅 Garuda Pride
        </h3>
      </div>
      
      <div className="flex flex-col gap-5">
        {garudaNews.map((item: any) => (
          <Link key={item.id} href={`/berita/${item.slug}`} className="flex items-center gap-3 group">
            <div className="w-24 h-20 shrink-0 rounded-md overflow-hidden bg-slate-800 relative border border-slate-700/50 group-hover:border-orange-500/50 transition-colors">
              <SafeImage 
                src={item.featured_image} 
                alt={item.title} 
                fill
                sizes="96px"
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-[9px] font-black uppercase text-yellow-400 tracking-wider mb-1">
                {item.categories.name}
              </span>
              <h4 className="text-sm font-bold text-slate-200 group-hover:text-orange-500 transition-colors leading-snug line-clamp-3">
                {item.title}
              </h4>
            </div>
          </Link>
        ))}
      </div>
      
      <Link href="/kategori/garuda-pride" className="mt-2 text-center text-[10px] font-bold text-slate-400 hover:text-yellow-400 uppercase tracking-widest transition-colors pt-3 border-t border-slate-800">
        Lihat Semua Artikel Garuda
      </Link>
    </div>
  );
}
