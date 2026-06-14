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
Tulis ulang (rewrite) teks berita di bawah ini menjadi sebuah artikel panjang (minimal 600 kata).
DILARANG KERAS MENYINGKAT ATAU MERANGKUM (SUMMARIZE) teks asli. Anda harus MENGEMBANGKAN (EXPAND) ceritanya.

Aturan Wajib (Hukuman jika dilanggar):
1. JANGAN PERNAH menghilangkan SATU PUN nama pemain, nama pelatih, menit gol, atau data statistik yang ada di teks asli. Semuanya WAJIB dimasukkan kembali ke artikel baru Anda secara detail.
2. JANGAN membuat kalimat generik (seperti "Pemain AS merasa puas" atau "Pelatih AS senang"). Sebutkan NAMA MEREKA secara spesifik sesuai teks asli.
3. Pecah artikel menjadi beberapa sub-topik dengan minimal 3-4 tag <h2> yang memikat.
4. Buat satu sesi khusus untuk "Review & Analisis Taktik" yang mendalam tentang jalannya pertandingan.
5. Gunakan format HTML Semantik: <p> untuk paragraf, <ul>/<li> untuk daftar fakta, dan <blockquote> untuk kutipan.
6. Sisipkan 1 rekomendasi afiliasi menggunakan format:
   <p>[AFFILIATE name="Nama Produk" price="Rp X.XXX.XXX" url="https://link-affiliate.com" image="https://domain.com/image.jpg" platform="Shopee" badge="Pilihan Editor"]</p>
7. Output MURNI HTML, tanpa pengantar atau blok markdown.

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
