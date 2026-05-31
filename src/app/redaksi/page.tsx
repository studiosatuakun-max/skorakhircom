import React from 'react';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import type { Metadata } from 'next';
import { User, ShieldAlert, Cpu } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Susunan Redaksi | SkorAkhir',
  description: 'Susunan redaksi dan manajemen SkorAkhir.',
};

export default function Redaksi() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-950 pb-20 overflow-hidden">
        
        {/* HERO SECTION */}
        <section className="relative w-full pt-16 pb-12 border-b border-slate-800">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow-500/10 rounded-full blur-[120px]"></div>
          </div>
          <div className="container relative z-10 mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter text-white uppercase mb-4">
              Susunan <span className="text-orange-500">Redaksi</span>
            </h1>
            <p className="text-slate-400 font-medium max-w-xl mx-auto">
              Tim di balik layar yang memastikan setiap berita sampai ke layar Anda dengan akurat, tajam, dan independen.
            </p>
          </div>
        </section>

        {/* ROSTER SECTION */}
        <section className="container mx-auto px-4 py-12 relative z-20">
          <div className="max-w-5xl mx-auto">
            
            {/* MANAJEMEN & REDAKSI */}
            <h2 className="text-2xl font-black italic tracking-tight text-white uppercase mb-8 flex items-center gap-3">
              <span className="w-8 h-1 bg-yellow-400 block"></span> Tim Redaksi
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              
              {/* BOS REDAKSI (Full Width on MD/LG or prominent) */}
              <div className="lg:col-span-3 bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row items-center gap-6 group hover:border-yellow-500/50 transition-colors relative overflow-hidden">
                <div className="absolute inset-0 bg-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center shrink-0 shadow-inner group-hover:border-yellow-400 transition-colors">
                  <User className="w-10 h-10 sm:w-12 sm:h-12 text-slate-500 group-hover:text-yellow-400 transition-colors" />
                </div>
                <div className="text-center sm:text-left flex-1">
                  <div className="inline-block px-3 py-1 bg-slate-800 rounded-full text-[10px] font-bold text-yellow-400 uppercase tracking-widest mb-2 border border-slate-700">Pemimpin Umum / Redaksi</div>
                  <h3 className="text-2xl sm:text-3xl font-black italic text-white uppercase mb-1">Fadil Akbar</h3>
                  <p className="text-slate-400 text-sm">Mengomandoi arah editorial dan strategi digital SkorAkhir.</p>
                </div>
              </div>

              {/* EDITOR 1 */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col items-center text-center group hover:border-slate-600 transition-colors">
                <div className="w-20 h-20 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center mb-4">
                  <User className="w-8 h-8 text-slate-500" />
                </div>
                <div className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-1">Redaktur Pelaksana</div>
                <h3 className="text-xl font-black italic text-white uppercase">Deel</h3>
              </div>

              {/* EDITOR 2 */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col items-center text-center group hover:border-slate-600 transition-colors">
                <div className="w-20 h-20 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center mb-4">
                  <User className="w-8 h-8 text-slate-500" />
                </div>
                <div className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-1">Editor Senior</div>
                <h3 className="text-xl font-black italic text-white uppercase">Lulu Arsyi</h3>
              </div>

              {/* REPORTER/OTHERS */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col justify-center">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 border-b border-slate-800 pb-2">Jurnalis Olahraga</div>
                <ul className="space-y-2">
                  <li className="text-white font-bold">Budi Santoso</li>
                  <li className="text-white font-bold">Rio Pratama</li>
                  <li className="text-white font-bold">Andi Nugroho</li>
                </ul>
                
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-6 mb-3 border-b border-slate-800 pb-2">Fotografer / Visual</div>
                <p className="text-white font-bold">Dimas Aditya</p>
              </div>

            </div>

            {/* IT & OPERASIONAL */}
            <h2 className="text-2xl font-black italic tracking-tight text-white uppercase mb-8 flex items-center gap-3">
              <span className="w-8 h-1 bg-orange-500 block"></span> IT & Operasional
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center shrink-0">
                  <Cpu className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Web Development</div>
                  <h3 className="text-lg font-bold text-white">StudioSatuAkun Tech</h3>
                </div>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center shrink-0">
                  <User className="w-6 h-6 text-yellow-400" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Digital Marketing & SEO</div>
                  <h3 className="text-lg font-bold text-white">Fadil Akbar</h3>
                </div>
              </div>
            </div>

            {/* WARNING BOX */}
            <div className="bg-gradient-to-r from-red-950/40 to-slate-900 border border-red-500/20 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-center sm:items-start">
              <div className="w-16 h-16 rounded-full bg-red-950/50 border border-red-500/30 flex items-center justify-center shrink-0">
                <ShieldAlert className="w-8 h-8 text-red-500" />
              </div>
              <div>
                <h3 className="text-lg font-black italic text-white uppercase tracking-tight mb-2">Peringatan Integritas</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-2">
                  Wartawan <strong className="text-slate-200">SkorAkhir.com</strong> dilengkapi dengan identitas (Kartu Pers) dan namanya tercantum dalam Boks Redaksi ini.
                </p>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Wartawan <strong className="text-slate-200">SkorAkhir.com</strong> <span className="text-red-400 font-bold">DILARANG KERAS</span> meminta dan/atau menerima uang atau barang apa pun dari narasumber terkait dengan tugas jurnalistiknya.
                </p>
              </div>
            </div>

          </div>
        </section>
        
      </main>
      <Footer />
    </>
  );
}
