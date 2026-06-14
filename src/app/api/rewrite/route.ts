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
Tugas Anda: Merombak (rewrite) sekaligus MEMPERKAYA artikel berita berikut menjadi artikel baru yang sangat panjang, mendalam, dan komprehensif. Jangan buat artikel yang terlalu pendek.

Panduan Wajib:
1. Struktur Mendalam: Artikel harus panjang dan komprehensif. Pecah menjadi beberapa sub-topik dengan minimal 3-4 tag <h2> yang menarik.
2. Review Pertandingan & Analisis: Buat analisis tajam tentang jalannya pertandingan (match review), taktik yang digunakan, dan momen-momen krusial (turning point) yang terjadi di lapangan.
3. Kaya Data & Fakta: Masukkan dan sorot semua data penting (skor, statistik, menit gol) dari teks asli. Jangan ada fakta krusial yang terlewat.
4. Format HTML Semantik: Gunakan <p> untuk paragraf, <ul>/<li> untuk daftar fakta atau statistik penting, dan <blockquote> untuk kutipan wawancara/narasumber.
5. Local Pride: Jika relevan dengan Indonesia, berikan sentuhan narasi "Local Pride" yang membanggakan.
6. Rekomendasi Afiliasi (WAJIB 1-2 produk): Sisipkan rekomendasi perlengkapan olahraga/jersey yang relevan menggunakan format shortcode ini di dalam paragraf terpisah:
   <p>[AFFILIATE name="Nama Produk" price="Rp X.XXX.XXX" url="https://link-affiliate.com" image="https://domain.com/image.jpg" platform="Shopee" badge="Pilihan Editor"]</p>
7. Output MURNI HTML: DILARANG KERAS menggunakan pengantar, penutup, atau blok markdown \`\`\`html. Langsung keluarkan elemen HTML siap pakai.

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
      temperature: 0.7,
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
