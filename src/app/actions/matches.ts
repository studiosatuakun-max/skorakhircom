'use server'

import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export async function createMatch(formData: FormData) {
  const home_team = formData.get('home_team') as string;
  const away_team = formData.get('away_team') as string;
  const league = formData.get('league') as string;
  const is_local_pride = formData.get('is_local_pride') === 'on';

  const { error } = await supabase.from('matches').insert([
    { home_team, away_team, league, is_local_pride }
  ]);

  if (error) throw new Error(error.message);
  revalidatePath('/admin/livescore');
  revalidatePath('/');
}

export async function updateScore(id: string, formData: FormData) {
  const home_score = parseInt(formData.get('home_score') as string);
  const away_score = parseInt(formData.get('away_score') as string);
  const match_minute = formData.get('match_minute') as string;
  const status = formData.get('status') as string;

  const { error } = await supabase.from('matches').update({
    home_score, away_score, match_minute, status
  }).eq('id', id);

  if (error) throw new Error(error.message);
  revalidatePath('/admin/livescore');
  revalidatePath('/'); // update live score di homepage
}

export async function deleteMatch(id: string) {
  const { error } = await supabase.from('matches').delete().eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/admin/livescore');
  revalidatePath('/');
}
