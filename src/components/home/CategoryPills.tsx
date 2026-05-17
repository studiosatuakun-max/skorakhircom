import Link from 'next/link';

export default function CategoryPills() {
  const categories = [
    { name: '🔥 Terbaru', slug: '/', isSpecial: true },
    { name: '⚽ Sepak Bola', slug: '/kategori/sepak-bola' },
    { name: '🏸 Bulu Tangkis', slug: '/kategori/bulutangkis' },
    { name: '🏐 Bola Voli', slug: '/kategori/bola-volly' },
    { name: '🏍️ MotoGP', slug: '/kategori/moto-gp' },
    { name: '🎮 E-Sports', slug: '/kategori/e-sport' },
    { name: '🏎️ F1', slug: '/kategori/f1' },
    { name: '🏀 Basket', slug: '/kategori/basket' },
  ];

  return (
    <div className="relative w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md z-30 mb-8 sticky top-[60px] md:top-[72px]">
      <div className="flex overflow-x-auto hide-scrollbar items-center gap-2 py-3 px-4 sm:px-0">
        {categories.map((cat, idx) => (
          <Link
            key={idx}
            href={cat.slug}
            className={`whitespace-nowrap shrink-0 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider transition-all border ${
              cat.isSpecial
                ? 'bg-orange-500 text-slate-950 border-orange-500 hover:bg-orange-400'
                : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-orange-500 hover:text-white'
            }`}
          >
            {cat.name}
          </Link>
        ))}
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  );
}
