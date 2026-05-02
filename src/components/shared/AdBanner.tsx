import React from 'react';
import Link from 'next/link';
import { Tag } from 'lucide-react';
import SafeImage from '@/components/shared/SafeImage';

export default function AdBanner() {
  return (
    <div className="w-full my-8 flex justify-center items-center">
      <Link href="#" className="w-full max-w-4xl h-[90px] md:h-[120px] bg-slate-900 border border-slate-800 flex overflow-hidden group hover:border-orange-500 transition-colors relative">
        {/* Background Graphic */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-orange-500/20 to-transparent"></div>
        
        <div className="flex-1 flex flex-col justify-center px-4 md:px-8 relative z-10">
          <div className="flex items-center gap-2 mb-1.5 md:mb-2">
            <span className="bg-orange-500 text-slate-900 text-[9px] md:text-[10px] font-black uppercase px-2 py-0.5 tracking-widest flex items-center gap-1 shadow-sm">
              <Tag className="w-3 h-3" /> Exclusive Deal
            </span>
          </div>
          <h3 className="text-white font-black italic text-base md:text-2xl uppercase tracking-tight group-hover:text-orange-500 transition-colors line-clamp-1">
            The Orenz Merchandise
          </h3>
          <p className="text-slate-400 font-bold text-[10px] md:text-xs uppercase tracking-widest mt-0.5 md:mt-1">
            Diskon hingga 20% Koleksi Varsity & T-Shirt
          </p>
        </div>
        
        {/* Visual/Button Side */}
        <div className="w-1/3 md:w-1/4 bg-slate-950 flex items-center justify-center border-l border-slate-800 relative overflow-hidden shrink-0">
          <div className="absolute inset-0 opacity-20 group-hover:opacity-40 group-hover:scale-110 transition-all duration-700">
             <SafeImage src="/images/merchandise/jacket.png" alt="Orenz Promo" fill className="object-cover" />
          </div>
          <span className="relative z-10 bg-orange-500 text-slate-900 font-black text-[9px] md:text-xs uppercase px-3 py-1.5 md:px-4 md:py-2 tracking-widest shadow-lg group-hover:bg-orange-400 transition-colors">
            Shop Now
          </span>
        </div>
      </Link>
    </div>
  );
}
