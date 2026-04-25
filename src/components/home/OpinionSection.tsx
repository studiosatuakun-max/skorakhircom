import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export const revalidate = 60;

export default async function OpinionSection() {
  const { data: opinions } = await supabase
    .from('news')
    .select('*')
    .order('created_at', { ascending: false })
    .range(15, 18); // Ambil 4 artikel agak ke belakang sebagai "opini"
    
  if (!opinions || opinions.length === 0) return null;

  return (
    <section className="mt-12" aria-labelledby="opini-analisis">
      <div className="flex items-center gap-2 mb-4 border-b-2 border-white/20 pb-2">
        <h2 id="opini-analisis" className="text-xl sm:text-2xl font-black italic tracking-tight uppercase text-white">Opini & Analisis</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {opinions.map((item) => (
          <Link key={item.id} href={`/berita/${item.slug}`} className="flex flex-col bg-slate-900 border border-slate-800 p-5 group hover:border-slate-600 transition-colors cursor-pointer">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-slate-800 overflow-hidden shrink-0 filter grayscale group-hover:grayscale-0 transition-all">
                <div className="w-full h-full bg-slate-700 flex items-center justify-center font-black text-slate-500">
                   {item.author.charAt(0)}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-black text-white uppercase tracking-tight leading-none line-clamp-1">{item.author}</h3>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Jurnalis SkorAkhir</span>
              </div>
            </div>
            <h4 className="text-lg font-black italic leading-tight text-slate-200 group-hover:text-red-500 transition-colors">
              "{item.title}"
            </h4>
            <span className="text-[10px] font-bold text-slate-500 mt-auto pt-4">
              {new Date(item.created_at).toLocaleDateString('id-ID')}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
