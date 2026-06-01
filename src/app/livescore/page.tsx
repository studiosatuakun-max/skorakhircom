import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import LiveScoreBoard from '@/components/livescore/LiveScoreBoard';

export const metadata: Metadata = {
  title: 'Skor Sementara & Livescore Real-time | SkorAkhir',
  description: 'Pantau hasil skor sementara dan livescore pertandingan Sepak Bola dari seluruh dunia. Update skor akhir secara real-time dan akurat.',
};

export default function LivescorePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-950 pb-20 pt-24 md:pt-32">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* SEO Text untuk menargetkan "Skor Sementara" dan "Skor Akhir" */}
            <div className="mb-12">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black italic text-white uppercase tracking-tighter mb-4">
                Pusat <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-500">Livescore</span>
              </h1>
              <p className="text-slate-400 md:text-lg max-w-2xl border-l-4 border-orange-500 pl-4 leading-relaxed">
                Pantau terus <strong>Skor Sementara</strong> dari semua liga top dunia secara *real-time*. Hasil pertandingan otomatis berubah menjadi <strong>Skor Akhir</strong> sesaat setelah peluit panjang dibunyikan.
              </p>
            </div>

            {/* Komponen Papan Skor Utama */}
            <LiveScoreBoard />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
