import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Daftar rute statis/valid utama yang BUKAN artikel (agar tidak kena redirect ke /berita/)
const publicRoutes = ['/affiliate', '/anggota', '/berita', '/kategori', '/admin', '/api', '/_next', '/world-cup-2027'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // --- 1. ADMIN AUTHENTICATION ---
  // Hanya kunci route /admin/... tapi kecualikan /admin/login
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const authCookie = request.cookies.get('admin_session');
    const validPassword = 'skorakhir2026';
    const providedCookieValue = (authCookie?.value || '').trim();

    if (!authCookie || providedCookieValue !== validPassword) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // --- 2. OLD WORDPRESS REDIRECTS ---
  // Redirect A: /kategori/parent/child -> /kategori/child
  if (pathname.startsWith('/kategori/')) {
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length > 2) {
      const lastSlug = segments[segments.length - 1];
      return NextResponse.redirect(new URL(`/kategori/${lastSlug}`, request.url), 301);
    }
  }

  // Redirect B: Top-level slug /:slug -> /berita/:slug (Menangani artikel WP lama tanpa /berita/)
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length === 1) {
    const slug = segments[0];
    // Pastikan slug BUKAN rute statis valid, dan BUKAN file (.xml, .txt, .png, dsb)
    if (!publicRoutes.includes(`/${slug}`) && !slug.includes('.')) {
      return NextResponse.redirect(new URL(`/berita/${slug}`, request.url), 301);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Jalankan middleware ini di semua rute KECUALI aset statis Next.js (bawaan _next)
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
