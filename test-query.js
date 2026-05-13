const query = `query GetGarudaPride {
  posts(first: 5, where: { tag: "garuda-pride" }) {
    nodes { title }
  }
}`;
fetch('https://cms.skorakhir.com/graphql', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query })
}).then(res => res.json()).then(data => console.log(JSON.stringify(data, null, 2))).catch(console.error);
