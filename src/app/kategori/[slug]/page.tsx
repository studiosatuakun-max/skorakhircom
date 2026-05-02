import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const categoryName = slug.split('-').join(' ');

  return (
    <main className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-lg">
        <span className="bg-orange-500 text-slate-900 font-black px-4 py-1.5 text-xs uppercase tracking-widest mb-6 inline-block">
          Kategori
        </span>
        <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter text-white uppercase mb-6 capitalize">
          {categoryName}
        </h1>
        <p className="text-slate-400 font-bold mb-8">
          Halaman arsip berita untuk kategori {categoryName} sedang dalam tahap pengembangan. Segera hadir dengan liputan eksklusif!
        </p>
        <Link href="/" className="inline-flex items-center gap-2 bg-slate-800 text-white font-black text-xs uppercase tracking-widest px-6 py-3 hover:bg-orange-500 hover:text-slate-900 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Kembali ke Beranda
        </Link>
      </div>
    </main>
  );
}
