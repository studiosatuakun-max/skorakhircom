'use client';

import { useState, useTransition } from 'react';
import { YoutubeShort } from '@/lib/youtubeShorts';
import { addShort, deleteShort } from './actions';
import { Trash2, Plus, Loader2 } from 'lucide-react';

export default function ShortsManager({ initialShorts }: { initialShorts: YoutubeShort[] }) {
  const [shorts, setShorts] = useState<YoutubeShort[]>(initialShorts);
  const [isPending, startTransition] = useTransition();
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!url) return;

    startTransition(async () => {
      const formData = new FormData();
      formData.append('url', url);
      const res = await addShort(formData);
      
      if (res.error) {
        setError(res.error);
      } else {
        setUrl('');
        // Optimistic refresh logic could go here, 
        // but Next.js will revalidate the page because of revalidatePath in the action.
        // To show it instantly without reload in this simple state setup, we could just reload the window
        window.location.reload();
      }
    });
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Hapus video ini?')) return;
    
    startTransition(async () => {
      const res = await deleteShort(id);
      if (res.error) {
        alert(res.error);
      } else {
        setShorts(shorts.filter(s => s.id !== id));
      }
    });
  };

  return (
    <div className="space-y-8">
      <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
        <h2 className="text-xl font-bold text-white mb-4">Tambah Video Shorts</h2>
        <form onSubmit={handleAdd} className="flex gap-4">
          <div className="flex-1">
            <input 
              type="url" 
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://www.youtube.com/shorts/VIDEO_ID"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500"
              required
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>
          <button 
            type="submit" 
            disabled={isPending}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-bold transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
            Tambah
          </button>
        </form>
      </div>

      <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-slate-950 text-slate-400 uppercase font-bold text-xs">
            <tr>
              <th className="px-6 py-4">Thumbnail</th>
              <th className="px-6 py-4">Judul</th>
              <th className="px-6 py-4">URL</th>
              <th className="px-6 py-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {shorts.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                  Belum ada video Shorts.
                </td>
              </tr>
            ) : shorts.map((short) => (
              <tr key={short.id} className="hover:bg-slate-800/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="w-16 h-24 bg-slate-800 rounded overflow-hidden">
                    <img src={short.thumbnail} alt="" className="w-full h-full object-cover" />
                  </div>
                </td>
                <td className="px-6 py-4 font-medium text-white max-w-xs truncate" title={short.title}>
                  {short.title}
                </td>
                <td className="px-6 py-4 text-slate-400 truncate max-w-xs">
                  <a href={short.url} target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 underline">
                    {short.url}
                  </a>
                </td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => handleDelete(short.id)}
                    disabled={isPending}
                    className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
