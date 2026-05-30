import Link from 'next/link';
import Image from 'next/image';
import MegaMenuNav from './MegaMenuNav';
import { fetchWP } from '@/lib/wp-graphql';

async function getMegaMenuData() {
  const query = `
    query GetMegaMenuPosts {
      sepakBola: posts(first: 3, where: {categoryName: "Sepak Bola"}) {
        nodes { title, slug, featuredImage { node { sourceUrl } } }
      }
      bulutangkis: posts(first: 3, where: {categoryName: "Bulutangkis"}) {
        nodes { title, slug, featuredImage { node { sourceUrl } } }
      }
      motoGp: posts(first: 3, where: {categoryName: "Moto GP"}) {
        nodes { title, slug, featuredImage { node { sourceUrl } } }
      }
      eSport: posts(first: 3, where: {categoryName: "E-Sport"}) {
        nodes { title, slug, featuredImage { node { sourceUrl } } }
      }
    }
  `;
  try {
    const data = await fetchWP(query);
    const mapNodes = (nodes: any[]) => nodes.map(n => ({
      title: n.title,
      slug: n.slug,
      image: n.featuredImage?.node?.sourceUrl || '/images/placeholder.png'
    }));

    return {
      '/kategori/sepak-bola': mapNodes(data?.sepakBola?.nodes || []),
      '/kategori/bulutangkis': mapNodes(data?.bulutangkis?.nodes || []),
      '/kategori/moto-gp': mapNodes(data?.motoGp?.nodes || []),
      '/kategori/e-sport': mapNodes(data?.eSport?.nodes || []),
    };
  } catch (error) {
    console.error("Failed to fetch mega menu data", error);
    return {
      '/kategori/sepak-bola': [],
      '/kategori/bulutangkis': [],
      '/kategori/moto-gp': [],
      '/kategori/e-sport': [],
    };
  }
}

export default async function Header() {
  const categoryPosts = await getMegaMenuData();

  return (
    <header className="sticky top-0 z-50 bg-slate-950 border-b border-slate-800">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between text-white">
        <Link href="/" className="flex items-center z-10">
          <Image 
            src="/images/logo.svg" 
            alt="SkorAkhir.com" 
            width={180} 
            height={40} 
            className="h-8 w-auto" 
            priority
          />
        </Link>
        <Link href="/affiliate" className="bg-orange-500 text-slate-900 font-black px-4 py-2 text-xs uppercase tracking-widest hover:bg-white transition-colors transform hover:scale-105 shadow-lg shadow-orange-500/20">
          SkorAkhir Picks
        </Link>

        <MegaMenuNav categoryPosts={categoryPosts} />

        <button className="md:hidden p-2 text-current active:scale-95 transition-all" aria-label="Menu">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
        </button>
      </div>
    </header>
  );
}
