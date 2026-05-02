import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import SafeImage from '@/components/shared/SafeImage';

export const revalidate = 60;

export default async function CategoryGrid() {
  const { data: latestNews } = await supabase
    .from('news')
    .select('*')
    .order('created_at', { ascending: false })
    .range(5, 14); // Ambil rentang berita lain agar tidak sama persis dengan atas
    
  const newsBase = latestNews || [];
  
  const categoriesData = [
    {
      title: 'FOKUS MOTO GP',
      themeColorBg: 'bg-orange-500',
      themeColorText: 'text-slate-900',
      hoverColorText: 'group-hover:text-orange-700',
      news: newsBase.slice(0, 3)
    },
    {
      title: 'SMASH BULUTANGKIS',
      themeColorBg: 'bg-yellow-400',
      themeColorText: 'text-white',
      hoverColorText: 'group-hover:text-yellow-400',
      news: newsBase.slice(3, 6)
    },
    {
      title: 'ARENA E-SPORT',
      themeColorBg: 'bg-orange-500',
      themeColorText: 'text-slate-900',
      hoverColorText: 'group-hover:text-orange-700',
      news: newsBase.slice(6, 9)
    }
  ];

  return (
    <section className="mt-12 sm:mt-16" aria-labelledby="kategori-fokus">
      <h2 id="kategori-fokus" className="sr-only">Kategori Fokus Olahraga</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {categoriesData.map((category, catIdx) => (
          <div key={category.title} className="flex flex-col border border-slate-800 bg-slate-900 hover:border-slate-600 transition-colors rounded-xl overflow-hidden shadow-lg">
            <div className={`p-3 font-black italic tracking-widest uppercase flex items-center justify-between ${category.themeColorBg} ${category.themeColorText}`}>
              <h3 className="text-sm">{category.title}</h3>
            </div>
            
            <div className="p-4 flex flex-col gap-4">
              {category.news.map((item, idx) => {
                const isHero = idx === 0;
                
                // Variasi layout: Kolom tengah (catIdx === 1) hero-nya dibikin gaya Poster Overlay
                if (isHero && catIdx === 1) {
                  return (
                    <Link key={item.id || idx} href={`/berita/${item.slug}`} className="group flex flex-col relative rounded-lg overflow-hidden border border-slate-800 mb-2 h-48 sm:h-56">
                      <SafeImage 
                        src={item.featured_image || 'https://placehold.co/600x400/1e293b/f97316?text=SkorAkhir'} 
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
                          src={item.featured_image || 'https://placehold.co/600x400/1e293b/f97316?text=SkorAkhir'} 
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
                        src={item.featured_image || 'https://placehold.co/300x300/1e293b/f97316?text=SkorAkhir'} 
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
               <Link href="#" className="font-bold text-xs uppercase text-slate-400 hover:text-white flex items-center gap-1 group w-max pt-3">
                 Lihat Semua <span className="sr-only">{category.title}</span>
                 <span className="group-hover:translate-x-1 transition-transform">→</span>
               </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
