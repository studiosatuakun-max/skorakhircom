import { getShorts } from '@/lib/youtubeShorts';
import ShortsManager from './ShortsManager';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kelola YouTube Shorts - SkorAkhir Admin',
};

export const dynamic = 'force-dynamic';

export default async function AdminShortsPage() {
  const shorts = await getShorts();

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-black text-white italic tracking-tight uppercase">
          Kelola <span className="text-orange-500">Shorts</span>
        </h1>
      </div>
      
      <p className="text-slate-400 max-w-3xl">
        Masukkan link YouTube Shorts di bawah ini. Sistem akan otomatis menarik judul dan thumbnail asli dari YouTube. 
        Video yang ada di daftar ini akan otomatis muncul di section Shorts pada halaman Homepage.
      </p>

      <ShortsManager initialShorts={shorts} />
    </div>
  );
}
