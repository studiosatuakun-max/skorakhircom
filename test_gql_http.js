const url = "http://cms.skorakhir.com/graphql";
fetch(url, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ query: "{ posts { nodes { title slug } } }" })
})
.then(res => res.json())
.then(console.log)
.catch(console.error);
