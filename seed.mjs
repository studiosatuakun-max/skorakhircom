import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Read .env.local strictly to initialize Supabase
const envPath = path.resolve(process.cwd(), '.env.local');
const envFile = fs.readFileSync(envPath, 'utf-8');
const envConfig = envFile.split('\n').reduce((acc, line) => {
  const [key, value] = line.split('=');
  if (key && value) acc[key.trim()] = value.trim();
  return acc;
}, {});

const supabase = createClient(
  envConfig['NEXT_PUBLIC_SUPABASE_URL'],
  envConfig['NEXT_PUBLIC_SUPABASE_ANON_KEY']
);

async function runSeed() {
  console.log('Seeding Categories...');
  const catData = [
    { name: 'MOTO GP', slug: 'moto-gp', color_theme: 'yellow-400' },
    { name: 'LIGA INGRIS', slug: 'liga-inggris', color_theme: 'blue-500' },
    { name: 'TIMNAS', slug: 'timnas', color_theme: 'red-600' }
  ];
  
  const { data: cats, error: catError } = await supabase.from('categories').insert(catData).select();
  if (catError) console.error(catError);
  
  const motoGpId = cats?.find(c => c.slug === 'moto-gp')?.id;
  const ligaInggrisId = cats?.find(c => c.slug === 'liga-inggris')?.id;
  const timnasId = cats?.find(c => c.slug === 'timnas')?.id;

  console.log('Seeding News...');
  const newsData = [
    {
      title: 'Dramatis! Timnas U-23 Tembus Semifinal Setelah Singkirkan Raksasa Asia',
      slug: 'timnas-tembus-semifinal-2026',
      excerpt: 'Performa tak kenal lelah ditunjukkan punggawa Garuda Muda. Bermain dengan sepuluh orang, skuad racikan Shin Tae-Yong berhasil mengamankan tiket semifinal lewat adu penalti epik.',
      content: '<p>Malam penuh keajaiban di Stadion Abdullah bin Khalifa. Timnas U-23 berhasil mencetak sejarah emas dengan menumbangkan salah satu raksasa sepakbola Asia setelah pertarungan sengit 120 menit.</p><h2>Taktik Serangan Balik Mematikan</h2><p>Meskipun kalah penguasaan bola, efektivitas serangan balik cepat yang dimotori oleh duo sayap menjadi kunci. Mentalitas <strong>"Quiet Luxury"</strong> di lapangan—tanpa panik dan tenang mengeksekusi peluang—terlihat jelas.</p><blockquote>"Ini adalah kemenangan seluruh bangsa. Anak-anak bermain dengan hati dan taktik yang tanpa kompromi," ujar sang pelatih.</blockquote>',
      featured_image: 'https://images.unsplash.com/photo-1518605368461-1e1e12739555?auto=format&fit=crop&q=80&w=1200',
      author: 'Ahmad Mulyadi',
      is_garuda_pride: true,
      category_id: timnasId
    },
    {
      title: 'Arsenal Amankan Puncak Pasca Derby London Utara Berdarah Dingin',
      slug: 'arsenal-amankan-puncak-derby',
      excerpt: 'Dalam pertandingan paling menentukan musim ini, The Gunners sukses mencuri 3 poin penuh di markas rival sekota. Jalur menuju gelar juara semakin terbuka lebar.',
      content: '<p>Tensi panas menyelimuti derbi London Utara sejak menit pertama. Namun, kualitas umpan terukur dan penyelesaian klinis menjadi pembeda antara kedua tim raksasa London ini.</p><h2>Ketenangan di Tengah Badai</h2><p>Saat pendukung lawan terus memberikan tekanan mental, lini tengah The Gunners justru tampil <em>flawless</em> layaknya mesin pemotong rumput premium. Ini menjadi pernyataan keras untuk seluruh penantang gelar.</p>',
      featured_image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&q=80&w=1200',
      author: 'Reza Fahlevi',
      is_garuda_pride: false,
      category_id: ligaInggrisId
    },
    {
      title: 'Mario Aji Konsisten Cetak Waktu Tercepat di Sesi Kualifikasi Jerez',
      slug: 'mario-aji-kualifikasi-jerez-26',
      excerpt: 'Tampil impresif di tanah Matador. Pembalap masa depan bangsa ini menunjukkan eksistensi kuatnya di ajang grand prix dengan stabilitas mesin yang menakjubkan.',
      content: '<p>Lintasan basah tak sedikitpun menyurutkan adrenalin pembalap kelahiran Magetan ini. Dengan pemilihan ban basah yang tepat dan intuisi pengereman mematikan, ia berhasil mencatatkan <em>lap time</em> fenomenal.</p><p>Sorotan dari pakar aerodinamika internasional tak henti menyebut namanya. Langkah besar siap menyambut hari balapan nanti usai penguncian grid depan ini.</p>',
      featured_image: 'https://images.unsplash.com/photo-1568283457190-6ce3a2569de7?auto=format&fit=crop&q=80&w=1200',
      author: 'Irfan Hakim',
      is_garuda_pride: true,
      category_id: motoGpId
    },
    {
      title: 'Manchester City Terpuruk, Guardiola Siapkan Romabakan Skuad Total',
      slug: 'manchester-city-terpuruk-rombakan',
      excerpt: 'Kekalahan mengejutkan tiga pertandingan berturut-turut memaksa manajer jenius asal Spanyol merumuskan ulang peta kekuatan timnya. Apakah ini akhir sebuah era?',
      content: '<p>Gaya permainan <em>tiki-taka</em> cepat khas Manchester Biru seakan terkunci rapat. Beberapa pelatih lawan kini rasanya sudah mengantongi kelemahan formasi asimetris andalan sang pelatih plontos itu.</p><h2>Proyek Musim Dingin</h2><p>Desas-desus manajemen menyiapkan dana bombastis untuk perombakan besar-besaran kembali mengemuka. Dua gelandang kreatif dari Italia masuk dalam radar gila musim transfer mendatang.</p>',
      featured_image: 'https://images.unsplash.com/photo-1508344928928-7165b67de128?auto=format&fit=crop&q=80&w=1200',
      author: 'Dian Sastro',
      is_garuda_pride: false,
      category_id: ligaInggrisId
    }
  ];

  const { error: newsError } = await supabase.from('news').insert(newsData);
  if (newsError) console.error(newsError);

  console.log('Seeding Live Matches...');
  const matchData = [
    { home_team: 'Persib', away_team: 'Persija', home_score: 2, away_score: 1, match_minute: '72', status: 'LIVE', league: 'Liga 1', is_local_pride: true },
    { home_team: 'Liverpool', away_team: 'Chelsea', home_score: 0, away_score: 0, match_minute: 'HT', status: 'HT', league: 'Premier League', is_local_pride: false },
    { home_team: 'Real Madrid', away_team: 'Barcelona', home_score: 3, away_score: 2, match_minute: 'FT', status: 'FT', league: 'La Liga', is_local_pride: false }
  ];
  
  const { error: matchError } = await supabase.from('matches').insert(matchData);
  if (matchError) console.error(matchError);

  console.log('DONE!');
}

runSeed();
