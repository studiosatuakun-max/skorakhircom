const API_URL = 'https://v3.football.api-sports.io';
const API_KEY = process.env.APISPORTS_KEY;

export async function fetchApiSports(endpoint: string, params: Record<string, string> = {}) {
  if (!API_KEY) {
    console.error('APISPORTS_KEY is not defined in environment variables');
    return null;
  }

  const searchParams = new URLSearchParams(params);
  const url = `${API_URL}${endpoint}?${searchParams.toString()}`;

  try {
    const res = await fetch(url, {
      headers: {
        'x-rapidapi-host': 'v3.football.api-sports.io',
        'x-rapidapi-key': API_KEY,
      },
      next: { revalidate: 300 } // Cache for 5 minutes (300s) to balance freshness and API limits
    });

    if (!res.ok) {
      console.error(`API-Sports Error: ${res.status}`);
      return null;
    }

    const data = await res.json();
    return data.response;
  } catch (error) {
    console.error('Error fetching from API-Sports:', error);
    return null;
  }
}
