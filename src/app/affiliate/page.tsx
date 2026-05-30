import React from 'react';
import { Metadata } from 'next';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import SafeImage from '@/components/shared/SafeImage';
import { ShoppingCart, MessageCircle, TrendingUp, Zap, Search, ChevronRight } from 'lucide-react';
import { getAffiliateByContext } from '@/lib/affiliateProducts';
import NicheDemoSelector from '@/components/shared/NicheDemoSelector';
import DashboardMockup from '@/components/home/DashboardMockup';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Sistem Web Affiliate Otomatis | SkorAkhir',
  description: 'Miliki website portal berita otomatis dengan integrasi sistem affiliate cerdas. Solusi pasif income untuk para affiliator.',
};

export default async function AffiliateLandingPage() {
  const products = await getAffiliateByContext('all');
  const WA_LINK = "https://wa.me/6288223703585?text=Halo%20SkorAkhir,%20saya%20tertarik%20bikin%20web%20affiliate%20otomatis%20seperti%20ini.";

  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-950 pb-0 pt-0">
        
        {/* HERO SECTION - Landing Page Style */}
        <section className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden border-b border-slate-800">
          {/* Background Image with Parallax effect */}
          <div className="absolute inset-0 z-0">
            <SafeImage 
              src="/images/timnas-garuda.jpg" 
              alt="Stadium Background" 
              fill 
              className="object-cover opacity-20 grayscale"
              priority
            />
            {/* Gradient Overlays for readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/90 to-slate-950"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-orange-900/20 to-transparent"></div>
          </div>

          <div className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center mt-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 border border-orange-500/30 backdrop-blur-sm mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-xs font-bold uppercase tracking-widest text-slate-300">Live Demo System</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-white mb-6 max-w-5xl leading-[1.1] animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
              Mesin Pencetak <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-500">Pasif Income</span> Untuk Affiliator
            </h1>
            
            <p className="text-slate-400 font-medium md:text-xl max-w-2xl mb-10 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
              Tinggalkan cara lama sebar link manual. Miliki portal berita otomatis ber-SEO tinggi yang mendatangkan trafik organik dan mengkonversinya menjadi komisi affiliate 24/7.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center max-w-md animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
              <a 
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-orange-500 hover:bg-orange-400 text-slate-900 font-black text-sm md:text-base uppercase tracking-widest py-4 px-8 rounded-xl flex items-center justify-center gap-3 transition-all hover:scale-105 shadow-[0_0_40px_-10px_rgba(249,115,22,0.6)]"
              >
                <MessageCircle className="w-5 h-5" />
                Konsultasi Gratis
              </a>
              <a 
                href="#demo"
                className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-black text-sm md:text-base uppercase tracking-widest py-4 px-8 rounded-xl flex items-center justify-center gap-3 transition-colors"
              >
                Lihat Demo
              </a>
            </div>
          </div>
        </section>

        {/* WHY CHOOSE THIS SYSTEM - Features */}
        <section className="py-24 bg-slate-950 relative border-b border-slate-900">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4">
                Kenapa Sistem Ini <span className="text-orange-500">Superior?</span>
              </h2>
              <p className="text-slate-400">Website ini (SkorAkhir.com) adalah bukti nyata. Dibangun dengan arsitektur Headless modern yang dirancang khusus untuk mendominasi mesin pencari.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
              <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl hover:border-orange-500/50 transition-colors group">
                <div className="w-14 h-14 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-center text-orange-500 mb-6 group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-black text-white uppercase tracking-tight mb-3">Trafik Autopilot</h3>
                <p className="text-slate-400 text-sm leading-relaxed">Terintegrasi dengan Scraper AI. Web Anda akan otomatis mempublikasikan puluhan artikel unik setiap hari tanpa Anda harus menulis satu kata pun.</p>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl hover:border-orange-500/50 transition-colors group">
                <div className="w-14 h-14 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-center text-orange-500 mb-6 group-hover:scale-110 transition-transform">
                  <Search className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-black text-white uppercase tracking-tight mb-3">SEO Tingkat Dewa</h3>
                <p className="text-slate-400 text-sm leading-relaxed">Struktur website dirancang khusus memenuhi standar ketat mesin pencari. Artikel Anda lebih gampang masuk indeks dan direkomendasikan oleh Google News & Discover.</p>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl hover:border-orange-500/50 transition-colors group">
                <div className="w-14 h-14 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-center text-orange-500 mb-6 group-hover:scale-110 transition-transform">
                  <Zap className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-black text-white uppercase tracking-tight mb-3">Konversi Tinggi</h3>
                <p className="text-slate-400 text-sm leading-relaxed">UI/UX dirancang agresif namun elegan. Etalase produk terintegrasi langsung di dalam artikel (Contextual Affiliate) untuk memancing klik.</p>
              </div>
            </div>
          </div>
        </section>

        {/* LIVE DEMO - Niche Selector */}
        <section id="demo" className="py-24 bg-slate-900 relative border-b border-slate-800">
          <div className="container mx-auto px-4 max-w-7xl">
            <NicheDemoSelector initialSportsProducts={products} />
          </div>
        </section>

        {/* DUMMY DASHBOARD SECTION */}
        <section className="py-24 bg-slate-950 relative">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-orange-500 font-black text-xs uppercase tracking-widest mb-2 block animate-pulse">
                Intip Dapur Rahasia
              </span>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4">
                Panel Kontrol <span className="text-orange-500">Super Mudah</span>
              </h2>
              <p className="text-slate-400">
                Anda tidak perlu pusing memikirkan hal teknis. Anda akan mendapatkan akses ke Dashboard eksklusif untuk memonitor pergerakan robot AI, trafik organik, dan lonjakan komisi Anda secara *Real-Time*.
              </p>
            </div>
            
            <DashboardMockup />
          </div>
        </section>

        {/* GIANT FOOTER CTA */}
        <section className="py-24 bg-orange-500 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10 mix-blend-overlay"></div>
          <div className="container mx-auto px-4 relative z-10 text-center">
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-slate-950 mb-6 max-w-4xl mx-auto leading-none">
              Siap Membangun Kerajaan Affiliate Anda Sendiri?
            </h2>
            <p className="text-slate-900 font-bold md:text-xl max-w-2xl mx-auto mb-10">
              Jangan buang waktu belajar koding dari nol. Kami bangunkan sistem full-autopilot untuk Anda. Slot terbatas tiap bulannya!
            </p>
            <a 
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex bg-slate-950 hover:bg-slate-900 text-white font-black text-lg md:text-xl uppercase tracking-widest py-5 px-10 rounded-2xl items-center justify-center gap-3 transition-transform hover:scale-105 shadow-2xl shadow-slate-950/30"
            >
              <MessageCircle className="w-6 h-6 text-green-400" />
              Chat Admin Sekarang <ChevronRight className="w-6 h-6" />
            </a>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
