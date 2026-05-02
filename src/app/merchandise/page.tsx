import React from 'react';
import Link from 'next/link';
import { ShoppingBag, ArrowRight, Tag, Info } from 'lucide-react';
import SafeImage from '@/components/shared/SafeImage';

export const metadata = {
  title: 'Katalog Merchandise | The Orenz by SkorAkhir',
  description: 'Koleksi eksklusif The Orenz. Tampil gaya dengan apparel dan merchandise resmi kami.',
};

const products = [
  {
    id: 1,
    name: 'The Orenz Classic Varsity Jacket',
    category: 'Apparel',
    price: 'Rp 599.000',
    image: '/images/merchandise/jacket.png',
    badge: 'Best Seller',
    link: '#'
  },
  {
    id: 2,
    name: 'Essential Oversized Tee - Black',
    category: 'Apparel',
    price: 'Rp 199.000',
    image: '/images/merchandise/tee.png',
    link: '#'
  },
  {
    id: 3,
    name: 'The Orenz Track Pants Elite',
    category: 'Apparel',
    price: 'Rp 349.000',
    image: '/images/merchandise/pants.png',
    link: '#'
  },
  {
    id: 4,
    name: 'Sportive Snapback Cap',
    category: 'Aksesoris',
    price: 'Rp 149.000',
    image: '/images/merchandise/cap.png',
    badge: 'New Arrival',
    link: '#'
  },
  {
    id: 5,
    name: 'Orenz Matchday Scarf',
    category: 'Aksesoris',
    price: 'Rp 129.000',
    image: '/images/placeholder.png',
    link: '#'
  },
  {
    id: 6,
    name: 'Orenz Daily Backpack',
    category: 'Aksesoris',
    price: 'Rp 450.000',
    image: '/images/placeholder.png',
    link: '#'
  },
  {
    id: 7,
    name: 'Authentic Home Jersey 2026',
    category: 'Jersey',
    price: 'Rp 499.000',
    image: '/images/placeholder.png',
    badge: 'Pre-Order',
    link: '#'
  },
  {
    id: 8,
    name: 'Away Jersey Edisi Spesial',
    category: 'Jersey',
    price: 'Rp 499.000',
    image: '/images/placeholder.png',
    link: '#'
  }
];

