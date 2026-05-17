import { fetchWP } from '@/lib/wp-graphql';

export const revalidate = 3600; // Cache for 1 hour

export async function GET() {
  const query = `
    query GetNewsForSitemap {
      posts(first: 50, where: { orderby: { field: DATE, order: DESC } }) {
        nodes {
          slug
          title
          date
        }
      }
    }
  `;

  let posts: any[] = [];
  try {
    const data = await fetchWP(query);
    posts = data?.posts?.nodes || [];
  } catch (error) {
    console.error('Failed to fetch posts for news sitemap:', error);
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skorakhir.com';

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
  ${posts.map((post) => {
    // Google News requires ISO 8601 date
    const publishDate = new Date(post.date).toISOString();
    // Escape special characters in title for XML
    const safeTitle = post.title
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');

    return `
  <url>
    <loc>${siteUrl}/berita/${post.slug}</loc>
    <news:news>
      <news:publication>
        <news:name>Skor Akhir</news:name>
        <news:language>id</news:language>
      </news:publication>
      <news:publication_date>${publishDate}</news:publication_date>
      <news:title>${safeTitle}</news:title>
    </news:news>
  </url>`;
  }).join('')}
</urlset>`;

  return new Response(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'text/xml',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
