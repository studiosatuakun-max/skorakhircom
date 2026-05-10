# Status Migrasi Headless WordPress & Vercel (SkorAkhir)

**Terakhir Update:** Tahap 1 Selesai (NewsList Terkoneksi ke Headless WP)

## Apa yang sudah selesai hari ini:
1. **Next.js Foundation:**
   - Endpoint GraphQL diset ke `http://cms.skorakhir.com/graphql` di `.env.local` (menggunakan HTTP sementara untuk mem-bypass error *Self-Signed SSL*).
   - Fetcher GraphQL `src/lib/wp-graphql.ts` sudah diperbarui menggunakan mekanisme ISR (`next: { revalidate: 60 }`) menggantikan cache abadi `force-cache`. Data sekarang dijamin *up-to-date* setiap 60 detik.
   - Domain `cms.skorakhir.com` sudah di-whitelist di `next.config.ts` untuk Next/Image.
2. **WordPress Backend (cms.skorakhir.com):**
   - Instalasi WordPress selesai secara utuh di subdomain `cms`.
   - Artikel post ("Tes Posting") berhasil diterbitkan dan terbaca sempurna oleh API GraphQL.
   - Pengaturan Permalinks diset ke tipe "Post name".
   - Script Redirect Frontend sudah disiapkan untuk menendang akses Dashboard ke `skorakhir.com`.
   - Sertifikat SSL Let's Encrypt / AutoSSL dipicu dan sedang menunggu penyelesaian propagasi DNS global.
3. **Infrastruktur / Hosting (DNS & Vercel):**
   - Vercel berhasil terhubung ke domain utama `skorakhir.com` dan `www` (A Record dan CNAME Valid).
   - Domain backend diputuskan menjadi `cms.skorakhir.com` dan telah disambungkan dengan A Record ke IP cPanel (`202.10.43.68`).
4. **Refactor Komponen Frontend:**
   - Komponen `NewsList.tsx` (Carousel & Berita Samping) sudah sepenuhnya direfactor. Supabase ditinggalkan, data kini ditarik dari WordPress GraphQL.
   - Implementasi *hack* cerdas auto-replace `https://` ke `http://` khusus untuk *featured image*, sehingga gambar tetap tayang di Vercel walau SSL belum beres.

## Agenda Selanjutnya (Next Steps):
1. **Verifikasi SSL CMS:** Memastikan SSL di `cms.skorakhir.com` sudah valid (gembok hijau tanpa peringatan), lalu mengubah variabel `WORDPRESS_API_URL` di Vercel kembali ke jalur aman (`https://`).
2. **Refactor Detail Artikel (`/berita/[slug]`):** Mengganti logika *fetching* halaman baca berita dari Supabase ke WP GraphQL, serta menangani *rendering* konten HTML yang dihasilkan WP Editor.
3. **Refactor Komponen Berita Spesifik:** Migrasi komponen `TrendingTop5` (`TrendingTopics.tsx`), `TransferRadar`, dll agar menampilkan data berdasarkan Kategori spesifik dari WordPress.
4. **Setup Webhook (Opsional):** Menyiapkan *On-Demand Revalidation* agar Vercel otomatis merender ulang seketika (0 detik penundaan) tepat saat tombol "Publish" ditekan di WordPress.
