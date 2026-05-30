import React from 'react';
import { Metadata } from 'next';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import SafeImage from '@/components/shared/SafeImage';
import { ShoppingCart, MessageCircle, TrendingUp, Zap, Search, ChevronRight } from 'lucide-react';
import { getAffiliateByContext } from '@/lib/affiliateProducts';

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
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black italic tracking-tighter text-white uppercase mb-6 max-w-5xl leading-[1.1] animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
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
              <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter text-white mb-4">
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
                <p className="text-slate-400 text-sm leading-relaxed">Dibangun dengan Next.js 15. JSON-LD Schema Markup, SSR, dan Meta Tags dinamis sudah tertanam. Siap merajai Google News & Discover.</p>
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

        {/* LIVE DEMO - Affiliate Grid */}
        <section id="demo" className="py-24 bg-slate-900 relative">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-end justify-between gap-4 mb-12">
              <div>
                <span className="text-orange-500 font-black text-xs uppercase tracking-widest mb-2 block">
                  Etalase Demo
                </span>
                <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter text-white">
                  Katalog Affiliate
                </h2>
              </div>
              <p className="text-slate-400 text-sm max-w-sm">
                *Ini adalah contoh tampilan integrasi produk affiliate yang ditarik secara dinamis dari database (Supabase).
              </p>
            </div>

            {products && products.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {products.map((product, idx) => (
                  <div key={idx} className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden group flex flex-col hover:border-slate-600 transition-colors relative">
                    <div className="relative aspect-square bg-slate-800 w-full overflow-hidden">
                      <SafeImage 
                        src={product.imageUrl} 
                        alt={product.name} 
                        fill 
                        className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" 
                      />
                      <div className="absolute top-2 right-2 bg-slate-950/80 backdrop-blur text-[10px] font-black uppercase text-orange-500 px-2 py-1 rounded shadow-lg">
                        {product.discountBadge || 'Promo'}
                      </div>
                    </div>
                    <div className="p-4 flex flex-col flex-1">
                      <h3 className="text-white font-bold text-sm md:text-base leading-tight mb-2 line-clamp-2 flex-1 group-hover:text-orange-500 transition-colors">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-2 mb-4">
                        <span className="bg-slate-800 text-slate-300 text-[10px] font-bold px-2 py-1 uppercase rounded-md border border-slate-700">
                          {product.platform}
                        </span>
                      </div>
                      <a 
                        href={product.affiliateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-slate-800 hover:bg-orange-500 text-white hover:text-slate-900 font-black text-xs uppercase tracking-widest py-3 flex items-center justify-center gap-2 transition-colors rounded-lg border border-slate-700 hover:border-orange-500"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Cek Harga
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-slate-950 rounded-xl border border-slate-800 border-dashed">
                <ShoppingCart className="w-12 h-12 text-slate-700 mx-auto mb-4" />
                <h3 className="text-2xl font-black italic text-slate-400">Database Kosong</h3>
                <p className="text-slate-500 mt-2">Katalog produk affiliate sedang dalam pembaruan.</p>
              </div>
            )}
          </div>
        </section>

        {/* GIANT FOOTER CTA */}
        <section className="py-24 bg-orange-500 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10 mix-blend-overlay"></div>
          <div className="container mx-auto px-4 relative z-10 text-center">
            <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-slate-950 mb-6 max-w-4xl mx-auto leading-none">
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
