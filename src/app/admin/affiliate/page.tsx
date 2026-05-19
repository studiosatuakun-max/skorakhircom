import { getAffiliateProducts, deleteAffiliateProduct, addAffiliateProduct } from '@/app/actions/affiliate';
import { ShoppingCart, Plus, Trash2, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import SmartPasteForm from './SmartPasteForm';

export default async function AffiliateAdminPage() {
  const products = await getAffiliateProducts();

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-black italic tracking-tight text-white mb-2 flex items-center gap-3">
          <ShoppingCart className="w-8 h-8 text-orange-500" />
          MANAJEMEN PRODUK AFFILIATE
        </h1>
        <p className="text-slate-400 font-medium">Kelola produk promosi yang akan muncul secara dinamis di artikel berita.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Form Tambah Produk */}
        <div className="lg:col-span-1">
          <SmartPasteForm action={addAffiliateProduct} />
        </div>

        {/* Daftar Produk */}
        <div className="lg:col-span-2">
          {products.length === 0 ? (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center">
              <p className="text-slate-400 font-medium">Belum ada produk affiliate. Tambahkan produk pertama di form samping.</p>
              <p className="text-sm text-yellow-400 font-bold mt-4">Pastikan Anda telah membuat tabel "affiliate_products" di Supabase.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {products.map((product: any) => (
                <div key={product.id} className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex gap-4 group hover:border-orange-500/50 transition-colors">
                  <div className="w-20 h-20 bg-slate-950 rounded flex items-center justify-center shrink-0 p-2 relative overflow-hidden">
                    <Image src={product.image_url} alt={product.name} fill className="object-contain" sizes="80px" />
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
                    <div className="flex items-center gap-2 mt-3">
                      <a href={product.affiliate_url} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-white transition-colors">
                        <ExternalLink className="w-3 h-3" /> Link
                      </a>
                      <form action={async () => {
                        'use server';
                        await deleteAffiliateProduct(product.id);
                      }}>
                        <button type="submit" className="flex items-center gap-1 text-xs font-bold text-red-500 hover:text-red-400 transition-colors ml-2">
                          <Trash2 className="w-3 h-3" /> Hapus
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
