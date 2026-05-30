'use client';

import React, { useState } from 'react';
import SafeImage from '@/components/shared/SafeImage';
import { ShoppingCart, Smartphone, Activity, Car, Sparkles } from 'lucide-react';
import { AffiliateProduct } from '@/lib/affiliateProducts';

interface Props {
  initialSportsProducts: AffiliateProduct[];
}

export default function NicheDemoSelector({ initialSportsProducts }: Props) {
  const [activeNiche, setActiveNiche] = useState('olahraga');

  // Hardcoded dummy data for other niches
  const mockTechProducts: AffiliateProduct[] = [
    { name: 'iPhone 15 Pro Max 256GB Titanium', price: 'Rp 22.999.000', imageUrl: '/images/placeholder.png', affiliateUrl: '#', platform: 'Tokopedia', rating: 5, discountBadge: 'Terlaris' },
    { name: 'MacBook Air M2 2022 8/256GB', price: 'Rp 16.499.000', imageUrl: '/images/placeholder.png', affiliateUrl: '#', platform: 'Shopee', rating: 4.9, discountBadge: 'Flash Sale' },
    { name: 'Sony WH-1000XM5 Wireless Noise Cancelling', price: 'Rp 5.299.000', imageUrl: '/images/placeholder.png', affiliateUrl: '#', platform: 'Tokopedia', rating: 4.8, discountBadge: 'Diskon 15%' },
    { name: 'Logitech MX Master 3S Mouse Wireless', price: 'Rp 1.450.000', imageUrl: '/images/placeholder.png', affiliateUrl: '#', platform: 'Shopee', rating: 4.9, discountBadge: 'Official' }
  ];

  const mockBeautyProducts: AffiliateProduct[] = [
    { name: 'Skintific 5X Ceramide Barrier Moisture Gel', price: 'Rp 129.000', imageUrl: '/images/placeholder.png', affiliateUrl: '#', platform: 'Shopee', rating: 4.9, discountBadge: 'Best Seller' },
    { name: 'Somethinc Niacinamide + Moisture Sabi Beet', price: 'Rp 115.000', imageUrl: '/images/placeholder.png', affiliateUrl: '#', platform: 'Tokopedia', rating: 4.8, discountBadge: 'Promo' },
    { name: 'Wardah UV Shield Essential Sunscreen Gel SPF 30', price: 'Rp 35.000', imageUrl: '/images/placeholder.png', affiliateUrl: '#', platform: 'Shopee', rating: 4.7, discountBadge: 'Diskon 20%' },
    { name: 'Make Over Powerstay Matte Powder Foundation', price: 'Rp 165.000', imageUrl: '/images/placeholder.png', affiliateUrl: '#', platform: 'Tokopedia', rating: 4.9, discountBadge: 'Terlaris' }
  ];

  const mockAutoProducts: AffiliateProduct[] = [
    { name: 'Motul 5100 10W40 1L Oli Motor', price: 'Rp 115.000', imageUrl: '/images/placeholder.png', affiliateUrl: '#', platform: 'Tokopedia', rating: 4.9, discountBadge: 'Official' },
    { name: 'Helm KYT TT Course Solid Black', price: 'Rp 1.250.000', imageUrl: '/images/placeholder.png', affiliateUrl: '#', platform: 'Shopee', rating: 4.8, discountBadge: 'Free Ongkir' },
    { name: 'Michelin Pilot Street 90/80-14 Ban Motor', price: 'Rp 350.000', imageUrl: '/images/placeholder.png', affiliateUrl: '#', platform: 'Tokopedia', rating: 4.7, discountBadge: 'Terlaris' },
    { name: 'Otomotif Toolkit Set 40 Pcs Wrench Socket', price: 'Rp 199.000', imageUrl: '/images/placeholder.png', affiliateUrl: '#', platform: 'Shopee', rating: 4.8, discountBadge: 'Promo' }
  ];

  const niches = [
    { id: 'olahraga', label: 'Olahraga', icon: <Activity className="w-5 h-5" />, products: initialSportsProducts },
    { id: 'tekno', label: 'Tekno & Gadget', icon: <Smartphone className="w-5 h-5" />, products: mockTechProducts },
    { id: 'kecantikan', label: 'Beauty & Lifestyle', icon: <Sparkles className="w-5 h-5" />, products: mockBeautyProducts },
    { id: 'otomotif', label: 'Otomotif', icon: <Car className="w-5 h-5" />, products: mockAutoProducts },
  ];

  const currentProducts = niches.find(n => n.id === activeNiche)?.products || initialSportsProducts;

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-12">
        <div className="w-full">
          <span className="text-orange-500 font-black text-xs uppercase tracking-widest mb-2 block">
            Apapun Niche Anda
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-6">
            Pilih <span className="text-orange-500">Niche</span> Anda
          </h2>
          
          {/* Niche Tabs */}
          <div className="flex flex-wrap gap-3">
            {niches.map((niche) => (
              <button
                key={niche.id}
                onClick={() => setActiveNiche(niche.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm uppercase tracking-wider transition-all duration-300 ${
                  activeNiche === niche.id 
                    ? 'bg-orange-500 text-slate-900 shadow-[0_0_20px_-5px_rgba(249,115,22,0.5)] scale-105' 
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white border border-slate-700'
                }`}
              >
                {niche.icon}
                {niche.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {currentProducts && currentProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 animate-in fade-in duration-500" key={activeNiche}>
          {currentProducts.map((product, idx) => (
            <div key={idx} className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden group flex flex-col hover:border-orange-500/50 transition-colors relative">
              <div className="relative aspect-square bg-slate-900 w-full overflow-hidden flex items-center justify-center p-4">
                <SafeImage 
                  src={product.imageUrl} 
                  alt={product.name} 
                  fill={false}
                  width={200}
                  height={200}
                  className={`object-contain opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ${activeNiche !== 'olahraga' ? 'grayscale opacity-50 blend-luminosity' : ''}`} 
                />
                <div className="absolute top-2 right-2 bg-slate-950/80 backdrop-blur text-[10px] font-black uppercase text-orange-500 px-2 py-1 rounded shadow-lg border border-slate-800">
                  {product.discountBadge || 'Promo'}
                </div>
              </div>
              <div className="p-4 flex flex-col flex-1 border-t border-slate-800">
                <h3 className="text-white font-bold text-sm md:text-base leading-tight mb-2 line-clamp-2 flex-1 group-hover:text-orange-500 transition-colors">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-orange-400 font-black text-sm">{product.price}</span>
                  <span className="bg-slate-800 text-slate-300 text-[9px] font-bold px-2 py-1 uppercase rounded border border-slate-700">
                    {product.platform}
                  </span>
                </div>
                <a 
                  href={product.affiliateUrl}
                  onClick={(e) => {
                    if (activeNiche !== 'olahraga') {
                      e.preventDefault();
                      alert('Ini hanya demo niche. Di web Anda nanti, link ini akan diarahkan ke produk affiliate sungguhan!');
                    }
                  }}
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
      
      <p className="text-center text-slate-500 text-sm mt-8 font-medium">
        *Data di atas akan berjalan otomatis ditarik dari database affiliate pilihan Anda.
      </p>
    </div>
  );
}
