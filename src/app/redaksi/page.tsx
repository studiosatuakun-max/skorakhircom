import React from 'react';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Susunan Redaksi | SkorAkhir',
  description: 'Susunan redaksi dan manajemen SkorAkhir.',
};

export default function Redaksi() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-950 pb-20 pt-10">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 md:p-12 shadow-xl">
            <h1 className="text-3xl md:text-5xl font-black italic tracking-tighter text-white uppercase mb-8 border-b border-slate-800 pb-4">
              Susunan Redaksi
            </h1>
            
            <div className="space-y-10 text-slate-300">
              
              <section>
                <h2 className="text-xl font-bold text-orange-500 uppercase tracking-widest mb-4">Manajemen & Redaksi</h2>
                <div className="space-y-3 text-lg">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 border-b border-slate-800/50 pb-3">
                    <span className="text-slate-400">Pemimpin Umum / Redaksi</span>
                    <strong className="md:col-span-2 text-white">Fadil Akbar</strong>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 border-b border-slate-800/50 pb-3">
                    <span className="text-slate-400">Redaktur Pelaksana</span>
                    <strong className="md:col-span-2 text-white">Deel</strong>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 border-b border-slate-800/50 pb-3">
                    <span className="text-slate-400">Editor Senior</span>
                    <strong className="md:col-span-2 text-white">Lulu Arsyi</strong>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 border-b border-slate-800/50 pb-3">
                    <span className="text-slate-400">Jurnalis Olahraga</span>
                    <span className="md:col-span-2 text-white font-medium">Budi Santoso, Rio Pratama, Andi Nugroho</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 border-b border-slate-800/50 pb-3">
                    <span className="text-slate-400">Fotografer / Visual</span>
                    <span className="md:col-span-2 text-white font-medium">Dimas Aditya</span>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold text-orange-500 uppercase tracking-widest mb-4">IT & Operasional</h2>
                <div className="space-y-3 text-lg">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 border-b border-slate-800/50 pb-3">
                    <span className="text-slate-400">IT & Web Development</span>
                    <strong className="md:col-span-2 text-white">StudioSatuAkun Tech Team</strong>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 border-b border-slate-800/50 pb-3">
                    <span className="text-slate-400">Digital Marketing & SEO</span>
                    <strong className="md:col-span-2 text-white">Fadil Akbar</strong>
                  </div>
                </div>
              </section>

              <div className="mt-12 p-6 bg-orange-950/20 border border-orange-500/20 rounded-xl text-sm leading-relaxed text-slate-400">
                <p>Wartawan <strong>SkorAkhir.com</strong> dilengkapi dengan identitas (Kartu Pers) dan namanya tercantum dalam Boks Redaksi ini.</p>
                <p className="mt-2">Wartawan <strong>SkorAkhir.com</strong> dilarang meminta dan/atau menerima uang atau barang apa pun dari narasumber terkait dengan tugas jurnalistiknya.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
