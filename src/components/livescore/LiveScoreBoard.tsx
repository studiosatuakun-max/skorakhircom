'use client';

import React, { useEffect, useState } from 'react';
import { RefreshCw, AlertCircle, Clock, Trophy } from 'lucide-react';
import SafeImage from '@/components/shared/SafeImage';

export default function LiveScoreBoard() {
  const [fixtures, setFixtures] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchLiveScores = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/livescore');
      if (!res.ok) throw new Error('Gagal mengambil data live score');
      
      const data = await res.json();
      if (data.errors && data.errors.requests) {
        throw new Error(data.errors.requests); // Tangani error limit API
      }
      
      setFixtures(data.response || []);
      setLastUpdated(new Date());
      setError(null);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Terjadi kesalahan sistem.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveScores();
    // Auto refresh client side every 15 minutes to match backend cache
    const interval = setInterval(fetchLiveScores, 15 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full">
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 pb-4 border-b border-slate-800 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full mb-3">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest">Live Now</span>
          </div>
          <h2 className="text-2xl font-black italic text-white uppercase tracking-tight">Skor Sementara</h2>
          <p className="text-sm text-slate-400 mt-1">Pantau hasil pertandingan yang sedang berlangsung.</p>
        </div>
        
        <div className="flex items-center gap-3">
          {lastUpdated && (
            <span className="text-xs text-slate-500">
              Update: {lastUpdated.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
            </span>
          )}
          <button 
            onClick={fetchLiveScores} 
            disabled={loading}
            className="flex items-center gap-2 bg-slate-900 border border-slate-700 hover:border-orange-500 hover:text-orange-500 text-slate-300 px-4 py-2 rounded-lg font-bold text-xs uppercase transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-orange-500' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* ERROR STATE */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 p-6 rounded-xl flex items-start gap-4 mb-8">
          <AlertCircle className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
          <div>
            <h3 className="text-red-500 font-bold mb-1">Gagal Memuat Data</h3>
            <p className="text-red-400/80 text-sm">{error}</p>
            <p className="text-red-400/60 text-xs mt-2 italic">*Jika ini karena limit harian (100 req/day), mohon coba besok hari atau upgrade paket API.</p>
          </div>
        </div>
      )}

      {/* LOADING SKELETON */}
      {loading && fixtures.length === 0 && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 h-[180px] animate-pulse">
              <div className="flex justify-between items-center mb-6">
                <div className="w-20 h-3 bg-slate-800 rounded"></div>
                <div className="w-12 h-3 bg-slate-800 rounded"></div>
              </div>
              <div className="flex justify-between items-center px-4">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-slate-800"></div>
                  <div className="w-16 h-2 bg-slate-800 rounded"></div>
                </div>
                <div className="w-20 h-8 bg-slate-800 rounded"></div>
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-slate-800"></div>
                  <div className="w-16 h-2 bg-slate-800 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* EMPTY STATE */}
      {!loading && fixtures.length === 0 && !error && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mb-4">
            <Clock className="w-8 h-8 text-slate-500" />
          </div>
          <h3 className="text-white font-bold text-lg mb-2">Tidak Ada Pertandingan Live</h3>
          <p className="text-slate-400 text-sm max-w-md">Saat ini sedang tidak ada pertandingan resmi yang berlangsung. Silakan kembali nanti.</p>
        </div>
      )}

      {/* FIXTURES GRID */}
      {fixtures.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fixtures.map((fixture) => (
            <div key={fixture.fixture.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-orange-500/50 transition-colors shadow-lg group relative">
              {/* League Header */}
              <div className="bg-slate-950/50 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="relative w-4 h-4 shrink-0 rounded-full overflow-hidden bg-slate-800">
                    <SafeImage src={fixture.league.flag || fixture.league.logo} alt="League" fill className="object-cover" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest truncate max-w-[120px]">
                    {fixture.league.name}
                  </span>
                </div>
                <span className="text-[10px] font-black px-2 py-0.5 rounded bg-red-500/10 text-red-500 animate-pulse">
                  {fixture.fixture.status.elapsed}'
                </span>
              </div>

              {/* Match Score */}
              <div className="p-6">
                <div className="flex items-center justify-between">
                  {/* Home Team */}
                  <div className="flex flex-col items-center gap-3 w-[80px]">
                    <div className="relative w-12 h-12 bg-slate-800 rounded-full p-2 border-2 border-transparent group-hover:border-slate-700 transition-all">
                      <SafeImage src={fixture.teams.home.logo} alt={fixture.teams.home.name} fill className="object-contain p-1.5" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-300 text-center uppercase leading-tight line-clamp-2">
                      {fixture.teams.home.name}
                    </span>
                  </div>

                  {/* Score */}
                  <div className="flex flex-col items-center justify-center">
                    <div className="flex items-center gap-3 text-3xl font-black text-white italic">
                      <span className={fixture.goals.home > fixture.goals.away ? 'text-orange-500' : ''}>
                        {fixture.goals.home ?? '-'}
                      </span>
                      <span className="text-slate-600 font-normal">:</span>
                      <span className={fixture.goals.away > fixture.goals.home ? 'text-orange-500' : ''}>
                        {fixture.goals.away ?? '-'}
                      </span>
                    </div>
                  </div>

                  {/* Away Team */}
                  <div className="flex flex-col items-center gap-3 w-[80px]">
                    <div className="relative w-12 h-12 bg-slate-800 rounded-full p-2 border-2 border-transparent group-hover:border-slate-700 transition-all">
                      <SafeImage src={fixture.teams.away.logo} alt={fixture.teams.away.name} fill className="object-contain p-1.5" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-300 text-center uppercase leading-tight line-clamp-2">
                      {fixture.teams.away.name}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
