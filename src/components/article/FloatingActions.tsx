'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUp, Home } from 'lucide-react';
import Link from 'next/link';

export default function FloatingActions() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className={`fixed bottom-6 right-6 flex flex-col gap-3 z-50 transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
      <Link 
        href="/"
        className="w-12 h-12 bg-slate-900 border border-slate-700 hover:border-orange-500 text-slate-300 hover:text-orange-500 rounded-full flex items-center justify-center shadow-lg transition-colors"
        aria-label="Kembali ke Beranda"
      >
        <Home className="w-5 h-5" />
      </Link>
      <button 
        onClick={scrollToTop}
        className="w-12 h-12 bg-orange-500 text-slate-950 hover:bg-orange-400 rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-95"
        aria-label="Kembali ke Atas"
      >
        <ArrowUp className="w-6 h-6" />
      </button>
    </div>
  );
}
