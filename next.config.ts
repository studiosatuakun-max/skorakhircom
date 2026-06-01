import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "**" },
      { protocol: "https", hostname: "cms.skorakhir.com" } // Untuk Headless WP
    ],
  },
  async redirects() {
    return [
      // Redirect Kategori WordPress
      {
        source: '/category/:slug*',
        destination: '/kategori/:slug*',
        permanent: true, // 301 Redirect
      },
      // Redirect Tag WordPress (Dibuang ke home) - DIHAPUS karena sekarang Tag punya halaman sendiri.
      // Redirect Author WordPress (DIHAPUS, Author sekarang punya halaman sendiri)
      // Redirect URL format Tanggal (e.g. /2023/12/judul-berita/)
      {
        source: '/:year(\\d{4})/:month(\\d{2})/:slug',
        destination: '/berita/:slug',
        permanent: true,
      },
      // Redirect URL format Tanggal lengkap (e.g. /2023/12/30/judul-berita/)
      {
        source: '/:year(\\d{4})/:month(\\d{2})/:day(\\d{2})/:slug',
        destination: '/berita/:slug',
        permanent: true,
      }
    ];
  },
};

export default nextConfig;
