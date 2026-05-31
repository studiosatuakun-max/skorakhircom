import React from 'react';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import type { Metadata } from 'next';
import { BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Pedoman Media Siber | SkorAkhir',
  description: 'Pedoman Pemberitaan Media Siber di lingkungan SkorAkhir.',
};

export default function PedomanMediaSiber() {
  const pedomanItems = [
    {
      title: "Ruang Lingkup",
      content: "Media Siber adalah segala bentuk media yang menggunakan wahana internet dan melaksanakan kegiatan jurnalistik, serta memenuhi persyaratan Undang-Undang Pokok Pers dan Standar Perusahaan Pers yang ditetapkan Dewan Pers. SkorAkhir.com tunduk pada peraturan perundang-undangan serta pedoman ini."
    },
    {
      title: "Verifikasi dan Keberimbangan Berita",
      content: "Setiap berita harus melalui proses verifikasi (pengecekan ulang fakta). Berita yang berpotensi merugikan pihak lain menuntut verifikasi pada berita yang sama demi memenuhi prinsip akurasi dan keberimbangan. Pengecualian hanya berlaku jika berita benar-benar berisi kepentingan publik yang mendesak dan sumber jelas."
    },
    {
      title: "Isi Buatan Pengguna (User Generated Content)",
      content: "Redaksi berhak untuk mengedit atau menghapus isi buatan pengguna (seperti komentar pembaca) yang bertentangan dengan Undang-Undang, seperti memuat unsur SARA, pencemaran nama baik, atau penyebaran hoaks. Setiap komentar adalah tanggung jawab dari pembuat komentar itu sendiri."
    },
    {
      title: "Ralat, Koreksi, dan Hak Jawab",
      content: "Ralat, koreksi, dan hak jawab merujuk pada Undang-Undang Pers, Kode Etik Jurnalistik, dan Pedoman Hak Jawab yang ditetapkan Dewan Pers. Ralat, koreksi dan atau hak jawab wajib ditautkan pada berita yang diralat, dikoreksi atau yang diberi hak jawab."
    },
    {
      title: "Pencabutan Berita",
      content: "Berita yang sudah dipublikasikan tidak dapat dicabut karena alasan penyensoran dari pihak luar redaksi, kecuali terkait masalah SARA, kesusilaan, masa depan anak, pengalaman traumatik korban, atau pertimbangan khusus lain yang ditetapkan Dewan Pers. Pencabutan wajib disertai dengan alasan."
    }
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-950 pb-20 overflow-hidden">
        
        {/* HERO SECTION */}
        <section className="relative w-full pt-16 pb-12 border-b border-slate-800">
          <div className="absolute inset-0 z-0">
            <div className="absolute bottom-0 left-0 w-[600px] h-[400px] bg-slate-800/30 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2"></div>
          </div>
          <div className="container relative z-10 mx-auto px-4">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-6 items-center">
              <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center shrink-0">
                <BookOpen className="w-8 h-8 text-yellow-400" />
              </div>
              <div className="text-center md:text-left">
                <h1 className="text-3xl md:text-5xl font-black italic tracking-tighter text-white uppercase mb-2">
                  Pedoman <span className="text-slate-500">Media Siber</span>
                </h1>
                <p className="text-slate-400 font-medium">
                  Merujuk pada Peraturan Dewan Pers Nomor: 1/Peraturan-DP/III/2012.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CONTENT SECTION - STACKED CARDS */}
        <section className="container mx-auto px-4 py-12 relative z-20">
          <div className="max-w-4xl mx-auto">
            
            <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-3xl p-6 md:p-10 shadow-xl mb-12">
              <p className="text-lg text-slate-300 leading-relaxed font-medium">
                Kemerdekaan berpendapat, kemerdekaan berekspresi, dan kemerdekaan pers adalah hak asasi manusia yang dilindungi Pancasila, Undang-Undang Dasar 1945, dan Deklarasi Universal Hak Asasi Manusia PBB. Keberadaan media siber di Indonesia juga merupakan bagian dari pilar tersebut.
              </p>
            </div>

            <div className="space-y-6">
              {pedomanItems.map((item, index) => (
                <div key={index} className="group relative bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 hover:border-slate-600 transition-colors overflow-hidden">
                  <div className="absolute top-0 right-4 md:right-8 -translate-y-1/4 pointer-events-none">
                    <span 
                      className="text-[120px] font-black italic leading-none transition-all duration-500 group-hover:-translate-y-4"
                      style={{
                        WebkitTextStroke: '2px #1e293b', /* slate-800 */
                        color: 'transparent'
                      }}
                    >
                      {index + 1}
                    </span>
                  </div>
                  <div className="relative z-10 md:w-1/4 flex-shrink-0">
                    <h3 className="text-xl font-black italic text-white uppercase leading-tight group-hover:text-yellow-400 transition-colors">
                      {item.title}
                    </h3>
                  </div>
                  <div className="relative z-10 md:w-3/4">
                    <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                      {item.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>
        
      </main>
      <Footer />
    </>
  );
}
