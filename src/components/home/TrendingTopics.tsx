import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export const revalidate = 60;

export default async function TrendingTopics() {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const { data: trendingNews, error } = await supabase
    .from('news')
    .select('*, categories(name)')
    .gte('created_at', thirtyDaysAgo.toISOString())
    .order('view_count', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(5);

  const topNews = trendingNews || [];

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
      
      {/* Mini Banner */}
      <div className="mt-6 sm:mt-8 relative overflow-hidden aspect-video sm:aspect-[4/5] xl:aspect-[4/5] bg-slate-900 text-white flex flex-col items-center justify-center p-6 text-center group cursor-pointer">
        <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-500 to-transparent"></div>
        <h3 className="relative z-10 text-xl sm:text-2xl font-black italic uppercase mb-2">Dukung Timnas Garuda!</h3>
        <p className="relative z-10 text-xs sm:text-sm text-slate-300 font-medium mb-4 max-w-[200px] sm:max-w-none">Dapatkan update eksklusif dari ruang ganti.</p>
        <span className="relative z-10 font-bold text-xs uppercase bg-orange-500 text-slate-900 px-4 py-2 hover:scale-105 active:scale-95 transition-transform delay-75 group-hover:bg-orange-400">
          Gabung Komunitas
        </span>
      </div>
    </div>
  );
}
