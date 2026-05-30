import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://tlcvwxrjhtozqulwkucy.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsY3Z3eHJqaHRvenF1bHdrdWN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcwOTc1MjcsImV4cCI6MjA5MjY3MzUyN30.vf0s-ScOLubekkP0u0O3dm9K-69jEiIk_7FhUsJYgHM'
);

async function check() {
  const { data, error } = await supabase.from('article_stats').select('*').limit(1);
  console.log('Data:', data);
  console.log('Error:', error);
}
check();
