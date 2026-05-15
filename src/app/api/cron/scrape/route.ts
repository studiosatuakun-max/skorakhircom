import { NextResponse } from 'next/server';
import Parser from 'rss-parser';
import * as cheerio from 'cheerio';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Inisialisasi API
const parser = new Parser();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// Fungsi pembantu untuk fetch dengan User-Agent agar tidak diblokir
async function fetchHTML(url: string) {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    return await res.text();
  } catch (e) {
    return null;
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get('secret');
    const keyword = searchParams.get('keyword');

    if (secret !== process.env.CRON_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!keyword) {
      return NextResponse.json({ error: 'Keyword required' }, { status: 400 });
    }

    // 1. Cari Berita di Google News
    const feed = await parser.parseURL(`https://news.google.com/rss/search?q=${encodeURIComponent(keyword)}&hl=id&gl=ID&ceid=ID:id`);
    
    if (feed.items.length === 0) {
      return NextResponse.json({ message: 'Tidak ada berita ditemukan.' });
    }

    const latestNews = feed.items[0];

    // 2. Gunakan Data dari RSS (Judul & Snippet) untuk menghindari blokir anti-bot (Cloudflare/Google)
    // Berita-berita olahraga biasanya punya snippet yang cukup untuk dijadikan bahan oleh Gemini 1.5 Pro
    const articleSource = `
      Judul Asli: ${latestNews.title}
      Ringkasan Berita: ${latestNews.contentSnippet || latestNews.content || latestNews.title}
      Sumber Link: ${latestNews.link}
    `;

    // 3. Rewrite dengan Gemini
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `
      Anda adalah jurnalis olahraga profesional untuk portal berita "SkorAkhir".
      Tugas Anda adalah meracik sebuah berita olahraga yang unik, tajam, dan SEO-friendly dalam bahasa Indonesia berdasarkan poin-poin berita terbaru berikut ini.
      
      BAHAN BERITA:
      ${articleSource}

      ATURAN:
      1. Berikan Judul yang clickbait namun elegan (wajib dibungkus tag <h1>).
      2. Kembangkan bahan di atas menjadi artikel berita minimal 3 paragraf. Anda diizinkan menggunakan pengetahuan luas Anda tentang olahraga tersebut untuk melengkapi konteks berita, namun JANGAN MENGARANG SKOR atau FAKTA KRUSIAL yang bertentangan dengan bahan.
      3. Gunakan tag HTML yang rapi (<h2> untuk sub-heading, <p> untuk paragraf, <strong> untuk penekanan).
      4. Hanya keluarkan format HTML murni tanpa teks pengantar seperti "Berikut artikelnya:".
    `;

    const result = await model.generateContent(prompt);
    const rewrittenHtml = result.response.text();

    // 4. Tahap 2: Tembak WP REST API sebagai Draft
    const wpUrl = process.env.WORDPRESS_API_URL?.replace('/graphql', '/wp-json/wp/v2/posts');
    const wpUser = process.env.WP_APP_USERNAME;
    const wpPass = process.env.WP_APP_PASSWORD;

    if (!wpUrl || !wpUser || !wpPass) {
      return NextResponse.json({ 
        success: true, 
        message: 'Berhasil rewrite tapi WP Credentials belum diset di .env.local',
        rewritten_html: rewrittenHtml 
      });
    }

    // Ekstrak H1 dari HTML Gemini untuk jadi Title
    const titleMatch = rewrittenHtml.match(/<h1>(.*?)<\/h1>/i);
    const postTitle = titleMatch ? titleMatch[1] : `Prediksi/Berita: ${latestNews.title}`;

    // Bersihkan H1 dari body konten agar tidak double judul
    const postContent = rewrittenHtml.replace(/<h1>.*?<\/h1>/i, '').trim();

    const wpResponse = await fetch(wpUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + Buffer.from(`${wpUser}:${wpPass}`).toString('base64')
      },
      body: JSON.stringify({
        title: postTitle,
        content: postContent,
        status: 'draft',
        ...(process.env.WP_DEFAULT_MEDIA_ID ? { featured_media: parseInt(process.env.WP_DEFAULT_MEDIA_ID, 10) } : {})
      })
    });

    if (!wpResponse.ok) {
      const errorData = await wpResponse.text();
      throw new Error(`Gagal memposting ke WordPress: ${wpResponse.status} ${errorData}`);
    }

    const wpResult = await wpResponse.json();

    return NextResponse.json({ 
      success: true, 
      message: 'Berhasil membuat Draft di WordPress!',
      wp_post_id: wpResult.id,
      original_title: latestNews.title,
      draft_title: postTitle
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
