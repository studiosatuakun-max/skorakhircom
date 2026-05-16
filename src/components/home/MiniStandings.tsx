"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import SafeImage from '@/components/shared/SafeImage';

const LEAGUES = [
  { id: '274', name: 'Liga 1 (ID)' },
  { id: '39', name: 'Premier League' },
  { id: '140', name: 'La Liga' },
  { id: '135', name: 'Serie A' },
  { id: '78', name: 'Bundesliga' }
];

export default function MiniStandings() {
  const [activeLeague, setActiveLeague] = useState(LEAGUES[0]);
  const [standings, setStandings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStandings() {
      setLoading(true);
      try {
        const res = await fetch(`/api/standings?league=${activeLeague.id}`);
        if (res.ok) {
          const data = await res.json();
          // Ambil top 5 aja buat widget mini
          setStandings(data.slice(0, 5));
        }
      } catch (error) {
        console.error("Failed to fetch standings", error);
      } finally {
        setLoading(false);
      }
    }
    fetchStandings();
  }, [activeLeague.id]);

  return (
    <section className="mt-6 mb-8" aria-labelledby="mini-standings">
      <div className="flex items-center justify-between mb-4 border-b-2 border-white/20 pb-2">
        <h2 id="mini-standings" className="text-xl sm:text-2xl font-black italic tracking-tight uppercase text-white">
          Klasemen
        </h2>
        <Link href={`/liga/${activeLeague.id}`} className="text-xs font-bold text-orange-500 hover:text-orange-400 uppercase tracking-widest flex items-center gap-1 transition-colors">
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
        <div className="p-0 overflow-x-auto min-h-[250px] relative">
          {loading ? (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50">
              <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : null}
          
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
            <tbody className={loading ? 'opacity-50' : 'opacity-100'}>
              {standings.map((row: any) => (
                <tr 
                  key={row.team.id} 
                  className={`border-b border-slate-800/50 hover:bg-slate-800/50 transition-colors group
                    ${row.rank <= 3 ? 'border-l-2 border-l-blue-500' : 'border-l-2 border-l-transparent'}
                  `}
                >
                  <td className="py-3 px-4 text-xs font-bold text-slate-500 text-center group-hover:text-white transition-colors">{row.rank}</td>
                  <td className="py-3 px-4 text-sm font-bold text-slate-200 group-hover:text-orange-400 transition-colors flex items-center gap-2">
                    <div className="relative w-5 h-5 shrink-0 bg-white/10 rounded-full">
                      <SafeImage src={row.team.logo} alt={row.team.name} fill className="object-contain p-0.5" />
                    </div>
                    <span className="truncate">{row.team.name}</span>
                  </td>
                  <td className="py-3 px-4 text-xs font-medium text-slate-500 text-center">{row.all.played}</td>
                  <td className="py-3 px-4 text-xs font-medium text-slate-500 text-center">{row.goalsDiff > 0 ? `+${row.goalsDiff}` : row.goalsDiff}</td>
                  <td className="py-3 px-4 text-sm font-black text-white text-center">{row.points}</td>
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
