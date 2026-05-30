import React from 'react';
import { LayoutDashboard, Users, FileText, Settings, BarChart3, TrendingUp, Globe, Activity } from 'lucide-react';

export default function DashboardMockup() {
  return (
    <div className="w-full max-w-5xl mx-auto rounded-2xl overflow-hidden border border-slate-700 bg-slate-900 shadow-2xl shadow-orange-500/10 mb-20 animate-in fade-in duration-700 delay-300">
      {/* Mac OS Style Window Header */}
      <div className="bg-slate-950 px-4 py-3 flex items-center border-b border-slate-800">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="mx-auto flex items-center gap-2 text-slate-500 text-xs font-medium">
          <Globe className="w-3 h-3" />
          admin.skorakhir.com/dashboard
        </div>
      </div>

      {/* Dashboard Body */}
      <div className="flex flex-col md:flex-row min-h-[400px]">
        {/* Sidebar */}
        <div className="w-full md:w-64 bg-slate-950/50 border-r border-slate-800 p-4 hidden md:block">
          <div className="flex items-center gap-2 text-white font-black italic tracking-tighter uppercase mb-8">
            <Activity className="w-5 h-5 text-orange-500" /> SkorAkhir<span className="text-orange-500">Panel</span>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-3 px-3 py-2 bg-orange-500/10 text-orange-500 rounded-lg text-sm font-bold">
              <LayoutDashboard className="w-4 h-4" /> Overview
            </div>
            <div className="flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-white rounded-lg text-sm font-medium transition-colors cursor-pointer">
              <FileText className="w-4 h-4" /> AI Auto-Posting
            </div>
            <div className="flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-white rounded-lg text-sm font-medium transition-colors cursor-pointer">
              <BarChart3 className="w-4 h-4" /> Affiliate Analytics
            </div>
            <div className="flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-white rounded-lg text-sm font-medium transition-colors cursor-pointer">
              <Users className="w-4 h-4" /> Users
            </div>
            <div className="flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-white rounded-lg text-sm font-medium transition-colors cursor-pointer mt-8">
              <Settings className="w-4 h-4" /> Settings
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">Dashboard</h2>
              <p className="text-slate-400 text-sm">Welcome back, Super Admin.</p>
            </div>
            <div className="bg-slate-800 border border-slate-700 px-4 py-2 rounded-lg text-xs font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              4 AI Robots Active
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-slate-800/50 border border-slate-700/50 p-4 rounded-xl">
              <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Trafik Hari Ini</div>
              <div className="text-2xl font-black text-white">24,592</div>
              <div className="text-green-400 text-xs font-bold flex items-center gap-1 mt-1"><TrendingUp className="w-3 h-3"/> +12.5%</div>
            </div>
            <div className="bg-slate-800/50 border border-slate-700/50 p-4 rounded-xl">
              <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Artikel Auto</div>
              <div className="text-2xl font-black text-white">1,402</div>
              <div className="text-green-400 text-xs font-bold flex items-center gap-1 mt-1"><TrendingUp className="w-3 h-3"/> 45 / day</div>
            </div>
            <div className="bg-slate-800/50 border border-slate-700/50 p-4 rounded-xl">
              <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Klik Affiliate</div>
              <div className="text-2xl font-black text-white">8,940</div>
              <div className="text-green-400 text-xs font-bold flex items-center gap-1 mt-1"><TrendingUp className="w-3 h-3"/> +5.2%</div>
            </div>
            <div className="bg-orange-500/10 border border-orange-500/20 p-4 rounded-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-2 opacity-20"><TrendingUp className="w-12 h-12 text-orange-500"/></div>
              <div className="text-orange-500 text-xs font-bold uppercase tracking-wider mb-2 relative z-10">Estimasi Komisi</div>
              <div className="text-2xl font-black text-orange-500 relative z-10">Rp 14.2M</div>
              <div className="text-slate-400 text-xs font-bold flex items-center gap-1 mt-1 relative z-10">Bulan Ini</div>
            </div>
          </div>

          {/* Recent Activity Mock */}
          <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-5">
            <h3 className="text-sm font-bold text-white mb-4">Aktivitas Robot AI Terbaru</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm border-b border-slate-700/50 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-blue-500/20 text-blue-400 flex items-center justify-center"><FileText className="w-4 h-4"/></div>
                  <div>
                    <div className="text-white font-medium">Scraping: "Review iPhone 15 Pro Max"</div>
                    <div className="text-slate-500 text-xs">Tekno Bot • Disisipi 2 produk affiliate</div>
                  </div>
                </div>
                <div className="text-green-400 font-bold text-xs bg-green-400/10 px-2 py-1 rounded">Published</div>
              </div>
              <div className="flex items-center justify-between text-sm border-b border-slate-700/50 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-purple-500/20 text-purple-400 flex items-center justify-center"><FileText className="w-4 h-4"/></div>
                  <div>
                    <div className="text-white font-medium">Scraping: "Tips Glowing Ala Artis Korea"</div>
                    <div className="text-slate-500 text-xs">Beauty Bot • Disisipi 4 produk affiliate</div>
                  </div>
                </div>
                <div className="text-green-400 font-bold text-xs bg-green-400/10 px-2 py-1 rounded">Published</div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-orange-500/20 text-orange-400 flex items-center justify-center"><FileText className="w-4 h-4"/></div>
                  <div>
                    <div className="text-white font-medium">Scraping: "Hasil MotoGP Mandalika 2026"</div>
                    <div className="text-slate-500 text-xs">Sport Bot • Disisipi 1 produk affiliate</div>
                  </div>
                </div>
                <div className="text-yellow-400 font-bold text-xs bg-yellow-400/10 px-2 py-1 rounded">Drafting...</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
