import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Hanya kunci route /admin/... tapi kecualikan /admin/login
  if (request.nextUrl.pathname.startsWith('/admin') && !request.nextUrl.pathname.startsWith('/admin/login')) {
    const authCookie = request.cookies.get('admin_session');
    
    // Hardcode password sementara untuk bypass cache env
    const validPassword = 'skorakhir2026';
    const providedCookieValue = (authCookie?.value || '').trim();

    // Cek apakah cookie admin auth valid
    if (!authCookie || providedCookieValue !== validPassword) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
