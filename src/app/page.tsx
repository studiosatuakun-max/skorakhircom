import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';

import NewsList from '@/components/home/NewsList';
import MiniStandings from '@/components/home/MiniStandings';
import OpinionSection from '@/components/home/OpinionSection';
import TrendingTopics from '@/components/home/TrendingTopics';
import CategoryGrid from '@/components/home/CategoryGrid';
import GarudaPride from '@/components/home/GarudaPride';
import CultureSection from '@/components/home/CultureSection';
import MerchandiseSection from '@/components/home/MerchandiseSection';
import AdBanner from '@/components/shared/AdBanner';
import ShortsHighlights from '@/components/home/ShortsHighlights';
import AffiliateSlider from '@/components/article/AffiliateSlider';

export default function Home() {
  // Mock data for Editor's Deals (Affiliate Slider) on Homepage
  const editorsDeals = [
    {
      name: 'Sepatu Futsal Ortuseight Forte',
      price: 'Rp 450.000',
      originalPrice: 'Rp 550.000',
      imageUrl: '/images/affiliate/ianoni.png', // Temporary placeholder
      affiliateUrl: '#',
      platform: 'Shopee',
      rating: 4.9,
      discountBadge: 'Diskon 20%'
    },
    {
      name: 'Raket Tenis Wilson Pro Staff',
      price: 'Rp 2.100.000',
      imageUrl: '/images/affiliate/adidas.png',
      affiliateUrl: '#',
      platform: 'Tokopedia',
      rating: 5.0,
      discountBadge: 'Terlaris'
    },
    {
      name: 'Jersey Timnas Indonesia Authentic',
      price: 'Rp 799.000',
      imageUrl: '/images/affiliate/nox.png',
      affiliateUrl: '#',
      platform: 'Shopee',
      rating: 4.8,
      discountBadge: 'Official'
    }
  ];

  return (
    <>
      <Header />
      <main className="py-8 flex flex-col">
        {/* Full-width container components */}
        <div className="container mx-auto px-4">
          <AdBanner />
          
          <div className="mt-8 mb-4">
            <AffiliateSlider title="🔥 Editor's Choice: Hot Deals" products={editorsDeals} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
            <div className="lg:col-span-8 flex flex-col gap-0 h-full justify-between">
              <div>
                <NewsList />
                <OpinionSection />
                <MiniStandings />
                <ShortsHighlights />
              </div>
            </div>
            <aside className="lg:col-span-4 max-lg:order-last flex flex-col gap-8">
              <TrendingTopics />
            </aside>
          </div>

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
