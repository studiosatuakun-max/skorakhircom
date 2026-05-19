import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';

import NewsList from '@/components/home/NewsList';
import OpinionSection from '@/components/home/OpinionSection';
import TrendingTopics from '@/components/home/TrendingTopics';
import EditorialShowcase from '@/components/home/EditorialShowcase';
import CategoryGrid from '@/components/home/CategoryGrid';
import AdBanner from '@/components/shared/AdBanner';
import ShortsHighlights from '@/components/home/ShortsHighlights';
import AffiliateSlider from '@/components/article/AffiliateSlider';
import TransferRadar from '@/components/home/TransferRadar';
import CultureSection from '@/components/home/CultureSection';
import { getAffiliateByContext } from '@/lib/affiliateProducts';

export default async function Home() {
  // Ambil data affiliate secara dinamis untuk homepage
  const homepageAffiliates = await getAffiliateByContext('umum');

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

          {/* MAIN CONTENT GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* LEFT COLUMN: Deep Content */}
            <div className="lg:col-span-8 flex flex-col gap-12">
              <ShortsHighlights />
              <OpinionSection />
              <EditorialShowcase products={homepageAffiliates} />
            </div>

            {/* RIGHT COLUMN: Sidebar (Trending & Affiliate) */}
            <aside className="lg:col-span-4 flex flex-col gap-8">
              <TrendingTopics />
              
              <div className="sticky top-24">
                <AffiliateSlider 
                  title="🦅 Garuda Pride" 
                  products={homepageAffiliates} 
                  sidebarMode={true} 
                />
              </div>
            </aside>
            
          </div>

          <CategoryGrid />
        </div>
        
        {/* Restore Kultur Article Section */}
        <CultureSection />
      </main>
      <Footer />
    </>
  );
}
