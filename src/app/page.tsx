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
          
          {/* Live Ticker */}
          <div className="bg-orange-500 text-slate-950 font-black text-sm uppercase tracking-widest px-4 py-2 flex items-center gap-3 overflow-hidden rounded-lg mb-6 shadow-md">
            <span className="shrink-0 flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span> LIVE</span>
            <div className="w-full overflow-hidden relative">
              <div className="whitespace-nowrap animate-[marquee_15s_linear_infinite] inline-block">
                HOT DEALS HARI INI: Diskon Sepatu Futsal Ortuseight hingga 50% 🔥 Cek rekomendasi editor di bawah! 🔥 Jersey Timnas Indonesia terbaru sudah tersedia!
              </div>
            </div>
          </div>

          <AdBanner />

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
              <AffiliateSlider title="🔥 Editor's Choice" products={editorsDeals} sidebarMode={true} />
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
