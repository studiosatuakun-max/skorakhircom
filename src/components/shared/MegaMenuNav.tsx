'use client';

import Link from 'next/link';
import SafeImage from '@/components/shared/SafeImage';
import { ChevronDown } from 'lucide-react';

export type MegaMenuCategoryPosts = {
  [key: string]: { title: string; image: string; slug: string }[];
};

const categories = [
  { name: '⚽ Liga Inggris', slug: '/kategori/liga-inggris' },
  { name: '🏆 Liga Champions', slug: '/kategori/liga-champions' },
  { name: '🏎️ MotoGP', slug: '/kategori/moto-gp' },
  { name: '🏸 Bulutangkis', slug: '/kategori/bulutangkis' },
];

export default function MegaMenuNav({ categoryPosts }: { categoryPosts: MegaMenuCategoryPosts }) {
  return (
    <nav className="hidden md:flex gap-6 font-bold text-sm tracking-wide h-full items-center">
      {categories.map((cat) => (
        <div key={cat.slug} className="group h-full flex items-center">
          <Link 
            href={cat.slug} 
            className="flex items-center gap-1 text-slate-300 hover:text-orange-500 transition-colors py-4"
          >
            {cat.name} <ChevronDown className="w-3 h-3 group-hover:rotate-180 transition-transform duration-300" />
          </Link>

          {/* Mega Menu Dropdown */}
          <div className="absolute top-[64px] left-0 w-full bg-slate-900/95 backdrop-blur-xl border-b border-slate-800 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-[-10px] group-hover:translate-y-0 z-50 shadow-2xl">
            <div className="container mx-auto px-4 py-8">
              <div className="flex justify-between items-center border-b border-slate-800 pb-4 mb-6">
                <h3 className="text-xl font-black italic text-white uppercase tracking-wider">Terkini di {cat.name}</h3>
                <Link href={cat.slug} className="text-orange-500 hover:text-orange-400 text-xs font-bold uppercase tracking-widest flex items-center gap-1">
                  Lihat Semua Berita &rarr;
                </Link>
              </div>
              
              <div className="grid grid-cols-4 gap-6">
                {/* 3 Articles */}
                {(categoryPosts[cat.slug] || []).slice(0, 3).map((news, idx) => (
                  <Link href={`/berita/${news.slug}`} key={idx} className="group/card block">
                    <div className="relative aspect-video rounded-lg overflow-hidden bg-slate-800 mb-3 border border-slate-800 group-hover/card:border-orange-500 transition-colors">
                      <SafeImage 
                        src={news.image} 
                        alt={news.title} 
                        fill 
                        className="object-cover group-hover/card:scale-105 transition-transform duration-500 opacity-80 group-hover/card:opacity-100" 
                      />
                    </div>
                    <h4 className="font-bold text-sm text-slate-300 group-hover/card:text-orange-400 transition-colors line-clamp-2 leading-snug">
                      {news.title}
                    </h4>
                  </Link>
                ))}

                {/* Banner Ad / Highlight */}
                <div className="bg-gradient-to-br from-orange-600 to-yellow-500 rounded-lg p-5 flex flex-col justify-center items-start text-slate-950 h-full">
                  <span className="text-[10px] font-black uppercase tracking-widest bg-slate-950 text-white px-2 py-1 rounded mb-2">HOT DEAL</span>
                  <h4 className="font-black italic text-xl leading-tight mb-2">Diskon Alat Olahraga 50%</h4>
                  <p className="text-xs font-bold opacity-80 mb-4">Eksklusif pembaca SkorAkhir</p>
                  <Link href="#" className="bg-slate-950 text-white text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full hover:bg-slate-800 transition-colors mt-auto">
                    Klaim Sekarang
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </nav>
  );
}
