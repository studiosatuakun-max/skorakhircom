import React from 'react';
import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';
import { Plus, Trash2 } from 'lucide-react';

export const revalidate = 0;

async function createCategory(formData: FormData) {
  'use server';
  const name = formData.get('name') as string;
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  const color_theme = formData.get('color_theme') as string;

  const { error } = await supabase.from('categories').insert([{ name, slug, color_theme }]);
  if (error) throw new Error(error.message);
  revalidatePath('/admin/kategori');
}

async function deleteCategory(id: string) {
  'use server';
  const { error } = await supabase.from('categories').delete().eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/admin/kategori');
}

export default async function KategoriAdmin() {
  const { data: categories, error } = await supabase
    .from('categories')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black italic tracking-tight text-white">Kelola Kategori Topik</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Form Tambah Kategori */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 self-start">
          <h2 className="text-sm font-black uppercase text-slate-300 tracking-widest mb-6">Tambah Kategori Baru</h2>
          <form action={createCategory} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-2">Nama Kategori</label>
              <input type="text" name="name" required placeholder="Contoh: MOTO GP" className="w-full bg-slate-950 border border-slate-800 rounded px-4 py-2.5 text-sm text-white focus:outline-none focus:border-yellow-400" />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-2">Tema Warna (Pilihan Tailwind)</label>
              <select name="color_theme" className="w-full bg-slate-950 border border-slate-800 rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-yellow-400">
                <option value="yellow-400">Yellow (Default)</option>
                <option value="red-600">Red (Hot / Timnas)</option>
                <option value="blue-500">Blue (Eropa)</option>
                <option value="green-500">Green (Spesial)</option>
              </select>
            </div>
            
            <button type="submit" className="w-full flex justify-center items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-slate-900 py-3 rounded-lg font-black text-xs tracking-widest uppercase transition-colors mt-2">
              <Plus className="w-4 h-4" /> Simpan Kategori
            </button>
          </form>
        </div>

        {/* Daftar Kategori Aktif */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h2 className="text-sm font-black uppercase text-slate-300 tracking-widest mb-6">Kategori Tersedia ({categories?.length || 0})</h2>
          
          <div className="space-y-3">
            {error && <p className="text-red-500 text-xs">{error.message}</p>}
            
            {categories?.map((cat) => (
              <div key={cat.id} className="flex justify-between items-center p-3 border border-slate-800 rounded bg-slate-950">
                <div>
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full bg-${cat.color_theme || 'yellow-400'}`}></div>
                    <h3 className="text-sm font-bold text-white uppercase">{cat.name}</h3>
                  </div>
                  <p className="text-[10px] text-slate-500 font-mono mt-1">/{cat.slug}</p>
                </div>
                
                <form action={async () => {
                  'use server';
                  await deleteCategory(cat.id);
                }}>
                  <button type="submit" className="p-2 text-slate-500 hover:text-red-500 transition-colors" title="Hapus Kategori">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </form>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
