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

    const prompt = `Anda adalah editor senior majalah olahraga premium.
Buatlah ringkasan padat, memikat, dan menantang (maksimal 2 kalimat) dari teks artikel berita berikut ini.
Ringkasan ini akan digunakan sebagai meta description dan teks singkat (excerpt) di halaman depan (Home Page) untuk mengundang pembaca agar mengeklik artikel tersebut.
DILARANG memberikan imbuhan apapun seperti "Berikut adalah ringkusannya:", langsung berikan teks hasilnya saja.

Teks Artikel:
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
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_tokens: 150,
    });

    let outputText = chatCompletion.choices[0]?.message?.content || "";
    outputText = outputText.replace(/^["']|["']$/g, '').trim(); // Bersihkan tanda kutip kalau ada

    return NextResponse.json({ excerpt: outputText }, { status: 200 });

  } catch (error: any) {
    console.error("Groq Excerpt Error:", error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
