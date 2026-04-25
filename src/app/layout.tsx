import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'SKORAKHIR. | Portal Berita Olahraga',
  description: 'Portal berita olahraga cepat, bersih, dan terupdate. Fokus pada Sepak Bola, MotoGP, Bulutangkis, Voli, dan E-Sport.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${plusJakartaSans.variable} antialiased`}>
      <body className="font-sans min-h-screen bg-slate-950 text-slate-50 flex flex-col selection:bg-yellow-400 selection:text-black">
        {children}
      </body>
    </html>
  );
}
