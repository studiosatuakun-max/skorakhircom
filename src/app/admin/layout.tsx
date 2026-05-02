import React from 'react';
import Link from 'next/link';
import { LayoutDashboard, Newspaper, ShieldAlert, FileEdit, Settings, LogOut } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col hidden md:flex">
        <div className="p-6 border-b border-slate-800">
          <Link href="/admin" className="text-2xl font-black italic tracking-tighter text-white">
            SKOR<span className="text-orange-500">AKHIR</span><span className="text-yellow-400 block text-sm tracking-widest not-italic">REDAKSI</span>
          </Link>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 bg-slate-800 text-white rounded-lg font-bold text-sm">
            <LayoutDashboard className="w-4 h-4 text-orange-500" />
            Dashboard
          </Link>
          <Link href="/admin/berita" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800/50 hover:text-white rounded-lg font-bold text-sm transition-colors">
            <Newspaper className="w-4 h-4" />
            Kelola Berita
          </Link>
          <Link href="/admin/livescore" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800/50 hover:text-white rounded-lg font-bold text-sm transition-colors">
            <ShieldAlert className="w-4 h-4" />
            Live Score
          </Link>
          <Link href="/admin/kategori" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800/50 hover:text-white rounded-lg font-bold text-sm transition-colors">
            <FileEdit className="w-4 h-4" />
            Kategori Topik
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button className="flex items-center gap-3 px-4 py-3 w-full text-slate-400 hover:bg-yellow-400 hover:text-white rounded-lg font-bold text-sm transition-colors">
            <LogOut className="w-4 h-4" />
            Keluar
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Topbar */}
        <header className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-8">
          <h1 className="text-lg font-bold text-white">Ruang Redaksi</h1>
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-400">Admin Utama</span>
            <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center font-black text-slate-900">
              A
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="flex-1 overflow-auto p-8 bg-slate-950">
          {children}
        </div>
      </main>
    </div>
  );
}
