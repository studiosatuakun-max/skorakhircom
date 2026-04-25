'use client';

import React from 'react';
import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react';
import SafeImage from '@/components/shared/SafeImage';

type RelatedArticle = {
  title: string;
  slug: string;
  categories: { name: string } | { name: string }[] | null;
  featured_image: string | null;
};

export default function RelatedArticles({ articles }: { articles: RelatedArticle[] }) {
  const [emblaRef] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: true
  });

  if (!articles || articles.length === 0) {
    return <p className="text-slate-500 italic text-sm">Belum ada artikel terkait di kategori ini.</p>;
  }

  return (
    <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
      <div className="flex gap-4">
        {articles.map((rel) => {
          const catName = Array.isArray(rel.categories) ? rel.categories[0]?.name : rel.categories?.name;
          return (
            <Link 
              key={rel.slug} 
              href={`/berita/${rel.slug}`} 
              className="flex-none w-[70%] sm:w-[45%] md:w-[48%] group flex flex-col bg-slate-900 border border-slate-800 hover:border-slate-600 transition-colors h-full"
            >
              <div className="aspect-video bg-slate-800 relative overflow-hidden">
                <SafeImage 
                  src={rel.featured_image || 'https://via.placeholder.com/400x225'} 
                  alt={rel.title} 
                  fill
                  sizes="(max-width: 768px) 70vw, 45vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <span className="text-[10px] font-bold text-red-500 mb-2">{catName || 'UMUM'}</span>
                <h3 className="text-sm md:text-base font-black italic text-slate-100 group-hover:text-yellow-400 transition-colors leading-snug line-clamp-3">
                  {rel.title}
                </h3>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
