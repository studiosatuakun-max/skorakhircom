import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';

export const revalidate = 60;

export default async function GarudaPride() {
  const { data: garudaNews } = await supabase
    .from('news')
    .select('*, categories(name)')
    // Prioritaskan yang di-flag garuda pride, kalo nggak ada ambil random terbaru
    .order('is_garuda_pride', { ascending: false, nullsFirst: false })
    .order('created_at', { ascending: false })
    .limit(5);

  const heroItem = garudaNews?.[0];
  const listItems = garudaNews?.slice(1) || [];

  if (!heroItem) return null;

  return (
    <section className="container mx-auto px-4 mt-20 mb-8" aria-labelledby="garuda-pride">
      <div className="flex items-center gap-2 mb-6 border-b-2 border-red-600 pb-2">
        <h2 id="garuda-pride" className="text-2xl sm:text-3xl font-black italic tracking-tight uppercase text-white">Garuda Pride</h2>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Main Highlight */}
        <div className="md:w-1/2 group cursor-pointer">
          <Link href={`/berita/${heroItem.slug}`} className="block h-full aspect-[4/3] bg-slate-900 border border-slate-800 relative overflow-hidden flex items-end p-6">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent z-10" />
            <Image 
              src={heroItem.featured_image || 'https://via.placeholder.com/800x600'} 
              alt={heroItem.title} 
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="absolute inset-0 object-cover opacity-70 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="relative z-20 w-full">
              <span className="bg-red-600 text-white px-2 py-1 text-[10px] font-bold uppercase mb-3 inline-block">
                {heroItem.is_garuda_pride ? 'SOROTAN UTAMA' : heroItem.categories?.name}
              </span>
              <h3 className="text-2xl sm:text-4xl font-black italic text-white leading-tight group-hover:text-yellow-400 transition-colors line-clamp-3">
                {heroItem.title}
              </h3>
            </div>
          </Link>
        </div>

        {/* List items */}
        <div className="md:w-1/2 flex flex-col gap-4 justify-between">
          {listItems.map((item) => (
            <Link key={item.id} href={`/berita/${item.slug}`} className="flex items-center gap-4 group p-4 border border-slate-800 bg-slate-900 hover:border-slate-600 transition-colors">
              <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 bg-slate-800 relative overflow-hidden">
                <Image 
                  src={item.featured_image || 'https://via.placeholder.com/150'} 
                  alt={item.title} 
                  fill
                  sizes="80px"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 block mb-1">{item.categories?.name || 'SPORT'}</span>
                <h4 className="text-sm sm:text-base font-black italic text-slate-200 group-hover:text-red-500 transition-colors leading-snug line-clamp-2">
                  {item.title}
                </h4>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
