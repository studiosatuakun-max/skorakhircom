const fs = require('fs');
async function test() {
  const headers = { 'x-apisports-key': 'cf990e84d82062179acf934c5692c00d' };
  
  // Find Serie A
  let res = await fetch('https://v3.football.api-sports.io/leagues?name=Serie A&country=Italy', { headers });
  let data = await res.json();
  console.log('Serie A:', data.response[0]?.league?.id, data.response[0]?.seasons?.slice(-2));

  // Find Liga 1
  res = await fetch('https://v3.football.api-sports.io/leagues?country=Indonesia', { headers });
  data = await res.json();
  const liga1 = data.response.find(l => l.league.name.includes('Liga 1'));
  console.log('Liga 1:', liga1?.league?.id, liga1?.seasons?.slice(-2));
}
test();
