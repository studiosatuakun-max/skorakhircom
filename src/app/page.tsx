import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';

import NewsList from '@/components/home/NewsList';
import AiPredictionSection from '@/components/home/AiPredictionSection';
import OpinionSection from '@/components/home/OpinionSection';
import TrendingTopics from '@/components/home/TrendingTopics';
import EditorialShowcase from '@/components/home/EditorialShowcase';
import CategoryGrid from '@/components/home/CategoryGrid';
import AdBanner from '@/components/shared/AdBanner';
import ShortsHighlights from '@/components/home/ShortsHighlights';
import AffiliateSlider from '@/components/article/AffiliateSlider';
import TransferRadar from '@/components/home/TransferRadar';
import GarudaPride from '@/components/home/GarudaPride';
import CultureSection from '@/components/home/CultureSection';
import { getAffiliateByContext } from '@/lib/affiliateProducts';

export default async function Home() {
  // Ambil data affiliate secara dinamis untuk homepage
  const homepageAffiliates = await getAffiliateByContext('all');

  return (
    <>
      <Header />
      <main className="py-8 flex flex-col min-h-screen">
        <div className="container mx-auto px-4 space-y-12">
          
          {/* Ad Banner Top */}
          <AdBanner />

          {/* HERO SECTION: Berita Utama (FULL WIDTH BENTO GRID) */}
          <section className="w-full">
            <NewsList />
          </section>

          {/* BURSA TRANSFER RADAR */}
          <TransferRadar />

          {/* SHORTS HIGHLIGHTS (FULL WIDTH) */}
          <section className="w-full">
            <ShortsHighlights />
          </section>

          {/* MAIN CONTENT GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* LEFT COLUMN: Deep Content */}
            <div className="lg:col-span-8 flex flex-col gap-12">
              <OpinionSection />
            </div>

            {/* RIGHT COLUMN: Sidebar (Trending & AI) */}
            <aside className="lg:col-span-4 flex flex-col gap-8">
              <AiPredictionSection />
              <div className="sticky top-24">
                <TrendingTopics />
              </div>
            </aside>
            
          </div>

          {/* FULL WIDTH GEAR SPOTLIGHT */}
          <EditorialShowcase products={homepageAffiliates} />

          <GarudaPride />
          
          <CategoryGrid />
        </div>
        
        {/* Restore Kultur Article Section */}
        <CultureSection />
      </main>
      <Footer />
    </>
  );
}
