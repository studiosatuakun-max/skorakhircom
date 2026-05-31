import React from 'react';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kontak Kami | SkorAkhir',
  description: 'Hubungi redaksi SkorAkhir untuk kerjasama, kirim rilis, atau pertanyaan.',
};

export default function Kontak() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-950 pb-20 pt-10">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 md:p-12 shadow-xl">
            <h1 className="text-3xl md:text-5xl font-black italic tracking-tighter text-white uppercase mb-8 border-b border-slate-800 pb-4">
              Kontak Kami
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-slate-300">
              
              <div className="space-y-8">
                <section>
                  <h2 className="text-xl font-bold text-orange-500 uppercase tracking-widest mb-3">Kantor Redaksi</h2>
                  <p className="text-lg leading-relaxed">
                    <strong>PT Studio Satu Akun</strong><br />
                    Gedung Cyber 1, Lantai 5<br />
                    Jl. Kuningan Barat Raya No.8<br />
                    Jakarta Selatan, DKI Jakarta 12710
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-bold text-orange-500 uppercase tracking-widest mb-3">Hubungi Kami</h2>
                  <div className="space-y-2 text-lg">
                    <p>
                      <strong className="text-white block text-sm text-slate-400">Kerjasama & Iklan:</strong>
                      ads@skorakhir.com
                    </p>
                    <p>
                      <strong className="text-white block text-sm text-slate-400">Kirim Rilis & Liputan:</strong>
                      redaksi@skorakhir.com
                    </p>
                    <p>
                      <strong className="text-white block text-sm text-slate-400">WhatsApp Redaksi (Teks Saja):</strong>
                      +62 812-3456-7890
                    </p>
                  </div>
                </section>
              </div>

              <div className="bg-slate-950 border border-slate-800 p-6 rounded-xl">
                <h2 className="text-lg font-bold text-white mb-4">Kirim Pesan</h2>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-400 mb-1">Nama Lengkap</label>
                    <input type="text" id="name" className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500 transition-colors" placeholder="Masukkan nama Anda" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-400 mb-1">Email</label>
                    <input type="email" id="email" className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500 transition-colors" placeholder="email@anda.com" />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-400 mb-1">Pesan</label>
                    <textarea id="message" rows={4} className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500 transition-colors" placeholder="Tulis pesan Anda di sini..."></textarea>
                  </div>
                  <button type="button" className="w-full bg-orange-500 hover:bg-orange-600 text-slate-950 font-black uppercase tracking-widest py-3 rounded-lg transition-colors">
                    Kirim Pesan
                  </button>
                </form>
              </div>

            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
