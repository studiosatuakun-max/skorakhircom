import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();

    if (!text || text.trim() === '') {
      return NextResponse.json({ error: 'Text cannot be empty' }, { status: 400 });
    }

    // Gunakan key dari env (HARUS diset di Vercel Dashboard)
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Gemini API key not configured' }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    // Menggunakan model gemini-2.5-flash karena gemini-1.5-pro sudah obsolete di 2026 dan bebas limit
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `Anda adalah jurnalis olahraga senior, analis taktik, dan ahli SEO untuk portal berita olahraga "SkorAkhir".
Gaya penulisan Anda: Tajam, analitis, mendalam (in-depth), energik, dan ala jurnalisme premium internasional.

TUGAS UTAMA: 
Tulis ulang (rewrite) teks berita mentah di bawah ini menjadi sebuah artikel berita Bahasa Indonesia yang SANGAT PANJANG, tajam, dan komprehensif.

ATURAN KONTEN (Hukuman jika dilanggar):
1. JANGAN MERANGKUM. Anda WAJIB MENGEMBANGKAN inti cerita. Jika teks asli menyebut nama pemain, Anda wajib menyebutkan namanya, rekam jejak, atau statistiknya.
2. JANGAN PERNAH menghilangkan nama pemain, nama pelatih, angka skor, persentase penguasaan bola, nama klub, atau menit terjadinya gol yang ada di teks asli!
3. Gunakan gaya jurnalisme olahraga premium internasional (tajam, analitis, "Quiet Luxury").
4. Buat satu bagian khusus dengan tag <h2> yang berisi "Review & Analisis Pertandingan".
5. Buat artikel ini menjadi minimal 4 paragraf besar, dengan subjudul <h2> sebagai pemisah agar tidak bosan dibaca.
6. Buat judul artikel yang sangat menarik dan panjang (SEO Friendly).
7. SEO KEYWORD (WAJIB): Sisipkan frasa "skor akhir" (huruf kecil, sebagai bagian dari kalimat jalannya pertandingan/hasil) minimal 4 kali secara natural.
8. BRANDING (WAJIB): Sebut nama redaksi "SkorAkhir" (huruf besar) minimal 2 kali (misal: "Analisis eksklusif redaksi SkorAkhir...").
9. INTERNAL LINKING (WAJIB): Jika Anda menyebut nama pemain atau pelatih yang terkenal, JADIKAN NAMA TERSEBUT SEBAGAI LINK HTML yang mengarah ke halaman tag-nya.
   Contoh format link: <a href="https://www.skorakhir.com/tag/VedaEgaPratama">Veda Ega Pratama</a>.
   (Hapus spasi pada URL tag, gunakan huruf besar-kecil sesuai nama aslinya seperti contoh VedaEgaPratama). Lakukan ini pada 3-5 nama tokoh utama.
10. Gunakan format HTML Semantik: <p> untuk paragraf, <ul>/<li> untuk daftar fakta, dan <blockquote> untuk kutipan.
11. Sisipkan 1 rekomendasi afiliasi menggunakan format:
    <p>[AFFILIATE name="Nama Produk" price="Rp X.XXX.XXX" url="https://link-affiliate.com" image="https://domain.com/image.jpg" platform="Shopee" badge="Pilihan Editor"]</p>
12. Output MURNI HTML, tanpa pengantar atau blok markdown.

Teks Asli:
"""
${text}
"""
`;

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 8192,
      }
    });

    let outputText = result.response.text() || "";
    // Bersihkan sisa markdown barangkali Gemini masih ngeyel
    outputText = outputText.replace(/^```html\n?/, '').replace(/\n?```$/, '').trim();

    return NextResponse.json({ revisedText: outputText }, { status: 200 });

  } catch (error: any) {
    console.error("Gemini Rewrite Error:", error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
