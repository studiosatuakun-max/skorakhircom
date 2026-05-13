'use client';

import React, { useState, useEffect } from 'react';
import { Bot, Save, Trash2, Search, Settings } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function ScraperAdmin() {
  const [keywords, setKeywords] = useState<{ id: string; keyword: string; category_name: string; days_left: number }[]>([]);
  const [newKeyword, setNewKeyword] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isScraping, setIsScraping] = useState(false);

  useEffect(() => {
    fetchTargets();
  }, []);

  const fetchTargets = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('scraper_targets')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (data && !error) {
      setKeywords(data);
    }
    setIsLoading(false);
  };

  const addKeyword = async () => {
    if (!newKeyword) return;
    
    const targetData = {
      keyword: newKeyword,
      category_name: newCategory || 'Sport',
      days_left: 7
    };

    const { data, error } = await supabase
      .from('scraper_targets')
      .insert([targetData])
      .select();

    if (!error && data) {
      setKeywords([data[0], ...keywords]);
      setNewKeyword('');
      setNewCategory('');
    } else {
      alert('Gagal menyimpan target ke database.');
    }
  };

  const removeKeyword = async (id: string) => {
    const { error } = await supabase.from('scraper_targets').delete().eq('id', id);
    if (!error) {
      setKeywords(keywords.filter(k => k.id !== id));
    }
  };

  const runManualScrape = async (keyword: string) => {
    if (isScraping) return;
    setIsScraping(true);
    alert(`Memulai scraping untuk: ${keyword}\n\nMohon tunggu sekitar 15-30 detik sementara AI meramu artikel...`);
    
    try {
      const res = await fetch(`/api/cron/scrape?secret=skorakhir_xyz123&keyword=${encodeURIComponent(keyword)}`);
      const data = await res.json();
      
      if (data.success) {
        alert(`Sukses!\n\nJudul Asli: ${data.original_title}\n\nCek Draft di WordPress kamu sekarang!`);
      } else {
        alert(`Gagal: ${data.message || data.error}`);
      }
    } catch (error: any) {
      alert(`Terjadi kesalahan jaringan: ${error.message}`);
    } finally {
      setIsScraping(false);
    }
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
          {isLoading ? (
            <div className="p-8 text-center text-slate-500 font-bold">Memuat data dari database...</div>
          ) : keywords.map((item) => (
            <div key={item.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-800/50 transition-colors">
              <div>
                <h4 className="font-black text-lg text-yellow-400">{item.keyword}</h4>
                <div className="flex items-center gap-3 text-xs font-bold text-slate-400 mt-1 uppercase">
                  <span className="bg-slate-800 px-2 py-1 rounded">Kategori: {item.category_name}</span>
                  <span className="text-orange-500">Aktif: {item.days_left} Hari Lagi</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => runManualScrape(item.keyword)}
                  disabled={isScraping || item.days_left <= 0}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-white text-xs font-bold rounded flex items-center gap-1 transition-colors"
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
          {!isLoading && keywords.length === 0 && (
            <div className="p-8 text-center text-slate-500 font-bold">
              Belum ada target scraping yang diatur.
            </div>
          )}
        </div>
      </div>
      
    </div>
  );
}
