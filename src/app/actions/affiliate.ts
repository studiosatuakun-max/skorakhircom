'use server';

import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export async function getAffiliateProducts() {
  const { data, error } = await supabase
    .from('affiliate_products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching affiliate products:', error);
    return [];
  }
  return data;
}

export async function addAffiliateProduct(formData: FormData) {
  const name = formData.get('name') as string;
  const price = formData.get('price') as string;
  const original_price = formData.get('original_price') as string;
  const image_url = formData.get('image_url') as string;
  const affiliate_url = formData.get('affiliate_url') as string;
  const platform = formData.get('platform') as string;
  const rating = parseFloat(formData.get('rating') as string) || 5.0;
  const discount_badge = formData.get('discount_badge') as string;
  const category_slug = formData.get('category_slug') as string;

  const { error } = await supabase
    .from('affiliate_products')
    .insert([
      {
        name,
        price,
        original_price: original_price || null,
        image_url,
        affiliate_url,
        platform,
        rating,
        discount_badge: discount_badge || null,
        category_slug
      }
    ]);

  if (error) throw new Error(error.message);
  revalidatePath('/admin/affiliate');
  revalidatePath('/berita/[slug]');
}

export async function deleteAffiliateProduct(id: string) {
  const { error } = await supabase
    .from('affiliate_products')
    .delete()
    .eq('id', id);

  if (error) throw new Error(error.message);
  revalidatePath('/admin/affiliate');
  revalidatePath('/berita/[slug]');
}

export async function editAffiliateProduct(id: string, formData: FormData) {
  const name = formData.get('name') as string;
  const price = formData.get('price') as string;
  const original_price = formData.get('original_price') as string;
  const image_url = formData.get('image_url') as string;
  const affiliate_url = formData.get('affiliate_url') as string;
  const platform = formData.get('platform') as string;
  const rating = parseFloat(formData.get('rating') as string) || 5.0;
  const discount_badge = formData.get('discount_badge') as string;
  const category_slug = formData.get('category_slug') as string;

  const { error } = await supabase
    .from('affiliate_products')
    .update({
      name,
      price,
      original_price: original_price || null,
      image_url,
      affiliate_url,
      platform,
      rating,
      discount_badge: discount_badge || null,
      category_slug
    })
    .eq('id', id);

  if (error) throw new Error(error.message);
  revalidatePath('/admin/affiliate');
  revalidatePath('/berita/[slug]');
}
