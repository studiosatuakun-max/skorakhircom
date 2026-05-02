import { Radar } from 'lucide-react';

const transferNews = [
  { id: 1, type: 'DONE DEAL', text: 'Kylian Mbappe resmi diperkenalkan Real Madrid musim depan', color: 'bg-green-500' },
  { id: 2, type: 'HOT RUMOR', text: 'Manchester United siap tebus klausul rilis Erling Haaland', color: 'bg-orange-500' },
  { id: 3, type: 'NEGOTIATION', text: 'Liverpool dalam pembicaraan lanjut dengan agen Xabi Alonso', color: 'bg-blue-500' },
  { id: 4, type: 'DONE DEAL', text: 'Thom Haye sepakat gabung FC Como dengan durasi kontrak 2 tahun', color: 'bg-green-500' },
  { id: 5, type: 'RUMOR', text: 'Juventus incar gelandang serang Arsenal, Fabio Vieira', color: 'bg-slate-500' },
];

export default function TransferRadar() {
  // Duplikat array buat efek marquee infinite
  const marqueeItems = [...transferNews, ...transferNews, ...transferNews];

  return (
    <section aria-labelledby="transfer-radar" className="w-full mt-6 mb-4">
      <div className="flex items-center gap-2 mb-3 px-2">
        <Radar className="w-4 h-4 text-orange-500 animate-spin-slow" />
        <h2 id="transfer-radar" className="text-sm font-black italic tracking-widest uppercase text-slate-500">
          Transfer Radar
        </h2>
      </div>

      <div className="flex overflow-hidden relative bg-slate-900 border-y border-slate-800 py-3 select-none">
        {/* Fading Edges */}
        <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-slate-50 to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-slate-50 to-transparent z-10"></div>
        
        <div className="flex animate-marquee items-center gap-8 hover:[animation-play-state:paused] w-max cursor-pointer">
          {marqueeItems.map((item, index) => (
            <div key={`${item.id}-${index}`} className="flex items-center gap-3 shrink-0 group">
              <span className={`text-[10px] font-black uppercase px-2 py-0.5 text-white ${item.color} tracking-widest`}>
                {item.type}
              </span>
              <p className="text-sm font-bold text-slate-200 group-hover:text-orange-500 transition-colors">
                {item.text}
              </p>
              <div className="w-1.5 h-1.5 rounded-full bg-slate-300 ml-5"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
