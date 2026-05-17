import { NextRequest, NextResponse } from 'next/server';

// In a real application, you would fetch this mapping from a database (e.g., Headless WP / Supabase)
// For now, we use a simple object to map slugs to actual affiliate URLs
const affiliateLinks: Record<string, string> = {
  'adidas-cross-it': 'https://s.shopee.co.id/3B4IjzkfwH?share_channel_code=1',
  'babolat-overgrip': 'https://s.shopee.co.id/1gFUx82UhG?share_channel_code=1',
  'ianoni-beginner': 'https://s.shopee.co.id/3g0ZKppXF2?share_channel_code=1',
  'nox-x-one': 'https://s.shopee.co.id/8pifULYHSv?share_channel_code=1',
  'svrg-grip': 'https://s.shopee.co.id/8ASyhGT3gI?share_channel_code=1'
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  
  // Find the target URL
  const targetUrl = affiliateLinks[slug];

  if (!targetUrl) {
    // If not found, redirect to a fallback page (e.g., the merchandise page or homepage)
    return NextResponse.redirect(new URL('/merchandise', request.url));
  }

  // Optional: Here you can add Analytics Tracking logic before redirecting
  // e.g., await trackClick(slug);
  
  // Perform a 302 Found redirect (temporary) to the affiliate link
  // We use 302 instead of 301 so browsers don't cache it, allowing us to track clicks every time
  return NextResponse.redirect(targetUrl, 302);
}
