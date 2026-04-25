import React from 'react';
import { supabase } from '@/lib/supabase';
import { createMatch, updateScore, deleteMatch } from '@/app/actions/matches';
import { Plus, Trash2, RefreshCw } from 'lucide-react';

export const revalidate = 0;

export default async function LiveScoreAdmin() {
  const { data: matches, error } = await supabase
    .from('matches')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black italic tracking-tight text-white">Live Score Operator</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Kolom Kiri: Form Tambah Match Baru */}
        <div className="lg:col-span-4 self-start bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h2 className="text-sm font-black uppercase text-slate-300 tracking-widest mb-6">Buka Pertandingan Baru</h2>
          <form action={createMatch} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1">Liga / Kompetisi</label>
              <input type="text" name="league" required placeholder="Contoh: Liga 1, Premier League" className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-red-500" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">Tim Kandang</label>
                <input type="text" name="home_team" required placeholder="Persib" className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-red-500" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">Tim Tandang</label>
                <input type="text" name="away_team" required placeholder="Persija" className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-red-500" />
              </div>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <input type="checkbox" name="is_local_pride" id="is_local" className="w-4 h-4 accent-yellow-400 bg-slate-950" />
              <label htmlFor="is_local" className="text-xs font-bold text-slate-300">Tandai Garuda Pride</label>
            </div>
            
            <button type="submit" className="w-full flex justify-center items-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2 rounded font-black text-xs tracking-widest uppercase transition-colors uppercase mt-4">
              <Plus className="w-4 h-4" /> Mulai Live Match
            </button>
          </form>
        </div>

        {/* Kolom Kanan: Daftar Match dan Updater (Inline Form) */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden p-6">
          <h2 className="text-sm font-black uppercase text-slate-300 tracking-widest mb-6">Pertandingan Aktif</h2>
          
          <div className="space-y-4">
            {error && <p className="text-red-500 text-sm font-bold bg-red-950/50 p-4 rounded">{error.message}</p>}
            {matches?.length === 0 && <p className="text-slate-500 text-xs font-bold">Belum ada pertandingan berjalan.</p>}
            
            {matches?.map((match) => (
              <form key={match.id} action={updateScore.bind(null, match.id)} className="flex items-center gap-4 bg-slate-950 border border-slate-800 p-4 rounded-xl relative">
                
                {/* Tampilan Tim */}
                <div className="w-1/3">
                  <p className="text-[10px] font-bold text-slate-500 uppercase">{match.league}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm font-black text-white text-right w-1/2 truncate">{match.home_team}</span>
                    <span className="text-[10px] text-slate-600 font-bold">VS</span>
                    <span className="text-sm font-black text-white text-left w-1/2 truncate">{match.away_team}</span>
                  </div>
                </div>

                {/* Input Kontrol Skor */}
                <div className="flex-1 flex gap-2">
                  <input type="number" name="home_score" defaultValue={match.home_score} className="w-12 h-10 text-center font-black text-xl bg-slate-900 border border-yellow-400/30 text-yellow-400 rounded focus:outline-none focus:border-yellow-400" />
                  <span className="flex items-center text-slate-500 font-bold">-</span>
                  <input type="number" name="away_score" defaultValue={match.away_score} className="w-12 h-10 text-center font-black text-xl bg-slate-900 border border-yellow-400/30 text-yellow-400 rounded focus:outline-none focus:border-yellow-400" />
                </div>

                <div className="flex flex-col gap-2 w-24">
                  <input type="text" name="match_minute" defaultValue={match.match_minute} placeholder="Menit" className="w-full text-center text-xs font-bold bg-slate-900 border border-slate-800 rounded py-1 text-slate-300" />
                  <select name="status" defaultValue={match.status} className="w-full text-center text-[10px] uppercase font-bold bg-slate-900 border border-slate-800 rounded py-1 text-slate-300">
                    <option value="LIVE">LIVE</option>
                    <option value="HT">HT</option>
                    <option value="FT">FT</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2 ml-auto">
                  <button type="submit" className="bg-yellow-400 hover:bg-yellow-500 text-slate-900 p-2 rounded flex items-center justify-center transition-colors" title="Update Skor (Tayang di Homepage)">
                    <RefreshCw className="w-4 h-4" />
                  </button>
                  <button formAction={deleteMatch.bind(null, match.id)} className="bg-slate-800 hover:bg-red-900 text-red-500 p-2 rounded flex items-center justify-center transition-colors" title="Hapus Pertandingan">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </form>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
