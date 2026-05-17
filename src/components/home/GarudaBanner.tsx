import SafeImage from '@/components/shared/SafeImage';

export default function GarudaBanner() {
  return (
    <div className="relative overflow-hidden aspect-video sm:aspect-[4/5] xl:aspect-auto xl:h-full min-h-[300px] bg-slate-900 text-white flex flex-col items-center justify-end pb-8 p-6 text-center group cursor-pointer border border-slate-800 rounded-xl">
      <SafeImage 
        src="/images/timnas-garuda.jpg" 
        alt="Timnas Garuda" 
        fill 
        className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>
      
      <h3 className="relative z-10 text-xl sm:text-2xl font-black italic uppercase mb-2">Dukung Timnas Garuda!</h3>
      <p className="relative z-10 text-xs sm:text-sm text-slate-300 font-medium mb-4 max-w-[200px] sm:max-w-none">Dapatkan update eksklusif dari ruang ganti.</p>
      <span className="relative z-10 font-bold text-xs uppercase bg-orange-500 text-slate-900 px-4 py-2 hover:scale-105 active:scale-95 transition-transform delay-75 group-hover:bg-orange-400">
        Gabung Komunitas
      </span>
    </div>
  );
}
