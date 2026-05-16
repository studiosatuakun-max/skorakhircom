import Link from 'next/link';

const MOCK_MATCHES = [
  {
    id: 1,
    league: 'Premier League',
    status: 'FT',
    home: { name: 'Man City', short: 'MCI', score: 3 },
    away: { name: 'Arsenal', short: 'ARS', score: 1 },
    date: 'Hari ini',
  },
  {
    id: 2,
    league: 'La Liga',
    status: '22:00',
    home: { name: 'Real Madrid', short: 'RMA', score: null },
    away: { name: 'Barcelona', short: 'BAR', score: null },
    date: 'Besok',
  },
  {
    id: 3,
    league: 'Serie A',
    status: 'FT',
    home: { name: 'AC Milan', short: 'MIL', score: 2 },
    away: { name: 'Inter', short: 'INT', score: 2 },
    date: 'Kemarin',
  }
];

export default function MatchCenter() {
  return (
    <section className="mt-6 mb-2" aria-labelledby="match-center">
      <div className="flex items-center justify-between mb-4 border-b-2 border-white/20 pb-2">
        <h2 id="match-center" className="text-xl sm:text-2xl font-black italic tracking-tight uppercase text-white">
          Papan Skor
        </h2>
        <Link href="#" className="text-xs font-bold text-orange-500 hover:text-orange-400 uppercase tracking-widest flex items-center gap-1 transition-colors">
          Lihat Semua
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
            <path d="M5 12h14"></path>
            <path d="m12 5 7 7-7 7"></path>
          </svg>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {MOCK_MATCHES.map((match) => (
          <div key={match.id} className="bg-slate-900 border border-slate-800 p-4 hover:border-slate-600 transition-colors flex flex-col justify-between cursor-pointer group rounded-sm shadow-sm hover:shadow-md">
            <div className="flex justify-between items-center mb-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">
              <span>{match.league}</span>
              <span className={match.status === 'FT' ? 'text-slate-400' : 'text-orange-500 animate-pulse'}>
                {match.status}
              </span>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-[9px] font-black text-slate-400 group-hover:bg-slate-700 transition-colors shadow-inner">
                    {match.home.short}
                  </div>
                  <span className="font-bold text-sm text-slate-200">{match.home.name}</span>
                </div>
                <span className="font-black text-lg text-white">
                  {match.home.score !== null ? match.home.score : '-'}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-[9px] font-black text-slate-400 group-hover:bg-slate-700 transition-colors shadow-inner">
                    {match.away.short}
                  </div>
                  <span className="font-bold text-sm text-slate-200">{match.away.name}</span>
                </div>
                <span className="font-black text-lg text-white">
                  {match.away.score !== null ? match.away.score : '-'}
                </span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/50 text-[10px] font-bold text-slate-600 text-center uppercase tracking-widest">
              {match.date}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
