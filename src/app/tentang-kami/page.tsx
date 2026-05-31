import React from 'react';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import type { Metadata } from 'next';
import { Target, Zap, Trophy, Flame } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Tentang Kami | SkorAkhir',
  description: 'Informasi tentang SkorAkhir, portal berita olahraga terkini dan terpercaya.',
};

export default function TentangKami() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-950 pb-20 overflow-hidden">
        
        {/* HERO SECTION */}
        <section className="relative w-full min-h-[50vh] flex items-center border-b border-slate-800">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-orange-950/20"></div>
            <div className="absolute inset-0 opacity-10 mix-blend-overlay bg-[url('/images/pattern.svg')]"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-500/10 rounded-full blur-[100px]"></div>
          </div>
          <div className="container relative z-10 mx-auto px-4 pt-16">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-slate-900 border border-slate-800 rounded-full mb-6">
                <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span>
                <span className="text-[10px] font-bold text-yellow-400 uppercase tracking-widest">Company Profile</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter text-white uppercase leading-[0.9] mb-6">
                Lebih Dari Sekadar<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                  Angka Di Papan Skor
                </span>
              </h1>
              <p className="text-lg md:text-xl text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
                Portal berita olahraga independen yang didirikan untuk menyajikan sudut pandang berbeda, tajam, dan mendalam tentang drama di balik setiap pertandingan.
              </p>
            </div>
          </div>
        </section>

        {/* BENTO GRID SECTION */}
        <section className="container mx-auto px-4 -mt-10 relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            
            {/* Main Visi */}
            <div className="md:col-span-2 bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 rounded-full blur-[60px] group-hover:bg-orange-500/10 transition-colors"></div>
              <Target className="w-10 h-10 text-yellow-400 mb-6" />
              <h2 className="text-2xl md:text-3xl font-black italic tracking-tight text-white uppercase mb-4">Visi Kami</h2>
              <p className="text-lg text-slate-300 leading-relaxed font-medium">
                Menjadi episentrum informasi olahraga nomor satu di Indonesia yang mendefinisikan ulang cara penggemar menikmati berita. Kami menolak *clickbait* murahan dan berfokus pada jurnalisme yang kredibel, lugas, dan independen.
              </p>
            </div>

            {/* Misi 1 */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl flex flex-col justify-center group hover:border-yellow-500/30 transition-colors">
              <Zap className="w-8 h-8 text-orange-500 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-black italic tracking-tight text-white uppercase mb-2">Aktual & Tajam</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                Berita terkini dengan kedalaman analisis taktikal yang tidak Anda temukan di portal biasa.
              </p>
            </div>

            {/* Misi 2 */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl flex flex-col justify-center group hover:border-yellow-500/30 transition-colors">
              <Trophy className="w-8 h-8 text-yellow-500 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-black italic tracking-tight text-white uppercase mb-2">Fokus Prestasi</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                Mengawal ketat kiprah Garuda dan atlet nasional di kancah dunia tanpa kompromi.
              </p>
            </div>

            {/* Misi 3 */}
            <div className="md:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl flex items-center justify-between group">
              <div>
                <Flame className="w-8 h-8 text-orange-500 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-black italic tracking-tight text-white uppercase mb-2">Passion & Emosi</h3>
                <p className="text-slate-400 leading-relaxed max-w-md">
                  Lahir dari semangat merayakan keringat di lapangan. Bersama SkorAkhir, setiap pertandingan punya cerita.
                </p>
              </div>
              <div className="hidden md:flex opacity-10">
                <span className="text-[120px] font-black italic text-slate-500 leading-none">SKOR</span>
              </div>
            </div>

          </div>
        </section>
        
      </main>
      <Footer />
    </>
  );
}
