'use client';

import { useState } from 'react';
import { BarChart3 } from 'lucide-react';
import SafeImage from '@/components/shared/SafeImage';

const pollsData = [
  {
    id: 1,
    question: "Siapa yang bakal menang di El Clasico akhir pekan ini?",
    teamA: { id: 'A1', name: "Real Madrid", logo: "https://media.api-sports.io/football/teams/541.png" },
    teamB: { id: 'B1', name: "Barcelona", logo: "https://media.api-sports.io/football/teams/529.png" },
    initialVotes: { A: 45, B: 55 }
  },
  {
    id: 2,
    question: "Siapa juara Premier League musim ini?",
    teamA: { id: 'A2', name: "Man City", logo: "https://media.api-sports.io/football/teams/50.png" },
    teamB: { id: 'B2', name: "Arsenal", logo: "https://media.api-sports.io/football/teams/42.png" },
    initialVotes: { A: 60, B: 40 }
  },
  {
    id: 3,
    question: "Timnas Indonesia vs Arab Saudi, prediksi poin?",
    teamA: { id: 'A3', name: "Menang", logo: "https://media.api-sports.io/football/teams/1066.png" },
    teamB: { id: 'B3', name: "Imbang/Kalah", logo: "https://media.api-sports.io/football/teams/22.png" },
    initialVotes: { A: 75, B: 25 }
  },
  {
    id: 4,
    question: "Derby della Madonnina: Siapa penguasa Milan?",
    teamA: { id: 'A4', name: "AC Milan", logo: "https://media.api-sports.io/football/teams/489.png" },
    teamB: { id: 'B4', name: "Inter", logo: "https://media.api-sports.io/football/teams/505.png" },
    initialVotes: { A: 48, B: 52 }
  }
];

export default function VoxPopuli() {
  const [votesState, setVotesState] = useState<Record<number, { voted: boolean, selected: string | null, percentages: { A: number, B: number } }>>(
    pollsData.reduce((acc, poll) => ({ ...acc, [poll.id]: { voted: false, selected: null, percentages: poll.initialVotes } }), {})
  );

  const handleVote = (pollId: number, team: 'A' | 'B') => {
    if (votesState[pollId].voted) return;
    
    setVotesState(prev => {
      const current = prev[pollId];
      let newA = current.percentages.A;
      let newB = current.percentages.B;
      
      if (team === 'A') {
        newA += 5;
        newB -= 5;
      } else {
        newB += 5;
        newA -= 5;
      }
      
      return {
        ...prev,
        [pollId]: {
          voted: true,
          selected: team,
          percentages: { A: Math.min(100, Math.max(0, newA)), B: Math.min(100, Math.max(0, newB)) }
        }
      };
    });
  };

  return (
    <section aria-labelledby="vox-populi-title" className="mt-12 mb-8">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></div>
        <h2 id="vox-populi-title" className="text-xl sm:text-2xl font-black italic tracking-tight uppercase text-white">
          Vox Populi <span className="text-orange-500">Polling</span>
        </h2>
      </div>

      <div className="overflow-x-auto w-full pb-6 scrollbar-hide snap-x snap-mandatory">
        <div className="flex gap-6 w-max">
          {pollsData.map((poll) => {
            const state = votesState[poll.id];
            return (
              <div key={poll.id} className="w-[300px] sm:w-[400px] shrink-0 snap-start">
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 relative overflow-hidden shadow-lg h-full flex flex-col justify-between group/card transition-colors hover:border-slate-700">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 blur-3xl rounded-full pointer-events-none transition-opacity opacity-50 group-hover/card:opacity-100"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-4">
                      <BarChart3 className="w-4 h-4 text-orange-500" />
                      <span className="text-[10px] font-black tracking-widest uppercase text-slate-400">Trending Poll</span>
                    </div>

                    <p className="text-white font-bold text-sm sm:text-base mb-6 leading-relaxed min-h-[48px]">
                      {poll.question}
                    </p>

                    <div className="space-y-4">
                      {/* Team A */}
                      <button 
                        onClick={() => handleVote(poll.id, 'A')}
                        disabled={state.voted}
                        className={`w-full relative bg-slate-950 border p-3 flex items-center justify-between group overflow-hidden transition-colors disabled:opacity-100 disabled:cursor-default ${state.selected === 'A' ? 'border-orange-500' : 'border-slate-800 hover:border-slate-600'}`}
                      >
                        {state.voted && (
                          <div 
                            className="absolute left-0 top-0 bottom-0 bg-slate-800 transition-all duration-1000 ease-out z-0"
                            style={{ width: `${state.percentages.A}%` }}
                          ></div>
                        )}
                        
                        <div className="flex items-center gap-3 relative z-10">
                          <div className="w-8 h-8 relative rounded-full bg-white p-1 flex-shrink-0">
                             <SafeImage src={poll.teamA.logo} alt={poll.teamA.name} fill className="object-contain p-1" />
                          </div>
                          <span className="font-bold text-xs sm:text-sm text-white uppercase tracking-wider">{poll.teamA.name}</span>
                        </div>

                        <span className={`relative z-10 font-black text-sm ${state.selected === 'A' ? 'text-orange-500' : (state.voted ? 'text-slate-300' : 'text-slate-500')}`}>
                          {state.voted ? `${state.percentages.A}%` : 'VOTE'}
                        </span>
                      </button>

                      {/* Team B */}
                      <button 
                        onClick={() => handleVote(poll.id, 'B')}
                        disabled={state.voted}
                        className={`w-full relative bg-slate-950 border p-3 flex items-center justify-between group overflow-hidden transition-colors disabled:opacity-100 disabled:cursor-default ${state.selected === 'B' ? 'border-orange-500' : 'border-slate-800 hover:border-slate-600'}`}
                      >
                        {state.voted && (
                          <div 
                            className="absolute left-0 top-0 bottom-0 bg-slate-800 transition-all duration-1000 ease-out z-0"
                            style={{ width: `${state.percentages.B}%` }}
                          ></div>
                        )}
                        
                        <div className="flex items-center gap-3 relative z-10">
                          <div className="w-8 h-8 relative rounded-full bg-white p-1 flex-shrink-0">
                             <SafeImage src={poll.teamB.logo} alt={poll.teamB.name} fill className="object-contain p-1" />
                          </div>
                          <span className="font-bold text-xs sm:text-sm text-white uppercase tracking-wider">{poll.teamB.name}</span>
                        </div>

                        <span className={`relative z-10 font-black text-sm ${state.selected === 'B' ? 'text-orange-500' : (state.voted ? 'text-slate-300' : 'text-slate-500')}`}>
                          {state.voted ? `${state.percentages.B}%` : 'VOTE'}
                        </span>
                      </button>
                    </div>
                  </div>
                  
                  {state.voted ? (
                    <p className="text-center text-[10px] font-bold text-orange-500 uppercase tracking-widest mt-6">
                      Terima kasih atas suaramu
                    </p>
                  ) : (
                    <p className="text-center text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-6">
                      Pilih tim jagoanmu
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
