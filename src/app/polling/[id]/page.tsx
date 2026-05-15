import { getPollById } from '@/app/actions/polls';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import VoxPopuliClient from '@/components/home/VoxPopuliClient';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

type Props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const poll = await getPollById(Number(resolvedParams.id));
  if (!poll) return { title: 'Polling Tidak Ditemukan' };

  return {
    title: `Polling: ${poll.question} | SkorAkhir`,
    description: `Ikuti polling SkorAkhir: ${poll.question}. Dukung tim favoritmu!`,
    openGraph: {
      title: `Polling: ${poll.question} | SkorAkhir`,
      description: `Gue udah vote, lu kapan? Pilih ${poll.team_a_name} atau ${poll.team_b_name}!`,
      images: [
        {
          url: poll.team_a_logo,
          width: 200,
          height: 200,
          alt: poll.team_a_name,
        }
      ]
    }
  };
}

export default async function PollingPage({ params }: Props) {
  const resolvedParams = await params;
  const poll = await getPollById(Number(resolvedParams.id));

  if (!poll) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="py-12 min-h-[60vh] flex flex-col items-center justify-center container mx-auto px-4">
        <div className="w-full max-w-lg flex flex-col items-center">
          <div className="text-center mb-4">
            <h1 className="text-3xl font-black italic tracking-tight uppercase text-white mb-2">
              Prediksi <span className="text-orange-500">Netizen</span>
            </h1>
            <p className="text-slate-400">Suaramu menentukan siapa penguasa lapangan hijau!</p>
          </div>
          
          <div className="w-full flex justify-center [&>section>div:first-child]:hidden">
             {/* The CSS trick above hides the "Vox Populi Polling" title from the Client component so it doesn't double-render titles */}
             <VoxPopuliClient initialPolls={[poll]} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
