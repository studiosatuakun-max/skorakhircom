import React from 'react';
import { Newspaper, ShieldAlert, Activity, User } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl flex items-center gap-4">
          <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center text-yellow-400">
            <Newspaper className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Total Artikel</p>
            <p className="text-2xl font-black text-white">0</p>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl flex items-center gap-4">
          <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center text-red-500">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Live Score Aktif</p>
            <p className="text-2xl font-black text-white">0</p>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl flex items-center gap-4">
          <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center text-green-400">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Total Kategori</p>
            <p className="text-2xl font-black text-white">0</p>
          </div>
        </div>
        
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl flex items-center gap-4">
          <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center text-blue-400">
            <User className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Jurnalis Aktif</p>
            <p className="text-2xl font-black text-white">1</p>
          </div>
        </div>
      </div>

      {/* Main Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
          <div className="p-6 border-b border-slate-800 flex justify-between items-center">
            <h2 className="text-lg font-black text-white italic">Berita Terbaru</h2>
            <button className="text-xs font-bold text-yellow-400 hover:text-white transition-colors">Tulis Baru +</button>
          </div>
          <div className="p-12 text-center text-slate-500 text-sm font-medium">
            Belum ada berita yang di-{`publish`}. Mulai nulis dari sekarang!
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
          <div className="p-6 border-b border-slate-800 flex justify-between items-center">
            <h2 className="text-lg font-black text-white italic">Live Score Berjalan</h2>
            <button className="text-xs font-bold text-red-500 hover:text-white transition-colors">Tambah Pertandingan +</button>
          </div>
          <div className="p-12 text-center text-slate-500 text-sm font-medium">
            Tidak ada pertandingan live hari ini. 
          </div>
        </div>
      </div>
    </div>
  );
}
