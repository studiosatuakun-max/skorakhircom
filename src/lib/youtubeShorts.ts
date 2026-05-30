import { supabase } from './supabase';

export interface YoutubeShort {
  id: number;
  title: string;
  url: string;
  thumbnail: string;
  views: string;
  created_at: string;
}

export async function getShorts(): Promise<YoutubeShort[]> {
  try {
    const { data, error } = await supabase
      .from('youtube_shorts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching youtube shorts:', error);
      return [];
    }
    return data || [];
  } catch (err) {
    console.error('Failed to fetch youtube shorts:', err);
    return [];
  }
}
