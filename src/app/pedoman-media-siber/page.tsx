import React from 'react';
import { Metadata } from 'next';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Pedoman Media Siber - SkorAkhir',
  description: 'Pedoman Pemberitaan Media Siber yang ditaati oleh SkorAkhir.com.',
};

export default function PedomanMediaSiberPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-12 pb-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <header className="mb-10 border-b border-slate-800 pb-6">
            <h1 className="text-3xl md:text-5xl font-black italic tracking-tight mb-4 text-white uppercase">
              Pedoman Media Siber
            </h1>
          </header>

          <div className="prose prose-invert max-w-none prose-p:text-slate-300 prose-li:text-slate-300 prose-headings:text-white prose-headings:font-bold">
            <p className="lead">
              Kemerdekaan berpendapat, kemerdekaan berekspresi, dan kemerdekaan pers adalah hak asasi manusia yang dilindungi Pancasila, Undang-Undang Dasar 1945, dan Deklarasi Universal Hak Asasi Manusia PBB. Keberadaan media siber di Indonesia juga merupakan bagian dari kemerdekaan berpendapat, kemerdekaan berekspresi, dan kemerdekaan pers.
            </p>
            
            <p>
              Media siber memiliki karakter khusus sehingga memerlukan pedoman agar pengelolaannya dapat dilaksanakan secara profesional, memenuhi fungsi, hak, dan kewajibannya sesuai Undang-Undang Nomor 40 Tahun 1999 tentang Pers dan Kode Etik Jurnalistik. Untuk itu Dewan Pers bersama organisasi pers, pengelola media siber, dan masyarakat menyusun Pedoman Pemberitaan Media Siber sebagai berikut:
            </p>

            <h3>1. Ruang Lingkup</h3>
            <ol>
              <li>Media Siber adalah segala bentuk media yang menggunakan wahana internet dan melaksanakan kegiatan jurnalistik, serta memenuhi persyaratan Undang-Undang Pers dan Standar Perusahaan Pers yang ditetapkan Dewan Pers.</li>
              <li>Isi Buatan Pengguna (User Generated Content) adalah segala isi yang dibuat dan atau dipublikasikan oleh pengguna media siber, antara lain, artikel, gambar, komentar, suara, video dan berbagai bentuk unggahan yang melekat pada media siber, seperti blog, forum, komentar pembaca atau pemirsa, dan lain sebagainya.</li>
            </ol>

            <h3>2. Verifikasi dan keberimbangan berita</h3>
            <ol>
              <li>Pada prinsipnya setiap berita harus melalui verifikasi.</li>
              <li>Berita yang dapat merugikan pihak lain memerlukan verifikasi pada berita yang sama untuk memenuhi prinsip akurasi dan keberimbangan.</li>
              <li>Ketentuan dalam butir (a) di atas dikecualikan, dengan syarat:
                <ul>
                  <li>Berita benar-benar berisi kepentingan publik yang bersifat mendesak;</li>
                  <li>Sumber berita yang pertama adalah sumber yang jelas disebutkan identitasnya, kredibel dan kompeten;</li>
                  <li>Subyek berita yang harus dikonfirmasi tidak diketahui keberadaannya dan atau tidak dapat diwawancarai;</li>
                  <li>Media memberikan penjelasan kepada pembaca bahwa berita tersebut masih memerlukan verifikasi lebih lanjut yang diupayakan dalam waktu secepatnya. Penjelasan dimuat pada bagian akhir dari berita yang sama, di dalam kurung dan menggunakan huruf miring.</li>
                </ul>
              </li>
              <li>Setelah memuat berita sesuai dengan butir (c), media wajib meneruskan upaya verifikasi, dan setelah verifikasi didapatkan, hasil verifikasi dicantumkan pada berita pemutakhiran (update) dengan tautan pada berita yang belum terverifikasi.</li>
            </ol>

            <h3>3. Isi Buatan Pengguna (User Generated Content)</h3>
            <ol>
              <li>Media siber wajib mencantumkan syarat dan ketentuan mengenai Isi Buatan Pengguna yang tidak bertentangan dengan Undang-Undang No. 40 tahun 1999 tentang Pers dan Kode Etik Jurnalistik, yang ditempatkan secara terang dan jelas.</li>
              <li>Media siber mewajibkan setiap pengguna untuk mendaftar diri dan log-in terlebih dahulu untuk dapat mempublikasikan semua bentuk Isi Buatan Pengguna. Ketentuan mengenai log-in akan diatur lebih lanjut.</li>
              <li>Dalam pendaftaran tersebut, media siber mewajibkan pengguna memberi persetujuan tertulis bahwa Isi Buatan Pengguna yang dipublikasikan:
                <ul>
                  <li>Tidak memuat isi bohong, fitnah, sadis dan cabul;</li>
                  <li>Tidak memuat isi yang mengandung prasangka dan kebencian terkait dengan suku, agama, ras, dan antargolongan (SARA), serta menganjurkan tindakan kekerasan;</li>
                  <li>Tidak memuat isi diskriminatif atas dasar perbedaan jenis kelamin dan bahasa, serta tidak merendahkan martabat orang lemah, miskin, sakit, cacat jiwa, atau cacat jasmani.</li>
                </ul>
              </li>
            </ol>

            <h3>4. Ralat, Koreksi, dan Hak Jawab</h3>
            <ol>
              <li>Ralat, koreksi, dan hak jawab mengacu pada Undang-Undang Pers, Kode Etik Jurnalistik, dan Pedoman Hak Jawab yang ditetapkan Dewan Pers.</li>
              <li>Ralat, koreksi dan atau hak jawab wajib ditautkan pada berita yang diralat, dikoreksi atau yang diberi hak jawab.</li>
              <li>Di setiap berita yang diralat, dikoreksi, dan diberi hak jawab harus dicantumkan waktu pemuatan ralat, koreksi, dan atau hak jawab tersebut.</li>
            </ol>

            <h3>5. Pencabutan Berita</h3>
            <ol>
              <li>Berita yang sudah dipublikasikan tidak dapat dicabut karena alasan penyensoran dari pihak luar redaksi, kecuali terkait masalah SARA, kesusilaan, masa depan anak, pengalaman traumatik korban atau berdasarkan pertimbangan khusus lain yang ditetapkan Dewan Pers.</li>
              <li>Media siber lain yang sudah telanjur mengutip berita yang dicabut wajib mencabut berita yang sama.</li>
              <li>Pencabutan berita wajib disertai dengan alasan pencabutan dan diumumkan kepada publik.</li>
            </ol>

            <div className="mt-16 pt-8 border-t border-slate-800 flex flex-wrap gap-4 justify-center not-prose">
              <Link href="/tentang-kami" className="text-sm font-bold text-slate-400 hover:text-orange-500 transition-colors">Tentang Kami</Link>
              <span className="text-slate-700">•</span>
              <Link href="/redaksi" className="text-sm font-bold text-slate-400 hover:text-orange-500 transition-colors">Susunan Redaksi</Link>
              <span className="text-slate-700">•</span>
              <Link href="/kontak" className="text-sm font-bold text-slate-400 hover:text-orange-500 transition-colors">Kontak Kami</Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
