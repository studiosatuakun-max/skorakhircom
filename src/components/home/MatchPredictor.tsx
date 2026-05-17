'use client';

import { useState } from 'react';
import { Trophy, CheckCircle2 } from 'lucide-react';

export default function MatchPredictor() {
  const [voted, setVoted] = useState<string | null>(null);

  const teamA = { name: "Timnas Indonesia", logo: "🇮🇩", score: 78 };
  const teamB = { name: "Vietnam", logo: "🇻🇳", score: 22 };

  const handleVote = (team: string) => {
    if (voted) return;
    setVoted(team);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 sm:p-6 relative overflow-hidden group shadow-lg mb-6">
      {/* Glow effect */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl -z-10 group-hover:bg-orange-500/20 transition-colors"></div>
      
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-black italic uppercase tracking-wider text-white flex items-center gap-2">
          <Trophy className="w-4 h-4 text-orange-500" />
          Prediksi Big Match
        </h3>
        <span className="text-[10px] font-bold text-slate-400 bg-slate-950 px-2 py-1 rounded">HARI INI</span>
      </div>

      <div className="text-sm font-bold text-slate-300 mb-4">Siapa yang akan menang malam ini?</div>

      <div className="flex flex-col gap-3 relative z-10">
        {/* Team A Button */}
        <button 
          onClick={() => handleVote('A')}
          disabled={voted !== null}
          className={`relative w-full p-3 rounded-lg flex justify-between items-center border transition-all overflow-hidden
            ${voted === 'A' ? 'border-orange-500 bg-orange-500/10' : 
              voted !== null ? 'border-slate-800 bg-slate-950 opacity-50' : 
              'border-slate-700 bg-slate-800 hover:border-orange-400'}`}
        >
          {voted && (
             <div 
               className="absolute top-0 left-0 h-full bg-orange-500/20 z-0 transition-all duration-1000 ease-out"
               style={{ width: voted ? \`\${teamA.score}%\` : '0%' }}
             ></div>
          )}
          <div className="relative z-10 flex items-center gap-2">
            <span className="text-xl">{teamA.logo}</span>
            <span className="font-bold text-white">{teamA.name}</span>
          </div>
          {voted ? (
            <span className="relative z-10 font-black italic text-orange-400">{teamA.score}%</span>
          ) : (
            <span className="relative z-10 w-4 h-4 rounded-full border-2 border-slate-500"></span>
          )}
        </button>

        {/* Team B Button */}
        <button 
          onClick={() => handleVote('B')}
          disabled={voted !== null}
          className={`relative w-full p-3 rounded-lg flex justify-between items-center border transition-all overflow-hidden
            ${voted === 'B' ? 'border-orange-500 bg-orange-500/10' : 
              voted !== null ? 'border-slate-800 bg-slate-950 opacity-50' : 
              'border-slate-700 bg-slate-800 hover:border-orange-400'}`}
        >
          {voted && (
             <div 
               className="absolute top-0 left-0 h-full bg-slate-600/30 z-0 transition-all duration-1000 ease-out"
               style={{ width: voted ? \`\${teamB.score}%\` : '0%' }}
             ></div>
          )}
          <div className="relative z-10 flex items-center gap-2">
            <span className="text-xl">{teamB.logo}</span>
            <span className="font-bold text-white">{teamB.name}</span>
          </div>
          {voted ? (
            <span className="relative z-10 font-black italic text-slate-300">{teamB.score}%</span>
          ) : (
            <span className="relative z-10 w-4 h-4 rounded-full border-2 border-slate-500"></span>
          )}
        </button>
      </div>

      {voted && (
        <div className="mt-4 flex items-center gap-2 text-xs font-bold text-green-400 animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4" /> Suara kamu berhasil direkam!
        </div>
      )}
    </div>
  );
}
