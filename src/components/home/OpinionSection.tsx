import Link from 'next/link';
import { fetchWP } from '@/lib/wp-graphql';

export const revalidate = 60;

export default async function OpinionSection() {
  let opinions = [];
  try {
    const query = `
      query GetOpinions {
        posts(first: 3, where: { categoryName: "opini" }) {
          nodes {
            id
            title
            slug
            date
            author {
              node {
                name
              }
            }
          }
        }
      }
    `;
    const data = await fetchWP(query);
    const nodes = data?.posts?.nodes || [];
    
    opinions = nodes.map((post: any) => ({
      id: post.id,
      title: post.title,
      slug: post.slug,
      created_at: post.date,
      author: post.author?.node?.name || 'Redaksi',
    }));
  } catch (error) {
    console.error('Failed to fetch opinions:', error);
  }

  // Jangan di-hide kalau kosong, tampilkan placeholder supaya user bisa lihat Bento layout-nya
  const displayOpinions = opinions.length >= 3 ? opinions : [
    { id: '1', title: 'Strategi Taktikal yang Membuat Lawan Kewalahan di Babak Kedua', slug: '#', author: 'Budi Santoso', created_at: new Date().toISOString() },
    { id: '2', title: 'Mengapa Keputusan Wasit Sering Kontroversial Musim Ini?', slug: '#', author: 'Redaksi', created_at: new Date().toISOString() },
    { id: '3', title: 'Bursa Transfer: Siapa Pemain Kunci Selanjutnya?', slug: '#', author: 'Ahmad M.', created_at: new Date().toISOString() }
  ];

  return (
    <section className="mt-12" aria-labelledby="opini-analisis">
      <div className="flex items-center gap-2 mb-6 border-b-2 border-slate-800 pb-2">
        <h2 id="opini-analisis" className="text-xl sm:text-2xl font-black italic tracking-tight uppercase text-white">
          Opini <span className="text-yellow-400">&</span> Analisa
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* BIG BENTO CARD (Span 2 Cols or Full Width) */}
        <Link href={`/berita/${displayOpinions[0].slug}`} className="md:col-span-2 group relative overflow-hidden rounded-2xl bg-gradient-to-br from-yellow-400 to-yellow-600 p-8 hover:shadow-[0_0_40px_rgba(250,204,21,0.3)] transition-all duration-300">
          <div className="absolute -top-10 -right-10 text-[200px] font-black text-yellow-900/10 leading-none select-none">"</div>
          <div className="relative z-10 flex flex-col h-full justify-between gap-6">
            <h3 className="text-2xl md:text-3xl font-black italic leading-tight text-slate-900 group-hover:scale-[1.02] transition-transform origin-left">
              "{displayOpinions[0].title}"
            </h3>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center text-yellow-400 font-black text-lg shadow-lg">
                {displayOpinions[0].author.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-black text-slate-900 uppercase tracking-widest">{displayOpinions[0].author}</p>
                <p className="text-[10px] font-bold text-slate-800 uppercase">Jurnalis SkorAkhir</p>
              </div>
            </div>
          </div>
        </Link>

        {/* SMALL BENTO CARD 1 */}
        <Link href={`/berita/${displayOpinions[1].slug}`} className="group relative overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 p-6 hover:border-yellow-400/50 hover:bg-slate-800/80 transition-all duration-300">
          <div className="absolute -top-4 -right-4 text-[100px] font-black text-slate-800/50 leading-none select-none">"</div>
          <div className="relative z-10 flex flex-col h-full justify-between gap-6">
            <h4 className="text-lg md:text-xl font-black italic leading-tight text-white group-hover:text-yellow-400 transition-colors">
              "{displayOpinions[1].title}"
            </h4>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 font-black text-xs">
                {displayOpinions[1].author.charAt(0)}
              </div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">{displayOpinions[1].author}</p>
            </div>
          </div>
        </Link>

        {/* SMALL BENTO CARD 2 */}
        <Link href={`/berita/${displayOpinions[2].slug}`} className="group relative overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 p-6 hover:border-yellow-400/50 hover:bg-slate-800/80 transition-all duration-300">
          <div className="absolute -top-4 -right-4 text-[100px] font-black text-slate-800/50 leading-none select-none">"</div>
          <div className="relative z-10 flex flex-col h-full justify-between gap-6">
            <h4 className="text-lg md:text-xl font-black italic leading-tight text-white group-hover:text-yellow-400 transition-colors">
              "{displayOpinions[2].title}"
            </h4>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 font-black text-xs">
                {displayOpinions[2].author.charAt(0)}
              </div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">{displayOpinions[2].author}</p>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
