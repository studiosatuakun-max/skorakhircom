import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import SafeImage from '@/components/shared/SafeImage';
import { ArrowLeft, Rss } from 'lucide-react';
import AdBanner from '@/components/shared/AdBanner';

export const revalidate = 60;

export default async function LeaguePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const titleMap: Record<string, string> = {
    'liga-1': 'Liga 1 Indonesia',
    'premier-league': 'Premier League',
    'la-liga': 'La Liga',
    'serie-a': 'Serie A',
    'bundesliga': 'Bundesliga',
    'champions-league': 'Champions League',
    'piala-dunia': 'Piala Dunia',
    'afc-cup': 'AFC Cup',
    'motogp': 'MotoGP'
  };

  const leagueTitle = titleMap[slug] || slug.replace(/-/g, ' ').toUpperCase();

  // Untuk sementara, kita tarik data berita terbaru karena data dummy/scrap belum sepenuhnya tersinkron ke liga spesifik
  const { data: news } = await supabase
    .from('news')
    .select('*, categories(name)')
    .order('created_at', { ascending: false })
    .limit(16);

  const displayedNews = news || [];

  return (
    <>
      <Header />
      <main className="py-8 min-h-screen">
        <div className="container mx-auto px-4">
          <nav aria-label="breadcrumb" className="mb-6 flex items-center font-bold text-xs uppercase text-slate-500 gap-2">
            <Link href="/" className="hover:text-yellow-400 transition-colors flex items-center gap-1">
              <ArrowLeft className="w-3 h-3" /> Beranda
            </Link>
            <span>/</span>
            <span className="text-slate-300">Hub Liga</span>
          </nav>
          
          <AdBanner />

          {/* League Hero/Header */}
          <div className="bg-slate-900 border border-slate-800 p-8 sm:p-12 mb-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 group">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-yellow-400/20 via-slate-900 to-slate-950 opacity-50 z-0"></div>
            
            <div className="relative z-10 flex-1">
              <span className="bg-yellow-400 text-slate-900 px-3 py-1 text-xs font-black uppercase tracking-widest mb-4 inline-block shadow-[0_0_15px_rgba(250,204,21,0.3)]">
                Kanal Spesial
              </span>
              <h1 className="text-4xl sm:text-6xl font-black italic tracking-tighter text-white mb-4 uppercase">
                {leagueTitle}
              </h1>
              <p className="text-slate-400 font-medium max-w-xl text-sm sm:text-base">
                Kumpulan berita terbaru, rumor transfer, prediksi pertandingan, hingga analisis tajam seputar {leagueTitle}. Update terus hanya di SkorAkhir.com.
              </p>
            </div>
            
            <div className="relative z-10 shrink-0 w-32 h-32 md:w-48 md:h-48 border-4 border-slate-800 rounded-full flex items-center justify-center bg-slate-950 shadow-2xl group-hover:border-yellow-400 transition-colors duration-500">
               <span className="text-2xl md:text-3xl font-black text-slate-600 group-hover:text-yellow-400 transition-colors">{slug.substring(0,3).toUpperCase()}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 mb-8 border-b-2 border-white/10 pb-4">
             <Rss className="w-5 h-5 text-yellow-400" />
             <h2 className="text-2xl font-black italic uppercase text-white tracking-widest">Update Terkini</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedNews.map((item) => (
              <Link key={item.id} href={`/berita/${item.slug}`} className="flex flex-col group cursor-pointer h-full">
                <div className="bg-slate-900 aspect-video relative overflow-hidden mb-4 border border-slate-800 group-hover:border-slate-500 transition-colors">
                  <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-transparent transition-colors z-10" />
                  <SafeImage 
                    src={item.featured_image || 'https://via.placeholder.com/400x225'} 
                    alt={item.title} 
                    fill
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <span className="absolute bottom-2 left-2 z-20 bg-red-600 text-white px-2 py-0.5 text-[10px] font-black uppercase">
                    {item.categories?.name || 'SPORT'}
                  </span>
                </div>
                <div className="flex-1 flex flex-col">
                   <h3 className="text-sm sm:text-base font-black italic leading-tight text-slate-200 group-hover:text-yellow-400 transition-colors line-clamp-3 mb-2">
                     {item.title}
                   </h3>
                   <span className="font-bold text-[10px] uppercase text-slate-500 mt-auto">
                     {new Date(item.created_at).toLocaleDateString('id-ID')}
                   </span>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
