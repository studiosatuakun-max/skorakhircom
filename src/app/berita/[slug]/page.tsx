import React from 'react';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import TrendingTopics from '@/components/home/TrendingTopics'; 

import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Tag } from 'lucide-react';
import AdBanner from '@/components/shared/AdBanner';
import ArticleActions from '@/components/article/ArticleActions';
import FloatingActions from '@/components/article/FloatingActions';
import RelatedArticles from '@/components/article/RelatedArticles';
import SafeImage from '@/components/shared/SafeImage';
import ContentRenderer from '@/components/article/ContentRenderer';
import ArticleWatermark from '@/components/article/ArticleWatermark';
import PostViewer from '@/components/article/PostViewer';
import GarudaPrideSidebar from '@/components/article/GarudaPrideSidebar';
import EditorialShowcase from '@/components/home/EditorialShowcase';
import GarudaBanner from '@/components/home/GarudaBanner';
import { getAffiliateByContext } from '@/lib/affiliateProducts';

import { fetchWP } from '@/lib/wp-graphql';
import { notFound } from 'next/navigation';

async function getArticle(slug: string) {
  const query = `
    query GetPostBySlug($id: ID!) {
      post(id: $id, idType: SLUG) {
        title
        slug
        content
        excerpt
        date
        modified
        categories {
          nodes {
            name
            slug
          }
        }
        tags {
          nodes {
            name
            slug
          }
        }
        author {
          node {
            name
          }
        }
        featuredImage {
          node {
            sourceUrl
          }
        }
        tags {
          nodes {
            name
            slug
          }
        }
      }
    }
  `;

  try {
    const data = await fetchWP(query, { variables: { id: slug } });
    const post = data?.post;

    if (!post) return null;

    return {
      title: post.title,
      slug: post.slug,
      category: post.categories?.nodes?.[0]?.name || 'UMUM',
      categorySlug: post.categories?.nodes?.[0]?.slug || 'umum',
      date: post.date,
      modified: post.modified || post.date,
      author: post.author?.node?.name || 'Tim Redaksi',
      content: post.content,
      excerpt: post.excerpt,
      image: post.featuredImage?.node?.sourceUrl || '/images/placeholder.png',
      tags: post.tags?.nodes?.map((t: any) => ({ name: t.name, slug: t.slug })) || [],
    };
  } catch (error) {
    console.error('Error fetching article:', error);
    return null;
  }
}

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    return { title: 'Halaman Tidak Ditemukan - SkorAkhir' };
  }

  const rawDescription = article.excerpt || article.content;
  const cleanDescription = rawDescription.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/\n/g, ' ').trim().substring(0, 160) + '...';

  return {
    title: `${article.title} - SkorAkhir`,
    description: cleanDescription,
    openGraph: {
      title: article.title,
      description: cleanDescription,
      url: `/berita/${article.slug}`,
      siteName: 'SkorAkhir',
      images: [
        {
          url: article.image,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
      type: 'article',
      publishedTime: article.date,
      authors: [article.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: cleanDescription,
      images: [article.image],
    },
    alternates: {
      canonical: `/berita/${article.slug}`,
    }
  };
}

export default async function NewsDetail({ params }: Props) {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) return notFound();

  // Ambil SEMUA produk affiliate agar fitur auto-slide Marquee bisa berjalan sempurna seperti di Homepage
  const editorsDeals = await getAffiliateByContext('all');

  // Ambil artikel terkait dari WordPress via GraphQL
  let relatedArticles = [];
  try {
    const relatedQuery = `
      query GetRelatedPosts($categoryName: String!) {
        posts(where: {categoryName: $categoryName}, first: 5) {
          nodes {
            title
            slug
            featuredImage {
              node {
                sourceUrl
              }
            }
            categories {
              nodes {
                name
              }
            }
          }
        }
      }
    `;
    const relatedData = await fetchWP(relatedQuery, { variables: { categoryName: article.categorySlug } });
    
    relatedArticles = (relatedData?.posts?.nodes || [])
      .filter((post: any) => post.slug !== slug)
      .slice(0, 4)
      .map((post: any) => ({
        title: post.title,
        slug: post.slug,
        categories: { name: post.categories?.nodes?.[0]?.name || 'UMUM' },
        featured_image: post.featuredImage?.node?.sourceUrl?.replace(/^https:\/\//i, 'http://') || '/images/placeholder.png',
      }));
  } catch (error) {
    console.error('Error fetching related articles:', error);
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    image: [article.image],
    datePublished: article.date,
    dateModified: article.modified,
    author: [{
      '@type': 'Person',
      name: article.author,
    }],
    publisher: {
      '@type': 'Organization',
      name: 'SkorAkhir',
      logo: {
        '@type': 'ImageObject',
        url: 'https://skorakhir.com/logo.png',
      },
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Beranda',
        item: 'https://skorakhir.com/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: article.category,
        item: `https://skorakhir.com/kategori/${article.categorySlug}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: article.title,
        item: `https://skorakhir.com/berita/${article.slug}`,
      },
    ],
  };

  const schemaData = [jsonLd, breadcrumbSchema];

  const renderContent = (htmlOrText: string) => {
    if (/<[a-z][\s\S]*>/i.test(htmlOrText)) {
      return htmlOrText;
    }
    return htmlOrText
      .split('\n')
      .filter(line => line.trim().length > 0)
      .map(line => `<p>${line}</p>`)
      .join('');
  };

  const processedContent = renderContent(article.content);

  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <main className="min-h-screen pt-8 pb-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Kolom Kiri: Artikel */}
            <article className="lg:col-span-8">
              <nav aria-label="breadcrumb" className="mb-6 flex items-center font-bold text-xs uppercase text-slate-500 gap-2">
                <Link href="/" className="hover:text-orange-500 transition-colors flex items-center gap-1">
                  <ArrowLeft className="w-3 h-3" /> Beranda
                </Link>
                <span>/</span>
                <span className="text-slate-300">{article.category}</span>
              </nav>

              <AdBanner />

              <header className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-yellow-400 text-white px-3 py-1 text-xs font-black uppercase tracking-wider">
                    {article.category}
                  </span>
                  <time dateTime={article.date} className="text-xs font-bold text-slate-400">
                    {new Intl.DateTimeFormat('id-ID', { dateStyle: 'full', timeStyle: 'short' }).format(new Date(article.date))}
                  </time>
                </div>
                
                <h1 className="text-3xl md:text-5xl font-black italic tracking-tight leading-[1.1] mb-6 text-white break-words">
                  {article.title}
                </h1>
                
                <div className="flex items-center justify-between border-y border-slate-800 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center font-black text-slate-500">
                      {article.author.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-200">Oleh <span className="text-orange-500">{article.author}</span></p>
                      <p className="text-[10px] uppercase font-bold text-slate-500">Jurnalis SkorAkhir</p>
                      <PostViewer slug={article.slug} />
                    </div>
                  </div>

                  <ArticleActions title={article.title} slug={article.slug} />
                </div>
              </header>

              <figure className="mb-10 w-full aspect-video bg-slate-900 overflow-hidden relative border border-slate-800">
                <SafeImage 
                  src={article.image} 
                  alt={article.title} 
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover"
                />
                <figcaption className="absolute bottom-2 right-2 bg-slate-950/80 px-2 py-1 text-[9px] font-bold text-slate-400">
                  Ilustrasi: {article.title}
                </figcaption>
              </figure>

              <ArticleWatermark title={article.title} url={`/berita/${article.slug}`}>
                <ContentRenderer htmlContent={processedContent} />

                {/* Tags Section for Internal Linking */}
                {article.tags?.nodes?.length > 0 && (
                  <div className="mt-10 pt-6 border-t border-slate-800 flex flex-wrap items-center gap-2">
                    <span className="text-sm font-bold text-slate-400 mr-2 flex items-center gap-1">
                      <Tag className="w-4 h-4" /> Topik Terkait:
                    </span>
                    {article.tags.nodes.map((tag: any) => (
                      <Link 
                        key={tag.slug} 
                        href={`/tag/${tag.slug}`}
                        className="bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-orange-500 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors border border-slate-700"
                      >
                        #{tag.name}
                      </Link>
                    ))}
                  </div>
                )}
              </ArticleWatermark>

              {/* Gear Spotlight Affiliate */}
              <div className="mb-12">
                <EditorialShowcase products={editorsDeals} />
              </div>

              {/* Section Artikel Terkait */}
              <section aria-labelledby="related-articles">
                <div className="flex items-center gap-2 mb-6 border-b-2 border-white/20 pb-2">
                  <h2 id="related-articles" className="text-xl sm:text-2xl font-black italic tracking-tight uppercase text-white">Artikel Terkait</h2>
                </div>
                
                <RelatedArticles articles={relatedArticles} />
              </section>
              
              <AdBanner />
            </article>

            {/* Kolom Kanan: Sidebar */}
            <aside className="lg:col-span-4 mt-8 lg:mt-0 flex flex-col gap-8">
              <TrendingTopics />
              
              <div className="sticky top-24 flex flex-col gap-8">
                <GarudaPrideSidebar />
                <GarudaBanner />
              </div>
            </aside>
            
          </div>
        </div>


      </main>

      <FloatingActions />
      <Footer />
    </>
  );
}
