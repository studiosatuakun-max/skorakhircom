import Link from 'next/link';
import SafeImage from '@/components/shared/SafeImage';
import { ArrowRight } from 'lucide-react';
import { AffiliateProduct } from '@/lib/affiliateProducts';

export default function EditorialShowcase({ products }: { products: AffiliateProduct[] }) {
  if (!products || products.length === 0) return null;
  
  // Ambil maksimal 2 produk terbaik
  const topPicks = products.slice(0, 2);

  return (
    <section className="flex flex-col gap-6" aria-labelledby="editorial-showcase">
      <div className="flex items-center justify-between border-b-2 border-white/20 pb-2">
        <h2 id="editorial-showcase" className="text-2xl sm:text-3xl font-black italic tracking-tight uppercase text-white">
          Gear Spotlight
        </h2>
        <span className="text-sm font-bold text-slate-400 uppercase tracking-widest hidden sm:block">
          Rekomendasi Spesial
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {topPicks.map((product, idx) => (
          <div key={idx} className="group relative rounded-xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-orange-500 transition-colors flex flex-col h-full shadow-lg">
            {/* Image Box */}
            <div className="relative w-full aspect-[4/3] bg-slate-950/50 p-6 flex items-center justify-center overflow-hidden">
              {product.discountBadge && (
                <div className="absolute top-4 left-4 z-20 bg-red-600 text-white text-[10px] font-black px-3 py-1 uppercase tracking-wider shadow-md">
                  {product.discountBadge}
                </div>
              )}
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative w-full h-full transform group-hover:scale-110 transition-transform duration-700 ease-out z-10 drop-shadow-2xl">
                <SafeImage 
                  src={product.imageUrl} 
                  alt={product.name} 
                  fill
                  className="object-contain" 
                />
              </div>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-1 border-t border-slate-800/50 bg-gradient-to-b from-transparent to-slate-950/80">
              <span className="text-orange-500 text-[10px] font-black tracking-widest uppercase mb-2">
                Pilihan {product.platform}
              </span>
              <h3 className="text-lg font-black text-white leading-snug mb-3 line-clamp-2 group-hover:text-yellow-400 transition-colors">
                {product.name}
              </h3>
              
              <div className="mt-auto pt-4 flex items-center justify-between">
                <div className="flex flex-col">
                  {product.originalPrice && (
                    <span className="text-xs text-slate-500 line-through font-bold">
                      {product.originalPrice}
                    </span>
                  )}
                  <span className="text-xl font-black text-white">
                    {product.price}
                  </span>
                </div>
                
                {/* Tracker Link */}
                <Link 
                  href={`/api/track?url=${encodeURIComponent(product.affiliateUrl)}&platform=${product.platform.toLowerCase()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-orange-500 hover:bg-yellow-400 text-slate-950 w-12 h-12 flex items-center justify-center rounded-full transition-all active:scale-95 group-hover:-rotate-12 group-hover:shadow-[0_0_15px_rgba(249,115,22,0.5)]"
                >
                  <ArrowRight className="w-5 h-5 font-black" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
