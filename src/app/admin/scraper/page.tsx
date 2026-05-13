'use client';

import React, { useState } from 'react';
import { Bot, Save, Trash2, Search, Settings } from 'lucide-react';

export default function ScraperAdmin() {
  const [keywords, setKeywords] = useState<{ id: string; keyword: string; category: string; daysLeft: number }[]>([
    { id: '1', keyword: 'Megawati Hangestri Voli', category: 'Bola Voli', daysLeft: 7 },
    { id: '2', keyword: 'Veda Ega Moto3', category: 'Moto GP', daysLeft: 5 }
  ]);
  const [newKeyword, setNewKeyword] = useState('');
  const [newCategory, setNewCategory] = useState('');

  const addKeyword = () => {
    if (!newKeyword) return;
    setKeywords([...keywords, { id: Date.now().toString(), keyword: newKeyword, category: newCategory || 'Sport', daysLeft: 7 }]);
    setNewKeyword('');
    setNewCategory('');
  };

  const removeKeyword = (id: string) => {
    setKeywords(keywords.filter(k => k.id !== id));
  };

  const runManualScrape = async (keyword: string) => {
    alert(`Mencoba scraping manual untuk: ${keyword}\n\nPerintah terkirim ke API. Periksa tab Draft di WordPress nanti.`);
    // Implementasi fetch ke /api/cron/scrape?secret=...&keyword=...
  };

  return (
    <div className="p-6 max-w-4xl mx-auto min-h-screen">
      <div className="flex items-center gap-3 mb-8 border-b border-slate-800 pb-4">
        <Bot className="w-8 h-8 text-orange-500" />
        <div>
          <h1 className="text-2xl font-black text-white uppercase tracking-tight">AI Scraper & Auto-Draft</h1>
          <p className="text-sm text-slate-400">Atur target berita harian yang akan di-rewrite otomatis ke WordPress Draft.</p>
        </div>
      </div>

      {/* Form Tambah Target */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-8">
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Settings className="w-5 h-5 text-slate-400" /> Tambah Target Scraping (7 Hari Ke Depan)
        </h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <input 
            type="text" 
            placeholder="Keyword Berita (misal: Megawati Voli)"
            className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white outline-none focus:border-orange-500"
            value={newKeyword}
            onChange={(e) => setNewKeyword(e.target.value)}
          />
          <input 
            type="text" 
            placeholder="Kategori WP (misal: Bola Voli)"
            className="w-full sm:w-1/3 bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white outline-none focus:border-orange-500"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <button 
            onClick={addKeyword}
            className="bg-orange-500 hover:bg-orange-600 text-slate-950 font-bold px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Save className="w-4 h-4" /> Simpan Target
          </button>
        </div>
      </div>

      {/* Daftar Target Aktif */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-slate-800 bg-slate-950/50">
          <h3 className="font-bold text-white uppercase tracking-widest text-sm">Target Aktif Saat Ini</h3>
        </div>
        <div className="divide-y divide-slate-800">
          {keywords.map((item) => (
            <div key={item.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-800/50 transition-colors">
              <div>
                <h4 className="font-black text-lg text-yellow-400">{item.keyword}</h4>
                <div className="flex items-center gap-3 text-xs font-bold text-slate-400 mt-1 uppercase">
                  <span className="bg-slate-800 px-2 py-1 rounded">Kategori: {item.category}</span>
                  <span className="text-orange-500">Aktif: {item.daysLeft} Hari Lagi</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => runManualScrape(item.keyword)}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded flex items-center gap-1 transition-colors"
                >
                  <Search className="w-3 h-3" /> Tes Scraping
                </button>
                <button 
                  onClick={() => removeKeyword(item.id)}
                  className="px-3 py-1.5 bg-red-950/50 hover:bg-red-900 text-red-400 text-xs font-bold rounded flex items-center gap-1 transition-colors"
                >
                  <Trash2 className="w-3 h-3" /> Hapus
                </button>
              </div>
            </div>
          ))}
          {keywords.length === 0 && (
            <div className="p-8 text-center text-slate-500 font-bold">
              Belum ada target scraping yang diatur.
            </div>
          )}
        </div>
      </div>
      
    </div>
  );
}
