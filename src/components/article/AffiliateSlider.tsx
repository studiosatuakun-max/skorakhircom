import React from 'react';
import AffiliateCard from '../shared/AffiliateCard';
import { ShoppingBag } from 'lucide-react';

interface Product {
  name: string;
  price: string;
  originalPrice?: string;
  imageUrl: string;
  affiliateUrl: string;
  platform: 'Shopee' | 'Tokopedia' | 'Tiktok' | 'Website';
  rating: number;
  discountBadge?: string;
}

interface AffiliateSliderProps {
  title?: string;
  products: Product[];
  fullWidthCard?: boolean;
  sidebarMode?: boolean;
}

export default function AffiliateSlider({ title = "Pilihan Editor SkorAkhir", products, fullWidthCard = false, sidebarMode = false }: AffiliateSliderProps) {
  if (!products || products.length === 0) return null;

  return (
    <div className={`${sidebarMode ? 'mt-0' : 'my-10'} not-prose bg-slate-900/50 rounded-xl border border-slate-800 ${sidebarMode ? 'p-3' : 'p-4 md:p-6'} overflow-hidden`}>
      <div className="flex items-center gap-2 mb-6 border-b border-slate-800 pb-3">
        <ShoppingBag className="w-5 h-5 text-orange-500" />
        <h3 className="text-lg md:text-xl font-black italic uppercase text-white tracking-tight">
          {title}
        </h3>
      </div>
      
      {/* Scrollable Container */}
      <div className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {products.map((product, idx) => (
          <div key={idx} className={`snap-start shrink-0 ${fullWidthCard ? 'w-full' : (sidebarMode ? 'w-full' : 'w-[280px] md:w-[320px]')}`}>
            <div className={`h-full flex flex-col ${fullWidthCard && !sidebarMode ? 'sm:flex-row' : ''} bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-orange-500/50 transition-all duration-300 group shadow-lg`}>
              {/* Product Image - Forced aspect ratio for slider */}
              <div className={`relative w-full ${fullWidthCard && !sidebarMode ? 'sm:w-64 sm:aspect-auto' : ''} aspect-square bg-slate-950 p-4 flex items-center justify-center shrink-0`}>
                {product.discountBadge && (
                  <div className="absolute top-2 left-2 z-10 bg-orange-500 text-slate-950 text-[10px] font-black px-2 py-1 uppercase tracking-wider rounded">
                    {product.discountBadge}
                  </div>
                )}
                <div className="relative w-full h-full group-hover:scale-105 transition-transform duration-500">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="object-contain w-full h-full drop-shadow-xl"
                  />
                </div>
              </div>

              {/* Product Details */}
              <div className="flex flex-col flex-1 p-5 justify-between">
                <div>
                  <h4 className="text-white font-bold text-sm leading-snug mb-3 group-hover:text-orange-400 transition-colors line-clamp-2">
                    {product.name}
                  </h4>
                  
                  <div className="flex flex-col gap-1 mb-4">
                    {product.originalPrice && (
                      <span className="text-xs font-medium text-slate-500 line-through">
                        {product.originalPrice}
                      </span>
                    )}
                    <span className="text-lg font-black italic text-orange-500">
                      {product.price}
                    </span>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="mt-auto pt-4 border-t border-slate-800/50">
                  <a
                    href={product.affiliateUrl}
                    target="_blank"
                    rel="nofollow sponsored"
                    className="w-full flex items-center justify-center gap-2 bg-[#EE4D2D] text-white font-bold text-xs py-2.5 px-3 rounded-lg hover:opacity-90 active:scale-[0.98] transition-all shadow-md"
                  >
                    Beli di {product.platform}
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
