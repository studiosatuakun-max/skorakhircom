import { NextResponse } from 'next/server';

// Set cache revalidation time to 15 minutes (900 seconds) 
// to prevent exceeding the 100 requests/day limit on the free tier.
export const revalidate = 900; 

export async function GET() {
  const apiKey = process.env.APISPORTS_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
  }

  try {
    const response = await fetch('https://v3.football.api-sports.io/fixtures?live=all', {
      method: 'GET',
      headers: {
        'x-apisports-key': apiKey,
        'x-apisports-host': 'v3.football.api-sports.io',
      },
      next: { revalidate: 900 } // Double check caching here as well
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Livescore fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch live scores' }, { status: 500 });
  }
}
