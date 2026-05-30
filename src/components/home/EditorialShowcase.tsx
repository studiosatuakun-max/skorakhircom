'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import SafeImage from '@/components/shared/SafeImage';
import { ShoppingCart, ArrowRight } from 'lucide-react';
import { AffiliateProduct } from '@/lib/affiliateProducts';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';

function ProductImageSlider({ product }: { product: AffiliateProduct }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const urls = product.imageUrls && product.imageUrls.length > 0 ? product.imageUrls : [product.imageUrl];

  useEffect(() => {
    if (urls.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % Math.min(urls.length, 3));
    }, 2500);
    return () => clearInterval(interval);
  }, [urls.length]);

  return (
    <>
      {urls.slice(0, 3).map((url, i) => (
        <div 
          key={i} 
          className={`absolute inset-0 transition-opacity duration-500 ease-in-out flex items-center justify-center ${i === currentIndex ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="relative w-[70%] h-[70%] transform group-hover:scale-110 transition-transform duration-700 ease-out z-10 drop-shadow-xl">
            <SafeImage 
              src={url} 
              alt={`${product.name} - slide ${i + 1}`} 
              fill
              className="object-contain" 
            />
          </div>
        </div>
      ))}
      
      {urls.length > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex gap-1">
          {urls.slice(0, 3).map((_, i) => (
            <div key={i} className={`w-1.5 h-1.5 rounded-full transition-colors ${i === currentIndex ? 'bg-orange-500' : 'bg-slate-700/50'}`} />
          ))}
        </div>
      )}
    </>
  );
}

export default function EditorialShowcase({ products }: { products: AffiliateProduct[] }) {
  const [emblaRef] = useEmblaCarousel({ 
    loop: true, 
    align: 'start',
    dragFree: true 
  }, [AutoScroll({ playOnInit: true, speed: 1.5, stopOnInteraction: false, stopOnMouseEnter: true })]);

  if (!products || products.length === 0) return null;

  return (
    <section className="flex flex-col gap-6" aria-labelledby="editorial-showcase">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <h2 id="editorial-showcase" className="text-3xl font-black italic tracking-tighter uppercase text-slate-100 flex items-center gap-3">
            SkorAkhir Picks
          </h2>
          <Link href="/affiliate" className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-orange-500 transition-colors flex items-center gap-1 group">
            Lihat Semua <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      <div className="overflow-hidden w-full relative group/carousel pb-4" ref={emblaRef}>
        <div className="flex touch-pan-y -ml-4">
          {products.map((product, idx) => (
            <div key={idx} className="flex-[0_0_85%] sm:flex-[0_0_45%] md:flex-[0_0_30%] lg:flex-[0_0_22%] min-w-0 pl-4">
              <div className="group relative rounded-xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-orange-500 transition-colors flex flex-col h-full shadow-lg">
                {/* Image Box - Lebih Kecil */}
                <Link 
                  href={`/api/track?url=${encodeURIComponent(product.affiliateUrl)}&platform=${product.platform.toLowerCase()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative w-full aspect-video sm:aspect-square bg-slate-950/50 flex items-center justify-center overflow-hidden block"
                >
                  {product.discountBadge && (
                    <div className="absolute top-2 left-2 z-20 bg-red-600 text-white text-[9px] font-black px-2 py-1 uppercase tracking-wider shadow-md rounded-sm">
                      {product.discountBadge}
                    </div>
                  )}
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
                  
                  {/* Inner Image Slider */}
                  <ProductImageSlider product={product} />
                </Link>

                {/* Content - Lebih Padat */}
                <div className="p-4 flex flex-col flex-1 border-t border-slate-800/50 bg-gradient-to-b from-transparent to-slate-950/80 relative z-20">
                  <span className="text-orange-500 text-[9px] font-black tracking-widest uppercase mb-1">
                    {product.platform}
                  </span>
                  <Link
                    href={`/api/track?url=${encodeURIComponent(product.affiliateUrl)}&platform=${product.platform.toLowerCase()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <h3 className="text-sm font-black text-white leading-tight mb-2 line-clamp-2 group-hover:text-yellow-400 transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  
                  <div className="mt-auto pt-2 flex items-center justify-between">
                    <div className="flex flex-col">
                      {product.originalPrice && (
                        <span className="text-[10px] text-slate-500 line-through font-bold">
                          {product.originalPrice}
                        </span>
                      )}
                      <span className="text-base font-black text-white">
                        {product.price}
                      </span>
                    </div>
                    
                    {/* Tracker Link */}
                    <Link 
                      href={`/api/track?url=${encodeURIComponent(product.affiliateUrl)}&platform=${product.platform.toLowerCase()}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-orange-500 hover:bg-yellow-400 text-slate-950 w-8 h-8 flex items-center justify-center rounded-full transition-all active:scale-95 group-hover:-rotate-12 group-hover:shadow-[0_0_10px_rgba(249,115,22,0.5)]"
                    >
                      <ShoppingCart className="w-3.5 h-3.5 font-black" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
