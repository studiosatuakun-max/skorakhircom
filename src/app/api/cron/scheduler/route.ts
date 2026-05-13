import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Helper function to call our own scrape API
async function runScraper(keyword: string, baseUrl: string, secret: string) {
  try {
    const url = new URL(`/api/cron/scrape?secret=${secret}&keyword=${encodeURIComponent(keyword)}`, baseUrl);
    const res = await fetch(url.toString());
    const data = await res.json();
    return data;
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get('secret');

    // Cek otorisasi Cron (agar tidak bisa dipanggil sembarang orang)
    if (secret !== process.env.CRON_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 1. Ambil target dari Supabase yang sisa harinya > 0
    const { data: targets, error } = await supabase
      .from('scraper_targets')
      .select('*')
      .gt('days_left', 0);

    if (error) {
      throw new Error(`Database error: ${error.message}`);
    }

    if (!targets || targets.length === 0) {
      return NextResponse.json({ message: 'Tidak ada target aktif hari ini.' });
    }

    // Dapatkan base URL (untuk environment local vs vercel)
    const baseUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL 
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` 
      : 'http://localhost:3000';

    const results = [];

    // 2. Loop setiap target dan jalankan proses Scraping
    for (const target of targets) {
      // Panggil endpoint scraper yang sudah kita buat sebelumnya
      const scrapeResult = await runScraper(target.keyword, baseUrl, secret || '');
      
      results.push({
        keyword: target.keyword,
        success: scrapeResult.success,
        message: scrapeResult.message || scrapeResult.error,
      });

      // 3. Kurangi jatah umur target 1 hari (jika sukses scrape)
      if (scrapeResult.success) {
        await supabase
          .from('scraper_targets')
          .update({ days_left: target.days_left - 1 })
          .eq('id', target.id);
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Jadwal harian selesai diproses',
      results 
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
