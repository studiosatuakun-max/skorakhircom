import React from 'react';
import { createClient } from '@supabase/supabase-js';
import { BarChart3, TrendingUp, MousePointerClick, Clock } from 'lucide-react';

export const revalidate = 0; // Disable caching for analytics

async function getAnalyticsData() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseKey) {
    return { error: 'Supabase credentials not configured in .env.local' };
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  // Ambil total klik seluruhnya
  const { count: totalClicksCount } = await supabase
    .from('affiliate_clicks')
    .select('*', { count: 'exact', head: true });

  // Ambil data klik terbaru untuk feed
  const { data: recentClicks, error } = await supabase
    .from('affiliate_clicks')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(50);

  if (error) {
    return { error: error.message };
  }

  // Ambil data untuk menghitung Top Produk (maksimal 1000 data terakhir supaya tidak berat)
  const { data: clicksForStats } = await supabase
    .from('affiliate_clicks')
    .select('product_name')
    .order('created_at', { ascending: false })
    .limit(1000);

  // Hitung agregasi (Klik per produk)
  const productStats: Record<string, number> = {};

  if (clicksForStats) {
    clicksForStats.forEach((click: any) => {
      productStats[click.product_name] = (productStats[click.product_name] || 0) + 1;
    });
  }

  // Urutkan produk terlaris (Most clicked)
  const topProducts = Object.entries(productStats)
    .sort((a, b) => b[1] - a[1])
    .map(([name, clicks]) => ({ name, clicks }));

  return { recentClicks, topProducts, totalClicks: totalClicksCount || 0 };
}

export default async function AnalyticsDashboard() {
  const data = await getAnalyticsData();

  return (
    <div className="min-h-screen bg-slate-950 p-8 pt-32">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <BarChart3 className="w-8 h-8 text-orange-500" />
          <h1 className="text-3xl font-black text-white italic tracking-tight">Affiliate Analytics</h1>
        </div>

        {data.error ? (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-xl">
            <p className="font-bold">Error Loading Analytics:</p>
            <p>{data.error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Kiri: Ringkasan & Top Produk */}
            <div className="lg:col-span-1 space-y-8">
              {/* Card Total Klik */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center gap-3 text-slate-400 mb-2">
                  <TrendingUp className="w-5 h-5 text-orange-500" />
                  <h2 className="font-bold text-sm uppercase tracking-wider">Total Clicks</h2>
                </div>
                <div className="text-5xl font-black text-white mb-1">{data.totalClicks}</div>
                <p className="text-xs text-slate-500">Sepanjang Waktu</p>
              </div>

              {/* Card Top Produk */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center gap-3 text-slate-400 mb-6">
                  <MousePointerClick className="w-5 h-5 text-orange-500" />
                  <h2 className="font-bold text-sm uppercase tracking-wider">Top Products</h2>
                </div>
                <div className="space-y-4">
                  {data.topProducts?.length === 0 && (
                    <p className="text-slate-500 italic text-sm">Belum ada data klik.</p>
                  )}
                  {data.topProducts?.map((item: any, idx: number) => (
                    <div key={idx} className="flex items-center justify-between group">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded bg-slate-800 text-orange-500 flex items-center justify-center text-xs font-bold">
                          {idx + 1}
                        </span>
                        <span className="text-sm font-bold text-slate-300 group-hover:text-white transition-colors line-clamp-1">
                          {item.name}
                        </span>
                      </div>
                      <span className="bg-orange-500/10 text-orange-500 px-2 py-1 rounded text-xs font-black">
                        {item.clicks}x
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Kanan: Feed Klik Realtime */}
            <div className="lg:col-span-2">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl h-full">
                <div className="flex items-center gap-3 text-slate-400 mb-6">
                  <Clock className="w-5 h-5 text-orange-500" />
                  <h2 className="font-bold text-sm uppercase tracking-wider">Live Click Feed</h2>
                </div>
                
                <div className="space-y-3">
                  {data.recentClicks?.length === 0 && (
                    <p className="text-slate-500 italic text-sm">Menunggu klik pertama masuk...</p>
                  )}
                  {data.recentClicks?.map((click: any) => (
                    <div key={click.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-950/50 rounded-xl border border-slate-800/50 hover:border-orange-500/30 transition-colors">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-black px-2 py-0.5 rounded bg-blue-500/10 text-blue-400">
                            {click.platform}
                          </span>
                          <span className="text-xs text-slate-500">
                            {new Date(click.created_at).toLocaleString('id-ID', {
                              day: 'numeric', month: 'short', hour: '2-digit', minute:'2-digit'
                            })}
                          </span>
                        </div>
                        <p className="font-bold text-slate-200 text-sm">{click.product_name}</p>
                      </div>
                      <a 
                        href={click.target_url} 
                        target="_blank" 
                        rel="noreferrer"
                        className="mt-3 sm:mt-0 text-xs text-slate-500 hover:text-orange-500 truncate max-w-[200px]"
                      >
                        {click.target_url}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
          </div>
        )}
      </div>
    </div>
  );
}
