'use client';

import React, { useState } from 'react';
import { Rocket, CheckCircle2, AlertCircle } from 'lucide-react';

export default function PingSeoButton() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handlePing = async () => {
    setLoading(true);
    setStatus('idle');
    try {
      const res = await fetch('/api/ping-seo', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden mt-8">
      <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-950/50">
        <div>
          <h2 className="text-lg font-black text-white italic uppercase tracking-tight flex items-center gap-2">
            <Rocket className="w-5 h-5 text-orange-500" />
            SEO Auto Ping
          </h2>
          <p className="text-xs text-slate-400 font-bold mt-1">Panggil Google & Bing untuk merayapi artikel terbaru secara instan.</p>
        </div>
      </div>
      <div className="p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm font-medium text-slate-300">
          Gunakan tombol ini setelah Anda mempublikasikan artikel baru di WordPress.
        </div>
        
        <button 
          onClick={handlePing}
          disabled={loading}
          className={`px-6 py-3 rounded-lg font-black uppercase tracking-widest text-xs flex items-center gap-2 transition-all shadow-lg ${
            loading ? 'bg-slate-700 text-slate-400 cursor-not-allowed' 
            : status === 'success' ? 'bg-green-500 text-slate-900'
            : status === 'error' ? 'bg-red-500 text-white'
            : 'bg-orange-500 text-slate-900 hover:bg-white hover:scale-105 shadow-orange-500/20'
          }`}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></span>
              Pinging...
            </span>
          ) : status === 'success' ? (
            <>
              <CheckCircle2 className="w-4 h-4" /> Ping Berhasil!
            </>
          ) : status === 'error' ? (
            <>
              <AlertCircle className="w-4 h-4" /> Gagal Ping
            </>
          ) : (
            <>
              <Rocket className="w-4 h-4" /> Ping Search Engine
            </>
          )}
        </button>
      </div>
    </div>
  );
}
