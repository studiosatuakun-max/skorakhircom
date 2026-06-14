import Groq from 'groq-sdk';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();

    if (!text || text.trim() === '') {
      return NextResponse.json({ error: 'Text cannot be empty' }, { status: 400 });
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Groq API key not configured' }, { status: 500 });
    }

    const groq = new Groq({ apiKey });

    // Gunakan Llama-3 8B atau 70B yang sangat handal untuk text processing
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

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama-3.3-70b-versatile", // Model Llama terbaru yang disupport Groq
      temperature: 0.3, // Turunkan temperature agar lebih faktual dan tidak berhalusinasi
      max_tokens: 4000,
    });

    let outputText = chatCompletion.choices[0]?.message?.content || "";
    // Bersihkan sisa markdown barangkali Llama masih ngeyel
    outputText = outputText.replace(/^```html\n?/, '').replace(/\n?```$/, '').trim();

    return NextResponse.json({ revisedText: outputText }, { status: 200 });

  } catch (error: any) {
    console.error("Groq Rewrite Error:", error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
