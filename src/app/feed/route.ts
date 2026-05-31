import { fetchWP } from '@/lib/wp-graphql';

export const revalidate = 3600; // Cache for 1 hour

export async function GET() {
  const query = `
    query GetPostsForRSS {
      posts(first: 50, where: { orderby: { field: DATE, order: DESC } }) {
        nodes {
          slug
          title
          date
          modified
          excerpt
          content
          author {
            node {
              name
            }
          }
          categories {
            nodes {
              name
            }
          }
          featuredImage {
            node {
              sourceUrl
            }
          }
        }
      }
    }
  `;

  let posts: any[] = [];
  try {
    const data = await fetchWP(query);
    posts = data?.posts?.nodes || [];
  } catch (error) {
    console.error('Failed to fetch posts for RSS:', error);
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skorakhir.com';

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" 
    xmlns:content="http://purl.org/rss/1.0/modules/content/"
    xmlns:dc="http://purl.org/dc/elements/1.1/"
    xmlns:atom="http://www.w3.org/2005/Atom"
    xmlns:sy="http://purl.org/rss/1.0/modules/syndication/"
    xmlns:media="http://search.yahoo.com/mrss/">
<channel>
  <title>SKORAKHIR. | Portal Berita Olahraga</title>
  <atom:link href="${siteUrl}/feed" rel="self" type="application/rss+xml" />
  <link>${siteUrl}</link>
  <description>Portal berita olahraga cepat, bersih, dan terupdate. Fokus pada Sepak Bola, MotoGP, Bulutangkis, Voli, dan E-Sport.</description>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
  <language>id</language>
  <sy:updatePeriod>hourly</sy:updatePeriod>
  <sy:updateFrequency>1</sy:updateFrequency>
  ${posts.map((post) => {
    // Generate description from excerpt or content
    const description = (post.excerpt || post.content || '')
      .replace(/<[^>]+>/g, '')
      .substring(0, 200) + '...';
      
    // Escape XML special characters
    const safeTitle = post.title
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
      
    const safeDescription = description
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    const pubDate = new Date(post.date).toUTCString();
    const category = post.categories?.nodes?.[0]?.name || 'Berita';
    const author = post.author?.node?.name || 'Redaksi SkorAkhir';
    const imageUrl = post.featuredImage?.node?.sourceUrl;

    return `
  <item>
    <title>${safeTitle}</title>
    <link>${siteUrl}/berita/${post.slug}</link>
    <pubDate>${pubDate}</pubDate>
    <dc:creator><![CDATA[${author}]]></dc:creator>
    <category><![CDATA[${category}]]></category>
    <guid isPermaLink="true">${siteUrl}/berita/${post.slug}</guid>
    <description><![CDATA[${safeDescription}]]></description>
    <content:encoded><![CDATA[${post.content || ''}]]></content:encoded>
    ${imageUrl ? `<media:content url="${imageUrl}" medium="image" />` : ''}
  </item>`;
  }).join('')}
</channel>
</rss>`;

  return new Response(rss, {
    status: 200,
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
