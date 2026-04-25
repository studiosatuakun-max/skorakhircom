import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();
    // Hardcode password sementara untuk bypass semua masalah environment variable
    const validPassword = 'skorakhir2026';

    const providedPassword = (password || '').trim();

    if (providedPassword === validPassword) {
      // Set secure cookie
      const response = NextResponse.json({ success: true });
      response.cookies.set('admin_session', providedPassword, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7, // 1 minggu
        path: '/',
      });
      return response;
    } else {
      console.log(`Failed login attempt. Provided: "${providedPassword}", Expected: "${validPassword}"`);
      return NextResponse.json({ error: `Dikirim: '${providedPassword}', Harusnya: '${validPassword}'` }, { status: 401 });
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
