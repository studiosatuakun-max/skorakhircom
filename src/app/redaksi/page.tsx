import React from 'react';
import { Metadata } from 'next';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Susunan Redaksi - SkorAkhir',
  description: 'Susunan redaksi dan manajemen portal berita olahraga SkorAkhir.com yang dikelola oleh PT Studio Satu Akun.',
};

export default function RedaksiPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-12 pb-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <header className="mb-10 border-b border-slate-800 pb-6">
            <h1 className="text-3xl md:text-5xl font-black italic tracking-tight mb-4 text-white uppercase">
              Susunan Redaksi
            </h1>
            <p className="text-slate-400 font-medium">Tim di balik pemberitaan olahraga terdepan SkorAkhir.com.</p>
          </header>

          <div className="prose prose-invert max-w-none prose-orange">
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-xl mb-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl -z-10"></div>
              
              <h2 className="text-2xl font-black italic text-white uppercase mb-6 flex items-center gap-2">
                <span className="w-8 h-1 bg-orange-500 inline-block"></span>
                Badan Hukum
              </h2>
              <p className="text-lg text-slate-300 font-medium mb-2">
                SkorAkhir.com diterbitkan dan dikelola secara profesional oleh:
              </p>
              <p className="text-xl font-black text-white">
                PT Studio Satu Akun
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl">
                <h3 className="text-orange-500 font-black text-sm uppercase tracking-widest mb-2">Pemimpin Redaksi / Penanggung Jawab</h3>
                <p className="text-2xl font-black text-white">M Fadil Akbar</p>
              </div>
              
              <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl">
                <h3 className="text-orange-500 font-black text-sm uppercase tracking-widest mb-2">Redaktur Pelaksana</h3>
                <p className="text-2xl font-black text-white">Dimas Pradana</p>
              </div>
            </div>

            <div className="mb-10">
              <h2 className="text-xl font-black italic text-white uppercase mb-6 border-b border-slate-800 pb-2">
                Tim Editorial & Liputan
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 border border-slate-800 rounded-lg bg-slate-900/30">
                  <p className="font-bold text-white text-lg">Riska Amalia</p>
                  <p className="text-xs text-slate-500 uppercase font-black tracking-widest">Jurnalis Sepak Bola</p>
                </div>
                <div className="p-4 border border-slate-800 rounded-lg bg-slate-900/30">
                  <p className="font-bold text-white text-lg">Bima Satria</p>
                  <p className="text-xs text-slate-500 uppercase font-black tracking-widest">Jurnalis Motorsport & E-Sport</p>
                </div>
                <div className="p-4 border border-slate-800 rounded-lg bg-slate-900/30">
                  <p className="font-bold text-white text-lg">Andini Larasati</p>
                  <p className="text-xs text-slate-500 uppercase font-black tracking-widest">Jurnalis Bulutangkis & Basket</p>
                </div>
              </div>
            </div>

            <div className="mb-10">
              <h2 className="text-xl font-black italic text-white uppercase mb-6 border-b border-slate-800 pb-2">
                Teknologi & Pengembangan
              </h2>
              <div className="p-6 border border-slate-800 rounded-xl bg-slate-900/50">
                <p className="font-bold text-white text-lg">Tim IT PT Studio Satu Akun</p>
                <p className="text-sm text-slate-400 mt-2">Bertanggung jawab atas arsitektur web, AI Scraping Infrastructure, dan keamanan sistem SkorAkhir.com.</p>
              </div>
            </div>

            <div className="mt-16 pt-8 border-t border-slate-800 flex flex-wrap gap-4 justify-center">
              <Link href="/tentang-kami" className="text-sm font-bold text-slate-400 hover:text-orange-500 transition-colors">Tentang Kami</Link>
              <span className="text-slate-700">•</span>
              <Link href="/pedoman-media-siber" className="text-sm font-bold text-slate-400 hover:text-orange-500 transition-colors">Pedoman Media Siber</Link>
              <span className="text-slate-700">•</span>
              <Link href="/kontak" className="text-sm font-bold text-slate-400 hover:text-orange-500 transition-colors">Kontak Kami</Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
