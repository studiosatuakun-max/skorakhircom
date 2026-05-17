'use client';

import React from 'react';

interface ArticleWatermarkProps {
  title: string;
  url: string;
  children: React.ReactNode;
}

export default function ArticleWatermark({ title, url, children }: ArticleWatermarkProps) {
  return (
    <div className="relative w-full">
      {/* 1. VISUAL WATERMARK (Subtle / Tipis) */}
      <div 
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden flex items-center justify-center select-none"
        aria-hidden="true"
      >
        <div className="transform -rotate-45 text-6xl md:text-9xl font-black text-white opacity-[0.05] tracking-tighter whitespace-nowrap">
          SKORAKHIR.COM
        </div>
      </div>

      {/* 2. ANTI-SCRAPING WATERMARK (Ala Media Mainstream - Di awal konten) */}
      <span 
        className="absolute w-[1px] h-[1px] p-0 -m-[1px] overflow-hidden whitespace-nowrap border-0 text-[0px] opacity-0"
        style={{ clip: 'rect(0, 0, 0, 0)' }}
      >
        Artikel ini telah tayang di SkorAkhir.com dengan judul &quot;{title}&quot;
      </span>

      {/* CONTENT UTAMA ARTIKEL */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Anti-Scraping Footer (Di akhir konten) */}
      <span 
        className="absolute w-[1px] h-[1px] p-0 -m-[1px] overflow-hidden whitespace-nowrap border-0 text-[0px] opacity-0"
        style={{ clip: 'rect(0, 0, 0, 0)' }}
      >
        Baca selengkapnya di: https://skorakhir.com{url}
      </span>
    </div>
  );
}
