'use server';

import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export async function addShort(formData: FormData) {
  const url = formData.get('url') as string;
  if (!url) return { error: 'URL is required' };
  
  const match = url.match(/shorts\/([a-zA-Z0-9_-]+)/);
  if (!match) return { error: 'Invalid YouTube Shorts URL. Must contain /shorts/VIDEO_ID' };
  
  const videoId = match[1];
  
  try {
    // Fetch oEmbed data for the title
    const oembedRes = await fetch(`https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`);
    let title = 'YouTube Short';
    
    if (oembedRes.ok) {
      const oembedData = await oembedRes.json();
      title = oembedData.title || title;
    }
    
    // Fallback to maxresdefault, but if it doesn't load well, hqdefault is a safer bet.
    // We will stick to maxresdefault.jpg as used previously.
    const thumbnail = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
    
    const { error } = await supabase.from('youtube_shorts').insert({
      title,
      url,
      thumbnail,
      views: '100K'
    });
    
    if (error) return { error: error.message };
    
    revalidatePath('/');
    revalidatePath('/admin/shorts');
    return { success: true };
  } catch (err: any) {
    return { error: err.message || 'Something went wrong' };
  }
}

export async function deleteShort(id: number) {
  const { error } = await supabase.from('youtube_shorts').delete().eq('id', id);
  if (error) return { error: error.message };
  
  revalidatePath('/');
  revalidatePath('/admin/shorts');
  return { success: true };
}
