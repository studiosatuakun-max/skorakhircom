'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Loader2, ShieldCheck } from 'lucide-react';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok) {
        // Berhasil login
        router.push('/admin/berita');
        router.refresh(); // Refresh biar middleware baca cookie terbaru
      } else {
        setError(data.error || 'Autentikasi Gagal');
      }
    } catch (err) {
      setError('Terjadi kesalahan jaringan.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
      {/* Background Ornamen */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-400/5 via-slate-950 to-slate-950 z-0 pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-sm">
        {/* Header Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-slate-900 border-2 border-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(250,204,21,0.1)]">
            <ShieldCheck className="w-8 h-8 text-yellow-400" />
          </div>
          <h1 className="text-3xl font-black italic tracking-tighter text-white">SKORAKHIR<span className="text-yellow-400">.</span></h1>
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mt-2">Redaksi Portal System</p>
        </div>

        {/* Login Form */}
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Master Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-slate-500" />
                </div>
                <input 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan Kunci Sandi"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-all font-mono"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-950/50 border border-red-500/50 text-red-400 text-xs font-bold px-4 py-3 rounded-xl uppercase tracking-wider text-center">
                {error}
              </div>
            )}

            <button 
               type="submit" 
               disabled={loading || !password}
               className="w-full flex justify-center items-center gap-2 bg-yellow-400 hover:bg-yellow-500 disabled:bg-slate-800 disabled:text-slate-500 text-slate-950 px-4 py-3 rounded-xl text-sm font-black uppercase tracking-widest transition-all active:scale-95"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Masuk Portal'}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-[10px] uppercase font-bold text-slate-600 mt-8 tracking-widest">
          Sistem Terenkripsi & Terlindungi
        </p>
      </div>
    </div>
  );
}
