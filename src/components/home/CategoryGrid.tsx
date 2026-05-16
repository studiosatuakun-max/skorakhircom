import Link from 'next/link';
import { fetchWP } from '@/lib/wp-graphql';
import SafeImage from '@/components/shared/SafeImage';

export const revalidate = 60;

async function getCategoryPosts(categoryName: string) {
  try {
    const query = `
      query GetCatPosts($categoryName: String!) {
        posts(first: 3, where: { categoryName: $categoryName }) {
          nodes {
            id
            title
            slug
            date
            featuredImage {
              node {
                sourceUrl
              }
            }
          }
        }
      }
    `;
    const data = await fetchWP(query, { variables: { categoryName } });
    return (data?.posts?.nodes || []).map((post: any) => ({
      id: post.id,
      title: post.title,
      slug: post.slug,
      created_at: post.date,
      featured_image: post.featuredImage?.node?.sourceUrl?.replace(/^https:\/\//i, 'http://') || '/images/placeholder.png',
    }));
  } catch (error) {
    console.error(`Failed to fetch category ${categoryName}:`, error);
    return [];
  }
}

export default async function CategoryGrid() {
  const [sepakBola, volly, motoGp, bulutangkis, esport] = await Promise.all([
    getCategoryPosts('sepak-bola'),
    getCategoryPosts('bola-volly'),
    getCategoryPosts('moto-gp'),
    getCategoryPosts('bulutangkis'),
    getCategoryPosts('e-sport'),
  ]);
  
  const categoriesData = [
    {
      title: 'ARENA SEPAK BOLA',
      slug: 'sepak-bola',
      themeColorBg: 'bg-orange-500',
      themeColorText: 'text-slate-900',
      hoverColorText: 'group-hover:text-orange-700',
      news: sepakBola
    },
    {
      title: 'BLOK BOLA VOLLY',
      slug: 'bola-volly',
      themeColorBg: 'bg-yellow-400',
      themeColorText: 'text-white',
      hoverColorText: 'group-hover:text-yellow-400',
      news: volly
    },
    {
      title: 'FOKUS MOTO GP',
      slug: 'moto-gp',
      themeColorBg: 'bg-orange-500',
      themeColorText: 'text-slate-900',
      hoverColorText: 'group-hover:text-orange-700',
      news: motoGp
    },
    {
      title: 'SMASH BULUTANGKIS',
      slug: 'bulutangkis',
      themeColorBg: 'bg-yellow-400',
      themeColorText: 'text-white',
      hoverColorText: 'group-hover:text-yellow-400',
      news: bulutangkis
    },
    {
      title: 'ARENA E-SPORT',
      slug: 'e-sport',
      themeColorBg: 'bg-orange-500',
      themeColorText: 'text-slate-900',
      hoverColorText: 'group-hover:text-orange-700',
      news: esport
    }
  ];

  return (
    <section className="mt-12 sm:mt-16 overflow-hidden" aria-labelledby="kategori-fokus">
      <h2 id="kategori-fokus" className="sr-only">Kategori Fokus Olahraga</h2>
      <div className="flex overflow-x-auto gap-6 hide-scrollbar snap-x snap-mandatory pb-4">
        {categoriesData.map((category, catIdx) => (
          <div key={category.title} className="flex flex-col border border-slate-800 bg-slate-900 hover:border-slate-600 transition-colors rounded-xl overflow-hidden shadow-lg w-[85vw] sm:w-[300px] xl:w-[360px] shrink-0 snap-start">
            <div className={`p-3 font-black italic tracking-widest uppercase flex items-center justify-between ${category.themeColorBg} ${category.themeColorText}`}>
              <h3 className="text-sm">{category.title}</h3>
            </div>
            
            <div className="p-4 flex flex-col gap-4">
              {category.news.map((item: any, idx: number) => {
                const isHero = idx === 0;
                
                // Variasi layout: Kolom tengah (catIdx === 1) hero-nya dibikin gaya Poster Overlay
                if (isHero && catIdx === 1) {
                  return (
                    <Link key={item.id || idx} href={`/berita/${item.slug}`} className="group flex flex-col relative rounded-lg overflow-hidden border border-slate-800 mb-2 h-48 sm:h-56">
                      <SafeImage 
                        src={item.featured_image || '/images/placeholder.png'} 
                        alt={item.title} 
                        fill 
                        className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent z-10"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                        <span className={`text-[10px] font-black uppercase px-2 py-0.5 tracking-widest ${category.themeColorBg} text-slate-900 mb-2 inline-block`}>
                          Sorotan
                        </span>
                        <h4 className={`font-black italic text-base sm:text-lg leading-tight text-white transition-colors line-clamp-2`}>
                          {item.title}
                        </h4>
                      </div>
                    </Link>
                  )
                }

                if (isHero) {
                  // Variasi layout: Kategori 0 & 2 hero-nya dibikin gaya Stacked (Gambar di atas, teks di bawah)
                  return (
                    <Link key={item.id || idx} href={`/berita/${item.slug}`} className="group flex flex-col gap-3 pb-4 border-b border-slate-800 mb-2">
                      <div className="relative w-full aspect-[16/9] overflow-hidden bg-slate-800 rounded-lg">
                        <SafeImage 
                          src={item.featured_image || '/images/placeholder.png'} 
                          alt={item.title} 
                          fill 
                          className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                        />
                      </div>
                      <div>
                        <h4 className={`font-black italic text-base sm:text-lg leading-tight text-slate-100 ${category.hoverColorText} transition-colors line-clamp-3`}>
                          {item.title}
                        </h4>
                        <span className="text-[10px] font-bold text-slate-400 mt-2 block tracking-widest uppercase">
                          {new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                      </div>
                    </Link>
                  )
                }

                // Sisanya (idx > 0) dibikin List Layout
                return (
                  <Link key={item.id || idx} href={`/berita/${item.slug}`} className="flex gap-4 group border-b border-slate-800 pb-4 last:border-0 last:pb-0 items-start">
                    <div className="relative shrink-0 w-20 h-20 overflow-hidden bg-slate-800 rounded-lg">
                      <SafeImage 
                        src={item.featured_image || '/images/placeholder.png'} 
                        alt={item.title} 
                        fill 
                        className="object-cover group-hover:scale-110 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                      />
                    </div>
                    <div className="flex-1 flex flex-col pt-1">
                      <h4 className={`font-black italic leading-tight text-slate-200 transition-colors line-clamp-3 ${category.hoverColorText} text-sm`}>
                        {item.title}
                      </h4>
                      <span className="text-[10px] font-bold text-slate-400 mt-2 block tracking-widest uppercase">
                        {new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                  </Link>
                )
              })}
            </div>
            <div className="p-4 pt-0 mt-auto bg-slate-900 border-t border-slate-800/50">
               <Link href={`/kategori/${category.slug}`} className="font-bold text-xs uppercase text-slate-400 hover:text-white flex items-center gap-1 group w-max pt-3">
                 Lihat Semua <span className="sr-only">{category.title}</span>
                 <span className="group-hover:translate-x-1 transition-transform">→</span>
               </Link>
            </div>
          </div>
        ))}
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </section>
  );
}
