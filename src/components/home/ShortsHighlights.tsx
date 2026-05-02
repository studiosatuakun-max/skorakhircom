'use client';

import { Play, Heart, MessageCircle, Share2 } from 'lucide-react';
import SafeImage from '@/components/shared/SafeImage';

const shortsData = [
  {
    id: 1,
    title: "Gol Salto Spektakuler Garnacho vs Everton",
    views: "1.2M",
    thumbnail: "/images/placeholder.png",
  },
  {
    id: 2,
    title: "Skill Gila Vinicius Jr di El Clasico yang Bikin Lawan Pusing",
    views: "850K",
    thumbnail: "/images/placeholder.png",
  },
  {
    id: 3,
    title: "Selebrasi Dingin Cole Palmer Usai Cetak Hattrick",
    views: "2.1M",
    thumbnail: "/images/placeholder.png",
  },
  {
    id: 4,
    title: "Momen Haru Perpisahan Jurgen Klopp di Anfield",
    views: "3.5M",
    thumbnail: "/images/placeholder.png",
  },
  {
    id: 5,
    title: "Penyelamatan Krusial Onana Menit Akhir Liga Champions",
    views: "600K",
    thumbnail: "/images/placeholder.png",
  },
  {
    id: 6,
    title: "Tendangan Roket Fede Valverde Jarak 30 Meter",
    views: "1.8M",
    thumbnail: "/images/placeholder.png",
  }
];

export default function ShortsHighlights() {
  return (
    <section aria-labelledby="shorts-title" className="mt-12 sm:mt-16 mb-8 overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="flex space-x-1">
            <div className="w-1.5 h-6 bg-orange-500 rounded-full animate-[bounce_1s_infinite]"></div>
            <div className="w-1.5 h-6 bg-orange-400 rounded-full animate-[bounce_1s_infinite_0.2s]"></div>
            <div className="w-1.5 h-6 bg-yellow-500 rounded-full animate-[bounce_1s_infinite_0.4s]"></div>
          </div>
          <h2 id="shorts-title" className="text-xl sm:text-2xl font-black italic tracking-tight uppercase text-white">
            SkorAkhir <span className="text-orange-500">Shorts</span>
          </h2>
        </div>
        <button className="text-xs font-bold text-slate-400 hover:text-white uppercase tracking-widest transition-colors flex items-center gap-1 group">
          Lihat Semua <span className="group-hover:translate-x-1 transition-transform">→</span>
        </button>
      </div>

      <div className="flex overflow-x-auto gap-4 md:gap-6 pb-6 scrollbar-hide snap-x snap-mandatory px-1">
        {shortsData.map((short) => (
          <div key={short.id} className="relative shrink-0 snap-center sm:snap-start group cursor-pointer w-[160px] sm:w-[220px] lg:w-[260px] aspect-[9/16] rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-orange-500 transition-colors shadow-lg">
            
            <SafeImage 
              src={short.thumbnail} 
              alt={short.title} 
              fill 
              className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-70 group-hover:opacity-100"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
            
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-orange-500/90 flex items-center justify-center pl-1 shadow-[0_0_30px_rgba(249,115,22,0.6)] backdrop-blur-sm scale-75 group-hover:scale-100 transition-transform duration-300">
                <Play className="w-5 h-5 md:w-7 md:h-7 text-white fill-white" />
              </div>
            </div>

            {/* Content */}
            <div className="absolute inset-0 p-4 flex flex-col justify-end z-20">
              <div className="flex items-center gap-1.5 mb-2">
                <Play className="w-3 h-3 text-orange-500 fill-orange-500" />
                <span className="text-[10px] md:text-xs font-black text-white tracking-widest">{short.views}</span>
              </div>
              <h3 className="text-xs md:text-sm font-bold text-white leading-tight line-clamp-3 mb-4 group-hover:text-orange-400 transition-colors drop-shadow-md">
                {short.title}
              </h3>
              
              {/* Interaction Bar */}
              <div className="flex items-center gap-4 text-slate-300 border-t border-slate-700/50 pt-3">
                <button className="flex flex-col items-center hover:text-orange-500 transition-colors group/btn">
                  <Heart className="w-4 h-4 md:w-5 md:h-5 group-hover/btn:fill-orange-500" />
                </button>
                <button className="flex flex-col items-center hover:text-orange-500 transition-colors">
                  <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
                </button>
                <button className="flex flex-col items-center hover:text-orange-500 transition-colors ml-auto">
                  <Share2 className="w-4 h-4 md:w-5 md:h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
