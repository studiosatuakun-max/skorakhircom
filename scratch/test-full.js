async function run() {
  const q = { 
    query: `
      query GetCatPosts($categoryName: String!) {
        posts(first: 3, where: { categoryName: $categoryName }) {
          nodes {
            id
            title
            slug
            date
            featuredImage {
              node {
                sourceUrl
              }
            }
          }
        }
      }
    `,
    variables: { categoryName: 'sepak-bola' }
  };
  const res = await fetch('https://cms.skorakhir.com/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(q)
  });
  const data = await res.json();
  console.log('Sepak bola FULL:', JSON.stringify(data, null, 2));
}
run();
