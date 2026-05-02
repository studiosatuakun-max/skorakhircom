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

  const leagueIds: Record<string, number> = {
    'liga-1': 274,
    'premier-league': 39,
    'la-liga': 140,
    'serie-a': 135,
    'bundesliga': 78,
    'ligue-1': 61,
  };

  const leagueId = leagueIds[slug];
  let fullStandings = null;

  if (leagueId) {
    try {
      const apiKey = process.env.APISPORTS_KEY;
      if (apiKey) {
        const res = await fetch(`https://v3.football.api-sports.io/standings?league=${leagueId}&season=2025`, {
          headers: { 'x-apisports-key': apiKey },
          next: { revalidate: 3600 }
        });
        if (res.ok) {
          const data = await res.json();
          fullStandings = data?.response?.[0]?.league?.standings?.[0];
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

  // Tarik data berita terbaru
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
            <Link href="/" className="hover:text-orange-500 transition-colors flex items-center gap-1">
              <ArrowLeft className="w-3 h-3" /> Beranda
            </Link>
            <span>/</span>
            <span className="text-slate-300">Hub Liga</span>
          </nav>
          
          <AdBanner />

          {/* League Hero/Header */}
          <div className="bg-slate-900 border border-slate-800 p-8 sm:p-12 mb-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 group">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-500/20 via-slate-900 to-slate-950 opacity-50 z-0"></div>
            
            <div className="relative z-10 flex-1">
              <span className="bg-orange-500 text-slate-900 px-3 py-1 text-xs font-black uppercase tracking-widest mb-4 inline-block shadow-[0_0_15px_rgba(250,204,21,0.3)]">
                Kanal Spesial
              </span>
              <h1 className="text-4xl sm:text-6xl font-black italic tracking-tighter text-white mb-4 uppercase">
                {leagueTitle}
              </h1>
              <p className="text-slate-400 font-medium max-w-xl text-sm sm:text-base">
                Kumpulan berita terbaru, rumor transfer, prediksi pertandingan, hingga analisis tajam seputar {leagueTitle}. Update terus hanya di SkorAkhir.com.
              </p>
            </div>
            
            <div className="relative z-10 shrink-0 w-32 h-32 md:w-48 md:h-48 border-4 border-slate-800 rounded-full flex items-center justify-center bg-slate-950 shadow-2xl group-hover:border-orange-500 transition-colors duration-500">
               <span className="text-2xl md:text-3xl font-black text-slate-600 group-hover:text-orange-500 transition-colors">{slug.substring(0,3).toUpperCase()}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
            
            {/* Kolom Kiri: Klasemen Full (Bisa memakan 4 kolom) */}
            {fullStandings && (
              <div className="lg:col-span-4">
                <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl sticky top-24">
                  <div className="bg-slate-950 p-4 border-b border-slate-800">
                    <h2 className="text-sm font-black italic uppercase tracking-widest text-white flex items-center gap-2">
                      <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                      Klasemen Penuh
                    </h2>
                  </div>
                  
                  <div className="grid grid-cols-12 gap-2 p-3 text-[10px] font-black uppercase text-slate-500 bg-slate-900 border-b border-slate-800">
                    <div className="col-span-1 text-center">#</div>
                    <div className="col-span-6">Klub</div>
                    <div className="col-span-1 text-center">M</div>
                    <div className="col-span-2 text-center">SG</div>
                    <div className="col-span-2 text-center text-orange-500">Pts</div>
                  </div>

                  <div className="divide-y divide-slate-800 max-h-[600px] overflow-y-auto custom-scrollbar">
                    {fullStandings.map((team: any) => (
                      <div key={team.team.id} className="grid grid-cols-12 gap-2 p-3 items-center text-xs hover:bg-slate-800 transition-colors">
                        <div className="col-span-1 text-center font-bold text-slate-400">{team.rank}</div>
                        <div className="col-span-6 flex items-center gap-2 font-bold text-white truncate">
                          <div className="w-5 h-5 relative shrink-0 bg-white rounded-full p-0.5">
                            <SafeImage src={team.team.logo} alt={team.team.name} fill className="object-contain" />
                          </div>
                          <span className="truncate">{team.team.name}</span>
                        </div>
                        <div className="col-span-1 text-center font-bold text-slate-500">{team.all.played}</div>
                        <div className="col-span-2 text-center font-bold text-slate-400">{team.goalsDiff > 0 ? `+${team.goalsDiff}` : team.goalsDiff}</div>
                        <div className="col-span-2 text-center font-black text-orange-500">{team.points}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Kolom Kanan: Berita Liga */}
            <div className={`lg:col-span-${fullStandings ? '8' : '12'}`}>
              <div className="flex items-center gap-3 mb-6 border-b-2 border-white/10 pb-4">
                 <Rss className="w-5 h-5 text-orange-500" />
                 <h2 className="text-2xl font-black italic uppercase text-white tracking-widest">Update Terkini</h2>
              </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedNews.map((item) => (
              <Link key={item.id} href={`/berita/${item.slug}`} className="flex flex-col group cursor-pointer h-full">
                <div className="bg-slate-900 aspect-video relative overflow-hidden mb-4 border border-slate-800 group-hover:border-slate-500 transition-colors">
                  <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-transparent transition-colors z-10" />
                  <SafeImage 
                    src={item.featured_image || '/images/placeholder.png'} 
                    alt={item.title} 
                    fill
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <span className="absolute bottom-2 left-2 z-20 bg-yellow-400 text-white px-2 py-0.5 text-[10px] font-black uppercase">
                    {item.categories?.name || 'SPORT'}
                  </span>
                </div>
                <div className="flex-1 flex flex-col">
                   <h3 className="text-sm sm:text-base font-black italic leading-tight text-slate-200 group-hover:text-orange-500 transition-colors line-clamp-3 mb-2">
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
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
