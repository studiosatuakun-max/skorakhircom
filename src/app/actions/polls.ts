'use server';

import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export async function getActivePolls() {
  const { data, error } = await supabase
    .from('polls')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false });
    
  if (error) {
    console.error('Error fetching polls:', error);
    return [];
  }
  return data || [];
}

export async function getAllPolls() {
  const { data, error } = await supabase
    .from('polls')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (error) return [];
  return data || [];
}

export async function getPollById(id: number) {
  const { data, error } = await supabase
    .from('polls')
    .select('*')
    .eq('id', id)
    .single();
    
  if (error) {
    return null;
  }
  return data;
}

export async function votePoll(pollId: number, team: 'A' | 'B') {
  // Ambil data terbaru dulu
  const { data: poll, error: fetchError } = await supabase
    .from('polls')
    .select('votes_a, votes_b')
    .eq('id', pollId)
    .single();

  if (fetchError || !poll) return { success: false };

  const updateField = team === 'A' ? { votes_a: poll.votes_a + 1 } : { votes_b: poll.votes_b + 1 };
  
  const { error: updateError } = await supabase
    .from('polls')
    .update(updateField)
    .eq('id', pollId);

  if (!updateError) {
    revalidatePath('/');
    revalidatePath(`/polling/${pollId}`);
    return { success: true };
  }
  
  return { success: false };
}

export async function createPoll(formData: FormData) {
  const question = formData.get('question') as string;
  const team_a_name = formData.get('team_a_name') as string;
  const team_a_logo = formData.get('team_a_logo') as string;
  const team_b_name = formData.get('team_b_name') as string;
  const team_b_logo = formData.get('team_b_logo') as string;
  
  const { error } = await supabase.from('polls').insert([
    { question, team_a_name, team_a_logo, team_b_name, team_b_logo }
  ]);
  
  if (!error) {
    revalidatePath('/admin/polling');
    revalidatePath('/');
  }
}

export async function togglePollStatus(id: number, currentStatus: boolean) {
  const { error } = await supabase.from('polls').update({ is_active: !currentStatus }).eq('id', id);
  if (!error) {
    revalidatePath('/admin/polling');
    revalidatePath('/');
  }
}

export async function deletePoll(id: number) {
  const { error } = await supabase.from('polls').delete().eq('id', id);
  if (!error) {
    revalidatePath('/admin/polling');
    revalidatePath('/');
  }
}
