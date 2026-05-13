import Parser from 'rss-parser';
import * as cheerio from 'cheerio';
import { GoogleGenerativeAI } from '@google/generative-ai';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const parser = new Parser();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function testScraper() {
  const keyword = 'Megawati Hangestri Voli';
  console.log(`[1] Mencari berita untuk: ${keyword}...`);
  
  // 1. Fetch RSS from Google News
  const feed = await parser.parseURL(`https://news.google.com/rss/search?q=${encodeURIComponent(keyword)}&hl=id&gl=ID&ceid=ID:id`);
  
  if (feed.items.length === 0) {
    console.log('Tidak ada berita ditemukan.');
    return;
  }

  const latestNews = feed.items[0];
  console.log(`[2] Berita ditemukan: ${latestNews.title}`);
  console.log(`Link: ${latestNews.link}`);

  // 2. Fetch the actual article HTML
  console.log(`[3] Mengekstrak konten dari link...`);
  try {
    const response = await fetch(latestNews.link);
    const html = await response.text();
    
    // 3. Extract text using Cheerio
    const $ = cheerio.load(html);
    // Hapus script, style, header, footer, nav
    $('script, style, header, footer, nav, iframe, .ads, aside').remove();
    
    let articleText = '';
    $('p').each((i, el) => {
      const text = $(el).text().trim();
      if (text.length > 50) { // Hanya ambil paragraf yang cukup panjang
        articleText += text + '\n\n';
      }
    });

    if (articleText.length < 200) {
      console.log('Gagal mengekstrak teks yang memadai, atau halaman diproteksi.');
      return;
    }
    
    console.log(`Berhasil mengekstrak ${articleText.length} karakter teks mentah.`);

    // 4. Rewrite using Gemini
    console.log(`[4] Meminta Gemini AI untuk rewrite artikel...`);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const prompt = `
      Anda adalah jurnalis olahraga profesional untuk portal berita "SkorAkhir".
      Tugas Anda adalah me-rewrite (menulis ulang) artikel mentah berikut ini menjadi sebuah berita olahraga yang unik, menarik, dan SEO-friendly dalam bahasa Indonesia.
      
      Aturan:
      1. Tulis ulang dengan gaya bahasa jurnalistik yang mengalir dan dramatis (khas media olahraga).
      2. Berikan Judul yang clickbait namun elegan (sertakan di awal dalam tag <h1>).
      3. Gunakan tag HTML yang rapi (<h2> untuk sub-heading, <p> untuk paragraf).
      4. Jangan pernah mengarang fakta (halusinasi). Gunakan fakta dari teks asli saja.
      5. Jangan sertakan pengantar seperti "Berikut adalah hasilnya". Langsung keluarkan HTML-nya.
      
      Teks Mentah:
      ${articleText}
    `;

    const result = await model.generateContent(prompt);
    const rewrittenHtml = result.response.text();

    console.log(`\n========== HASIL REWRITE AI ==========`);
    console.log(rewrittenHtml);
    console.log(`========================================\n`);
    
  } catch (error) {
    console.error('Error:', error);
  }
}

testScraper();
