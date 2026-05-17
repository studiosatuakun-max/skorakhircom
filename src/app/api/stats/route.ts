import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const { slug, action } = await request.json();

    if (!slug || !action) {
      return NextResponse.json({ error: 'Missing slug or action' }, { status: 400 });
    }

    // 1. Cek apakah artikel sudah ada di database
    const { data: currentData, error: fetchError } = await supabase
      .from('article_stats')
      .select('*')
      .eq('slug', slug)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 is "Row not found"
      return NextResponse.json({ error: fetchError.message }, { status: 500 });
    }

    let newData = { views: 0, shares: 0 };

    if (currentData) {
      // Update jika sudah ada
      newData = {
        views: action === 'view' ? currentData.views + 1 : currentData.views,
        shares: action === 'share' ? currentData.shares + 1 : currentData.shares,
      };

      const { error: updateError } = await supabase
        .from('article_stats')
        .update(newData)
        .eq('slug', slug);

      if (updateError) throw updateError;
    } else {
      // Insert baru jika belum ada
      newData = {
        views: action === 'view' ? 1 : 0,
        shares: action === 'share' ? 1 : 0,
      };

      const { error: insertError } = await supabase
        .from('article_stats')
        .insert([{ slug, ...newData }]);

      if (insertError) throw insertError;
    }

    return NextResponse.json(newData);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');

  if (!slug) return NextResponse.json({ views: 0, shares: 0 });

  const { data, error } = await supabase
    .from('article_stats')
    .select('views, shares')
    .eq('slug', slug)
    .single();

  if (error || !data) {
    return NextResponse.json({ views: 0, shares: 0 });
  }

  return NextResponse.json(data);
}
