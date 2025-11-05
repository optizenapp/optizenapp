import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCategoryBySlug, getPosts, getCategories } from '@/lib/wordpress';
import { formatDate, calculateReadingTime, stripHtml, truncateText } from '@/lib/blog-utils';
import { generateSchemaOrg } from '@/lib/schema-generator';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Clock, Calendar, ArrowRight } from 'lucide-react';

interface PageProps {
  params: Promise<{
    category: string;
  }>;
  searchParams: Promise<{
    page?: string;
  }>;
}

// Generate static paths for all categories
export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((category) => ({
    category: category.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const categoryData = await getCategoryBySlug(category);

  if (!categoryData) {
    return {
      title: 'Category Not Found',
    };
  }

  // Custom descriptions for SEO
  const categoryDescriptions: Record<string, string> = {
    'aov': 'Discover proven strategies to increase your Average Order Value (AOV) and boost revenue without spending more on customer acquisition. Learn about product bundling, upselling techniques, and optimization tactics.',
    'shopify-questions': 'Get answers to common Shopify questions and learn best practices for managing your store. From setup to optimization, find expert guidance for all your Shopify needs.',
    'ai-prompts': 'Master the art of AI prompting for e-commerce. Learn how to create effective prompts for product descriptions, SEO content, and customer engagement using advanced AI techniques.',
    'shopify-seo': 'Optimize your Shopify store for search engines with expert SEO tips, best practices, and strategies. Learn how to rank higher and drive more organic traffic to your store.',
    'optizen-ai': 'Explore how OptizenAI can help you automate and optimize your Shopify store. Learn about AI-powered SEO tools, content generation, and advanced features to grow your business.',
    'content': 'Content marketing strategies and tips for e-commerce stores. Learn how to create compelling content that drives traffic, engages customers, and increases conversions.',
    'optizen': 'Updates, tutorials, and insights about Optizen apps. Stay informed about new features, best practices, and success stories from other Shopify merchants.',
    'silos': 'Learn about SEO siloing strategies to organize your content and improve search rankings. Discover how to create structured category hierarchies for better SEO performance.',
    'stats': 'E-commerce statistics, data insights, and analytics to help you make informed decisions. Understand industry benchmarks and key performance metrics for your store.',
  };

  const customDescription = categoryDescriptions[category] || categoryData.description || `Read all articles about ${categoryData.name} on the OptizenApp blog. Learn about Shopify SEO, video upsells, and e-commerce growth strategies.`;

  return {
    title: `${categoryData.name} | OptizenApp Blog`,
    description: customDescription,
    keywords: [categoryData.name, 'Shopify', 'SEO', 'Video Upsell', 'E-commerce'],
    openGraph: {
      title: `${categoryData.name} | OptizenApp Blog`,
      description: customDescription,
      type: 'website',
    },
  };
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
  const { category } = await params;
  const { page } = await searchParams;
  const currentPage = parseInt(page || '1');

  const categoryData = await getCategoryBySlug(category);

  if (!categoryData) {
    notFound();
  }

  // Custom descriptions for each category
  const categoryDescriptions: Record<string, string> = {
    'aov': 'Discover proven strategies to increase your Average Order Value (AOV) and boost revenue without spending more on customer acquisition. Learn about product bundling, upselling techniques, and optimization tactics.',
    'shopify-questions': 'Get answers to common Shopify questions and learn best practices for managing your store. From setup to optimization, find expert guidance for all your Shopify needs.',
    'ai-prompts': 'Master the art of AI prompting for e-commerce. Learn how to create effective prompts for product descriptions, SEO content, and customer engagement using advanced AI techniques.',
    'shopify-seo': 'Optimize your Shopify store for search engines with expert SEO tips, best practices, and strategies. Learn how to rank higher and drive more organic traffic to your store.',
    'optizen-ai': 'Explore how OptizenAI can help you automate and optimize your Shopify store. Learn about AI-powered SEO tools, content generation, and advanced features to grow your business.',
    'content': 'Content marketing strategies and tips for e-commerce stores. Learn how to create compelling content that drives traffic, engages customers, and increases conversions.',
    'optizen': 'Updates, tutorials, and insights about Optizen apps. Stay informed about new features, best practices, and success stories from other Shopify merchants.',
    'silos': 'Learn about SEO siloing strategies to organize your content and improve search rankings. Discover how to create structured category hierarchies for better SEO performance.',
    'stats': 'E-commerce statistics, data insights, and analytics to help you make informed decisions. Understand industry benchmarks and key performance metrics for your store.',
  };

  const customDescription = categoryDescriptions[category] || categoryData.description;

  const { posts, totalPages, totalPosts } = await getPosts({
    categories: categoryData.id,
    per_page: 12,
    page: currentPage,
  });

  // Generate schema for category listing page
  const categoryContent = `
    ${categoryData.name} - OptizenApp Blog
    
    ${customDescription}
    
    Articles in this category:
    ${posts.map((post, index) => `
      ${index + 1}. ${stripHtml(post.title.rendered)}
      ${stripHtml(post.excerpt.rendered)}
      Published: ${post.date}
    `).join('\n')}
  `;

  const schema = await generateSchemaOrg({
    url: `https://optizenapp.com/${category}`,
    title: `${categoryData.name} | OptizenApp Blog`,
    content: categoryContent,
    excerpt: customDescription,
    datePublished: '2024-01-01T00:00:00Z',
    dateModified: '2024-01-01T00:00:00Z', // Static date - update manually when category structure changes
    category: categoryData.name,
    breadcrumbs: [
      { name: 'Home', url: 'https://optizenapp.com' },
      { name: 'Blog', url: 'https://optizenapp.com/blog' },
      { name: categoryData.name, url: `https://optizenapp.com/${category}` },
    ],
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
      
      <main className="flex-1 pt-16">
        {/* Breadcrumbs */}
        <div className="bg-gray-50 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex items-center space-x-2 text-sm">
              <Link href="/" className="text-gray-500 hover:text-optizen-blue-500 transition-colors">
                Home
              </Link>
              <span className="text-gray-400">/</span>
              <Link href="/blog" className="text-gray-500 hover:text-optizen-blue-500 transition-colors">
                Blog
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">
                {categoryData.name}
              </span>
            </nav>
          </div>
        </div>

        {/* Category Header */}
        <div className="bg-gradient-to-br from-optizen-blue-50 to-optizen-green-50 py-16 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              {categoryData.name}
            </h1>
            {customDescription && (
              <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-4 leading-relaxed">
                {customDescription}
              </p>
            )}
            <p className="text-gray-600">
              {totalPosts} {totalPosts === 1 ? 'article' : 'articles'}
            </p>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No articles found in this category yet.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => {
                  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0];
                  const readingTime = calculateReadingTime(post.content.rendered);
                  const excerpt = truncateText(stripHtml(post.excerpt.rendered), 150);

                  return (
                    <Link 
                      key={post.id}
                      href={`/${category}/${post.slug}`}
                      className="group bg-white rounded-2xl overflow-hidden border-2 border-gray-100 hover:border-optizen-blue-200 hover:shadow-lg transition-all duration-300"
                    >
                      {/* Featured Image */}
                      {featuredImage && (
                        <div className="relative w-full aspect-video overflow-hidden bg-gray-100">
                          <Image
                            src={featuredImage.source_url}
                            alt={featuredImage.alt_text || post.title.rendered}
                            fill
                            loading="lazy"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}

                      <div className="p-6">
                        {/* Meta Info */}
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center">
                            <Calendar size={16} className="mr-1" />
                            {formatDate(post.date)}
                          </div>
                          <div className="flex items-center">
                            <Clock size={16} className="mr-1" />
                            {readingTime} min
                          </div>
                        </div>

                        {/* Title */}
                        <h2 
                          className="text-xl font-bold text-gray-900 mb-3 group-hover:text-optizen-blue-500 transition-colors line-clamp-2"
                          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                        />

                        {/* Excerpt */}
                        <p className="text-gray-900 mb-4 line-clamp-3">
                          {excerpt}
                        </p>

                        {/* Read More Link */}
                        <div className="flex items-center text-optizen-blue-500 font-semibold group-hover:text-optizen-blue-600">
                          Read Article
                          <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-12">
                  {currentPage > 1 && (
                    <Link
                      href={`/${category}?page=${currentPage - 1}`}
                      className="px-6 py-3 rounded-full border-2 border-gray-200 hover:border-optizen-blue-500 hover:text-optizen-blue-500 transition-colors font-semibold"
                    >
                      Previous
                    </Link>
                  )}

                  <div className="flex items-center gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                      // Show first, last, current, and pages around current
                      if (
                        pageNum === 1 ||
                        pageNum === totalPages ||
                        (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                      ) {
                        return (
                          <Link
                            key={pageNum}
                            href={`/${category}?page=${pageNum}`}
                            className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold transition-colors ${
                              pageNum === currentPage
                                ? 'bg-optizen-blue-500 text-white'
                                : 'border-2 border-gray-200 hover:border-optizen-blue-500 hover:text-optizen-blue-500'
                            }`}
                          >
                            {pageNum}
                          </Link>
                        );
                      } else if (
                        pageNum === currentPage - 2 ||
                        pageNum === currentPage + 2
                      ) {
                        return <span key={pageNum} className="px-2">...</span>;
                      }
                      return null;
                    })}
                  </div>

                  {currentPage < totalPages && (
                    <Link
                      href={`/${category}?page=${currentPage + 1}`}
                      className="px-6 py-3 rounded-full border-2 border-gray-200 hover:border-optizen-blue-500 hover:text-optizen-blue-500 transition-colors font-semibold"
                    >
                      Next
                    </Link>
                  )}
                </div>
              )}
            </>
          )}

          {/* CTA Section */}
          <div className="mt-20 p-12 bg-gradient-to-br from-optizen-blue-500 to-optizen-green-500 rounded-3xl text-white text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Grow Your Shopify Store?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Try our apps and see the results for yourself
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/optizenai-video-upsells-and-bundles"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full font-semibold bg-white text-optizen-blue-500 hover:bg-gray-100 transition-colors"
              >
                Video Upsell App
              </Link>
              <Link
                href="/optizenai-seo"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full font-semibold bg-white text-optizen-green-500 hover:bg-gray-100 transition-colors"
              >
                SEO Tools App
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
    </>
  );
}

