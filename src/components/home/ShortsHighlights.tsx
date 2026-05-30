import { Play, Heart, MessageCircle, Share2 } from 'lucide-react';
import SafeImage from '@/components/shared/SafeImage';
import Link from 'next/link';
import { getShorts } from '@/lib/youtubeShorts';

export default async function ShortsHighlights() {
  const shortsData = await getShorts();

  // Jika database kosong, tampilkan placeholder statis agar layout tetap bagus
  const displayShorts = shortsData.length > 0 ? shortsData : [
    {
      id: 1,
      title: "What a Moment COMO Fans!!",
      views: "1.2M",
      thumbnail: "https://i.ytimg.com/vi/BrJqPxwIHvg/maxresdefault.jpg",
      url: "https://www.youtube.com/shorts/BrJqPxwIHvg"
    },
    {
      id: 2,
      title: "Veda Ega Pratama 'The Rocket Boy'",
      views: "850K",
      thumbnail: "https://i.ytimg.com/vi/ItRNrvlrPQU/maxresdefault.jpg",
      url: "https://www.youtube.com/shorts/ItRNrvlrPQU"
    },
    {
      id: 3,
      title: "COMO Goes to Champion League!",
      views: "2.1M",
      thumbnail: "https://i.ytimg.com/vi/2TR8QybgH3Q/maxresdefault.jpg",
      url: "https://www.youtube.com/shorts/2TR8QybgH3Q"
    },
    {
      id: 4,
      title: "Bismillah MotoGP!",
      views: "3.5M",
      thumbnail: "https://i.ytimg.com/vi/So88xT-lM1s/maxresdefault.jpg",
      url: "https://www.youtube.com/shorts/So88xT-lM1s"
    }
  ];
  return (
    <section aria-labelledby="shorts-title" className="mt-12 sm:mt-16 mb-8 overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="flex space-x-1">
            <div className="w-1.5 h-6 bg-orange-500 rounded-full animate-[bounce_1s_infinite]"></div>
            <div className="w-1.5 h-6 bg-orange-400 rounded-full animate-[bounce_1s_infinite_0.2s]"></div>
            <div className="w-1.5 h-6 bg-yellow-500 rounded-full animate-[bounce_1s_infinite_0.4s]"></div>
          </div>
          <h2 id="shorts-title" className="text-xl sm:text-2xl font-black italic tracking-tight uppercase text-white">
            <span className="text-orange-500">Shorts</span>
          </h2>
        </div>
        <button className="text-xs font-bold text-slate-400 hover:text-white uppercase tracking-widest transition-colors flex items-center gap-1 group">
          Lihat Semua <span className="group-hover:translate-x-1 transition-transform">→</span>
        </button>
      </div>

      <div className="flex overflow-x-auto gap-4 md:gap-6 pb-6 scrollbar-hide snap-x snap-mandatory px-1">
        {displayShorts.slice(0, 6).map((short) => (
          <Link href={short.url} target="_blank" rel="noopener noreferrer" key={short.id} className="relative shrink-0 snap-center sm:snap-start group cursor-pointer w-[160px] sm:w-[220px] lg:w-[260px] aspect-[9/16] rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-orange-500 transition-colors shadow-lg block">
            
            <SafeImage 
              src={short.thumbnail} 
              alt={short.title} 
              fill 
              className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:opacity-60"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent"></div>
            
            {/* Netflix-style Hover Play Overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
              <div className="w-12 h-12 rounded-full bg-orange-500/80 backdrop-blur-sm flex items-center justify-center text-slate-950 animate-pulse">
                <Play className="w-5 h-5 ml-1" />
              </div>
            </div>

            <div className="absolute top-3 left-3 flex gap-2 z-10">
              <span className="bg-red-600 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded flex items-center gap-1 shadow-lg">
                <Play className="w-3 h-3" /> Short
              </span>
              <span className="bg-slate-950/80 text-orange-400 text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-md">
                {short.views}
              </span>
            </div>
            
            <div className="absolute inset-0 p-4 flex flex-col justify-end z-20 transition-transform duration-300 group-hover:-translate-y-2">
              <h3 className="font-black italic text-sm sm:text-base text-white leading-tight drop-shadow-md mb-3">
                {short.title}
              </h3>
              
              <div className="flex items-center gap-4 text-slate-300 border-t border-slate-700/50 pt-3">
                <div className="flex flex-col items-center hover:text-orange-500 transition-colors group/btn">
                  <Heart className="w-4 h-4 md:w-5 md:h-5 group-hover/btn:fill-orange-500" />
                </div>
                <div className="flex flex-col items-center hover:text-orange-500 transition-colors">
                  <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                <div className="flex flex-col items-center hover:text-orange-500 transition-colors ml-auto">
                  <Share2 className="w-4 h-4 md:w-5 md:h-5" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}
