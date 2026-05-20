'use client';

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { editAffiliateProduct } from '@/app/actions/affiliate';

interface EditProductModalProps {
  product: any;
  isOpen: boolean;
  onClose: () => void;
}

export default function EditProductModal({ product, isOpen, onClose }: EditProductModalProps) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [affiliateUrl, setAffiliateUrl] = useState('');
  const [platform, setPlatform] = useState('Shopee');
  const [category, setCategory] = useState('umum');
  const [rating, setRating] = useState('5.0');
  const [discountBadge, setDiscountBadge] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (product) {
      setName(product.name || '');
      setPrice(product.price || '');
      setOriginalPrice(product.original_price || '');
      setImageUrl(product.image_url || '');
      setAffiliateUrl(product.affiliate_url || '');
      setPlatform(product.platform || 'Shopee');
      setCategory(product.category_slug || 'umum');
      setRating(product.rating?.toString() || '5.0');
      setDiscountBadge(product.discount_badge || '');
    }
  }, [product]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    try {
      await editAffiliateProduct(product.id, formData);
      onClose();
    } catch (err) {
      console.error('Failed to edit product:', err);
      alert('Gagal mengedit produk. Cek console.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-slate-900/90 backdrop-blur border-b border-slate-800 p-4 flex items-center justify-between z-10">
          <h2 className="text-lg font-bold text-white">Edit Produk Affiliate</h2>
          <button onClick={onClose} className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
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
              <input type="text" name="original_price" value={originalPrice} onChange={e => setOriginalPrice(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white text-sm focus:border-orange-500 outline-none" placeholder="Rp 550.000" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 mb-1">URL Gambar (Bisa lebih dari 1, pisahkan dengan koma)</label>
            <input type="text" name="image_url" required value={imageUrl} onChange={e => setImageUrl(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white text-sm focus:border-orange-500 outline-none" placeholder="https://img1.jpg, https://img2.jpg" />
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
              <input type="number" step="0.1" name="rating" value={rating} onChange={e => setRating(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white text-sm focus:border-orange-500 outline-none" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1">Konteks / Kategori</label>
              <input type="text" name="category_slug" required value={category} onChange={e => setCategory(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white text-sm focus:border-orange-500 outline-none" placeholder="padel, umum, dll" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1">Badge (Opsional)</label>
              <input type="text" name="discount_badge" value={discountBadge} onChange={e => setDiscountBadge(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white text-sm focus:border-orange-500 outline-none" placeholder="Diskon 20%" />
            </div>
          </div>
          
          <div className="pt-4 flex justify-end gap-3 border-t border-slate-800">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors text-sm font-bold">
              Batal
            </button>
            <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-orange-500 text-slate-950 font-black rounded-lg hover:bg-yellow-400 transition-colors text-sm flex items-center gap-2">
              {isSubmitting ? 'Menyimpan...' : 'Simpan Perubahan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
