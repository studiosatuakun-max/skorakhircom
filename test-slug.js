const query = `query GetPostBySlug {
  post(id: "hasil-moto3-prancis-veda-ega-finis-ke-4-quiles-jadi-pemenang", idType: SLUG) {
    title
    slug
  }
}`;

fetch('https://cms.skorakhir.com/graphql', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query })
}).then(res => res.json()).then(data => console.log(JSON.stringify(data, null, 2))).catch(err => console.error(err));
