import { MetadataRoute } from 'next';
import { fetchWP } from '@/lib/wp-graphql';
import { supabase } from '@/lib/supabase';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skorakhir.com';

  // 1. Fetch WP Articles
  const query = `
    query GetAllSlugs {
      posts(first: 1000, where: { orderby: { field: DATE, order: DESC } }) {
        nodes {
          slug
          modified
        }
      }
    }
  `;
  
  let wpSitemap: MetadataRoute.Sitemap = [];
  try {
    const data = await fetchWP(query);
    if (data?.posts?.nodes) {
      wpSitemap = data.posts.nodes.map((post: any) => ({
        url: `${baseUrl}/berita/${post.slug}`,
        lastModified: new Date(post.modified),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }));
    }
  } catch (err) {
    console.error('Error fetching sitemap WP:', err);
  }

  // 2. Fetch Active Polls from Supabase
  let pollSitemap: MetadataRoute.Sitemap = [];
  try {
    const { data: polls } = await supabase.from('polls').select('id, created_at').eq('is_active', true);
    if (polls) {
      pollSitemap = polls.map((poll) => ({
        url: `${baseUrl}/polling/${poll.id}`,
        lastModified: new Date(poll.created_at),
        changeFrequency: 'daily' as const,
        priority: 0.9,
      }));
    }
  } catch (err) {
    console.error('Error fetching sitemap Polls:', err);
  }

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 1,
    },
    ...pollSitemap,
    ...wpSitemap,
  ];
}
