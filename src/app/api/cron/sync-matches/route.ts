import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// URL API-Football via API-Sports
const API_URL = 'https://v3.football.api-sports.io/fixtures?live=all';

export async function GET(request: Request) {
  // 1. Verifikasi Cron Secret (Keamanan agar tidak bisa di-hit sembarangan)
  const authHeader = request.headers.get('authorization');
  if (
    process.env.CRON_SECRET &&
    authHeader !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return new Response('Unauthorized', { status: 401 });
  }

  if (!process.env.APISPORTS_KEY) {
    return new Response('API Key missing', { status: 500 });
  }

  try {
    // 2. Fetch data dari API-Football
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'x-apisports-key': process.env.APISPORTS_KEY,
      },
      // Jangan di-cache, karena ini cron job
      cache: 'no-store',
    });

    const data = await response.json();

    if (!data.response) {
      throw new Error('Invalid response from API');
    }

    // Ambil max 10 pertandingan live (bisa disesuaikan filter liganya)
    const liveFixtures = data.response.slice(0, 10);

    // 3. Mapping data ke skema tabel 'matches' kita
    // Hapus dulu data live hasil fetch sebelumnya (asumsi: kita timpa dengan data baru)
    // Untuk membedakan mana manual & otomatis, idealnya ada kolom external_id, 
    // tapi karena belum ada, kita bisa asumsikan semua is_local_pride = false 
    // akan di-manage oleh API ini (sebagai opsi sederhana).
    
    // Hapus data match non-local pride yang sebelumnya
    await supabase
      .from('matches')
      .delete()
      .eq('is_local_pride', false);

    const formattedMatches = liveFixtures.map((fixture: any) => ({
      home_team: fixture.teams.home.name,
      away_team: fixture.teams.away.name,
      home_score: fixture.goals.home ?? 0,
      away_score: fixture.goals.away ?? 0,
      league: fixture.league.name,
      match_minute: `${fixture.fixture.status.elapsed}'`,
      status: 'LIVE',
      is_local_pride: false,
    }));

    // Insert data baru
    if (formattedMatches.length > 0) {
      const { error } = await supabase
        .from('matches')
        .insert(formattedMatches);

      if (error) throw new Error(error.message);
    }

    return NextResponse.json({
      success: true,
      message: `Synced ${formattedMatches.length} matches`,
    });
  } catch (error: any) {
    console.error('Error syncing matches:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
