import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';

import NewsList from '@/components/home/NewsList';
import OpinionSection from '@/components/home/OpinionSection';
import TrendingTopics from '@/components/home/TrendingTopics';
import CategoryGrid from '@/components/home/CategoryGrid';
import GarudaPride from '@/components/home/GarudaPride';
import CultureSection from '@/components/home/CultureSection';
import MerchandiseSection from '@/components/home/MerchandiseSection';
import AdBanner from '@/components/shared/AdBanner';
import TransferRadar from '@/components/home/TransferRadar';
import VoxPopuli from '@/components/home/VoxPopuli';
import ShortsHighlights from '@/components/home/ShortsHighlights';

export default function Home() {
  return (
    <>
      <Header />
      <main className="py-8 flex flex-col">
        {/* Full-width container components */}
        <div className="container mx-auto px-4">
          <AdBanner />
          <TransferRadar />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12">
            <div className="lg:col-span-8 flex flex-col gap-0 h-full justify-between">
              <div>
                <NewsList />
                <OpinionSection />
              </div>
            </div>
            <aside className="lg:col-span-4 max-lg:order-last flex flex-col gap-8">
              <TrendingTopics />
            </aside>
          </div>

          <VoxPopuli />
          
          <ShortsHighlights />

          <CategoryGrid />
        </div>

        <GarudaPride />
        <MerchandiseSection />
        <CultureSection />
      </main>
      <Footer />
    </>
  );
}
