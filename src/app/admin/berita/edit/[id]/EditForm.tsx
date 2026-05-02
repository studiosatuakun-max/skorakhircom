'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, Sparkles, Loader2 } from 'lucide-react';
import { updateNews } from '@/app/actions/news';

export default function EditForm({ initialData }: { initialData: any }) {
  const [content, setContent] = useState(initialData.content);
  const [excerpt, setExcerpt] = useState(initialData.excerpt);
  const [isRewriting, setIsRewriting] = useState(false);
  const [isGeneratingExcerpt, setIsGeneratingExcerpt] = useState(false);

  const handleRewrite = async () => {
    if (!content.trim()) {
      alert("Masukkan draf kasar terlebih dahulu ke dalam kotak konten sebelum me-rewrite!");
      return;
    }
    
    setIsRewriting(true);
    try {
      const res = await fetch('/api/rewrite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: content }),
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || 'Request failed');
      
      setContent(data.revisedText);
    } catch (err: any) {
      alert("Error generating content: " + err.message);
    } finally {
      setIsRewriting(false);
    }
  };

  const handleGenerateExcerpt = async () => {
    if (!content.trim()) {
      alert("Tulis isi artikel terlebih dahulu untuk bisa diekstrak ringkasannya!");
      return;
    }
    
    setIsGeneratingExcerpt(true);
    try {
      const res = await fetch('/api/excerpt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: content }),
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || 'Request failed');
      
      setExcerpt(data.excerpt);
    } catch (err: any) {
      alert("Error generating excerpt: " + err.message);
    } finally {
      setIsGeneratingExcerpt(false);
    }
  };

  const updateWithId = updateNews.bind(null, initialData.id);

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/berita" className="p-2 border border-slate-800 rounded-lg hover:bg-slate-800 transition-colors text-slate-400">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-black italic tracking-tight text-white">Edit Berita</h1>
        </div>
      </div>

      <form action={updateWithId} className="bg-slate-900 border border-slate-800 rounded-xl p-8 space-y-6">
        <div className="space-y-6">
          
          {/* Judul */}
          <div>
            <label htmlFor="title" className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Judul Artikel</label>
            <input 
              type="text" 
              id="title" 
              name="title" 
              defaultValue={initialData.title}
              required
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 text-lg transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Penulis */}
            <div>
              <label htmlFor="author" className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Tim Redaksi</label>
              <input 
                type="text" 
                id="author" 
                name="author" 
                defaultValue={initialData.author}
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>
            
            {/* File Gambar Utama */}
            <div>
              <label htmlFor="imageFile" className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Upload Gambar Utama Baru (Opsional)</label>
              <input 
                type="file" 
                id="imageFile" 
                name="imageFile" 
                accept="image/*"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-[9px] text-white focus:outline-none focus:border-orange-500 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-orange-500 file:text-slate-900 hover:file:bg-orange-600"
              />
              <p className="text-[10px] text-slate-500 mt-1">Kosongkan jika tidak ingin mengubah gambar.</p>
            </div>
          </div>

          {/* Excerpt */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="excerpt" className="block text-xs font-bold text-slate-400 uppercase tracking-widest">Ringkasan Pendek (Excerpt)</label>
              <button 
                type="button" 
                onClick={handleGenerateExcerpt}
                disabled={isGeneratingExcerpt}
                className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider bg-orange-600 hover:bg-orange-500 disabled:bg-slate-700 text-white px-3 py-1.5 rounded-full transition-colors active:scale-95 shadow-[0_0_15px_rgba(234,88,12,0.5)] disabled:shadow-none"
              >
                {isGeneratingExcerpt ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                {isGeneratingExcerpt ? 'Ekstrak...' : 'Auto Ekstrak'}
              </button>
            </div>
            <textarea 
              id="excerpt" 
              name="excerpt" 
              rows={2}
              required
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors"
            ></textarea>
          </div>

          {/* Content with AI Rewrite Tool */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="content" className="block text-xs font-bold text-slate-400 uppercase tracking-widest">Isi Artikel (HTML didukung)</label>
              <button 
                type="button" 
                onClick={handleRewrite}
                disabled={isRewriting}
                className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 text-white px-3 py-1.5 rounded-full transition-colors active:scale-95 shadow-[0_0_15px_rgba(79,70,229,0.5)] disabled:shadow-none"
              >
                {isRewriting ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                {isRewriting ? 'Memproses...' : 'AI Auto Rewrite (SEO)'}
              </button>
            </div>
            <textarea 
              id="content" 
              name="content" 
              rows={12}
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors font-mono text-sm leading-relaxed"
            ></textarea>
          </div>

          {/* Flags */}
          <div className="flex items-center gap-2 pt-4 border-t border-slate-800">
            <input 
              type="checkbox" 
              id="is_garuda_pride" 
              name="is_garuda_pride"
              defaultChecked={initialData.is_garuda_pride}
              className="w-4 h-4 rounded border-slate-800 text-orange-500 focus:ring-orange-500 bg-slate-950"
            />
            <label htmlFor="is_garuda_pride" className="text-sm font-bold text-slate-300">
              🔥 Tandai sebagai <span className="text-yellow-400">Garuda Pride</span> (Eksklusif Timnas/Atlet Lokal)
            </label>
          </div>

        </div>

        <div className="flex justify-end pt-6">
          <button type="submit" className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-slate-900 px-8 py-3 rounded-lg font-black tracking-widest uppercase transition-transform active:scale-95">
            <Save className="w-5 h-5" />
            Update Perubahan
          </button>
        </div>
      </form>
    </div>
  );
}
