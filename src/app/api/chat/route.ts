import { GoogleGenerativeAI } from '@google/generative-ai';
import { GoogleGenerativeAIStream, Message, StreamingTextResponse } from 'ai';
import { NextResponse } from 'next/server';

export const maxDuration = 30; // Extend timeout for chat

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// Sederhana: Rate limiter in-memory sementara (Hanya jalan per-instance Vercel, cukup untuk testing)
// Untuk production skala besar, gunakan Redis/Supabase.
const rateLimit = new Map<string, { count: number, resetAt: number }>();

const MAX_REQUESTS = 5;
const WINDOW_MS = 24 * 60 * 60 * 1000; // 24 jam

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const userLimit = rateLimit.get(ip);
  
  if (!userLimit) {
    rateLimit.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  
  if (now > userLimit.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  
  if (userLimit.count >= MAX_REQUESTS) {
    return false;
  }
  
  userLimit.count += 1;
  return true;
}

const buildGoogleGenAIPrompt = (messages: Message[]) => {
  return {
    contents: messages.map((m) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }],
    })),
  };
};

export async function POST(req: Request) {
  try {
    // 1. Rate Limiting Check
    const ip = req.headers.get('x-forwarded-for') || 'anonymous';
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Limit pertanyaan harian (5x) sudah habis. Silakan coba lagi besok.' }, 
        { status: 429 }
      );
    }

    const { messages } = await req.json();

    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      systemInstruction: `Anda adalah "SkorAkhir AI", seorang pakar dan analis olahraga yang bekerja untuk portal berita olahraga SkorAkhir.com. 
Kepribadian Anda: Tajam, informatif, asik, bersemangat, dan kadang menyisipkan opini pedas layaknya komentator sepak bola.
Aturan:
1. Jawab selalu dalam bahasa Indonesia dengan gaya jurnalistik/komentator kasual (gunakan sapaan seperti 'Bung', 'Bro', atau 'Sobat SkorAkhir').
2. Fokus bahas olahraga (Sepak bola, Bulutangkis, MotoGP, dll). Jika ditanya di luar topik olahraga, tolak dengan sopan dan kembalikan ke topik olahraga.
3. Berikan analisa taktik atau prediksi berdasarkan data umum jika diminta.
4. Gunakan formatting Markdown yang rapi (bold, list, spasi) agar mudah dibaca di widget chat sempit.
5. Jangan pernah menjawab lebih dari 3-4 paragraf agar chat tidak terlalu panjang.`
    });

    const geminiStream = await model.generateContentStream(buildGoogleGenAIPrompt(messages));
    const stream = GoogleGenerativeAIStream(geminiStream);
    return new StreamingTextResponse(stream);
  } catch (error: any) {
    console.error("Chat API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