export default function MerchandisePage() {
  return (
    <main className="min-h-screen bg-slate-950 pb-20 pt-[60px] md:pt-[80px]">
      {/* Hero Section */}
      <section className="relative w-full h-[350px] md:h-[500px] flex items-center justify-center overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 z-0 bg-slate-900">
           <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-500/20 via-slate-950 to-slate-950"></div>
           <SafeImage src="/images/merchandise/jacket.png" alt="Orenz Background" fill className="object-cover opacity-[0.03] scale-110 grayscale mix-blend-screen" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto flex flex-col items-center">
          <span className="bg-orange-500 text-slate-900 font-black px-4 py-1.5 text-[10px] md:text-xs uppercase tracking-[0.2em] mb-6 inline-flex items-center gap-2 shadow-[0_0_20px_rgba(249,115,22,0.4)]">
            <ShoppingBag className="w-3 h-3 md:w-4 md:h-4" /> Official Store
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black italic tracking-tighter text-white uppercase mb-4 md:mb-6">
            The Orenz <span className="text-orange-500">Collection</span>
          </h1>
          <p className="text-slate-400 text-sm md:text-base font-bold uppercase tracking-widest max-w-xl mx-auto leading-relaxed">
            Tampil penuh gaya dengan koleksi eksklusif The Orenz. Material premium, desain authentic untuk pendukung sejati.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 mt-8 md:mt-12">
        {/* Breadcrumb & Promo Banner */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center mb-12">
          <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500">
            <Link href="/" className="hover:text-orange-500 transition-colors">Beranda</Link>
            <span>/</span>
            <span className="text-white">Katalog Produk</span>
          </nav>
          
          <div className="bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 flex items-center gap-3 w-full md:w-auto">
            <Tag className="w-4 h-4 text-orange-500" />
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Diskon Spesial 20% kode: <span className="text-orange-500 font-black">ORENZ20</span>
            </span>
          </div>
        </div>

        {/* Filters and Grid Layout */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-64 shrink-0 flex flex-col gap-6 sticky top-[100px]">
            <div className="bg-slate-900 border border-slate-800 p-6">
              <h3 className="text-sm font-black italic tracking-widest uppercase text-white mb-4 border-b border-slate-800 pb-3">
                Kategori
              </h3>
              <ul className="flex flex-col gap-3">
                {['Semua Produk', 'Apparel', 'Jersey', 'Aksesoris'].map((cat, i) => (
                  <li key={cat}>
                    <button className={`text-xs font-bold tracking-widest uppercase transition-colors ${i === 0 ? 'text-orange-500' : 'text-slate-400 hover:text-white'}`}>
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-orange-500/10 border border-orange-500/20 p-6 flex flex-col items-center text-center">
              <Info className="w-6 h-6 text-orange-500 mb-3" />
              <h4 className="text-xs font-black uppercase tracking-widest text-orange-500 mb-2">Pemesanan via WA</h4>
              <p className="text-[10px] text-slate-300 font-medium leading-relaxed">
                Saat ini seluruh transaksi pembelian merchandise resmi diarahkan ke WhatsApp Admin The Orenz.
              </p>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1 w-full">
            <div className="flex justify-between items-center mb-6">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                Menampilkan <span className="text-white">{products.length}</span> Produk
              </p>
              
              <select className="bg-slate-900 border border-slate-800 text-xs font-bold text-white uppercase tracking-widest px-4 py-2 outline-none focus:border-orange-500">
                <option>Terbaru</option>
                <option>Harga: Rendah - Tinggi</option>
                <option>Harga: Tinggi - Rendah</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
              {products.map((product) => (
                <div key={product.id} className="group flex flex-col bg-slate-900 border border-slate-800 hover:border-orange-500 transition-all duration-300 overflow-hidden relative">
                  {product.badge && (
                    <div className="absolute top-3 left-3 z-20">
                      <span className="bg-orange-500 text-slate-900 font-black text-[9px] px-2 py-1 uppercase tracking-widest shadow-md">
                        {product.badge}
                      </span>
                    </div>
                  )}
                  
                  <div className="relative aspect-[4/5] w-full bg-slate-950 overflow-hidden p-6 flex items-center justify-center">
                    <div className="absolute inset-0 bg-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none"></div>
                    <div className="relative w-full h-full z-0 group-hover:scale-105 transition-transform duration-700">
                      <SafeImage 
                        src={product.image} 
                        alt={product.name}
                        fill
                        className="object-contain drop-shadow-2xl"
                      />
                    </div>
                    {/* Hover Action */}
                    <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20">
                      <button className="w-full bg-orange-500 text-slate-900 font-black text-xs uppercase tracking-widest py-3 flex items-center justify-center gap-2 shadow-xl hover:bg-orange-400 transition-colors active:scale-95">
                        <ShoppingBag className="w-4 h-4" /> Beli Sekarang
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-5 flex flex-col flex-1 border-t border-slate-800 relative z-20 bg-slate-900">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[9px] font-black uppercase text-orange-500 tracking-widest">
                        {product.category}
                      </span>
                    </div>
                    <h3 className="text-white font-bold text-sm md:text-base leading-tight mb-4 group-hover:text-orange-400 transition-colors">
                      {product.name}
                    </h3>
                    <div className="mt-auto">
                      <span className="text-lg md:text-xl font-black italic text-slate-200">
                        {product.price}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Load More */}
            <div className="mt-12 flex justify-center">
              <button className="bg-slate-900 border border-slate-800 hover:border-orange-500 text-white font-black text-xs uppercase tracking-widest px-8 py-3 transition-colors active:scale-95">
                Muat Lebih Banyak
              </button>
            </div>
            
          </div>
        </div>
      </div>
    </main>
  );
}
