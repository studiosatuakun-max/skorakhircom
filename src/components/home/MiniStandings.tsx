"use client";

import { useState } from 'react';
import Link from 'next/link';

const LEAGUES = [
  { id: 'liga-1', name: 'Super League (ID)' },
  { id: 'serie-a', name: 'Serie A' },
  { id: 'la-liga', name: 'La Liga' },
  { id: 'premier-league', name: 'Premier League' },
  { id: 'bundesliga', name: 'Bundesliga' },
  { id: 'world-cup', name: 'Piala Dunia 2026' },
  { id: 'ucl', name: 'Champion League' }
];

const generateMockStandings = (leagueName: string) => {
  const teams: Record<string, string[]> = {
    'Super League (ID)': ['Persib Bandung', 'Persija Jakarta', 'Bali United', 'Borneo FC', 'Persebaya'],
    'Premier League': ['Man City', 'Arsenal', 'Liverpool', 'Aston Villa', 'Tottenham'],
    'Serie A': ['Inter Milan', 'AC Milan', 'Juventus', 'Atalanta', 'Bologna'],
    'La Liga': ['Real Madrid', 'Barcelona', 'Girona', 'Atletico Madrid', 'Athletic Club'],
    'Bundesliga': ['Bayer Leverkusen', 'VfB Stuttgart', 'Bayern Munich', 'RB Leipzig', 'Dortmund'],
    'Champion League': ['Real Madrid', 'Dortmund', 'Bayern Munich', 'PSG', 'Man City'],
    'Piala Dunia 2026': ['Argentina', 'Prancis', 'Inggris', 'Brasil', 'Spanyol']
  };

  const selectedTeams = teams[leagueName] || teams['Premier League'];
  
  return selectedTeams.map((team, index) => ({
    pos: index + 1,
    team,
    played: leagueName.includes('Piala Dunia') || leagueName.includes('Champion') ? 6 : 38,
    gd: `+${20 - index * 3}`,
    pts: 90 - index * 5,
  }));
};

export default function MiniStandings() {
  const [activeLeague, setActiveLeague] = useState(LEAGUES[0]);

  const standings = generateMockStandings(activeLeague.name);

  return (
    <section className="mt-6 mb-8" aria-labelledby="mini-standings">
      <div className="flex items-center justify-between mb-4 border-b-2 border-white/20 pb-2">
        <h2 id="mini-standings" className="text-xl sm:text-2xl font-black italic tracking-tight uppercase text-white">
          Klasemen
        </h2>
        <Link href="#" className="text-xs font-bold text-orange-500 hover:text-orange-400 uppercase tracking-widest flex items-center gap-1 transition-colors">
          Detail
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
            <path d="m9 18 6-6-6-6"></path>
          </svg>
        </Link>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-sm overflow-hidden shadow-sm">
        {/* Tabs - Scrollable */}
        <div className="flex overflow-x-auto hide-scrollbar border-b border-slate-800 bg-slate-950/50">
          {LEAGUES.map((league) => (
            <button
              key={league.id}
              onClick={() => setActiveLeague(league)}
              className={`px-5 py-3 text-[10px] sm:text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-colors flex-shrink-0
                ${activeLeague.id === league.id 
                  ? 'text-orange-500 border-b-2 border-orange-500 bg-slate-800/80' 
                  : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/30'}`}
            >
              {league.name}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="p-0 overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[400px]">
            <thead>
              <tr className="bg-slate-950/80 text-[10px] font-black uppercase tracking-widest text-slate-500 border-b border-slate-800">
                <th className="py-3 px-4 w-12 text-center">#</th>
                <th className="py-3 px-4">Klub</th>
                <th className="py-3 px-4 text-center">P</th>
                <th className="py-3 px-4 text-center">GD</th>
                <th className="py-3 px-4 text-center text-white">Pts</th>
              </tr>
            </thead>
            <tbody>
              {standings.map((row) => (
                <tr 
                  key={row.pos} 
                  className={`border-b border-slate-800/50 hover:bg-slate-800/50 transition-colors group
                    ${row.pos <= 3 ? 'border-l-2 border-l-blue-500' : 'border-l-2 border-l-transparent'}
                  `}
                >
                  <td className="py-3 px-4 text-xs font-bold text-slate-500 text-center group-hover:text-white transition-colors">{row.pos}</td>
                  <td className="py-3 px-4 text-sm font-bold text-slate-200 group-hover:text-orange-400 transition-colors">{row.team}</td>
                  <td className="py-3 px-4 text-xs font-medium text-slate-500 text-center">{row.played}</td>
                  <td className="py-3 px-4 text-xs font-medium text-slate-500 text-center">{row.gd}</td>
                  <td className="py-3 px-4 text-sm font-black text-white text-center">{row.pts}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Custom CSS for hide-scrollbar so we don't need global css update */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}} />
    </section>
  );
}
