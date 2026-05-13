# Status Migrasi Headless WordPress & Vercel (SkorAkhir)

**Terakhir Update:** Tahap 2 Selesai (Detail Artikel, Webhook & Komponen Spesifik)

## Apa yang sudah selesai hari ini:
1. **Next.js Foundation:**
   - Endpoint GraphQL diset ke `https://cms.skorakhir.com/graphql` di `.env.local` (menggunakan jalur aman HTTPS).
   - Fetcher GraphQL `src/lib/wp-graphql.ts` menggunakan mekanisme ISR (`next: { revalidate: 60, tags: ['wordpress'] }`).
   - Domain `cms.skorakhir.com` di-whitelist di `next.config.ts` untuk Next/Image.
2. **WordPress Backend (cms.skorakhir.com):**
   - Instalasi WordPress selesai secara utuh di subdomain `cms`.
   - Artikel post ("Tes Posting") berhasil diterbitkan dan terbaca sempurna oleh API GraphQL.
   - Pengaturan Permalinks diset ke tipe "Post name".
   - Sertifikat SSL Let's Encrypt / AutoSSL sudah terverifikasi dan aktif. GraphQL merespon dengan status 200 tanpa peringatan keamanan.
3. **Infrastruktur / Hosting (DNS & Vercel):**
   - Vercel berhasil terhubung ke domain utama `skorakhir.com` dan `www` (A Record dan CNAME Valid).
   - Domain backend `cms.skorakhir.com` siap beroperasi untuk produksi dengan SSL yang solid.
4. **Refactor Komponen Frontend (Tahap 1 & 2):**
   - Komponen `NewsList.tsx` (Carousel & Berita Samping) sudah ditarik dari WordPress GraphQL.
   - **Detail Artikel (`/berita/[slug]`):** Halaman 404 sudah diperbaiki! Fetching logic menggunakan `fetchWP` dan error TypeScript sudah dituntaskan. Artikel Terkait kini berbasis GraphQL.
   - **TrendingTop5 (`TrendingTopics.tsx`):** Berhasil diubah menjadi komponen `async` untuk menarik Top 5 berita terkini dari WP GraphQL.
   - **TransferRadar (`TransferRadar.tsx`):** Sudah menggunakan data dari kategori "transfer" di WordPress. Jika kosong, akan otomatis mundur ke data *mock*.
5. **Setup Webhook On-Demand Revalidation:**
   - Webhook API telah dibuat pada rute `/api/revalidate`.
   - Revalidasi bisa dipicu seketika (0 detik penundaan) menggunakan pemanggilan URL webhook dengan token rahasia (contoh: `?secret=skorakhir_xyz123`).

## Agenda Selanjutnya (Next Steps):
1. **Verifikasi Webhook di WP CMS:** Konfigurasi plugin semacam "WP Webhooks" atau "JAMstack Deployments" di dashboard `cms.skorakhir.com` untuk memanggil URL `/api/revalidate?secret=skorakhir_xyz123` setiap kali ada artikel yang dipublikasikan/diperbarui.
2. **Deployment Production:** Push semua perubahan kode (commit) ke repositori dan pantau *pipeline* deployment Vercel sampai status hijau (Ready).
3. **Clean Up Database Lama:** Jika sudah terbukti stabil 100%, bersihkan dan hapus tabel `news` yang ada di database Supabase agar tidak membingungkan di kemudian hari.
