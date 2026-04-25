import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();

    if (password === process.env.ADMIN_PASSWORD) {
      // Set secure cookie
      const response = NextResponse.json({ success: true });
      response.cookies.set('admin_session', password, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7, // 1 minggu
        path: '/',
      });
      return response;
    } else {
      return NextResponse.json({ error: 'Password salah bang!' }, { status: 401 });
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
