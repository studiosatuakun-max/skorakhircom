import Link from 'next/link';
import { supabase } from '@/lib/supabase';

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
      themeColorBg: 'bg-yellow-400',
      themeColorText: 'text-slate-900',
      hoverColorText: 'group-hover:text-yellow-600',
      news: newsBase.slice(0, 3)
    },
    {
      title: 'SMASH BULUTANGKIS',
      themeColorBg: 'bg-red-600',
      themeColorText: 'text-white',
      hoverColorText: 'group-hover:text-red-600',
      news: newsBase.slice(3, 6)
    },
    {
      title: 'ARENA E-SPORT',
      themeColorBg: 'bg-yellow-400',
      themeColorText: 'text-slate-900',
      hoverColorText: 'group-hover:text-yellow-600',
      news: newsBase.slice(6, 9)
    }
  ];

  return (
    <section className="mt-12 sm:mt-16" aria-labelledby="kategori-fokus">
      <h2 id="kategori-fokus" className="sr-only">Kategori Fokus Olahraga</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {categoriesData.map((category) => (
          <div key={category.title} className="flex flex-col border border-slate-800 bg-slate-900 hover:border-slate-600 transition-colors">
            <div className={`p-3 font-black italic tracking-widest uppercase flex items-center justify-between ${category.themeColorBg} ${category.themeColorText}`}>
              <h3 className="text-sm">{category.title}</h3>
            </div>
            
            <div className="p-4 flex flex-col gap-4">
              {category.news.map((item, idx) => (
                <Link key={item.id || idx} href={`/berita/${item.slug}`} className="flex gap-3 group border-b border-slate-800 pb-3 last:border-0 last:pb-0">
                  {idx === 0 && <span className={`w-1.5 shrink-0 ${category.themeColorBg}`}></span>}
                  <div className="flex-1">
                    <h4 className={`font-black italic leading-tight text-slate-200 transition-colors line-clamp-2 ${category.hoverColorText} ${idx === 0 ? 'text-lg' : 'text-sm'}`}>
                      {item.title}
                    </h4>
                    <span className="text-[10px] font-bold text-slate-400 mt-1 block">
                      {new Date(item.created_at).toLocaleDateString('id-ID')}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
            <div className="p-4 pt-0 mt-auto">
               <Link href="#" className="font-bold text-xs uppercase text-slate-400 hover:text-white flex items-center gap-1 group w-max">
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
