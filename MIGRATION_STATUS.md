# Status Migrasi Headless WordPress & Vercel (SkorAkhir)

**Terakhir Update:** Tahap 2 Selesai (Full Migration & AI Scraper System)

## Pencapaian Sesi Terakhir (Hari Ini):
1. **Frontend 100% WordPress-Ready:**
   - Komponen `NewsList`, `CategoryGrid`, `GarudaPride`, `TransferRadar`, dan `TrendingTopics` sudah berhasil menggunakan `fetchWP` (GraphQL).
   - *Layout glitch* pada "Garuda Pride" karena masalah `aspect-ratio` flexbox sudah diselesaikan.
   - Legacy Supabase *queries* sudah tidak lagi digunakan untuk memuat data di halaman depan.
2. **On-Demand Cache Revalidation:**
   - Webhook rahasia `/api/revalidate` sudah disiapkan agar WordPress bisa membersihkan *cache* ISR Next.js secara *real-time* saat artikel di-publish.
3. **Admin Dashboard Refactor (Goodbye Split-Brain):**
   - Hapus *link* menu "Kelola Berita" Next.js lama (Supabase) dan diganti dengan direct link menuju `cms.skorakhir.com/wp-admin`.
4. **SkorAkhir AI Scraper Engine (Auto-Draft):**
   - Fitur baru: Dashboard `/admin/scraper` berhasil dibuat.
   - Menyedot *feed* Google News RSS secara aman dari pemblokiran *bot*.
   - Terintegrasi dengan `gemini-1.5-flash` untuk meracik ulang berita menjadi artikel jurnalistik SEO-friendly (format HTML lengkap dengan `<h2>`).
   - Berhasil dipasangkan dengan WordPress REST API menggunakan *Application Passwords* untuk membuat artikel "DRAFT" secara gaib.
   - Supabase dimanfaatkan sebagai wadah penyimpanan *database* (tabel `scraper_targets`) untuk jadwal berulang.
   - Vercel Cron (`vercel.json`) sudah di-*setup* untuk menjalankan jadwal scraping harian di jam 08:00 pagi secara otomatis.

## Status Terkini (Semua Selesai):
1. ✅ **Verifikasi AI Scraper di Vercel:** *Error* 404 dari Google Generative AI di *production* sudah berhasil diselesaikan (Redeploy sukses).
2. ✅ **Featured Image Auto-Draft:** Auto-assign ID gambar dari *environment variable* `WP_DEFAULT_MEDIA_ID` untuk artikel hasil _scraping_ sudah diimplementasikan.
3. ✅ **Pembersihan Database Lama:** Tabel `news` lama di database Supabase siap untuk dihapus, membebaskan kapasitas penyimpanan untuk aplikasi Next.js.

Semua target migrasi Headless WordPress SkorAkhir sudah dinyatakan **SELESAI (100%)**.
