import Link from 'next/link';
import { fetchWP } from '@/lib/wp-graphql';
import SafeImage from '@/components/shared/SafeImage';

export const revalidate = 60;

export default async function CultureSection() {
  let cultureArticles: any[] = [];
  
  try {
    const query = `
      query GetCultureNews {
        posts(first: 3, where: { categoryName: "kultur" }) {
          nodes {
            id
            title
            slug
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
            tags(first: 1) {
              nodes {
                name
              }
            }
          }
        }
      }
    `;
    const data = await fetchWP(query);
    cultureArticles = data?.posts?.nodes || [];
  } catch (error) {
    console.error('Failed to fetch culture news:', error);
  }

  // Fallback to mock data if no articles are found in WP yet
  if (cultureArticles.length === 0) {
    cultureArticles = [
      { id: 1, type: 'LIFESTYLE', title: 'Sneakers Ikonik yang Jadi Identitas Ultras di Era 90an', imageDesc: 'Sepatu Klasik' },
      { id: 2, type: 'JERSEY', title: 'Bedah Desain Jersey Timnas Indonesia dari Masa ke Masa', imageDesc: 'Jersey Merah Putih' },
      { id: 3, type: 'SUPORTER', title: 'Koreografi Paling Menggetarkan di Tribun Asia Tenggara', imageDesc: 'Koreografi 3D' }
    ];
  }

  return (
    <section className="container mx-auto px-4 mt-20 mb-12" aria-labelledby="kultur-sports">
      <div className="flex items-center gap-2 mb-6 border-b-2 border-white/20 pb-2">
        <h2 id="kultur-sports" className="text-2xl sm:text-3xl font-black italic tracking-tight uppercase text-white">Kultur</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cultureArticles.map((item: any) => {
          const typeLabel = item.tags?.nodes?.[0]?.name?.toUpperCase() || item.type || 'KULTUR';
          const title = item.title;
          const href = item.slug ? `/berita/${item.slug}` : '/kultur';
          const imageUrl = item.featuredImage?.node?.sourceUrl?.replace(/^https:\/\//i, 'http://') || null;

          return (
            <Link key={item.id} href={href} className="group flex flex-col block border border-slate-800 bg-slate-900 hover:border-slate-500 transition-colors">
              <div className="aspect-[4/3] bg-slate-800 relative overflow-hidden flex items-center justify-center">
                {imageUrl ? (
                  <SafeImage src={imageUrl} alt={title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                ) : (
                  <span className="text-slate-600 font-bold text-sm tracking-widest uppercase">{item.imageDesc || 'Kultur'}</span>
                )}
                <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-transparent transition-colors z-10" />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold text-orange-500 block mb-2 tracking-wider">{typeLabel}</span>
                  <h3 className="text-lg font-black italic text-slate-100 group-hover:text-white transition-colors leading-snug line-clamp-3">
                    {title}
                  </h3>
                </div>
                <span className="text-xs font-bold text-slate-500 mt-4 block group-hover:text-slate-300 transition-colors">Telusuri →</span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
