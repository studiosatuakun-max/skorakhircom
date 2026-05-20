'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Trash2, ExternalLink, Edit } from 'lucide-react';
import { deleteAffiliateProduct } from '@/app/actions/affiliate';
import EditProductModal from './EditProductModal';

export default function ProductAdminCard({ product }: { product: any }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm('Yakin ingin menghapus produk ini?')) return;
    setIsDeleting(true);
    try {
      await deleteAffiliateProduct(product.id);
    } catch (err) {
      console.error(err);
      alert('Gagal menghapus produk');
    } finally {
      setIsDeleting(false);
    }
  };

  // Get the first image if there are multiple comma-separated ones
  const displayImage = product.image_url ? product.image_url.split(',')[0].trim() : '';

  return (
    <>
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex gap-4 group hover:border-orange-500/50 transition-colors">
        <div className="w-20 h-20 bg-slate-950 rounded flex items-center justify-center shrink-0 p-2 relative overflow-hidden">
          {displayImage && (
            <Image src={displayImage} alt={product.name} fill className="object-contain" sizes="80px" />
          )}
        </div>
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div>
            <h3 className="text-white font-bold text-sm truncate">{product.name}</h3>
            <p className="text-orange-500 font-black text-sm italic">{product.price}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[10px] font-bold bg-slate-800 text-slate-300 px-2 py-0.5 rounded">{product.platform}</span>
              <span className="text-[10px] font-bold bg-slate-800 text-slate-300 px-2 py-0.5 rounded">Kategori: {product.category_slug}</span>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-3">
            <a href={product.affiliate_url} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-white transition-colors">
              <ExternalLink className="w-3 h-3" /> Link
            </a>
            <button onClick={() => setIsEditModalOpen(true)} className="flex items-center gap-1 text-xs font-bold text-blue-500 hover:text-blue-400 transition-colors">
              <Edit className="w-3 h-3" /> Edit
            </button>
            <button onClick={handleDelete} disabled={isDeleting} className="flex items-center gap-1 text-xs font-bold text-red-500 hover:text-red-400 transition-colors">
              <Trash2 className="w-3 h-3" /> {isDeleting ? 'Menghapus...' : 'Hapus'}
            </button>
          </div>
        </div>
      </div>

      <EditProductModal 
        product={product} 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
      />
    </>
  );
}
