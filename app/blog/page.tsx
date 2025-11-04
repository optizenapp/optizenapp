import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getPosts, getCategories } from '@/lib/wordpress';
import { formatDate, calculateReadingTime, stripHtml, truncateText } from '@/lib/blog-utils';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Clock, Calendar, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog | OptizenApp - Shopify SEO & Video Upsell Tips',
  description: 'Learn about Shopify SEO, video upsells, e-commerce growth strategies, and more. Expert tips and guides to help you grow your online store.',
  keywords: ['Shopify blog', 'SEO tips', 'Video upsell', 'E-commerce', 'Shopify guides'],
  openGraph: {
    title: 'OptizenApp Blog - Shopify SEO & Video Upsell Tips',
    description: 'Expert tips and guides to help you grow your Shopify store',
    type: 'website',
  },
};

interface PageProps {
  searchParams: Promise<{
    page?: string;
  }>;
}

export default async function BlogPage({ searchParams }: PageProps) {
  const { page } = await searchParams;
  const currentPage = parseInt(page || '1');

  const [{ posts, totalPages, totalPosts }, categories] = await Promise.all([
    getPosts({ per_page: 12, page: currentPage }),
    getCategories(),
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-optizen-blue-50 to-optizen-green-50 py-20 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Optizen<span className="text-optizen-blue-500">App</span> Blog
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Insights, tips, and strategies to help you grow your Shopify store with SEO and video upsells
            </p>
          </div>
        </div>

        {/* Categories Filter */}
        <div className="border-b border-gray-200 bg-white sticky top-0 z-10 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/blog"
                className="px-6 py-2 rounded-full font-semibold bg-optizen-blue-500 text-white hover:bg-optizen-blue-600 transition-colors"
              >
                All Posts
              </Link>
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/${category.slug}`}
                  className="px-6 py-2 rounded-full font-semibold border-2 border-gray-200 hover:border-optizen-blue-500 hover:text-optizen-blue-500 transition-colors"
                >
                  {category.name} ({category.count})
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No articles found.</p>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <p className="text-gray-600">
                  Showing {posts.length} of {totalPosts} articles
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => {
                  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0];
                  const category = post._embedded?.['wp:term']?.[0]?.[0];
                  const readingTime = calculateReadingTime(post.content.rendered);
                  const excerpt = truncateText(stripHtml(post.excerpt.rendered), 150);

                  return (
                    <Link 
                      key={post.id}
                      href={`/${category?.slug || 'uncategorized'}/${post.slug}`}
                      className="group bg-white rounded-2xl overflow-hidden border-2 border-gray-100 hover:border-optizen-blue-200 hover:shadow-lg transition-all duration-300"
                    >
                      {/* Featured Image */}
                      {featuredImage && (
                        <div className="relative w-full aspect-video overflow-hidden bg-gray-100">
                          <Image
                            src={featuredImage.source_url}
                            alt={featuredImage.alt_text || post.title.rendered}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}

                      <div className="p-6">
                        {/* Category Badge */}
                        {category && (
                          <span className="inline-block px-3 py-1 bg-optizen-blue-100 text-optizen-blue-600 rounded-full text-sm font-semibold mb-3">
                            {category.name}
                          </span>
                        )}

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
                        <p className="text-gray-700 mb-4 line-clamp-3">
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
                      href={`/blog?page=${currentPage - 1}`}
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
                            href={`/blog?page=${pageNum}`}
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
                      href={`/blog?page=${currentPage + 1}`}
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
  );
}

