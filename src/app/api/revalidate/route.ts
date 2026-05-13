import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const secret = request.nextUrl.searchParams.get('secret');

    // Gunakan CRON_SECRET yang sudah ada di .env.local atau buat secret baru
    if (secret !== process.env.CRON_SECRET) {
      return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
    }

    // Revalidate semua query GraphQL yang di-tag dengan 'wordpress'
    revalidateTag('wordpress', {});

    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err) {
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 });
  }
}
