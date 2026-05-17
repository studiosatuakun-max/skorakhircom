import React from 'react';
import { Metadata } from 'next';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Tentang Kami - SkorAkhir',
  description: 'Visi, misi, dan identitas SkorAkhir.com sebagai portal berita olahraga modern di Indonesia.',
};

export default function TentangKamiPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-12 pb-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <header className="mb-10 border-b border-slate-800 pb-6">
            <h1 className="text-3xl md:text-5xl font-black italic tracking-tight mb-4 text-white uppercase">
              Tentang Kami
            </h1>
          </header>

          <div className="prose prose-invert max-w-none prose-p:text-slate-300 prose-p:leading-relaxed prose-headings:text-white prose-headings:font-black prose-headings:italic">
            <p className="text-xl font-medium text-slate-200 mb-8 border-l-4 border-orange-500 pl-6 py-2 bg-slate-900/30">
              SkorAkhir.com hadir untuk memuaskan kehausan para penggemar olahraga di Indonesia akan informasi yang <strong>cepat, akurat, dan tidak bising.</strong>
            </p>

            <h2 className="uppercase">Visi Kami</h2>
            <p>
              Di era di mana banyak portal berita dijejali oleh iklan *pop-up* yang mengganggu dan *clickbait* berlebihan, SkorAkhir mengambil jalan berbeda. Visi kami adalah menjadi portal berita olahraga berkonsep <em>"Quiet Luxury"</em>—di mana estetika desain yang elegan berpadu dengan ketajaman jurnalistik. Kami menyajikan berita, analisis, dan tren terbaru seputar olahraga tanpa merusak pengalaman membaca Anda.
            </p>

            <h2 className="uppercase">Fokus Liputan</h2>
            <p>
              SkorAkhir memiliki komitmen kuat untuk memberitakan cabang olahraga yang paling dicintai oleh masyarakat Indonesia, meliputi:
            </p>
            <ul>
              <li><strong>Sepak Bola:</strong> Mulai dari Liga 1, kiprah Timnas Indonesia, hingga liga-liga top Eropa.</li>
              <li><strong>Motorsport:</strong> Kabar terpanas dari sirkuit MotoGP dan Formula 1.</li>
              <li><strong>Bulu Tangkis:</strong> Mengawal langkah para atlet kebanggaan Tanah Air di turnamen BWF.</li>
              <li><strong>Bola Voli & Basket:</strong> Update kompetisi Proliga, IBL, hingga kancah internasional.</li>
              <li><strong>E-Sports:</strong> Menjangkau generasi *gamer* dengan liputan turnamen kompetitif.</li>
            </ul>

            <h2 className="uppercase">Badan Hukum</h2>
            <p>
              SkorAkhir.com adalah media independen yang berdiri di bawah naungan <strong>PT Studio Satu Akun</strong>. Seluruh proses jurnalistik dan manajerial diawasi secara profesional demi menyajikan konten berkualitas dan dapat dipertanggungjawabkan kepada publik.
            </p>

            <div className="mt-16 pt-8 border-t border-slate-800 flex flex-wrap gap-4 justify-center not-prose">
              <Link href="/redaksi" className="text-sm font-bold text-slate-400 hover:text-orange-500 transition-colors">Susunan Redaksi</Link>
              <span className="text-slate-700">•</span>
              <Link href="/pedoman-media-siber" className="text-sm font-bold text-slate-400 hover:text-orange-500 transition-colors">Pedoman Media Siber</Link>
              <span className="text-slate-700">•</span>
              <Link href="/kontak" className="text-sm font-bold text-slate-400 hover:text-orange-500 transition-colors">Kontak Kami</Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
