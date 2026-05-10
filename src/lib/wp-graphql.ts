export async function fetchWP(query: string, { variables }: { variables?: any } = {}) {
  const WP_API_URL = process.env.WORDPRESS_API_URL;

  if (!WP_API_URL) {
    throw new Error('WORDPRESS_API_URL is not defined in environment variables.');
  }

  const res = await fetch(WP_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // If you are using preview or draft mode, or need authentication, add it here:
      // 'Authorization': `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
    // Use force-cache for production, or Next.js 15 default cache semantics
    // You can override this per-request by passing standard fetch options if needed.
    cache: 'force-cache', 
    next: {
      // Setup global tags for on-demand revalidation
      tags: ['wordpress'], 
    }
  });

  const json = await res.json();

  if (json.errors) {
    console.error('WordPress GraphQL Error:', json.errors);
    throw new Error('Failed to fetch from WordPress GraphQL API');
  }

  return json.data;
}
