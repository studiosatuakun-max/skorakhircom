import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { GoogleAnalytics } from '@next/third-parties/google';
import PwaInstallPrompt from '@/components/shared/PwaInstallPrompt';
import Script from 'next/script';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://skorakhircom.vercel.app'),
  title: 'Skor Akhir, Skor Sementara & Livescore | Portal Berita Olahraga',
  description: 'Pantau hasil skor akhir, update skor sementara, dan livescore pertandingan Sepak Bola, MotoGP, E-Sport, dan olahraga lainnya secara real-time dan terpercaya.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    title: 'SkorAkhir',
    statusBarStyle: 'black-translucent',
  },
  verification: {
    google: 'oIizUevHDh7vo6HhcwfwIXEuGIfhU-RWlrFQrM4g0mQ',
  },
  alternates: {
    canonical: '/',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${plusJakartaSans.variable} antialiased overflow-x-hidden`}>
      <body className="font-sans min-h-screen bg-slate-950 text-slate-50 flex flex-col selection:bg-orange-500 selection:text-black overflow-x-hidden w-full relative">
        {/* Ambient Stadium Glow */}
        <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-orange-600/10 blur-[120px] pointer-events-none z-0"></div>
        <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-yellow-500/5 blur-[100px] pointer-events-none z-0"></div>
        <div className="relative z-10 flex flex-col min-h-screen">
          {children}
          <PwaInstallPrompt />
        </div>
        <GoogleAnalytics gaId="G-3Q0KYKESH3" />
        <Script 
          src="https://news.google.com/swg/js/v1/swg-basic.js" 
          strategy="lazyOnload" 
        />
        <Script id="google-swg-init" strategy="lazyOnload">
          {`
            (self.SWG_BASIC = self.SWG_BASIC || []).push( basicSubscriptions => {
              basicSubscriptions.init({
                type: "NewsArticle",
                isPartOfType: ["Product"],
                isPartOfProductId: "CAowpce8DA:openaccess",
                clientOptions: { theme: "dark", lang: "id" },
              });
            });
          `}
        </Script>
      </body>
    </html>
  );
}
