export interface AffiliateProduct {
  name: string;
  price: string;
  originalPrice?: string;
  imageUrl: string;
  affiliateUrl: string;
  platform: 'Shopee' | 'Tokopedia' | 'Tiktok' | 'Website';
  rating: number;
  discountBadge?: string;
  imageUrls?: string[];
}

// Database Affiliate Khusus Padel
export const padelAffiliates: AffiliateProduct[] = [
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

// Database Affiliate Sidebar "Pilihan Editor"
export const editorsDeals: AffiliateProduct[] = [
  {
    name: 'Sepatu Futsal Ortuseight Forte',
    price: 'Rp 450.000',
    originalPrice: 'Rp 550.000',
    imageUrl: '/images/affiliate/ianoni.png', 
    affiliateUrl: '/out/ortuseight-forte',
    platform: 'Shopee',
    rating: 4.9,
    discountBadge: 'Diskon 20%'
  },
  {
    name: 'Raket Tenis Wilson Pro Staff',
    price: 'Rp 2.100.000',
    imageUrl: '/images/affiliate/adidas.png',
    affiliateUrl: '/out/wilson-pro-staff',
    platform: 'Tokopedia',
    rating: 5.0,
    discountBadge: 'Terlaris'
  },
  {
    name: 'Jersey Timnas Indonesia Authentic',
    price: 'Rp 799.000',
    imageUrl: '/images/affiliate/nox.png',
    affiliateUrl: '/out/jersey-timnas',
    platform: 'Shopee',
    rating: 4.8,
    discountBadge: 'Official'
  }
];

import { supabase } from './supabase';

// Fungsi untuk menarik data affiliate berdasarkan kategori/konteks
export async function getAffiliateByContext(categorySlug: string): Promise<AffiliateProduct[]> {
  try {
    // Coba ambil dari database Supabase
    const { data, error } = await supabase
      .from('affiliate_products')
      .select('*')
      .eq('category_slug', categorySlug)
      .order('created_at', { ascending: false });

    // Jika berhasil dan ada datanya, gunakan format dari DB
    if (!error && data && data.length > 0) {
      return data.map((item: any) => {
        const urls = item.image_url ? item.image_url.split(',').map((u: string) => u.trim()) : ['/images/placeholder.png'];
        return {
          name: item.name,
          price: item.price,
          originalPrice: item.original_price,
          imageUrl: urls[0],
          imageUrls: urls,
          affiliateUrl: item.affiliate_url,
          platform: item.platform,
          rating: item.rating,
          discountBadge: item.discount_badge,
        };
      });
    }
    
    // Jika data tidak ditemukan untuk kategori tersebut, coba ambil yang "umum"
    const { data: generalData, error: generalError } = await supabase
      .from('affiliate_products')
      .select('*')
      .eq('category_slug', 'umum')
      .order('created_at', { ascending: false });

    if (!generalError && generalData && generalData.length > 0) {
       return generalData.map((item: any) => {
         const urls = item.image_url ? item.image_url.split(',').map((u: string) => u.trim()) : ['/images/placeholder.png'];
         return {
          name: item.name,
          price: item.price,
          originalPrice: item.original_price,
          imageUrl: urls[0],
          imageUrls: urls,
          affiliateUrl: item.affiliate_url,
          platform: item.platform,
          rating: item.rating,
          discountBadge: item.discount_badge,
        };
      });
    }
  } catch (err) {
    console.error("Gagal mengambil data affiliate dari Supabase:", err);
  }

  // FALLBACK ke Static Data jika Database belum siap/kosong
  if (categorySlug === 'padel') {
    return padelAffiliates;
  }
  return editorsDeals;
}
