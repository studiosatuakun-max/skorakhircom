import React from 'react';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pedoman Media Siber | SkorAkhir',
  description: 'Pedoman Pemberitaan Media Siber di lingkungan SkorAkhir.',
};

export default function PedomanMediaSiber() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-950 pb-20 pt-10">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 md:p-12 shadow-xl">
            <h1 className="text-3xl md:text-5xl font-black italic tracking-tighter text-white uppercase mb-8 border-b border-slate-800 pb-4">
              Pedoman Pemberitaan Media Siber
            </h1>
            
            <div className="prose prose-invert prose-orange max-w-none text-slate-300">
              <p className="lead text-lg mb-6 text-slate-200">
                Kemerdekaan berpendapat, kemerdekaan berekspresi, dan kemerdekaan pers adalah hak asasi manusia yang dilindungi Pancasila, Undang-Undang Dasar 1945, dan Deklarasi Universal Hak Asasi Manusia PBB. Keberadaan media siber di Indonesia juga merupakan bagian dari kemerdekaan berpendapat, kemerdekaan berekspresi, dan kemerdekaan pers.
              </p>
              
              <div className="space-y-6">
                <section>
                  <h3 className="text-xl font-bold text-white mb-2">1. Ruang Lingkup</h3>
                  <p>Media Siber adalah segala bentuk media yang menggunakan wahana internet dan melaksanakan kegiatan jurnalistik, serta memenuhi persyaratan Undang-Undang Pokok Pers dan Standar Perusahaan Pers yang ditetapkan Dewan Pers. <strong>SkorAkhir.com</strong> tunduk pada peraturan perundang-undangan serta pedoman ini.</p>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-white mb-2">2. Verifikasi dan Keberimbangan Berita</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Setiap berita harus melalui proses verifikasi (pengecekan ulang fakta).</li>
                    <li>Berita yang berpotensi merugikan pihak lain menuntut verifikasi pada berita yang sama demi memenuhi prinsip akurasi dan keberimbangan.</li>
                    <li>Ketentuan dalam butir (a) di atas dikecualikan, dengan syarat: berita benar-benar berisi kepentingan publik yang mendesak; sumber berita jelas, kredibel, dan kompeten; serta redaksi telah berusaha maksimal menghubungi pihak yang dirugikan namun tidak berhasil.</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-white mb-2">3. Isi Buatan Pengguna (User Generated Content)</h3>
                  <p>Redaksi <strong>SkorAkhir.com</strong> berhak untuk mengedit atau menghapus isi buatan pengguna (seperti komentar pembaca) yang bertentangan dengan Undang-Undang, seperti memuat unsur SARA, pencemaran nama baik, atau penyebaran hoaks. Setiap komentar adalah tanggung jawab dari pembuat komentar itu sendiri.</p>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-white mb-2">4. Ralat, Koreksi, dan Hak Jawab</h3>
                  <p>Ralat, koreksi, dan hak jawab merujuk pada Undang-Undang Pers, Kode Etik Jurnalistik, dan Pedoman Hak Jawab yang ditetapkan Dewan Pers. Ralat, koreksi dan atau hak jawab wajib ditautkan pada berita yang diralat, dikoreksi atau yang diberi hak jawab.</p>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-white mb-2">5. Pencabutan Berita</h3>
                  <p>Berita yang sudah dipublikasikan tidak dapat dicabut karena alasan penyensoran dari pihak luar redaksi, kecuali terkait masalah SARA, kesusilaan, masa depan anak, pengalaman traumatik korban, atau pertimbangan khusus lain yang ditetapkan Dewan Pers. Pencabutan berita wajib disertai dengan alasan pencabutan dan diumumkan kepada publik.</p>
                </section>
              </div>

              <div className="mt-12 pt-6 border-t border-slate-800 text-sm text-slate-500 italic">
                Pedoman ini merujuk pada Peraturan Dewan Pers Nomor: 1/Peraturan-DP/III/2012 tentang Pedoman Pemberitaan Media Siber.
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
