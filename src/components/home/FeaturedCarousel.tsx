'use client';

import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Flag } from 'lucide-react';
import Link from 'next/link';
import SafeImage from '@/components/shared/SafeImage';

export default function FeaturedCarousel({ newsList }: { newsList: any[] }) {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000, stopOnInteraction: true })]);

  return (
    <div className="overflow-hidden w-full relative" ref={emblaRef}>
      <div className="flex touch-pan-y">
        {newsList.map((news, index) => (
          <Link href={`/berita/${news.slug}`} key={news.id} className="flex-[0_0_100%] min-w-0 pr-4 group cursor-pointer flex flex-col block">
            <div className="bg-slate-900 aspect-video mb-3 relative overflow-hidden w-full">
              <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-transparent transition-colors z-10" />
              <SafeImage src={news.featured_image || '/images/placeholder.png'} alt={news.title} fill priority sizes="(max-width: 1024px) 100vw, 66vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            
            <div className="flex items-center gap-2 text-[10px] sm:text-xs font-bold text-slate-400 mb-2">
              <span className="bg-yellow-400 text-white px-2 py-0.5">{news.categories?.name || 'SPORT'}</span>
              <span>•</span>
              <span>{new Date(news.created_at).toLocaleDateString('id-ID')}</span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black italic tracking-tight leading-tight text-white group-hover:text-orange-500 transition-colors line-clamp-3">
              {news.title}
            </h1>
            <p className="mt-2 text-sm sm:text-base text-slate-300 font-medium line-clamp-2">
              {news.excerpt}
            </p>
          </Link>
        ))}
      </div>
      
      {/* Swipe Indicator */}
      <div className="absolute bottom-24 right-6 z-30 hidden sm:flex gap-1">
        {newsList.map((_, idx) => (
          <div key={idx} className="w-8 h-1 bg-white/50 rounded-full overflow-hidden">
            <div className="h-full bg-orange-500 w-0 group-hover:w-full transition-all duration-[5000ms] ease-linear" />
          </div>
        ))}
      </div>
    </div>
  );
}
