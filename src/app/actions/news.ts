'use server'

import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createNews(formData: FormData) {
  const title = formData.get('title') as string;
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  const excerpt = formData.get('excerpt') as string;
  const content = formData.get('content') as string;
  const author = formData.get('author') as string;
  const is_garuda_pride = formData.get('is_garuda_pride') === 'on';
  
  let featured_image = '';
  const imageFile = formData.get('imageFile') as File | null;

  // 1. Upload Gambar ke Supabase Storage (Jika ada file yang dipilih)
  if (imageFile && imageFile.size > 0) {
    const fileExt = imageFile.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('images') // Pastikan Bucket bernama 'images' sudah dibuat & diset Public
      .upload(fileName, imageFile);

    if (uploadError) {
      console.error("Gagal upload gambar:", uploadError);
      throw new Error('Gagal upload gambar ke Supabase Storage.');
    }

    // Ambil URL publik gambar
    const { data: publicUrlData } = supabase.storage.from('images').getPublicUrl(fileName);
    featured_image = publicUrlData.publicUrl;
  } else {
    // Kalau nggak ada file, mungkin user masukin URL manual (fallback opsional, disini kita wajibkan upload file atau jadikan empty string)
    throw new Error('Harap pilih file gambar utama.');
  }

  // 2. Simpan ke Database
  const { error } = await supabase
    .from('news')
    .insert([
      { 
        title, 
        slug, 
        excerpt, 
        content, 
        featured_image,
        author,
        is_garuda_pride
      }
    ]);

  if (error) {
    console.error("Error inserting news:", error);
    throw new Error('Gagal menyimpan berita. ' + error.message);
  }

  revalidatePath('/admin/berita');
  revalidatePath('/'); // Refresh homepage
  redirect('/admin/berita');
}

export async function deleteNews(id: string) {
  const { error } = await supabase.from('news').delete().eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/admin/berita');
  revalidatePath('/');
}

export async function updateNews(id: string, formData: FormData) {
  const title = formData.get('title') as string;
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  const excerpt = formData.get('excerpt') as string;
  const content = formData.get('content') as string;
  const author = formData.get('author') as string;
  const is_garuda_pride = formData.get('is_garuda_pride') === 'on';
  
  let updateData: any = { 
    title, 
    slug, 
    excerpt, 
    content, 
    author,
    is_garuda_pride
  };

  const imageFile = formData.get('imageFile') as File | null;
  if (imageFile && imageFile.size > 0) {
    const fileExt = imageFile.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    
    const { error: uploadError } = await supabase.storage
      .from('images')
      .upload(fileName, imageFile);

    if (uploadError) throw new Error('Gagal upload gambar ke Supabase Storage.');

    const { data: publicUrlData } = supabase.storage.from('images').getPublicUrl(fileName);
    updateData.featured_image = publicUrlData.publicUrl;
  }

  const { error } = await supabase.from('news').update(updateData).eq('id', id);
  if (error) throw new Error('Gagal update berita. ' + error.message);

  revalidatePath('/admin/berita');
  revalidatePath('/');
  redirect('/admin/berita');
}
