import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostBySlug, getCategoryBySlug, getAllPostSlugs } from '@/lib/wordpress';
import { formatDate, calculateReadingTime, stripHtml } from '@/lib/blog-utils';
import { generateSchemaOrg } from '@/lib/schema-generator';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingCTA from '@/components/ui/FloatingCTA';
import { Clock, Calendar, ArrowLeft } from 'lucide-react';

// Helper function to replace WordPress staging links with production links
function replaceInternalLinks(content: string): string {
  const stagingDomain = 'https://optizenapp-staging.p3ue6i.ap-southeast-2.wpstaqhosting.com';
  const productionDomain = 'https://optizenapp.com';
  return content.replace(new RegExp(stagingDomain, 'g'), productionDomain);
}

interface PageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map(({ category, slug }) => ({
    category,
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category, slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const categoryData = await getCategoryBySlug(category);
  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;

  // Use Rank Math SEO title if available, otherwise fall back to post title
  const seoTitle = (post as any).seoMeta?.seoTitle || post.title.rendered;
  const seoDescription = (post as any).seoMeta?.seoDescription || post.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 160);

  return {
    title: seoTitle.includes('|') ? seoTitle : `${seoTitle} | OptizenApp Blog`,
    description: seoDescription,
    keywords: [categoryData?.name || '', 'Shopify', 'SEO', 'Video Upsell', 'E-commerce'],
    authors: [{ name: post._embedded?.author?.[0]?.name || 'OptizenApp' }],
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.modified,
      images: featuredImage ? [{ url: featuredImage }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDescription,
      images: featuredImage ? [featuredImage] : [],
    },
  };
}

export default async function BlogPost({ params }: PageProps) {
  const { category, slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const categoryData = await getCategoryBySlug(category);
  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0];
  const authorName = post._embedded?.author?.[0]?.name || 'OptizenApp';
  const readingTime = calculateReadingTime(post.content.rendered);

  // Build breadcrumbs
  const breadcrumbs = [
    { name: 'Home', url: 'https://optizenapp.com' },
    { name: categoryData?.name || 'Blog', url: `https://optizenapp.com/${category}` },
    { name: stripHtml(post.title.rendered), url: `https://optizenapp.com/${category}/${slug}` },
  ];

  // LLM-Powered Schema.org Generation
  const schema = await generateSchemaOrg({
    url: `https://optizenapp.com/${category}/${slug}`,
    title: stripHtml(post.title.rendered),
    content: post.content.rendered,
    excerpt: stripHtml(post.excerpt.rendered),
    author: authorName,
    datePublished: post.date,
    dateModified: post.modified,
    category: categoryData?.name || 'Blog',
    featuredImage: featuredImage ? {
      url: featuredImage.source_url,
      width: featuredImage.media_details?.width || 1200,
      height: featuredImage.media_details?.height || 630,
      alt: featuredImage.alt_text,
    } : undefined,
    breadcrumbs,
    siteInfo: {
      name: 'OptizenApp',
      url: 'https://optizenapp.com',
      logoUrl: 'https://optizenapp.com/optizen-logo.png',
    },
  });

  return (
    <>
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
      
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <FloatingCTA />
        
        <main className="flex-1 pt-16">
          {/* Breadcrumbs */}
          <div className="bg-gray-50 border-b border-gray-200">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <nav className="flex items-center space-x-2 text-sm">
                <Link href="/" className="text-gray-500 hover:text-optizen-blue-500 transition-colors">
                  Home
                </Link>
                <span className="text-gray-400">/</span>
                <Link 
                  href={`/${category}`} 
                  className="text-gray-500 hover:text-optizen-blue-500 transition-colors capitalize"
                >
                  {categoryData?.name || category}
                </Link>
                <span className="text-gray-400">/</span>
                <span className="text-gray-900 font-medium">
                  {post.title.rendered}
                </span>
              </nav>
            </div>
          </div>

          {/* Article Header */}
          <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Back Link & Category Badge */}
            <div className="flex items-center gap-4 mb-8">
              <Link 
                href={`/${category}`}
                className="inline-flex items-center text-optizen-blue-500 hover:text-optizen-blue-600 transition-colors"
              >
                <ArrowLeft className="mr-2" size={20} />
                Back to {categoryData?.name || 'Blog'}
              </Link>

              {/* Category Badge */}
              {categoryData && (
                <Link
                  href={`/${category}`}
                  className="inline-block px-4 py-2 bg-optizen-blue-100 text-optizen-blue-600 rounded-full text-sm font-semibold hover:bg-optizen-blue-200 transition-colors"
                >
                  {categoryData.name}
                </Link>
              )}
            </div>

            {/* Title */}
            <h1 
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight"
              dangerouslySetInnerHTML={{ __html: replaceInternalLinks(post.title.rendered) }}
            />

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8 pb-8 border-b border-gray-200">
              <div className="flex items-center">
                <Calendar size={18} className="mr-2" />
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </div>
              <div className="flex items-center">
                <Clock size={18} className="mr-2" />
                <span>{readingTime} min read</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm">By {authorName}</span>
              </div>
            </div>

            {/* Featured Image */}
            {featuredImage && (
              <div className="relative w-full aspect-video mb-12 rounded-2xl overflow-hidden">
                <Image
                  src={featuredImage.source_url}
                  alt={featuredImage.alt_text || post.title.rendered}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {/* Article Content */}
            <div 
              className="prose prose-lg max-w-none
                prose-headings:font-bold prose-headings:text-gray-900
                prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                prose-p:text-gray-900 prose-p:leading-relaxed
                prose-a:text-optizen-blue-600 prose-a:font-bold hover:prose-a:text-optizen-blue-700 hover:prose-a:underline
                prose-li:text-gray-900
                prose-strong:text-gray-900 prose-strong:font-semibold
                prose-img:rounded-xl prose-img:shadow-lg
                prose-blockquote:border-l-4 prose-blockquote:border-optizen-blue-400 prose-blockquote:text-gray-900
                prose-table:border-collapse prose-table:w-full
                prose-th:bg-gray-100 prose-th:font-semibold prose-th:text-gray-900
                prose-td:text-gray-900"
              dangerouslySetInnerHTML={{ __html: replaceInternalLinks(post.content.rendered) }}
            />

            {/* CTA Section */}
            <div className="mt-16 p-8 bg-gradient-to-br from-optizen-blue-50 to-optizen-green-50 rounded-2xl border-2 border-optizen-blue-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Ready to Boost Your Shopify Store?
              </h3>
              <p className="text-gray-700 mb-6">
                Increase revenue with video upsells and dominate search rankings with AI-powered SEO.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/optizenai-video-upsells-and-bundles"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-full font-semibold bg-optizen-blue-500 text-white hover:bg-optizen-blue-600 transition-colors"
                >
                  Try Video Upsell
                </Link>
                <Link
                  href="/optizenai-seo"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-full font-semibold bg-optizen-green-500 text-white hover:bg-optizen-green-600 transition-colors"
                >
                  Try SEO Tools
                </Link>
              </div>
            </div>
          </article>
        </main>

        <Footer />
      </div>
    </>
  );
}

