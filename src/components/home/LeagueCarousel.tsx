'use client';

import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Star } from 'lucide-react';
import Link from 'next/link';

const leagues = [
  { id: 1, name: 'Liga 1 Indonesia', icon: 'ID', slug: 'liga-1' },
  { id: 2, name: 'Premier League', icon: 'EN', slug: 'premier-league' },
  { id: 3, name: 'La Liga', icon: 'ES', slug: 'la-liga' },
  { id: 4, name: 'Serie A', icon: 'IT', slug: 'serie-a' },
  { id: 5, name: 'Bundesliga', icon: 'DE', slug: 'bundesliga' },
  { id: 6, name: 'Champions League', icon: 'EU', slug: 'champions-league' },
  { id: 7, name: 'Piala Dunia', icon: 'FIFA', slug: 'piala-dunia' },
  { id: 8, name: 'AFC Cup', icon: 'AFC', slug: 'afc-cup' },
  { id: 9, name: 'MotoGP', icon: 'MGP', slug: 'motogp' },
];

export default function LeagueCarousel() {
  const [emblaRef] = useEmblaCarousel(
    {
      align: 'start',
      containScroll: 'trimSnaps',
      dragFree: true,
      loop: true
    },
    [Autoplay({ delay: 3000, stopOnInteraction: true })]
  );

  return (
    <section aria-labelledby="ikuti-liga" className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
        <h2 id="ikuti-liga" className="text-sm font-black italic uppercase tracking-widest text-slate-400">Ikuti Liga & Event Favorit</h2>
      </div>

      <div className="overflow-hidden w-full" ref={emblaRef}>
        <div className="flex gap-3 touch-pan-x select-none">
          {leagues.map((league) => (
            <div key={league.id} className="flex-[0_0_120px] sm:flex-[0_0_140px] min-w-0">
              <Link href={`/liga/${league.slug}`} className="h-full bg-[#18181b] border border-white/10 rounded-xl flex flex-col group transition-colors hover:border-slate-500 overflow-hidden cursor-pointer">
                <div className="flex-1 flex flex-col items-center justify-center p-4 gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-white/5 text-[10px] font-bold text-slate-400 group-hover:scale-110 transition-transform">
                    {league.icon}
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-center text-slate-100 leading-snug">
                    {league.name}
                  </h3>
                </div>
                
                <div className="w-full border-t border-white/10 p-2.5 flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-400 group-hover:bg-white/5 transition-colors">
                  Cek Update <Star className="w-3.5 h-3.5 group-hover:text-yellow-400 transition-colors" />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
