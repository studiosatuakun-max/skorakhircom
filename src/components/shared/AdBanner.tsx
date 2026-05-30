import React from 'react';
import Link from 'next/link';
import { Tag } from 'lucide-react';
import SafeImage from '@/components/shared/SafeImage';

export default function AdBanner() {
  return (
    <div className="w-full my-8 flex justify-center items-center px-4 md:px-0">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* BANNER 1: THE ORENZ MERCHANDISE */}
        <Link href="https://www.instagram.com/theorenz_merch/?hl=en" target="_blank" rel="noopener noreferrer" className="w-full h-[90px] md:h-[120px] bg-slate-900 border border-slate-800 flex overflow-hidden group hover:border-orange-500 transition-colors relative rounded-xl">
          <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-orange-500/20 to-transparent"></div>
          
          <div className="flex-1 flex flex-col justify-center px-4 md:px-6 relative z-10">
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-orange-500 text-slate-900 text-[8px] md:text-[9px] font-black uppercase px-2 py-0.5 tracking-widest flex items-center gap-1 shadow-sm rounded-sm">
                <Tag className="w-3 h-3" /> Exclusive Deal
              </span>
            </div>
            <h3 className="text-white font-black italic text-sm md:text-xl uppercase tracking-tight group-hover:text-orange-500 transition-colors line-clamp-1">
              The Orenz Merch
            </h3>
            <p className="text-slate-400 font-bold text-[9px] md:text-[10px] uppercase tracking-widest mt-0.5">
              Diskon 20% Koleksi Varsity
            </p>
          </div>
          
          <div className="w-1/3 bg-slate-950 flex items-center justify-center border-l border-slate-800 relative overflow-hidden shrink-0">
            <div className="absolute inset-0 opacity-20 group-hover:opacity-40 group-hover:scale-110 transition-all duration-700">
               <SafeImage src="/images/merchandise/jacket.png" alt="Orenz Promo" fill className="object-cover" />
            </div>
            <span className="relative z-10 bg-orange-500 text-slate-900 font-black text-[9px] md:text-[10px] uppercase px-3 py-1.5 md:px-3 md:py-2 tracking-widest shadow-lg group-hover:bg-orange-400 transition-colors rounded-sm">
              Shop
            </span>
          </div>
        </Link>

        {/* BANNER 2: WORLD CUP 2027 CORNER */}
        <Link href="/world-cup-2027" className="w-full h-[90px] md:h-[120px] bg-slate-900 border border-slate-800 flex overflow-hidden group hover:border-yellow-500 transition-colors relative rounded-xl">
          <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-yellow-500/20 to-transparent"></div>
          
          <div className="flex-1 flex flex-col justify-center px-4 md:px-6 relative z-10">
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-yellow-500 text-slate-900 text-[8px] md:text-[9px] font-black uppercase px-2 py-0.5 tracking-widest flex items-center gap-1 shadow-sm rounded-sm animate-pulse">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span> Live Hub
              </span>
            </div>
            <h3 className="text-white font-black italic text-sm md:text-xl uppercase tracking-tight group-hover:text-yellow-500 transition-colors line-clamp-1">
              World Cup '27
            </h3>
            <p className="text-slate-400 font-bold text-[9px] md:text-[10px] uppercase tracking-widest mt-0.5">
              Klasemen & Berita Eksklusif
            </p>
          </div>
          
          <div className="w-1/3 bg-slate-950 flex items-center justify-center border-l border-slate-800 relative overflow-hidden shrink-0">
            <div className="absolute inset-0 opacity-20 group-hover:opacity-40 group-hover:scale-110 transition-all duration-700 bg-[url('/images/pattern.svg')] mix-blend-overlay"></div>
            <span className="relative z-10 bg-yellow-500 text-slate-900 font-black text-[9px] md:text-[10px] uppercase px-3 py-1.5 md:px-3 md:py-2 tracking-widest shadow-lg group-hover:bg-yellow-400 transition-colors rounded-sm">
              Masuk
            </span>
          </div>
        </Link>

      </div>
    </div>
  );
}
