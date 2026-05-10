# Status Migrasi Headless WordPress & Vercel (SkorAkhir)

**Terakhir Update:** Tahap Setting DNS (Menunggu Propagasi)

## Apa yang sudah selesai hari ini:
1. **Next.js Foundation:**
   - File `src/lib/wp-graphql.ts` sudah dibuat (Fetcher standar Next.js 15 dengan `force-cache`).
   - `WORDPRESS_API_URL` sudah ditambahkan ke `.env.local`.
   - Domain `admin.skorakhir.com` sudah di-whitelist di `next.config.ts` untuk Next/Image.
2. **WordPress Backend:**
   - Database WP sudah di-reset.
   - Plugin `WPGraphQL` dan ekstensi `WPGraphQL for ACF` sudah terinstal.
   - Script Redirect Frontend sudah disiapkan (untuk ditaruh di `functions.php`).
3. **Infrastruktur / Hosting:**
   - Nameserver dikembalikan dari Arenhost ke kendali Rumahweb.
   - Vercel spesifik IP (`216.198.79.1`) dan CNAME (`925976f535764a2d.vercel-dns-017.com`) sedang di-input ke Managed DNS Rumahweb.

## Agenda Besok (Next Steps):
1. **Verifikasi DNS:** Pastikan Vercel sudah centang biru (Valid Configuration).
2. **Setup Subdomain Admin:** Pastikan `admin.skorakhir.com` bisa diakses.
3. **Dummy Data WP:** Bikin artikel dummy di WordPress, lengkap dengan *Featured Image*.
4. **Refactor Komponen Next.js:** Ganti Supabase di `NewsList.tsx` dengan query GraphQL.
