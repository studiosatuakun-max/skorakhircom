import { MetadataRoute } from 'next';
import { fetchWP } from '@/lib/wp-graphql';
import { supabase } from '@/lib/supabase';

export const revalidate = 3600; // Cache selama 1 jam agar artikel baru selalu muncul

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

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/world-cup-2026`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/affiliate`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tentang-kami`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/redaksi`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/kontak`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/pedoman-media-siber`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    }
  ];

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 1,
    },
    ...staticRoutes,
    ...pollSitemap,
    ...wpSitemap,
  ];
}
