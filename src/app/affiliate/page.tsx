import React from 'react';
import { Metadata } from 'next';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import SafeImage from '@/components/shared/SafeImage';
import { ShoppingCart, ExternalLink, MessageCircle } from 'lucide-react';
import { getAffiliateByContext } from '@/lib/affiliateProducts';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'SkorAkhir Picks | Pilihan Perlengkapan Olahraga Terbaik',
  description: 'Kumpulan rekomendasi perlengkapan olahraga pilihan editor SkorAkhir.',
};

export default async function AffiliatePicksPage() {
  const products = await getAffiliateByContext('all');

  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-950 pb-20 pt-10">
        <div className="container mx-auto px-4">
          
          {/* Hero Section */}
          <section className="relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 mb-12 flex items-center justify-center min-h-[300px]">
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-900 to-orange-900/20 z-0"></div>
            
            <div className="relative z-10 text-center px-4 max-w-3xl mx-auto py-12">
              <span className="bg-orange-500 text-slate-900 font-black px-4 py-1 text-xs uppercase tracking-widest inline-block mb-4">
                Pilihan Editor
              </span>
              <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter text-white uppercase mb-4 drop-shadow-lg">
                SkorAkhir <span className="text-orange-500">Picks</span>
              </h1>
              <p className="text-slate-400 font-medium md:text-lg">
                Kurasi perlengkapan olahraga, jersey, dan apparel terbaik pilihan tim redaksi SkorAkhir. 
                Belanja aman langsung melalui Official Store di marketplace kesayangan Anda.
              </p>
            </div>
          </section>

          {/* Grid Products */}
          {products && products.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-16">
              {products.map((product, idx) => (
                <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden group flex flex-col hover:border-slate-600 transition-colors">
                  <div className="relative aspect-square bg-slate-800 w-full overflow-hidden">
                    <SafeImage 
                      src={product.imageUrl} 
                      alt={product.name} 
                      fill 
                      className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" 
                    />
                    <div className="absolute top-2 right-2 bg-slate-950/80 backdrop-blur text-[10px] font-black uppercase text-orange-500 px-2 py-1 rounded">
                      {product.discountBadge || 'Promo'}
                    </div>
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="text-white font-bold text-sm md:text-base leading-tight mb-2 line-clamp-2 flex-1 group-hover:text-orange-500 transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="bg-slate-800 text-slate-300 text-[10px] font-bold px-2 py-1 uppercase rounded-md">
                        {product.platform}
                      </span>
                    </div>
                    <a 
                      href={product.affiliateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-orange-500 hover:bg-orange-400 text-slate-900 font-black text-xs uppercase tracking-widest py-3 flex items-center justify-center gap-2 transition-colors rounded-lg"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Beli Sekarang
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-slate-900 rounded-xl border border-slate-800 mb-16">
              <ShoppingCart className="w-12 h-12 text-slate-700 mx-auto mb-4" />
              <h3 className="text-2xl font-black italic text-slate-400">Belum Ada Produk</h3>
              <p className="text-slate-500 mt-2">Katalog produk sedang dalam pembaruan tim editor.</p>
            </div>
          )}

          {/* B2B Web Dev CTA */}
          <section className="bg-slate-800 border-2 border-slate-700 rounded-2xl p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 mt-8">
            <div className="flex-1">
              <span className="text-orange-500 font-black text-xs uppercase tracking-widest mb-2 block">
                Peluang Bisnis
              </span>
              <h2 className="text-2xl md:text-4xl font-black italic text-white uppercase tracking-tight mb-3">
                Mau Bikin Web Affiliate Sekeren Ini?
              </h2>
              <p className="text-slate-300 text-sm md:text-base">
                Bangun kerajaan pasif income Anda sendiri. Kami siap membantu Anda membuat website portal berita otomatis yang terintegrasi dengan sistem Affiliate pintar seperti <strong>SkorAkhir.com</strong>.
              </p>
            </div>
            <div className="shrink-0 w-full md:w-auto">
              <a 
                href="https://wa.me/6288223703585?text=Halo%20SkorAkhir,%20saya%20tertarik%20bikin%20web%20affiliate%20seperti%20ini." 
                target="_blank"
                rel="noopener noreferrer"
                className="w-full md:w-auto bg-green-500 hover:bg-green-400 text-slate-950 font-black text-sm md:text-base uppercase tracking-widest py-4 px-8 rounded-xl flex items-center justify-center gap-3 transition-colors shadow-lg shadow-green-500/20 hover:scale-105"
              >
                <MessageCircle className="w-5 h-5" />
                Hubungi via WhatsApp
              </a>
            </div>
          </section>

        </div>
      </main>
      <Footer />
    </>
  );
}
