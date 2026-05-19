'use client';

import React, { useState } from 'react';
import { Plus, Wand2 } from 'lucide-react';

interface Props {
  action: (formData: FormData) => Promise<void>;
}

export default function SmartPasteForm({ action }: Props) {
  const [isParsing, setIsParsing] = useState(false);
  
  // State for form fields
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [affiliateUrl, setAffiliateUrl] = useState('');
  const [platform, setPlatform] = useState('Shopee');

  const handleSmartPaste = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    if (!text.trim()) return;

    setIsParsing(true);
    
    // Parse URL (Cari link s.shopee.co.id atau shope.ee atau tokped dll)
    const urlMatch = text.match(/https:\/\/(s\.shopee\.co\.id|shope\.ee|tokopedia\.link|vt\.tiktok\.com)\/[^\s]+/);
    if (urlMatch) {
      setAffiliateUrl(urlMatch[0]);
      
      if (urlMatch[1].includes('shopee') || urlMatch[1].includes('shope')) setPlatform('Shopee');
      else if (urlMatch[1].includes('tokopedia')) setPlatform('Tokopedia');
      else if (urlMatch[1].includes('tiktok')) setPlatform('Tiktok');
    }

    // Parse Harga (Cari "Rp" diikuti angka)
    const priceMatch = text.match(/Rp\s*([0-9.,]+)/i);
    if (priceMatch) {
      // Format jadi Rp xxx.xxx
      setPrice(`Rp ${priceMatch[1].replace(/,/g, '.')}`);
    }

    // Parse Nama Barang (Bisa ambil teks sebelum tulisan 'dengan harga' atau ambil awal kalimat)
    // Cek format Shopee: "Cek [Nama Barang] dengan harga Rp..."
    const nameMatchShopee = text.match(/Cek (.*?) dengan harga/i);
    if (nameMatchShopee && nameMatchShopee[1]) {
      setName(nameMatchShopee[1].trim());
    } else {
      // Jika format beda, ambil kalimat pertama yang cukup panjang
      const sentences = text.split(/[.!?]/);
      if (sentences.length > 0 && sentences[0].length > 10) {
        let cleanName = sentences[0].replace(/Cek /i, '').trim();
        // Potong nama yang terlalu panjang
        if (cleanName.length > 80) cleanName = cleanName.substring(0, 80) + '...';
        setName(cleanName);
      }
    }

    // Clear the smart paste area
    setTimeout(() => {
      e.target.value = '';
      setIsParsing(false);
    }, 500);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 h-fit">
      <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
        <Plus className="w-5 h-5 text-yellow-400" />
        Tambah Produk Baru
      </h2>

      {/* SMART PASTE AREA */}
      <div className="mb-6 bg-slate-950 p-4 rounded-lg border border-dashed border-orange-500/50 relative overflow-hidden group">
        <label className="flex items-center gap-2 text-xs font-black text-orange-500 mb-2 uppercase tracking-wider">
          <Wand2 className="w-4 h-4" /> Smart Paste
        </label>
        <p className="text-xs text-slate-400 mb-3 leading-relaxed">
          Copy pesan "Share" dari aplikasi Shopee/Tokped, lalu Paste ke kotak di bawah. Sistem otomatis mengisi Nama, Harga, dan Link!
        </p>
        <textarea 
          placeholder="Paste teks share dari Shopee di sini..."
          onChange={handleSmartPaste}
          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-white text-sm focus:border-orange-500 outline-none resize-none h-20 transition-all placeholder:text-slate-600"
        />
        {isParsing && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center">
            <span className="text-yellow-400 font-bold text-sm animate-pulse">Memproses Teks...</span>
          </div>
        )}
      </div>

      <div className="border-t border-slate-800 my-6"></div>

      <form action={action} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-400 mb-1">Nama Produk</label>
          <input type="text" name="name" required value={name} onChange={e => setName(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white text-sm focus:border-orange-500 outline-none" placeholder="Contoh: Sepatu Ortuseight..." />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-400 mb-1">Harga Diskon</label>
            <input type="text" name="price" required value={price} onChange={e => setPrice(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white text-sm focus:border-orange-500 outline-none" placeholder="Rp 450.000" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 mb-1">Harga Coret (Opsional)</label>
            <input type="text" name="original_price" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white text-sm focus:border-orange-500 outline-none" placeholder="Rp 550.000" />
          </div>
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-400 mb-1">URL Gambar (Manual)</label>
          <input type="text" name="image_url" required className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white text-sm focus:border-orange-500 outline-none" placeholder="https://..." />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-400 mb-1">URL Affiliate Target</label>
          <input type="text" name="affiliate_url" required value={affiliateUrl} onChange={e => setAffiliateUrl(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white text-sm focus:border-orange-500 outline-none" placeholder="https://shope.ee/..." />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-400 mb-1">Platform</label>
            <select name="platform" value={platform} onChange={e => setPlatform(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white text-sm focus:border-orange-500 outline-none">
              <option value="Shopee">Shopee</option>
              <option value="Tokopedia">Tokopedia</option>
              <option value="Tiktok">Tiktok</option>
              <option value="Website">Website Eksternal</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 mb-1">Rating</label>
            <input type="number" step="0.1" name="rating" defaultValue="5.0" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white text-sm focus:border-orange-500 outline-none" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-400 mb-1">Konteks / Kategori</label>
            <input type="text" name="category_slug" required className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white text-sm focus:border-orange-500 outline-none" placeholder="padel, umum, dll" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 mb-1">Badge (Opsional)</label>
            <input type="text" name="discount_badge" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white text-sm focus:border-orange-500 outline-none" placeholder="Diskon 20%" />
          </div>
        </div>
        <button type="submit" className="w-full bg-orange-500 text-slate-950 font-black py-3 rounded-lg hover:bg-yellow-400 transition-colors mt-4">
          Simpan Produk
        </button>
      </form>
    </div>
  );
}
