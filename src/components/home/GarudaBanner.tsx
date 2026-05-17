export default function GarudaBanner() {
  return (
    <div className="relative overflow-hidden aspect-video sm:aspect-[4/5] xl:aspect-auto xl:h-full min-h-[300px] bg-slate-900 text-white flex flex-col items-center justify-center p-6 text-center group cursor-pointer border border-slate-800 rounded-xl">
      <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-500 to-transparent"></div>
      <h3 className="relative z-10 text-xl sm:text-2xl font-black italic uppercase mb-2">Dukung Timnas Garuda!</h3>
      <p className="relative z-10 text-xs sm:text-sm text-slate-300 font-medium mb-4 max-w-[200px] sm:max-w-none">Dapatkan update eksklusif dari ruang ganti.</p>
      <span className="relative z-10 font-bold text-xs uppercase bg-orange-500 text-slate-900 px-4 py-2 hover:scale-105 active:scale-95 transition-transform delay-75 group-hover:bg-orange-400">
        Gabung Komunitas
      </span>
    </div>
  );
}
