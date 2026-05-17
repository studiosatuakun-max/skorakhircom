'use client';

import { useState } from 'react';
import { Eye, X } from 'lucide-react';
import Link from 'next/link';
import SafeImage from '@/components/shared/SafeImage';

interface QuickReadProps {
  article: {
    title: string;
    slug: string;
    excerpt: string;
    featured_image: string;
    category?: string;
  };
}

export default function QuickReadModal({ article }: QuickReadProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        onClick={(e) => { e.preventDefault(); setIsOpen(true); }}
        className="absolute top-2 right-2 bg-slate-900/80 hover:bg-orange-500 text-white p-2 rounded-full backdrop-blur-md transition-colors z-20 shadow-lg group-hover:opacity-100 opacity-0 sm:opacity-100"
        aria-label="Quick Read"
        title="Quick Read"
      >
        <Eye className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" onClick={(e) => { e.preventDefault(); setIsOpen(false); }}>
          <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"></div>
          
          <div 
            className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 z-30 bg-slate-950/50 hover:bg-slate-800 text-white p-2 rounded-full backdrop-blur-md transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative w-full aspect-video bg-slate-950 shrink-0">
              <SafeImage src={article.featured_image || '/images/placeholder.png'} alt={article.title} fill className="object-cover opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent"></div>
              <div className="absolute bottom-4 left-6">
                <span className="bg-yellow-400 text-slate-900 text-[10px] font-black uppercase px-2 py-1 tracking-wider">
                  {article.category || 'SPORT'}
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-8 overflow-y-auto hide-scrollbar flex-1 flex flex-col">
              <h2 className="text-2xl sm:text-3xl font-black italic text-white mb-4 leading-tight">{article.title}</h2>
              
              <div className="prose prose-invert prose-sm max-w-none text-slate-300 font-medium leading-relaxed mb-8">
                <p>{article.excerpt}</p>
                <p className="text-slate-500 italic mt-2">Menampilkan ringkasan otomatis...</p>
              </div>

              <div className="mt-auto pt-4 border-t border-slate-800">
                <Link 
                  href={`/berita/${article.slug}`}
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center justify-center gap-2 bg-orange-500 text-slate-950 font-black italic uppercase tracking-wider py-4 rounded-xl hover:bg-orange-400 active:scale-[0.98] transition-all shadow-lg"
                >
                  Baca Selengkapnya
                </Link>
              </div>
            </div>
          </div>
          <style>{`
            .hide-scrollbar::-webkit-scrollbar {
              display: none;
            }
          `}</style>
        </div>
      )}
    </>
  );
}
