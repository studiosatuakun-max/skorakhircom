import React from 'react';
import parse, { Element, HTMLReactParserOptions, domToReact } from 'html-react-parser';
import AffiliateSlider from './AffiliateSlider';
import AffiliateCard from '../shared/AffiliateCard';
import { padelAffiliates, editorsDeals } from '@/lib/affiliateProducts';

interface ContentRendererProps {
  htmlContent: string;
}

const getText = (node: any): string => {
  if (node.type === 'text') return node.data || '';
  if (node.children) return node.children.map(getText).join('');
  return '';
};

export default function ContentRenderer({ htmlContent }: ContentRendererProps) {
  let hasInjectedSlider = false;

  // Auto-inject affiliate jika artikel tidak memiliki shortcode [AFFILIATE]
  if (!htmlContent.includes('[AFFILIATE') && editorsDeals && editorsDeals.length > 0) {
    const randomProduct = editorsDeals[Math.floor(Math.random() * editorsDeals.length)];
    const badgeStr = randomProduct.discountBadge ? ` badge="${randomProduct.discountBadge}"` : '';
    const autoShortcode = `\n\n<p>[AFFILIATE name="${randomProduct.name}" price="${randomProduct.price}" url="${randomProduct.affiliateUrl}" image="${randomProduct.imageUrl}" platform="${randomProduct.platform}"${badgeStr}]</p>`;
    htmlContent += autoShortcode;
  }

  // Menerima tanda kutip biasa ("), smart quotes (” atau “), dan double prime (″)
  const sliderRegex = /(?:<p>)?\s*\[SLIDER\s+title=["“”″]([^"“”″]+)["“”″]\]\s*(?:<\/p>)?([\s\S]*?)(?:<p>)?\s*\[\/SLIDER\]\s*(?:<\/p>)?/gi;
  
  let processedHTML = htmlContent.replace(sliderRegex, (match, title, innerContent) => {
    const products: any[] = [];
    const productRegex = /\[PRODUCT\s+([^\]]+)\]/g;
    let prodMatch;
    
    // Parse setiap [PRODUCT ...] di dalam blok
    while ((prodMatch = productRegex.exec(innerContent)) !== null) {
        const attrString = prodMatch[1];
        const attrs: Record<string, string> = {};
        const attrRegex = /(\w+)=["“”″]([^"“”″]*)["“”″]/g;
        let aMatch;
        while ((aMatch = attrRegex.exec(attrString)) !== null) {
             attrs[aMatch[1]] = aMatch[2];
        }
        
        products.push({
            name: attrs.name || "Produk Pilihan",
            price: attrs.price || "Cek Harga",
            originalPrice: attrs.originalPrice,
            imageUrl: attrs.image || "/images/placeholder.png",
            affiliateUrl: attrs.url || "#",
            platform: attrs.platform || "Shopee",
            rating: parseFloat(attrs.rating) || 4.9,
            discountBadge: attrs.badge
        });
    }

    // Kita sembunyikan data JSON ke dalam atribut HTML custom agar aman dibaca parser
    const productsJSON = encodeURIComponent(JSON.stringify(products));
    return `<div data-affiliate-slider="true" data-title="${title}" data-products="${productsJSON}"></div>`;
  });

  const options: HTMLReactParserOptions = {
    replace: (domNode: any) => {
      // 1. CEK CUSTOM ELEMENT SLIDER (Dari hasil Preprocessing di atas)
      if (domNode instanceof Element && domNode.name === 'div' && domNode.attribs['data-affiliate-slider'] === 'true') {
         const title = domNode.attribs['data-title'];
         const products = JSON.parse(decodeURIComponent(domNode.attribs['data-products']));
         
         return <AffiliateSlider title={title} products={products} />;
      }

      // 2. INTERCEPT PARAGRAF UNTUK SHORTCODE SINGLE ATAU PADEL
      if (domNode instanceof Element && (domNode.name === 'p' || domNode.name === 'h1' || domNode.name === 'h2' || domNode.name === 'h3')) {
        const textContent = getText(domNode);
        
        // --- DYNAMIC SHORTCODE PARSER SINGLE ---
        // Format: [AFFILIATE name="Nama Produk" price="Rp 100.000" url="https://..." image="/img.png" platform="Shopee" badge="Promo"]
        const shortcodeRegex = /\[AFFILIATE\s+([^\]]+)\]/;
        const shortcodeMatch = textContent.match(shortcodeRegex);
        
        if (shortcodeMatch) {
          const attrString = shortcodeMatch[1];
          const attrs: Record<string, string> = {};
          // Menyesuaikan regex untuk menerima smart quotes (” atau “) dan double prime (″) dari WordPress
          const attrRegex = /(\w+)=["“”″]([^"“”″]*)["“”″]/g;
          let match;
          
          while ((match = attrRegex.exec(attrString)) !== null) {
             attrs[match[1]] = match[2];
          }
          
          return (
            <div className="not-prose my-8 block w-full max-w-3xl mx-auto">
              <AffiliateCard
                productName={attrs.name || "Produk Rekomendasi"}
                price={attrs.price || "Cek Harga"}
                originalPrice={attrs.originalPrice}
                imageUrl={attrs.image || "/images/placeholder.png"}
                affiliateUrl={attrs.url || "#"}
                platform={(attrs.platform as any) || "Shopee"}
                rating={parseFloat(attrs.rating) || 4.9}
                discountBadge={attrs.badge}
              />
            </div>
          );
        }

        // --- LOGIKA PADEL SLIDER (Khusus Artikel Padel Sebelumnya) ---
        if (textContent.includes('👉 Cek Spek') && !hasInjectedSlider) {
          hasInjectedSlider = true;
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
    <div className="prose prose-invert prose-lg max-w-none 
      prose-p:leading-relaxed prose-p:text-slate-300
      prose-headings:font-black prose-headings:italic prose-headings:text-white prose-headings:tracking-tight
      prose-h2:mt-12 prose-h2:mb-6
      prose-a:text-orange-500 prose-a:no-underline hover:prose-a:underline
      prose-blockquote:border-l-4 prose-blockquote:border-orange-500 prose-blockquote:bg-slate-900 prose-blockquote:py-3 prose-blockquote:px-5 prose-blockquote:not-italic prose-blockquote:font-bold prose-blockquote:text-slate-100
      prose-li:marker:text-orange-500 prose-ul:my-6 prose-li:my-2
      prose-strong:text-white prose-strong:font-black">
      {parse(processedHTML, options)}
      
      {/* Fallback: Jika artikel padel tidak memiliki kata "👉 Cek Spek", slider otomatis muncul di paling bawah artikel */}
      {!hasInjectedSlider && processedHTML.includes('padel') && !processedHTML.includes('data-affiliate-slider') && (
        <AffiliateSlider 
          title="Rekomendasi Gear Padel Pilihan" 
          products={padelAffiliates} 
        />
      )}
    </div>
  );
}
