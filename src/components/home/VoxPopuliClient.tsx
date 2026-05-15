'use client';

import { useState } from 'react';
import { BarChart3, Share2 } from 'lucide-react';
import SafeImage from '@/components/shared/SafeImage';
import { votePoll } from '@/app/actions/polls';

type Poll = {
  id: number;
  question: string;
  team_a_name: string;
  team_a_logo: string;
  team_b_name: string;
  team_b_logo: string;
  votes_a: number;
  votes_b: number;
};

export default function VoxPopuliClient({ initialPolls }: { initialPolls: Poll[] }) {
  const [votesState, setVotesState] = useState<Record<number, { voted: boolean, selected: 'A' | 'B' | null, votesA: number, votesB: number }>>(
    initialPolls.reduce((acc, poll) => ({ ...acc, [poll.id]: { voted: false, selected: null, votesA: poll.votes_a, votesB: poll.votes_b } }), {})
  );

  const [isVoting, setIsVoting] = useState(false);

  const handleVote = async (pollId: number, team: 'A' | 'B') => {
    if (votesState[pollId].voted || isVoting) return;
    
    setIsVoting(true);
    
    // Optimistic update
    setVotesState(prev => {
      const current = prev[pollId];
      return {
        ...prev,
        [pollId]: {
          voted: true,
          selected: team,
          votesA: team === 'A' ? current.votesA + 1 : current.votesA,
          votesB: team === 'B' ? current.votesB + 1 : current.votesB,
        }
      };
    });

    const result = await votePoll(pollId, team);
    if (!result.success) {
      // Revert if failed
      setVotesState(prev => {
        const current = prev[pollId];
        return {
          ...prev,
          [pollId]: {
            voted: false,
            selected: null,
            votesA: team === 'A' ? current.votesA - 1 : current.votesA,
            votesB: team === 'B' ? current.votesB - 1 : current.votesB,
          }
        };
      });
      alert('Gagal mengirim suara. Silakan coba lagi.');
    }
    
    setIsVoting(false);
  };

  const handleShare = async (poll: Poll, state: any) => {
    const selectedTeam = state.selected === 'A' ? poll.team_a_name : poll.team_b_name;
    const shareUrl = `${window.location.origin}/polling/${poll.id}`;
    const shareText = `Gue pilih ${selectedTeam} untuk "${poll.question}" ⚽🔥 Gimana prediksi lu?`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Polling SkorAkhir',
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
      alert('Link berhasil disalin ke clipboard!');
    }
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
          {initialPolls.map((poll) => {
            const state = votesState[poll.id] || { voted: false, selected: null, votesA: poll.votes_a, votesB: poll.votes_b };
            const totalVotes = state.votesA + state.votesB;
            const percentageA = totalVotes === 0 ? 0 : Math.round((state.votesA / totalVotes) * 100);
            const percentageB = totalVotes === 0 ? 0 : 100 - percentageA;

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
                        disabled={state.voted || isVoting}
                        className={`w-full relative bg-slate-950 border p-3 flex items-center justify-between group overflow-hidden transition-colors disabled:opacity-100 disabled:cursor-default ${state.selected === 'A' ? 'border-orange-500' : 'border-slate-800 hover:border-slate-600'}`}
                      >
                        {state.voted && (
                          <div 
                            className="absolute left-0 top-0 bottom-0 bg-slate-800 transition-all duration-1000 ease-out z-0"
                            style={{ width: `${percentageA}%` }}
                          ></div>
                        )}
                        
                        <div className="flex items-center gap-3 relative z-10">
                          <div className="w-8 h-8 relative rounded-full bg-white p-1 flex-shrink-0">
                             <SafeImage src={poll.team_a_logo} alt={poll.team_a_name} fill className="object-contain p-1" />
                          </div>
                          <span className="font-bold text-xs sm:text-sm text-white uppercase tracking-wider">{poll.team_a_name}</span>
                        </div>

                        <span className={`relative z-10 font-black text-sm ${state.selected === 'A' ? 'text-orange-500' : (state.voted ? 'text-slate-300' : 'text-slate-500')}`}>
                          {state.voted ? `${percentageA}%` : 'VOTE'}
                        </span>
                      </button>

                      {/* Team B */}
                      <button 
                        onClick={() => handleVote(poll.id, 'B')}
                        disabled={state.voted || isVoting}
                        className={`w-full relative bg-slate-950 border p-3 flex items-center justify-between group overflow-hidden transition-colors disabled:opacity-100 disabled:cursor-default ${state.selected === 'B' ? 'border-orange-500' : 'border-slate-800 hover:border-slate-600'}`}
                      >
                        {state.voted && (
                          <div 
                            className="absolute left-0 top-0 bottom-0 bg-slate-800 transition-all duration-1000 ease-out z-0"
                            style={{ width: `${percentageB}%` }}
                          ></div>
                        )}
                        
                        <div className="flex items-center gap-3 relative z-10">
                          <div className="w-8 h-8 relative rounded-full bg-white p-1 flex-shrink-0">
                             <SafeImage src={poll.team_b_logo} alt={poll.team_b_name} fill className="object-contain p-1" />
                          </div>
                          <span className="font-bold text-xs sm:text-sm text-white uppercase tracking-wider">{poll.team_b_name}</span>
                        </div>

                        <span className={`relative z-10 font-black text-sm ${state.selected === 'B' ? 'text-orange-500' : (state.voted ? 'text-slate-300' : 'text-slate-500')}`}>
                          {state.voted ? `${percentageB}%` : 'VOTE'}
                        </span>
                      </button>
                    </div>
                  </div>
                  
                  {state.voted ? (
                    <div className="flex flex-col items-center gap-3 mt-6">
                      <p className="text-center text-[10px] font-bold text-orange-500 uppercase tracking-widest">
                        Terima kasih atas suaramu
                      </p>
                      <button 
                        onClick={() => handleShare(poll, state)}
                        className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-full text-xs font-bold transition-all active:scale-95 border border-slate-700"
                      >
                        <Share2 className="w-3 h-3" />
                        Bagikan Hasil
                      </button>
                    </div>
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
