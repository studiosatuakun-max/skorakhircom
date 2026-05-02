import React from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

// Supabase fetching from Server Component
export const revalidate = 0; // Disable cache for admin

export default async function KelolaBerita() {
  const { data: news, error } = await supabase
    .from('news')
    .select('id, title, author, created_at, view_count, category_id')
    .order('created_at', { ascending: false });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black italic tracking-tight text-white">Daftar Berita</h1>
        <Link href="/admin/berita/create" className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-slate-900 px-4 py-2 rounded-lg font-black uppercase text-sm transition-colors">
          <Plus className="w-4 h-4" /> Tulis Berita
        </Link>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-800 text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-700">
                <th className="p-4">Judul Berita</th>
                <th className="p-4">Redaksi</th>
                <th className="p-4">Tanggal Dibuat</th>
                <th className="p-4">Views</th>
                <th className="p-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium text-slate-300">
              {error && (
                 <tr>
                   <td colSpan={5} className="p-8 text-center text-yellow-400">{error.message} - Pastikan tabel sudah dibuat.</td>
                 </tr>
              )}
              {news && news.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-500 italic">
                    Belum ada berita. Mulai tulis artikel pertamamu!
                  </td>
                </tr>
              )}
              {news && news.map((item) => (
                <tr key={item.id} className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors">
                  <td className="p-4 font-bold text-slate-100">{item.title}</td>
                  <td className="p-4 text-slate-400">{item.author}</td>
                  <td className="p-4 text-slate-400">{new Date(item.created_at).toLocaleDateString('id-ID')}</td>
                  <td className="p-4 text-slate-400">{item.view_count}</td>
                  <td className="p-4 flex justify-center gap-2">
                    <Link href={`/admin/berita/edit/${item.id}`} className="p-2 bg-slate-800 rounded text-orange-500 hover:bg-slate-700 transition" aria-label="Edit">
                      <Edit className="w-4 h-4" />
                    </Link>
                    <form action={async () => {
                      'use server';
                      const { deleteNews } = await import('@/app/actions/news');
                      await deleteNews(item.id);
                    }}>
                      <button type="submit" className="p-2 bg-slate-800 rounded text-yellow-400 hover:bg-slate-700 transition" aria-label="Hapus">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
