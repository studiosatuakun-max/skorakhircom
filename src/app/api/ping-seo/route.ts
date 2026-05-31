import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.skorakhir.com';
    
    // URL sitemap yang akan di-ping
    const sitemapUrl = `${baseUrl}/sitemap.xml`;
    const newsSitemapUrl = `${baseUrl}/news-sitemap.xml`;

    // Ping Google
    const pingGoogleSitemap = await fetch(`https://www.google.com/ping?sitemap=${sitemapUrl}`);
    const pingGoogleNews = await fetch(`https://www.google.com/ping?sitemap=${newsSitemapUrl}`);
    
    // Ping Bing (Bonus)
    const pingBingSitemap = await fetch(`https://www.bing.com/ping?sitemap=${sitemapUrl}`);

    return NextResponse.json({
      success: true,
      message: 'Ping berhasil dikirim ke Search Engine',
      results: {
        googleSitemap: pingGoogleSitemap.status,
        googleNews: pingGoogleNews.status,
        bingSitemap: pingBingSitemap.status
      }
    });

  } catch (error: any) {
    console.error('Error pinging SEO:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
