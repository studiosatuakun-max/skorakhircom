export async function fetchWP(query: string, { variables }: { variables?: any } = {}) {
  const WP_API_URL = process.env.WORDPRESS_API_URL;

  if (!WP_API_URL) {
    throw new Error('WORDPRESS_API_URL is not defined in environment variables.');
  }

  // Pastikan URL selalu mengarah ke endpoint /graphql meskipun user lupa menambahkannya di env var
  const finalUrl = `${WP_API_URL.split('/graphql')[0].replace(/\/$/, '')}/graphql`;

  const res = await fetch(finalUrl, {
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
    // Use ISR with 60 seconds revalidation instead of infinite force-cache
    next: {
      revalidate: 60,
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
