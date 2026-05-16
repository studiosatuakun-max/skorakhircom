import React from 'react';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import SafeImage from '@/components/shared/SafeImage';
import Link from 'next/link';
import { fetchApiSports } from '@/lib/api-sports';
import { Trophy, Calendar, Users, BarChart3, ChevronLeft } from 'lucide-react';

export const revalidate = 300;

export default async function LeagueHubPage({ 
  params,
  searchParams
}: { 
  params: Promise<{ id: string }>,
  searchParams: Promise<{ tab?: string }>
}) {
  const { id } = await params;
  const { tab = 'standings' } = await searchParams;
  const currentSeason = 2025; // 2025 in API-Sports refers to the 2025/2026 season

  // Fetch League Info
  const leagueData = await fetchApiSports('/leagues', { id });
  const league = leagueData?.[0]?.league || null;
  const country = leagueData?.[0]?.country || null;

  if (!league) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
          <h1 className="text-3xl text-white font-black italic">Liga Tidak Ditemukan</h1>
          <Link href="/" className="mt-4 text-orange-500 font-bold hover:text-white">Kembali ke Beranda</Link>
        </main>
        <Footer />
      </>
    );
  }

  // Fetch data based on active tab
  let tabContent = null;

  if (tab === 'standings') {
    const standingsData = await fetchApiSports('/standings', { league: id, season: currentSeason.toString() });
    const standings = standingsData?.[0]?.league?.standings?.[0] || [];

    tabContent = (
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-slate-900 text-slate-400 font-bold uppercase tracking-wider text-[10px] sm:text-xs">
            <tr>
              <th className="px-3 py-4 rounded-tl-lg">Pos</th>
              <th className="px-3 py-4">Klub</th>
              <th className="px-2 py-4 text-center">MN</th>
              <th className="px-2 py-4 text-center">M</th>
              <th className="px-2 py-4 text-center">S</th>
              <th className="px-2 py-4 text-center">K</th>
              <th className="px-2 py-4 text-center">SG</th>
              <th className="px-3 py-4 text-center rounded-tr-lg font-black text-orange-500">Poin</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {standings.map((team: any) => (
              <tr key={team.team.id} className="hover:bg-slate-900/50 transition-colors group">
                <td className="px-3 py-4">
                  <span className={`flex items-center justify-center w-6 h-6 rounded font-black text-xs ${
                    team.rank <= 4 ? 'bg-orange-500 text-slate-900' : 
                    team.rank >= standings.length - 2 ? 'bg-red-500 text-white' : 
                    'bg-slate-800 text-slate-400'
                  }`}>
                    {team.rank}
                  </span>
                </td>
                <td className="px-3 py-4 font-bold flex items-center gap-3">
                  <div className="relative w-6 h-6 sm:w-8 sm:h-8">
                    <SafeImage src={team.team.logo} alt={team.team.name} fill className="object-contain" />
                  </div>
                  <span className="text-white group-hover:text-orange-400 transition-colors">{team.team.name}</span>
                </td>
                <td className="px-2 py-4 text-center text-slate-400">{team.all.played}</td>
                <td className="px-2 py-4 text-center text-emerald-400">{team.all.win}</td>
                <td className="px-2 py-4 text-center text-slate-400">{team.all.draw}</td>
                <td className="px-2 py-4 text-center text-red-400">{team.all.lose}</td>
                <td className="px-2 py-4 text-center text-slate-400">{team.goalsDiff}</td>
                <td className="px-3 py-4 text-center font-black text-white text-base">{team.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  } else if (tab === 'matches') {
    // Fetch next 10 fixtures
    const fixturesData = await fetchApiSports('/fixtures', { league: id, season: currentSeason.toString(), next: '15' });
    const fixtures = fixturesData || [];

    tabContent = (
      <div className="flex flex-col gap-3">
        {fixtures.length === 0 ? (
          <div className="text-center py-10 text-slate-500 font-bold">Belum ada jadwal pertandingan.</div>
        ) : (
          fixtures.map((match: any) => (
            <div key={match.fixture.id} className="flex flex-col sm:flex-row items-center justify-between bg-slate-900 border border-slate-800 p-4 rounded-xl hover:border-slate-600 transition-colors">
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 sm:mb-0 w-full sm:w-32 text-center sm:text-left">
                {new Date(match.fixture.date).toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'short' })}
                <br/>
                <span className="text-orange-500">{new Date(match.fixture.date).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB</span>
              </div>
              
              <div className="flex items-center justify-center gap-4 flex-1 w-full">
                <div className="flex items-center gap-3 justify-end flex-1">
                  <span className="font-bold text-sm sm:text-base text-right text-white">{match.teams.home.name}</span>
                  <div className="relative w-8 h-8 shrink-0">
                    <SafeImage src={match.teams.home.logo} alt={match.teams.home.name} fill className="object-contain" />
                  </div>
                </div>
                
                <div className="bg-slate-950 px-4 py-1.5 rounded-lg border border-slate-800 font-black text-slate-400 text-sm">
                  VS
                </div>
                
                <div className="flex items-center gap-3 justify-start flex-1">
                  <div className="relative w-8 h-8 shrink-0">
                    <SafeImage src={match.teams.away.logo} alt={match.teams.away.name} fill className="object-contain" />
                  </div>
                  <span className="font-bold text-sm sm:text-base text-left text-white">{match.teams.away.name}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    );
  } else if (tab === 'stats') {
    // Fetch Top Scorers
    const topscorersData = await fetchApiSports('/players/topscorers', { league: id, season: currentSeason.toString() });
    const topscorers = topscorersData?.slice(0, 10) || [];

    tabContent = (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
          <div className="bg-slate-950 p-4 border-b border-slate-800">
            <h3 className="font-black italic text-orange-500 uppercase tracking-widest text-sm flex items-center gap-2">
              <Trophy className="w-4 h-4" /> Top Skor
            </h3>
          </div>
          <div className="p-4 flex flex-col gap-4">
            {topscorers.map((item: any, idx: number) => (
              <div key={item.player.id} className="flex items-center justify-between border-b border-slate-800/50 pb-3 last:border-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <span className={`font-black text-sm w-5 text-center ${idx < 3 ? 'text-orange-500' : 'text-slate-500'}`}>
                    {idx + 1}
                  </span>
                  <div className="relative w-10 h-10 rounded-full overflow-hidden bg-slate-800 border border-slate-700">
                    <SafeImage src={item.player.photo} alt={item.player.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">{item.player.name}</h4>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <div className="relative w-3 h-3">
                        <SafeImage src={item.statistics[0].team.logo} alt={item.statistics[0].team.name} fill className="object-contain" />
                      </div>
                      <span className="text-[10px] text-slate-400 uppercase">{item.statistics[0].team.name}</span>
                    </div>
                  </div>
                </div>
                <div className="font-black text-xl text-white bg-slate-950 w-10 h-10 flex items-center justify-center rounded-lg border border-slate-800">
                  {item.statistics[0].goals.total}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'standings', label: 'Klasemen', icon: BarChart3 },
    { id: 'matches', label: 'Pertandingan', icon: Calendar },
    { id: 'stats', label: 'Statistik', icon: Users },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-950 pb-20">
        {/* League Hero Header */}
        <div className="relative bg-slate-900 border-b border-slate-800 pt-8 pb-12 overflow-hidden">
          {/* Background pattern/gradient */}
          <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/10 via-slate-900 to-slate-900"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <Link href="/" className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-bold text-slate-500 hover:text-orange-500 uppercase tracking-widest mb-6 transition-colors">
              <ChevronLeft className="w-4 h-4" /> Beranda
            </Link>
            
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 bg-white rounded-2xl p-4 shadow-2xl border-4 border-slate-800">
                <SafeImage src={league.logo} alt={league.name} fill className="object-contain p-2" />
              </div>
              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                  <div className="relative w-4 h-4 rounded-sm overflow-hidden">
                    <SafeImage src={country.flag || '/images/placeholder.png'} alt={country.name} fill className="object-cover" />
                  </div>
                  <span className="text-xs font-bold text-orange-500 uppercase tracking-widest">{country.name}</span>
                </div>
                <h1 className="text-3xl sm:text-5xl font-black italic text-white tracking-tighter uppercase mb-2">
                  {league.name}
                </h1>
                <p className="text-slate-400 font-medium">Musim {currentSeason}/{currentSeason+1}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
          <div className="container mx-auto px-4">
            <div className="flex overflow-x-auto hide-scrollbar">
              {tabs.map((t) => {
                const Icon = t.icon;
                const isActive = tab === t.id;
                return (
                  <Link 
                    key={t.id} 
                    href={`/liga/${id}?tab=${t.id}`}
                    className={`flex items-center gap-2 px-6 py-4 font-bold text-sm sm:text-base uppercase tracking-widest whitespace-nowrap transition-colors border-b-2 ${
                      isActive 
                        ? 'border-orange-500 text-orange-500' 
                        : 'border-transparent text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" /> {t.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Tab Content Area */}
        <div className="container mx-auto px-4 mt-8">
          <div className="bg-slate-950 rounded-2xl">
            {tabContent}
          </div>
        </div>

        <style dangerouslySetInnerHTML={{__html: `
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}} />
      </main>
      <Footer />
    </>
  );
}
