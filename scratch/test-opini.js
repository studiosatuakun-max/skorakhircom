require('dotenv').config({ path: '.env.local' });

async function testQuery() {
  const query = `
    query GetOpinions {
      posts(first: 3, where: { categoryName: "opini" }) {
        nodes {
          id
          title
          slug
          date
          author {
            node {
              name
            }
          }
        }
      }
    }
  `;

  const url = process.env.WORDPRESS_API_URL;
  if (!url) {
    console.error("No WP API URL found");
    return;
  }

  console.log("Fetching from:", url);
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query })
  });

  const json = await response.json();
  console.log(JSON.stringify(json, null, 2));
}

testQuery();
