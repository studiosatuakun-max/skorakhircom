'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'api-sports-widget': any;
    }
  }
}

export default function ApiSportsWidget() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <div className="h-64 animate-pulse bg-slate-900 rounded-xl" />;

  return (
    <div className="w-full overflow-hidden bg-slate-50 rounded-xl">
      <Script 
        src="https://widgets.api-sports.io/2.0.0/widgets.js" 
        type="module" 
        strategy="lazyOnload"
      />
      
      {/* Configuration Widget - Ini Wajib Ada */}
      <api-sports-widget 
        data-type="config"
        data-key="cf990e84d82062179acf934c5692c00d"
        data-sport="football"
        data-lang="en"
        data-theme="white" // Bisa diganti "dark" kalau mau cocok sama tema kita
        data-show-errors="true"
      />

      {/* Widget Klasemen Liga Inggris (League ID: 39, Season: 2023) */}
      <div className="p-4 bg-white text-slate-900">
        <h2 className="text-xl font-black italic mb-4 uppercase">Klasemen Premier League</h2>
        <api-sports-widget 
          data-type="standings" 
          data-league="39" 
          data-season="2023"
        />
      </div>
    </div>
  );
}
