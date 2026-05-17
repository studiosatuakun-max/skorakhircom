'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Eye, Share2 } from 'lucide-react';

interface PostViewerProps {
  slug: string;
}

export default function PostViewer({ slug }: PostViewerProps) {
  const [stats, setStats] = useState({ views: 0, shares: 0 });
  const hasRecordedView = useRef(false);

  useEffect(() => {
    // Hindari double-counting di React Strict Mode
    if (hasRecordedView.current) return;
    hasRecordedView.current = true;

    // Catat +1 View saat komponen di-load
    fetch('/api/stats', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug, action: 'view' }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          setStats(data);
        }
      })
      .catch((err) => console.error('Gagal mencatat view', err));
  }, [slug]);

  // Fungsi yang bisa diekspos ke tombol Share nantinya (atau di-trigger via event)
  useEffect(() => {
    const handleShareEvent = () => {
      setStats((prev) => ({ ...prev, shares: prev.shares + 1 }));
      fetch('/api/stats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, action: 'share' }),
      }).catch(console.error);
    };

    window.addEventListener(`article-shared-${slug}`, handleShareEvent);
    return () => window.removeEventListener(`article-shared-${slug}`, handleShareEvent);
  }, [slug]);

  // Tampilkan skeleton saat loading (opsional) atau biarkan render 0
  // if (stats.views === 0) return null; 

  return (
    <div className="flex items-center gap-4 text-[10px] sm:text-xs font-bold text-slate-400 mt-2">
      <span className="flex items-center gap-1.5" title="Dibaca">
        <Eye className="w-4 h-4 text-orange-500" />
        {stats.views === 0 ? '...' : stats.views.toLocaleString('id-ID')} <span className="hidden sm:inline">Pembaca</span>
      </span>
      <span className="flex items-center gap-1.5" title="Dibagikan">
        <Share2 className="w-4 h-4 text-orange-500" />
        {stats.shares.toLocaleString('id-ID')} <span className="hidden sm:inline">Kali Dibagikan</span>
      </span>
    </div>
  );
}
