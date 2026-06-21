import { NextResponse } from 'next/server';
import Parser from 'rss-parser';
import * as cheerio from 'cheerio';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { supabase } from '@/lib/supabase';

export const maxDuration = 60; // Extend Vercel timeout

// Inisialisasi API
const parser = new Parser();
const apiKey = process.env.GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(apiKey);

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

// Fungsi pembantu untuk fetch gambar OG dan teks dari link berita asli
async function extractArticleData(url: string) {
  try {
    const realUrl = decodeGoogleNewsUrl(url);
    const res = await fetch(realUrl, { redirect: 'follow', headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' } });
    const html = await res.text();
    const $ = cheerio.load(html);
    
    let ogImage = $('meta[property="og:image"]').attr('content');
    ogImage = ogImage && !ogImage.includes('google') ? ogImage : undefined;
    
    $('script, style, nav, header, footer, aside, .ad, .advertisement').remove();
    let fullText = '';
    $('p').each((i, el) => {
      const p = $(el).text().trim();
      if (p.length > 40) fullText += p + '\\n\\n';
    });
    
    return { ogImage, fullText: fullText.substring(0, 8000) };
  } catch (e) {
    console.error("Gagal ekstrak data artikel:", e);
    return { ogImage: null, fullText: "" };
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

    // 1. Cari Berita di Google News (Portal Luar Negeri / Bahasa Inggris) - Dikunci ke 24 jam terakhir
    const feed = await parser.parseURL(`https://news.google.com/rss/search?q=${encodeURIComponent(keyword + ' when:1d')}&hl=en-US&gl=US&ceid=US:en`);
    
    if (feed.items.length === 0) {
      return NextResponse.json({ message: 'Tidak ada berita ditemukan.' });
    }

    const topArticles = feed.items.slice(0, 3);

    // Ambil produk affiliate
    let affiliateRule = `5. Di setiap akhir artikel, buat satu paragraf promosi dan sisipkan kode [AFFILIATE] dummy.`;
    try {
      const { data, error } = await supabase.from('affiliate_products').select('*');
      if (!error && data && data.length > 0) {
        const productListString = data.map((p, i) => `${i + 1}. <p>[AFFILIATE name="${p.name}" price="${p.price}" url="${p.affiliate_url}" image="${p.image_url}" platform="${p.platform}"]</p>`).join('\\n');
        affiliateRule = `5. Di bawah ini adalah DAFTAR RESMI Produk Affiliate. Pilih SALAH SATU produk yang paling cocok. Di akhir artikel, buat paragraf promosi yang luwes, lalu SISIPKAN persis kode HTML dari produk yang Anda pilih:\n\nDAFTAR PRODUK:\n${productListString}`;
      }
    } catch (err) {}

    const wpBaseUrl = process.env.WORDPRESS_API_URL?.split('/graphql')[0].replace(/\/$/, '') || 'https://cms.skorakhir.com';
    const wpUser = process.env.WP_APP_USERNAME;
    const wpPass = process.env.WP_APP_PASSWORD;
    const authHeader = 'Basic ' + Buffer.from(`${wpUser}:${wpPass}`).toString('base64');

    if (!wpUser || !wpPass) {
      return NextResponse.json({ error: 'WP Credentials belum diset' }, { status: 500 });
    }

    const results = [];

    for (const newsItem of topArticles) {
      try {
        const articleData = await extractArticleData(newsItem.link || '');
        const articleSource = `
          Judul Asli: ${newsItem.title}
          Isi Berita Lengkap: ${articleData.fullText || newsItem.contentSnippet || newsItem.title}
          Sumber Link: ${newsItem.link}
        `;

        const prompt = `
          Anda adalah jurnalis olahraga senior dan analis taktik untuk "SkorAkhir".
          Tugas Utama: Terjemahkan dan kembangkan sumber berita luar negeri di bawah ini menjadi artikel Bahasa Indonesia yang SANGAT PANJANG, tajam, dan komprehensif (MINIMAL 1000 KATA).
          
          BAHAN BERITA MENTAH (Dari Portal Luar Negeri):
          ${articleSource}

          ATURAN KONTEN (Hukuman jika dilanggar):
          1. JANGAN MERANGKUM. Anda WAJIB MENGEMBANGKAN inti cerita dengan detail tambahan yang relevan (sejarah pertemuan, statistik, gaya main).
          2. Terjemahkan ke Bahasa Indonesia dengan gaya jurnalisme premium (elegan, berapi-api, "Quiet Luxury").
          3. JANGAN PERNAH menghilangkan nama pemain, pelatih, skor, atau menit krusial yang ada di teks asli. Semuanya harus masuk.
          4. Buat satu bagian khusus untuk "Review & Analisis Pertandingan".
          5. Pecah menjadi paragraf-paragraf dengan minimal 3-4 tag <h2> yang provokatif.
          6. Judul harus clickbait namun elegan (tag <h1>).
          7. JANGAN menyebutkan nama portal media asal. Berita ini eksklusif milik "SkorAkhir".
          
          ATURAN FORMAT OUTPUT:
          Anda WAJIB merespon DALAM FORMAT JSON murni (tanpa blok markdown) dengan struktur:
          {
            "title": "Judul artikel tanpa tag h1",
            "excerpt": "Ringkasan 2 kalimat untuk SEO Meta Description",
            "category": "Pilih satu: Sepak Bola / Bulu Tangkis / MotoGP / Basket / Umum",
            "content": "<h1>Judul</h1><p>Isi artikel...</p><h2>Subjudul</h2>..."
          }
          ${affiliateRule}
        `;

        let responseText = '';
        try {
          const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
          const completion = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: 0.3,
              maxOutputTokens: 8192,
              responseMimeType: "application/json"
            }
          });
          responseText = completion.response.text() || '';
        } catch (error: any) {
          console.error("Gemini Auto-Scraper Error:", error);
          continue; // Lewati artikel ini jika AI gagal
        }
        
        let parsedData;
        try {
          const jsonStart = responseText.indexOf('{');
          const jsonEnd = responseText.lastIndexOf('}');
          if (jsonStart !== -1 && jsonEnd !== -1) {
            responseText = responseText.substring(jsonStart, jsonEnd + 1);
          }
          parsedData = JSON.parse(responseText);
        } catch(e) {
          console.error('Gagal memparsing JSON dari AI', responseText);
          continue; // skip to next article if parsing fails
        }

        const postTitle = parsedData.title || newsItem.title;
        const postContent = parsedData.content.replace(/<h1>.*?<\/h1>/i, '').trim();
        const postExcerpt = parsedData.excerpt || '';
        const suggestedCategory = parsedData.category || 'Umum';

        // 1. Ekstrak & Upload Gambar Asli
        let mediaId = process.env.WP_DEFAULT_MEDIA_ID ? parseInt(process.env.WP_DEFAULT_MEDIA_ID, 10) : null;
        if (articleData.ogImage) {
          const uploadedMediaId = await uploadImageToWP(articleData.ogImage, wpBaseUrl, authHeader);
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
            excerpt: postExcerpt,
            status: 'draft',
            categories: [categoryId],
            ...(mediaId ? { featured_media: mediaId } : {})
          })
        });

        if (wpResponse.ok) {
          const wpResult = await wpResponse.json();
          results.push({
            wp_post_id: wpResult.id,
            title: postTitle,
            category: suggestedCategory
          });
        } else {
          console.error(`Gagal memposting ke WordPress: ${await wpResponse.text()}`);
        }
      } catch (articleErr) {
        console.error('Error processing article:', articleErr);
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: `Berhasil memproses ${results.length} artikel terupdate secara Full Auto Pilot!`,
      data: results
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
