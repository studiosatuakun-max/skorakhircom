import React from 'react';
import { Metadata } from 'next';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import Link from 'next/link';
import { Mail, MapPin, Phone, Building } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Kontak Kami - SkorAkhir',
  description: 'Hubungi tim redaksi dan bisnis SkorAkhir.com. Dikelola oleh PT Studio Satu Akun.',
};

export default function KontakPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-12 pb-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <header className="mb-10 border-b border-slate-800 pb-6">
            <h1 className="text-3xl md:text-5xl font-black italic tracking-tight mb-4 text-white uppercase">
              Hubungi Kami
            </h1>
            <p className="text-slate-400 font-medium">Tim kami siap mendengar kritik, saran, maupun peluang kerjasama.</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-xl flex flex-col gap-6">
              <div>
                <h2 className="text-xl font-black italic text-white uppercase mb-4 flex items-center gap-2">
                  <Building className="w-5 h-5 text-orange-500" />
                  Alamat Redaksi
                </h2>
                <div className="text-slate-300 font-medium flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
                  <p>
                    <strong>PT Studio Satu Akun</strong><br />
                    Gedung Menara Merdeka, Lt. 12<br />
                    Jl. Jend. Sudirman No. Kav. 10-11<br />
                    Jakarta Selatan, DKI Jakarta 12190<br />
                    Indonesia
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-black italic text-white uppercase mb-4 flex items-center gap-2">
                  <Mail className="w-5 h-5 text-orange-500" />
                  Email Terpadu
                </h2>
                <div className="space-y-3">
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-500 font-bold uppercase tracking-widest">Berita & Hak Jawab</span>
                    <a href="mailto:redaksi@skorakhir.com" className="text-orange-500 hover:text-orange-400 font-bold text-lg">redaksi@skorakhir.com</a>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-500 font-bold uppercase tracking-widest">Iklan & Kerjasama</span>
                    <a href="mailto:bisnis@skorakhir.com" className="text-orange-500 hover:text-orange-400 font-bold text-lg">bisnis@skorakhir.com</a>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-black italic text-white uppercase mb-4 flex items-center gap-2">
                  <Phone className="w-5 h-5 text-orange-500" />
                  Telepon
                </h2>
                <div className="text-slate-300 font-medium flex items-start gap-3">
                  <p className="text-lg font-bold">+62 21 555 1234</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl">
              <h2 className="text-xl font-black italic text-white uppercase mb-6">Tinggalkan Pesan</h2>
              <form className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-xs font-bold text-slate-400 uppercase tracking-widest">Nama Lengkap</label>
                  <input type="text" id="name" className="bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors" placeholder="Masukkan nama Anda" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email</label>
                  <input type="email" id="email" className="bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors" placeholder="nama@email.com" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="subject" className="text-xs font-bold text-slate-400 uppercase tracking-widest">Subjek</label>
                  <select id="subject" className="bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors">
                    <option value="redaksi">Kritik & Saran Redaksi / Hak Jawab</option>
                    <option value="kerjasama">Kerjasama Bisnis & Iklan</option>
                    <option value="lainnya">Lainnya</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-xs font-bold text-slate-400 uppercase tracking-widest">Pesan</label>
                  <textarea id="message" rows={4} className="bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors" placeholder="Tuliskan pesan Anda secara detail..."></textarea>
                </div>
                <button type="button" className="mt-2 bg-orange-500 hover:bg-orange-400 text-slate-950 font-black italic uppercase tracking-wider py-4 rounded-lg transition-colors active:scale-95">
                  Kirim Pesan
                </button>
              </form>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-slate-800 flex flex-wrap gap-4 justify-center">
            <Link href="/tentang-kami" className="text-sm font-bold text-slate-400 hover:text-orange-500 transition-colors">Tentang Kami</Link>
            <span className="text-slate-700">•</span>
            <Link href="/redaksi" className="text-sm font-bold text-slate-400 hover:text-orange-500 transition-colors">Susunan Redaksi</Link>
            <span className="text-slate-700">•</span>
            <Link href="/pedoman-media-siber" className="text-sm font-bold text-slate-400 hover:text-orange-500 transition-colors">Pedoman Media Siber</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
