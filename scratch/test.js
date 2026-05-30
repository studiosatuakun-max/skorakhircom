async function run() {
  const q = { query: 'query GetCatPosts { posts(first: 3, where: { categoryName: "sepak-bola" }) { nodes { id title } } }' };
  const res = await fetch('https://cms.skorakhir.com/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(q)
  });
  const data = await res.json();
  console.log('Sepak bola:', JSON.stringify(data, null, 2));

  const qTrending = { query: 'query GetTrending { posts(first: 5, where: { orderby: { field: DATE, order: DESC } }) { nodes { id title } } }' };
  const resTrending = await fetch('https://cms.skorakhir.com/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(qTrending)
  });
  const dataTrending = await resTrending.json();
  console.log('Trending:', JSON.stringify(dataTrending, null, 2));
}
run();
