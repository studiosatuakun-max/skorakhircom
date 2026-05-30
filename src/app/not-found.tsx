import React from 'react';
import Link from 'next/link';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import { Home, Search, AlertCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="min-h-[70vh] bg-slate-950 flex items-center justify-center py-20 px-4">
        <div className="max-w-2xl w-full text-center">
          <div className="w-24 h-24 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-8 border border-slate-800">
            <AlertCircle className="w-12 h-12 text-orange-500" />
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-500 mb-4">
            404
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
            Halaman Tidak Ditemukan
          </h2>
          
          <p className="text-slate-400 text-lg mb-10 max-w-lg mx-auto">
            Ups! Mungkin artikel yang Anda cari sudah dihapus, dipindahkan, atau Anda mengklik tautan versi lama kami.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/"
              className="w-full sm:w-auto bg-orange-500 hover:bg-orange-400 text-slate-900 font-black px-8 py-4 rounded-xl uppercase tracking-widest flex items-center justify-center gap-2 transition-all hover:scale-105"
            >
              <Home className="w-5 h-5" />
              Ke Beranda
            </Link>
            <Link 
              href="/#kategori"
              className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-white font-black px-8 py-4 rounded-xl uppercase tracking-widest flex items-center justify-center gap-2 border border-slate-700 transition-colors"
            >
              <Search className="w-5 h-5" />
              Jelajahi Kategori
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
