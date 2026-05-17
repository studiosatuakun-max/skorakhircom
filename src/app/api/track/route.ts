import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get('url');
  const productName = searchParams.get('product') || 'Unknown Product';
  const platform = searchParams.get('platform') || 'Unknown';

  if (!targetUrl) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Coba catat ke Supabase jika environment variables tersedia
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (supabaseUrl && supabaseKey) {
    try {
      const supabase = createClient(supabaseUrl, supabaseKey);
      
      // Kita jalankan secara asynchronous tanpa await (fire and forget)
      // agar tidak memperlambat proses redirect pembaca ke Shopee
      supabase.from('affiliate_clicks').insert([
        { 
          product_name: productName, 
          target_url: targetUrl,
          platform: platform,
          // created_at otomatis diisi oleh DB
        }
      ]).then(({ error }) => {
        if (error) console.error("Gagal mencatat klik:", error.message);
      });
    } catch (error) {
      console.error("Supabase Error:", error);
    }
  }

  // Lakukan Redirect 302 (Temporary) agar browser tidak nge-cache redirect ini
  return NextResponse.redirect(targetUrl, 302);
}
