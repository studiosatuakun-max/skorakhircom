import { NextResponse } from 'next/server';
import Parser from 'rss-parser';
import * as cheerio from 'cheerio';
import Groq from 'groq-sdk';
import { supabase } from '@/lib/supabase';

export const maxDuration = 60; // Extend Vercel timeout

// Inisialisasi API
const parser = new Parser();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

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
        const articleSource = `
          Judul Asli: ${newsItem.title}
          Ringkasan Berita: ${newsItem.contentSnippet || newsItem.content || newsItem.title}
          Sumber Link: ${newsItem.link}
        `;

        const prompt = `
          Anda adalah jurnalis olahraga profesional "SkorAkhir". Buat artikel berita yang sangat mendalam, panjang, dan tajam (MINIMAL 400 KATA).
          
          BAHAN BERITA (Gunakan sebagai inti cerita):
          ${articleSource}

          ATURAN KONTEN:
          1. Berikan Judul yang clickbait namun elegan (tag <h1>).
          2. JANGAN PERNAH menyebutkan portal media asal. Klaim ini eksklusif dari "SkorAkhir".
          3. KEMBANGKAN BERITA: Walaupun bahan berita di atas singkat, Anda WAJIB mengembangkannya menjadi artikel panjang yang komprehensif. Tambahkan konteks sejarah, analisa mendalam, statistik umum, atau opini tajam layaknya komentator profesional.
          4. Pecah tulisan menjadi paragraf-paragraf pendek agar mudah dibaca (maksimal 3-4 kalimat per paragraf). 
          5. Gunakan subheading (<h2>) yang provokatif dan tag HTML yang rapi (<p>, <strong>).
          
          ATURAN FORMAT OUTPUT:
          Anda WAJIB merespon DALAM FORMAT JSON murni (tanpa blok markdown) dengan struktur berikut:
          {
            "title": "Judul artikel tanpa tag h1",
            "category": "Pilih satu: Sepak Bola / Bulu Tangkis / MotoGP / Basket / Umum",
            "content": "<h1>Judul</h1><p>Isi artikel yang sangat panjang...</p><h2>Subjudul</h2>..."
          }
          ${affiliateRule}
        `;

        let responseText = '';
        try {
          const completion = await groq.chat.completions.create({
            messages: [{ role: 'user', content: prompt }],
            model: 'llama-3.3-70b-versatile',
            temperature: 0.7,
            response_format: { type: 'json_object' },
          });
          responseText = completion.choices[0]?.message?.content || '';
        } catch (error: any) {
          const fallbackCompletion = await groq.chat.completions.create({
            messages: [{ role: 'user', content: prompt }],
            model: 'llama3-8b-8192',
            temperature: 0.7,
            response_format: { type: 'json_object' },
          });
          responseText = fallbackCompletion.choices[0]?.message?.content || '';
        }
        
        responseText = responseText.replace(/^```json/m, '').replace(/^```/m, '').trim();
        
        let parsedData;
        try {
          parsedData = JSON.parse(responseText);
        } catch(e) {
          console.error('Gagal memparsing JSON dari AI', responseText);
          continue; // skip to next article if parsing fails
        }

        const postTitle = parsedData.title || newsItem.title;
        const postContent = parsedData.content.replace(/<h1>.*?<\/h1>/i, '').trim();
        const suggestedCategory = parsedData.category || 'Umum';

        // 1. Ekstrak & Upload Gambar Asli
        let mediaId = process.env.WP_DEFAULT_MEDIA_ID ? parseInt(process.env.WP_DEFAULT_MEDIA_ID, 10) : null;
        const ogImageUrl = await extractOgImage(newsItem.link || '');
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
