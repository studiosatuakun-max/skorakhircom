import Parser from 'rss-parser';
import * as cheerio from 'cheerio';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';

// Paksa baca env variable
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const parser = new Parser();

async function scrape() {
  console.log("Memulai scraping RSS Antara Olahraga...");
  const feed = await parser.parseURL('https://www.antaranews.com/rss/olahraga.xml');
  console.log(`Ditemukan ${feed.items.length} artikel terbaru dari RSS.`);

  // Cek apakah kategori UMUM/SPORT sudah ada
  let { data: cat } = await supabase.from('categories').select('id').eq('name', 'UMUM').single();
  let categoryId = cat?.id;

  if (!categoryId) {
    const { data: newCat } = await supabase.from('categories').insert({ name: 'UMUM', color: 'slate-500' }).select().single();
    categoryId = newCat?.id;
  }

  let count = 0;
  for (const item of feed.items) {
    if(count >= 25) break; // Ngedump 25 Artikel Baru sekaligus
    try {
      console.log(`Membaca artikel: ${item.title}`);
      
      const response = await fetch(item.link);
      const html = await response.text();
      const $ = cheerio.load(html);
      
      // Ambil teks dari artikel Antara News
      let paragraphs = [];
      $('.wrap__article-detail-content p, .post-content p').each((i, el) => {
        let text = $(el).text().trim();
        // Skip junk/ads link
        if(text && !text.includes('Baca juga') && !text.includes('Pewarta:')) {
          paragraphs.push(`<p>${text}</p>`);
        }
      });
      
      let articleContent = paragraphs.join('\n');
      if (!articleContent || articleContent.length < 50) {
          articleContent = `<p>${item.contentSnippet || item.content}</p>`; // Fallback RSS
      }

      const slug = item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

      // Hindari duplikat
      const { data: existing } = await supabase.from('news').select('id').eq('slug', slug).single();
      if(existing) {
        console.log("⚠️ Artikel sudah ada di DB, skip.");
        continue;
      }

      // Generate tanggal mundur perlahan (simulasi data 3 bulan jika perlu, tapi kita pakai tgl aktual berita dulu)
      const pubDate = new Date(item.pubDate || new Date());

      const { error } = await supabase.from('news').insert({
        title: item.title,
        slug: slug,
        excerpt: (item.contentSnippet || item.title).substring(0, 150) + "...",
        content: articleContent,
        author: item.creator || 'Repoter Antara',
        category_id: categoryId,
        featured_image: '', // Sengaja kosong biar diedit manual
        created_at: pubDate,
      });

      if (error) {
         console.error("Gagal simpan:", error.message);
      } else {
         console.log("✅ Berhasil disimpan.");
         count++;
      }
    } catch(err) {
      console.log("Gagal memproses item:", err.message);
    }
  }
  
  console.log(`\n🔥 SELESAI! Berhasil menambang ${count} artikel asli ke Database!`);
}

scrape();
