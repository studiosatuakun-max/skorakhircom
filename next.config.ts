import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "**" },
      { protocol: "https", hostname: "cms.skorakhir.com" } // Untuk Headless WP

    ],
  },
};

export default nextConfig;
