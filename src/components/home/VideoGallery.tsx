import { Play, PlayCircle } from 'lucide-react';
import Link from 'next/link';

const videos = [
  { id: 1, title: 'Highlight: Timnas vs Arab Saudi Kualifikasi Piala Dunia', duration: '08:45', category: 'TIMNAS' },
  { id: 2, title: 'Momen Krusial: Penyelamatan Ernando di Menit Akhir', duration: '02:10', category: 'SEPAK BOLA' },
  { id: 3, title: 'Cuplikan Race Epic GP Mandalika 2026', duration: '15:20', category: 'MOTO GP' },
  { id: 4, title: 'Kompilasi Smash Keras Jonatan Christie', duration: '05:30', category: 'BULUTANGKIS' }
];

export default function VideoGallery() {
  return (
    <section className="bg-slate-900 text-white mt-16 py-16 clip-path-slant" aria-labelledby="video-highlights">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3 border-l-4 border-yellow-400 pl-3">
            <h2 id="video-highlights" className="text-3xl font-black italic uppercase tracking-tight">Klip Highlights</h2>
            <PlayCircle className="w-8 h-8 text-yellow-400" />
          </div>
          <Link href="#" className="hidden sm:block text-sm font-bold text-slate-400 hover:text-yellow-400 transition-colors uppercase tracking-widest">
            Lihat Semua Video
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <article className="lg:col-span-2 group cursor-pointer relative overflow-hidden bg-slate-800 aspect-video md:aspect-auto">
            <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-transparent transition-colors z-10" />
            
            {/* Play Button Overlay */}
            <div className="absolute inset-0 z-20 flex items-center justify-center opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all">
               <div className="w-16 h-16 rounded-full bg-yellow-400/90 flex items-center justify-center text-slate-900 backdrop-blur-sm">
                 <Play className="w-8 h-8 ml-1" fill="currentColor" />
               </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6 z-30 bg-gradient-to-t from-slate-950 via-slate-900/80 to-transparent">
              <span className="bg-yellow-400 text-black text-[10px] font-black px-2 py-1 uppercase inline-block mb-3">
                {videos[0].category}
              </span>
              <h3 className="text-2xl font-black italic leading-tight group-hover:text-yellow-400 transition-colors line-clamp-2">
                {videos[0].title}
              </h3>
              <span className="text-sm font-bold text-slate-300 mt-2 block flex items-center gap-1">
                <PlayCircle className="w-4 h-4" /> {videos[0].duration}
              </span>
            </div>
          </article>

          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {videos.slice(1).map((video) => (
              <article key={video.id} className="group cursor-pointer aspect-video sm:aspect-square md:aspect-video relative overflow-hidden bg-slate-800">
                <div className="absolute inset-0 bg-slate-950/50 group-hover:bg-slate-950/20 transition-colors z-10" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 opacity-70 group-hover:opacity-100 transition-opacity">
                  <div className="w-10 h-10 rounded-full border-2 border-yellow-400 flex items-center justify-center text-yellow-400 backdrop-blur-sm bg-black/30">
                    <Play className="w-4 h-4 ml-0.5" fill="currentColor" />
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-4 z-30 bg-gradient-to-t from-slate-950 to-transparent">
                  <span className="text-yellow-400 text-[9px] font-black uppercase mb-1 block tracking-wider">
                    {video.category}
                  </span>
                  <h3 className="text-sm font-black italic leading-tight group-hover:text-yellow-400 transition-colors line-clamp-2">
                    {video.title}
                  </h3>
                  <span className="text-xs font-bold text-slate-400 mt-1 block">
                    {video.duration}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
