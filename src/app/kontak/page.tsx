import React from 'react';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import type { Metadata } from 'next';
import { Mail, MapPin, Phone, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Kontak Kami | SkorAkhir',
  description: 'Hubungi redaksi SkorAkhir untuk kerjasama, kirim rilis, atau pertanyaan.',
};

export default function Kontak() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-950">
        <div className="flex flex-col lg:flex-row min-h-[calc(100vh-80px)]">
          
          {/* LEFT PANEL - HQ INFO */}
          <div className="lg:w-1/2 bg-slate-900 border-r border-slate-800 p-8 md:p-16 flex flex-col justify-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2"></div>
            
            <div className="relative z-10 max-w-lg mx-auto lg:mx-0 w-full">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-slate-950 border border-slate-800 rounded-full mb-8">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest">Connect</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter text-white uppercase mb-4">
                Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-500">Talk</span>
              </h1>
              <p className="text-slate-400 font-medium mb-12 text-lg">
                Punya pertanyaan, ide kolaborasi, atau ingin mengirimkan rilis berita? Pintu markas SkorAkhir selalu terbuka.
              </p>

              <div className="space-y-8">
                <div className="flex items-start gap-6 group">
                  <div className="w-12 h-12 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center shrink-0 group-hover:border-orange-500 transition-colors">
                    <MapPin className="w-5 h-5 text-slate-500 group-hover:text-orange-500 transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Kantor Redaksi (HQ)</h3>
                    <p className="text-white font-medium text-lg">
                      PT Studio Satu Akun<br />
                      Gedung Cyber 1, Lantai 5<br />
                      Jakarta Selatan 12710
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="w-12 h-12 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center shrink-0 group-hover:border-yellow-400 transition-colors">
                    <Mail className="w-5 h-5 text-slate-500 group-hover:text-yellow-400 transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Email Resmi</h3>
                    <p className="text-white font-medium text-lg">redaksi@skorakhir.com</p>
                    <p className="text-slate-400 text-sm mt-1">Untuk rilis berita dan liputan</p>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="w-12 h-12 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center shrink-0 group-hover:border-orange-500 transition-colors">
                    <Phone className="w-5 h-5 text-slate-500 group-hover:text-orange-500 transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">WhatsApp Redaksi</h3>
                    <p className="text-white font-medium text-lg">+62 812-3456-7890</p>
                    <p className="text-slate-400 text-sm mt-1">Pesan teks saja, Senin-Jumat</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL - FORM */}
          <div className="lg:w-1/2 p-8 md:p-16 flex flex-col justify-center bg-slate-950 relative">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow-500/5 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
            
            <div className="max-w-md mx-auto lg:mx-0 w-full relative z-10">
              <h2 className="text-2xl font-black italic tracking-tight text-white uppercase mb-8">Kirim Pesan Langsung</h2>
              
              <form className="space-y-8">
                <div className="relative group">
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full bg-transparent border-b-2 border-slate-800 py-3 text-white focus:outline-none focus:border-yellow-400 transition-colors peer placeholder-transparent" 
                    placeholder="Nama Lengkap" 
                  />
                  <label 
                    htmlFor="name" 
                    className="absolute left-0 -top-5 text-xs font-bold text-slate-500 uppercase tracking-widest transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-3 peer-focus:-top-5 peer-focus:text-xs peer-focus:text-yellow-400"
                  >
                    Nama Lengkap
                  </label>
                </div>

                <div className="relative group">
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full bg-transparent border-b-2 border-slate-800 py-3 text-white focus:outline-none focus:border-yellow-400 transition-colors peer placeholder-transparent" 
                    placeholder="Email" 
                  />
                  <label 
                    htmlFor="email" 
                    className="absolute left-0 -top-5 text-xs font-bold text-slate-500 uppercase tracking-widest transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-3 peer-focus:-top-5 peer-focus:text-xs peer-focus:text-yellow-400"
                  >
                    Alamat Email
                  </label>
                </div>

                <div className="relative group pt-4">
                  <textarea 
                    id="message" 
                    rows={4} 
                    className="w-full bg-slate-900 border-2 border-slate-800 rounded-xl p-4 text-white focus:outline-none focus:border-yellow-400 transition-colors resize-none placeholder-slate-500" 
                    placeholder="Tulis pesan Anda di sini..."
                  ></textarea>
                </div>

                <button 
                  type="button" 
                  className="w-full bg-white text-slate-950 font-black uppercase tracking-widest py-4 rounded-xl hover:bg-yellow-400 transition-colors flex items-center justify-center gap-2 group"
                >
                  Kirim Sekarang
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
