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
    const prompt = `Anda adalah editor senior dan ahli SEO untuk situs web berita olahraga bernama "SkorAkhir".
Situs ini menggunakan gaya penulisan yang energik, lugas, tajam (ala jurnalisme olahraga premium), dan mematuhi kaidah SEO.
Tugas Anda adalah merombak (rewrite) artikel berita berikut menjadi artikel baru yang unik (agar tidak plagiat/duplicate content), lebih menarik, dengan format HTML yang siap pakai.

Panduan Wajib:
1. Jadikan gaya bahasanya sangat "Quiet Luxury" yang elegan, tapi tetap berapi-api dan kompetitif.
2. Gunakan tag semantik HTML standar: <p> untuk setiap paragraf. Pastikan setiap pergantian topik dibuat dalam <p> yang baru.
3. Buat minimal 1 subjudul yang menarik dengan tag <h2> (Jangan gunakan tag h1).
4. Jika ada kutipan narasumber di teks, pastikan dibungkus dalam tag <blockquote>.
5. Bumbui dengan beberapa frasa "Local Pride" yang membanggakan jika topiknya relevan dengan Indonesia.
6. HANYA hasilkan konten dalam elemen HTML murni. DILARANG mencantumkan pengantar, perkenalan, markdown \`\`\`html, atau teks lain selain blok HTML artikel. Format langsung elemen.

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
      max_tokens: 2000,
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
