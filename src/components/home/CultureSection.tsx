import Link from 'next/link';

const cultureItems = [
  { id: 1, type: 'LIFESTYLE', title: 'Sneakers Ikonik yang Jadi Identitas Ultras di Era 90an', imageDesc: 'Sepatu Klasik' },
  { id: 2, type: 'JERSEY', title: 'Bedah Desain Jersey Timnas Indonesia dari Masa ke Masa', imageDesc: 'Jersey Merah Putih' },
  { id: 3, type: 'SUPORTER', title: 'Koreografi Paling Menggetarkan di Tribun Asia Tenggara', imageDesc: 'Koreografi 3D' }
];

export default function CultureSection() {
  return (
    <section className="container mx-auto px-4 mt-20 mb-12" aria-labelledby="kultur-sports">
      <div className="flex items-center gap-2 mb-6 border-b-2 border-white/20 pb-2">
        <h2 id="kultur-sports" className="text-2xl sm:text-3xl font-black italic tracking-tight uppercase text-white">Karakter & Kultur</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cultureItems.map((item) => (
          <Link key={item.id} href="#" className="group flex flex-col block border border-slate-800 bg-slate-900 hover:border-slate-500 transition-colors">
            <div className="aspect-[4/3] bg-slate-800 relative overflow-hidden flex items-center justify-center">
              <span className="text-slate-600 font-bold text-sm tracking-widest uppercase">{item.imageDesc}</span>
              <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-transparent transition-colors" />
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-orange-500 block mb-2 tracking-wider">{item.type}</span>
                <h3 className="text-lg font-black italic text-slate-100 group-hover:text-white transition-colors leading-snug">
                  {item.title}
                </h3>
              </div>
              <span className="text-xs font-bold text-slate-500 mt-4 block group-hover:text-slate-300 transition-colors">Telusuri →</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
