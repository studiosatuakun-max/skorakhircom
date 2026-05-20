import { getAffiliateProducts, addAffiliateProduct } from '@/app/actions/affiliate';
import { ShoppingCart } from 'lucide-react';
import SmartPasteForm from './SmartPasteForm';
import ProductAdminCard from './ProductAdminCard';

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
                <ProductAdminCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
