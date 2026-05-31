import React from 'react';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tentang Kami | SkorAkhir',
  description: 'Informasi tentang SkorAkhir, portal berita olahraga terkini dan terpercaya.',
};

export default function TentangKami() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-950 pb-20 pt-10">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 md:p-12 shadow-xl">
            <h1 className="text-3xl md:text-5xl font-black italic tracking-tighter text-white uppercase mb-8 border-b border-slate-800 pb-4">
              Tentang Kami
            </h1>
            <div className="prose prose-invert prose-orange max-w-none">
              <p className="text-lg leading-relaxed text-slate-300 mb-6">
                <strong>SkorAkhir</strong> hadir sebagai lebih dari sekadar angka di papan skor. Kami adalah portal berita olahraga independen yang didirikan untuk menyajikan sudut pandang berbeda tentang sepak bola, bulutangkis, MotoGP, E-Sports, dan berbagai ajang olahraga lainnya.
              </p>
              <p className="text-lg leading-relaxed text-slate-300 mb-6">
                Lahir dari semangat merayakan setiap keringat dan taktik di lapangan, kami tidak hanya menyajikan hasil akhir, tetapi juga mengupas tuntas drama, analisis mendalam, statistik akurat, dan emosi di balik setiap pertandingan.
              </p>
              <p className="text-lg leading-relaxed text-slate-300 mb-6">
                Kami berkomitmen untuk menjadi teman terbaik bagi para penggemar olahraga di Indonesia, menyajikan jurnalisme yang kredibel, lugas, tajam, dan independen.
              </p>
              <p className="text-lg leading-relaxed text-slate-300">
                Bersama SkorAkhir, setiap pertandingan punya cerita.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
