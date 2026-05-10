const url = "http://cms.skorakhir.com/graphql";
fetch(url, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ query: "{ posts { nodes { title featuredImage { node { sourceUrl } } } } }" })
})
.then(res => res.json())
.then(res => console.log(JSON.stringify(res, null, 2)))
.catch(console.error);
