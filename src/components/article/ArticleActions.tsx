'use client';

import React from 'react';
import { Share2, BookmarkPlus } from 'lucide-react';

export default function ArticleActions({ title, slug }: { title: string, slug: string }) {
  const handleShare = async () => {
    try {
      const currentUrl = window.location.origin + '/berita/' + slug;
      if (navigator.share) {
        await navigator.share({
          title: `SkorAkhir: ${title}`,
          url: currentUrl,
        });
      } else {
        await navigator.clipboard.writeText(currentUrl);
        alert('Tautan artikel berhasil disalin!');
      }
    } catch (err) {
      console.log('Error sharing:', err);
    }
  };

  const handleBookmark = () => {
    alert('Artikel disimpan ke daftar bacaan! (Fitur segera hadir)');
  };

  return (
    <div className="flex gap-2">
      <button 
        onClick={handleBookmark}
        className="p-2 bg-slate-900 border border-slate-800 hover:border-orange-500 rounded text-slate-400 hover:text-orange-500 transition-all active:scale-95" 
        aria-label="Simpan Artikel"
      >
        <BookmarkPlus className="w-5 h-5" />
      </button>
      <button 
        onClick={handleShare}
        className="p-2 bg-slate-900 border border-slate-800 hover:border-orange-500 rounded text-slate-400 hover:text-orange-500 transition-all active:scale-95" 
        aria-label="Bagikan Artikel"
      >
        <Share2 className="w-5 h-5" />
      </button>
    </div>
  );
}
