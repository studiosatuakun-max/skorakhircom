import { Trophy, Clock } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export const revalidate = 10; // Cache refresh every 10 seconds for relatively fast live scores if SSR

export default async function LiveScoreboard() {
  const { data: liveMatches, error } = await supabase
    .from('matches')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(10);

  if (error || !liveMatches || liveMatches.length === 0) {
    return null; // Don't show scoreboard if there's no match
  }

  // Duplicate matches so the marquee loops seamlessly
  const marqueeMatches = [...liveMatches, ...liveMatches, ...liveMatches];

  return (
    <section aria-labelledby="live-scores">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></div>
        <h2 id="live-scores" className="text-xl font-black italic tracking-tight uppercase">Live Scoreboard</h2>
      </div>

      <div className="overflow-hidden relative w-full flex">
        {/* Fading Edges Make It Look Sleeker */}
        <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none"></div>
        
        <div className="flex animate-marquee items-center gap-4 hover:[animation-play-state:paused] w-max">
          {marqueeMatches.map((match, index) => (
            <div key={`${match.id}-${index}`} className="w-72 sm:w-80 shrink-0 bg-slate-900 border border-slate-800 p-4 shadow-sm relative overflow-hidden group hover:border-yellow-400 transition-colors cursor-pointer select-none">
              <div className="flex justify-between items-center mb-4 text-xs font-bold text-slate-500">
                <span className="flex items-center gap-1">
                  <Trophy className="w-3 h-3 text-yellow-400" />
                  {match.league}
                </span>
                <span className="flex items-center gap-1 text-red-600">
                  <Clock className="w-3 h-3" />
                  {match.match_minute}
                </span>
              </div>
              
              <div className="space-y-3 font-bold text-slate-50 text-sm sm:text-base">
                <div className="flex justify-between items-center">
                  <span className="truncate pr-4">{match.home_team}</span>
                  <span className="text-lg sm:text-xl">{match.home_score}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="truncate pr-4">{match.away_team}</span>
                  <span className="text-lg sm:text-xl">{match.away_score}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
