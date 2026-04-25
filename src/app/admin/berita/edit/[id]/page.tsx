import React from 'react';
import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import EditForm from './EditForm';

export default async function EditNewsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  const { data: news, error } = await supabase
    .from('news')
    .select('*')
    .eq('id', resolvedParams.id)
    .single();

  if (error || !news) {
    return notFound();
  }

  return <EditForm initialData={news} />;
}
