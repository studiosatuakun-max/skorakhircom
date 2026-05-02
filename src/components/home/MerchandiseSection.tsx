import { ShoppingBag, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import SafeImage from '@/components/shared/SafeImage';

const products = [
  { id: 1, name: 'The Orenz Classic Varsity Jacket', price: 'Rp 599.000', category: 'JACKET', image: '/images/merchandise/jacket.png' },
  { id: 2, name: 'Essential Oversized Tee - Black', price: 'Rp 199.000', category: 'T-SHIRT', image: '/images/merchandise/tee.png' },
  { id: 3, name: 'Sportive Snapback Cap', price: 'Rp 149.000', category: 'ACCESSORIES', image: '/images/merchandise/cap.png' },
  { id: 4, name: 'The Orenz Track Pants', price: 'Rp 349.000', category: 'PANTS', image: '/images/merchandise/pants.png' }
];

export default function MerchandiseSection() {
  return (
    <section className="bg-slate-900 text-white mt-16 py-16 clip-path-slant relative overflow-hidden" aria-labelledby="merchandise">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3 border-l-4 border-orange-500 pl-3">
            <h2 id="merchandise" className="text-3xl font-black italic uppercase tracking-tight">
              The Orenz <span className="text-orange-500">x</span> SkorAkhir
            </h2>
            <ShoppingBag className="w-6 h-6 text-orange-500" />
          </div>
          <Link href="/merchandise" className="hidden sm:flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-orange-500 transition-colors uppercase tracking-widest group">
            Lihat Katalog <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <article key={product.id} className="group cursor-pointer relative bg-slate-800 flex flex-col overflow-hidden border border-slate-700 hover:border-orange-500 transition-all duration-300">
              <div className="relative aspect-[4/5] overflow-hidden bg-slate-950">
                {/* Sale / New Badge */}
                {product.id === 1 && (
                  <div className="absolute top-3 left-3 z-20 bg-orange-500 text-slate-900 text-[10px] font-black px-2 py-1 uppercase tracking-widest shadow-md">
                    Best Seller
                  </div>
                )}
                
                <SafeImage 
                  src={product.image} 
                  alt={product.name} 
                  fill
                  className="object-cover group-hover:scale-105 group-hover:opacity-80 transition-all duration-500" 
                />
                
                {/* Overlay Action */}
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center">
                  <span className="bg-white text-slate-900 text-xs font-black uppercase px-6 py-3 tracking-widest hover:bg-orange-500 transition-colors active:scale-95">
                    Beli Sekarang
                  </span>
                </div>
              </div>

              <div className="p-5 flex flex-col flex-1 justify-between bg-slate-900 z-20">
                <div>
                  <span className="text-orange-500 text-[10px] font-black uppercase tracking-widest mb-2 block">
                    {product.category}
                  </span>
                  <h3 className="text-sm font-bold leading-tight group-hover:text-orange-500 transition-colors mb-4 line-clamp-2">
                    {product.name}
                  </h3>
                </div>
                <span className="text-xl font-black italic text-white block">
                  {product.price}
                </span>
              </div>
            </article>
          ))}
        </div>
        
        <div className="mt-8 flex justify-center sm:hidden">
           <Link href="/merchandise" className="flex items-center gap-2 text-xs font-black bg-slate-800 text-white px-6 py-3 uppercase tracking-widest hover:bg-orange-500 hover:text-slate-900 transition-colors active:scale-95">
             Lihat Semua Koleksi <ArrowRight className="w-4 h-4" />
           </Link>
        </div>
      </div>
    </section>
  );
}
