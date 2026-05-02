import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function GarudaPridePage() {
  return (
    <main className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-lg">
        <span className="bg-yellow-400 text-slate-900 font-black px-4 py-1.5 text-xs uppercase tracking-widest mb-6 inline-block">
          Tim Nasional
        </span>
        <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter text-white uppercase mb-6">
          Garuda Pride
        </h1>
        <p className="text-slate-400 font-bold mb-8">
          Halaman khusus yang didedikasikan untuk mengawal perjuangan Tim Nasional Indonesia di kancah dunia sedang diracik.
        </p>
        <Link href="/" className="inline-flex items-center gap-2 bg-slate-800 text-white font-black text-xs uppercase tracking-widest px-6 py-3 hover:bg-yellow-400 hover:text-slate-900 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Kembali ke Beranda
        </Link>
      </div>
    </main>
  );
}
