import React from 'react';
import parse, { Element, HTMLReactParserOptions, domToReact } from 'html-react-parser';
import AffiliateSlider from './AffiliateSlider';

interface ContentRendererProps {
  htmlContent: string;
}

const getText = (node: any): string => {
  if (node.type === 'text') return node.data || '';
  if (node.children) return node.children.map(getText).join('');
  return '';
};

// Database Affiliate Khusus Padel
const padelAffiliates: any[] = [
  {
    name: 'Ianoni Camewin Full Carbon Padel Beginner',
    price: 'Rp 254.309',
    originalPrice: 'Rp 450.000',
    imageUrl: '/images/affiliate/ianoni.png',
    affiliateUrl: '/out/ianoni-beginner',
    platform: 'Shopee',
    rating: 4.8,
    discountBadge: 'Best for Beginner'
  },
  {
    name: 'Nox Padel X-One 3K Carbon Promo All Levels',
    price: 'Rp 1.235.000',
    originalPrice: 'Rp 1.500.000',
    imageUrl: '/images/affiliate/nox.png',
    affiliateUrl: '/out/nox-x-one',
    platform: 'Shopee',
    rating: 4.9,
    discountBadge: 'All-Rounder'
  },
  {
    name: 'Adidas Cross It Carbon 2026 Advanced Racket',
    price: 'Rp 4.500.000',
    imageUrl: '/images/affiliate/adidas.png',
    affiliateUrl: '/out/adidas-cross-it',
    platform: 'Shopee',
    rating: 5.0,
    discountBadge: 'Pro Choice'
  },
  {
    name: 'Babolat Overgrip Padel Tenis Comfort',
    price: 'Rp 28.900',
    imageUrl: '/images/affiliate/babolat.png',
    affiliateUrl: '/out/babolat-overgrip',
    platform: 'Shopee',
    rating: 4.9,
    discountBadge: 'Cegah Cedera'
  },
  {
    name: 'SVRG Grip Raket Padel - Boning Grip Anti Slip',
    price: 'Rp 74.000',
    originalPrice: 'Rp 100.000',
    imageUrl: '/images/affiliate/svrg.png',
    affiliateUrl: '/out/svrg-grip',
    platform: 'Shopee',
    rating: 4.9,
    discountBadge: 'Aksesoris Wajib'
  }
];

export default function ContentRenderer({ htmlContent }: ContentRendererProps) {
  let hasInjectedSlider = false;

  const options: HTMLReactParserOptions = {
    replace: (domNode: any) => {
      // Intercept paragraph
      if (domNode instanceof Element && domNode.name === 'p') {
        const textContent = getText(domNode);
        
        // Kita cari marker utama: "👉 Cek Spek"
        if (textContent.includes('👉 Cek Spek') && !hasInjectedSlider) {
          hasInjectedSlider = true;
          
          // Ganti baris "👉 Cek Spek..." tersebut dengan satu Slider utuh yang berisi semua produk
          return (
            <AffiliateSlider 
              title="Rekomendasi Gear Padel Pilihan" 
              products={padelAffiliates} 
            />
          );
        }
      }
    }
  };

  return (
    <div className="prose prose-invert prose-lg max-w-none prose-headings:font-black prose-headings:italic prose-a:text-orange-500 prose-blockquote:border-orange-500 prose-blockquote:bg-slate-900 prose-blockquote:p-4 prose-blockquote:not-italic">
      {parse(htmlContent, options)}
      
      {/* Fallback: Jika artikel tidak memiliki kata "👉 Cek Spek", slider otomatis muncul di paling bawah artikel */}
      {!hasInjectedSlider && htmlContent.includes('padel') && (
        <AffiliateSlider 
          title="Rekomendasi Gear Padel Pilihan" 
          products={padelAffiliates} 
        />
      )}
    </div>
  );
}
