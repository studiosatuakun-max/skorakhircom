import { NextResponse } from 'next/server';
import { fetchApiSports } from '@/lib/api-sports';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const league = searchParams.get('league');
  const season = searchParams.get('season') || '2024';

  if (!league) {
    return NextResponse.json({ error: 'League ID is required' }, { status: 400 });
  }

  try {
    const standingsData = await fetchApiSports('/standings', { league, season });
    const standings = standingsData?.[0]?.league?.standings?.[0] || [];
    return NextResponse.json(standings);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch standings' }, { status: 500 });
  }
}
