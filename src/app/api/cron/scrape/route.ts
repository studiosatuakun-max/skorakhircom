import { NextResponse } from 'next/server';
import Parser from 'rss-parser';
import * as cheerio from 'cheerio';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { supabase } from '@/lib/supabase';

export const maxDuration = 60; // Extend Vercel timeout

// Inisialisasi API
const parser = new Parser();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// Fungsi pembantu untuk decode URL Google News
function decodeGoogleNewsUrl(url: string) {
  try {
    const match = url.match(/articles\/([a-zA-Z0-9-_]+)/);
    if (!match) return url;
    let base64 = match[1].replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4 !== 0) base64 += '=';
    const decoded = Buffer.from(base64, 'base64').toString('utf8');
    const urlMatch = decoded.match(/(https?:\/\/[a-zA-Z0-9-._~:\/?#[\]@!$&'()*+,;=%]+)/);
    if (urlMatch) return urlMatch[1];
  } catch(e) {}
  return url;
}

// Fungsi pembantu untuk fetch gambar OG dari link berita asli
async function extractOgImage(url: string) {
  try {
    const realUrl = decodeGoogleNewsUrl(url);
    const res = await fetch(realUrl, { redirect: 'follow', headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' } });
    const html = await res.text();
    const $ = cheerio.load(html);
    let ogImage = $('meta[property="og:image"]').attr('content');
    
    return ogImage && !ogImage.includes('google') ? ogImage : null;
  } catch (e) {
    console.error("Gagal ekstrak gambar OG:", e);
    return null;
  }
}

// Fungsi untuk upload gambar ke WordPress
async function uploadImageToWP(imageUrl: string, wpUrl: string, authHeader: string) {
  try {
    const imgRes = await fetch(imageUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    if (!imgRes.ok) return null;
    const arrayBuffer = await imgRes.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    const fileName = `scraped-${Date.now()}.jpg`;
    const uploadRes = await fetch(`${wpUrl}/wp-json/wp/v2/media`, {
      method: 'POST',
      headers: {
        'Authorization': authHeader,
        'Content-Disposition': `attachment; filename="${fileName}"`,
        'Content-Type': 'image/jpeg'
      },
      body: buffer
    });
    
    if (uploadRes.ok) {
      const media = await uploadRes.json();
      return media.id; // Mengembalikan ID Media WordPress
    }
    return null;
  } catch (e) {
    console.error("Gagal upload gambar ke WP:", e);
    return null;
  }
}

// Fungsi untuk mencocokkan Kategori dari AI dengan WP
async function getWpCategoryId(keywordFromAI: string, wpUrl: string, authHeader: string) {
  try {
    const res = await fetch(`${wpUrl}/wp-json/wp/v2/categories?per_page=100`, {
      headers: { 'Authorization': authHeader }
    });
    const categories = await res.json();
    const match = categories.find((c: any) => 
      c.name.toLowerCase().includes(keywordFromAI.toLowerCase()) || 
      keywordFromAI.toLowerCase().includes(c.name.toLowerCase())
    );
    if (match) return match.id;
    return categories[0]?.id || 1; // Default fallback
  } catch(e) {
    return 1;
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

    const articleSource = `
      Judul Asli: ${latestNews.title}
      Ringkasan Berita: ${latestNews.contentSnippet || latestNews.content || latestNews.title}
      Sumber Link: ${latestNews.link}
    `;

    // Ambil produk affiliate
    let affiliateRule = `5. Di setiap akhir artikel, buat satu paragraf promosi dan sisipkan kode [AFFILIATE] dummy.`;
    try {
      const { data, error } = await supabase.from('affiliate_products').select('*');
      if (!error && data && data.length > 0) {
        const productListString = data.map((p, i) => `${i + 1}. <p>[AFFILIATE name="${p.name}" price="${p.price}" url="${p.affiliate_url}" image="${p.image_url}" platform="${p.platform}"]</p>`).join('\\n');
        affiliateRule = `5. Di bawah ini adalah DAFTAR RESMI Produk Affiliate. Pilih SALAH SATU produk yang paling cocok. Di akhir artikel, buat paragraf promosi yang luwes, lalu SISIPKAN persis kode HTML dari produk yang Anda pilih:\n\nDAFTAR PRODUK:\n${productListString}`;
      }
    } catch (err) {}

    const prompt = `
      Anda adalah jurnalis olahraga profesional "SkorAkhir". Buat artikel berita yang unik dan tajam.
      
      BAHAN BERITA:
      ${articleSource}

      ATURAN:
      1. Berikan Judul yang clickbait namun elegan (tag <h1>).
      2. JANGAN PERNAH menyebutkan portal media asal. Klaim ini eksklusif dari "SkorAkhir".
      3. Pecah tulisan menjadi paragraf-paragraf pendek (maksimal 3-4 kalimat). 
      4. Gunakan tag HTML yang rapi (<h2>, <p>, <strong>).
      5. Anda WAJIB merespon DALAM FORMAT JSON murni (tanpa tag markdown) dengan struktur berikut:
      {
        "title": "Judul artikel tanpa tag h1",
        "category": "Pilih satu: Sepak Bola / Bulu Tangkis / MotoGP / Basket / Umum",
        "content": "<h1>Judul</h1><p>Isi artikel...</p><h2>Subjudul</h2>..."
      }
      ${affiliateRule}
    `;

    let result;
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      result = await model.generateContent(prompt);
    } catch (error: any) {
      const fallbackModel = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
      result = await fallbackModel.generateContent(prompt);
    }

    let responseText = result.response.text();
    // Bersihkan dari markdown block jika AI membandel
    responseText = responseText.replace(/^```json/m, '').replace(/^```/m, '').trim();
    
    let parsedData;
    try {
      parsedData = JSON.parse(responseText);
    } catch(e) {
      return NextResponse.json({ error: 'Gagal memparsing JSON dari AI', raw: responseText });
    }

    const postTitle = parsedData.title || latestNews.title;
    const postContent = parsedData.content.replace(/<h1>.*?<\/h1>/i, '').trim();
    const suggestedCategory = parsedData.category || 'Umum';

    const wpBaseUrl = process.env.WORDPRESS_API_URL?.split('/graphql')[0].replace(/\/$/, '') || 'https://cms.skorakhir.com';
    const wpUser = process.env.WP_APP_USERNAME;
    const wpPass = process.env.WP_APP_PASSWORD;
    const authHeader = 'Basic ' + Buffer.from(`${wpUser}:${wpPass}`).toString('base64');

    if (!wpUser || !wpPass) {
      return NextResponse.json({ message: 'WP Credentials belum diset', data: parsedData });
    }

    // 1. Ekstrak & Upload Gambar Asli
    let mediaId = process.env.WP_DEFAULT_MEDIA_ID ? parseInt(process.env.WP_DEFAULT_MEDIA_ID, 10) : null;
    const ogImageUrl = await extractOgImage(latestNews.link || '');
    if (ogImageUrl) {
      const uploadedMediaId = await uploadImageToWP(ogImageUrl, wpBaseUrl, authHeader);
      if (uploadedMediaId) mediaId = uploadedMediaId;
    }

    // 2. Cocokkan Kategori
    const categoryId = await getWpCategoryId(suggestedCategory, wpBaseUrl, authHeader);

    // 3. Posting langsung PUBLISH
    const wpUrl = `${wpBaseUrl}/wp-json/wp/v2/posts`;
    const wpResponse = await fetch(wpUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader,
        'User-Agent': 'Mozilla/5.0'
      },
      body: JSON.stringify({
        title: postTitle,
        content: postContent,
        status: 'draft',
        categories: [categoryId],
        ...(mediaId ? { featured_media: mediaId } : {})
      })
    });

    if (!wpResponse.ok) {
      const errorData = await wpResponse.text();
      throw new Error(`Gagal memposting ke WordPress: ${errorData}`);
    }

    const wpResult = await wpResponse.json();

    return NextResponse.json({ 
      success: true, 
      message: 'Berhasil membuat artikel secara Full Auto Pilot!',
      wp_post_id: wpResult.id,
      draft_title: postTitle,
      category: suggestedCategory,
      media_id: mediaId
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
