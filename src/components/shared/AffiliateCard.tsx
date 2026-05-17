import React from 'react';
import { ShoppingCart, ExternalLink, Star, Tag } from 'lucide-react';
import SafeImage from './SafeImage';

interface AffiliateCardProps {
  productName: string;
  price: string;
  originalPrice?: string;
  imageUrl: string;
  affiliateUrl: string;
  platform: 'Shopee' | 'Tokopedia' | 'Tiktok' | 'Website';
  rating?: number;
  discountBadge?: string;
}

export default function AffiliateCard({
  productName,
  price,
  originalPrice,
  imageUrl,
  affiliateUrl,
  platform,
  rating = 5.0,
  discountBadge
}: AffiliateCardProps) {
  
  // Platform colors
  const platformConfig = {
    Shopee: { bg: 'bg-[#EE4D2D]', text: 'text-white' },
    Tokopedia: { bg: 'bg-[#00AA5B]', text: 'text-white' },
    Tiktok: { bg: 'bg-black', text: 'text-white' },
    Website: { bg: 'bg-orange-500', text: 'text-slate-900' }
  };

  const { bg, text } = platformConfig[platform] || platformConfig.Website;

  return (
    <div className="flex flex-col sm:flex-row bg-slate-900 border border-slate-800 rounded-xl overflow-hidden my-6 hover:border-orange-500/50 transition-all duration-300 group shadow-lg">
      {/* Product Image */}
      <div className="relative w-full sm:w-48 aspect-square sm:aspect-auto sm:h-auto bg-slate-950 shrink-0 p-4 flex items-center justify-center">
        {discountBadge && (
          <div className="absolute top-2 left-2 z-10 bg-orange-500 text-slate-950 text-[10px] font-black px-2 py-1 uppercase tracking-wider rounded">
            {discountBadge}
          </div>
        )}
        <div className="relative w-full h-full group-hover:scale-105 transition-transform duration-500">
          <SafeImage
            src={imageUrl}
            alt={productName}
            fill
            className="object-contain drop-shadow-xl"
          />
        </div>
      </div>

      {/* Product Details */}
      <div className="flex flex-col flex-1 p-5 md:p-6 justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="flex text-orange-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(rating) ? 'fill-current' : ''}`} />
              ))}
            </div>
            <span className="text-xs text-slate-400 font-bold">{rating}</span>
          </div>
          
          <h3 className="text-white font-bold text-lg leading-tight mb-3 group-hover:text-orange-400 transition-colors">
            {productName}
          </h3>
          
          <div className="flex items-end gap-3 mb-4">
            <span className="text-xl font-black italic text-orange-500">
              {price}
            </span>
            {originalPrice && (
              <span className="text-sm font-medium text-slate-500 line-through mb-0.5">
                {originalPrice}
              </span>
            )}
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-auto pt-4 border-t border-slate-800/50">
          <a
            href={affiliateUrl}
            target="_blank"
            rel="nofollow sponsored"
            className={`w-full flex items-center justify-center gap-2 ${bg} ${text} font-bold text-sm py-3 px-4 rounded-lg hover:opacity-90 active:scale-[0.98] transition-all shadow-md`}
          >
            <ShoppingCart className="w-4 h-4" />
            Cek Harga di {platform}
            <ExternalLink className="w-3.5 h-3.5 ml-1 opacity-70" />
          </a>
        </div>
      </div>
    </div>
  );
}
