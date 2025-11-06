"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import BlogSearch from './BlogSearch';
import { Clock, Calendar, ArrowRight, TrendingUp } from 'lucide-react';
import { formatDate, calculateReadingTime, stripHtml, truncateText } from '@/lib/blog-utils';

interface Category {
  id: number;
  name: string;
  slug: string;
  count: number;
}

interface RecentPost {
  id: number;
  title: string;
  slug: string;
  date: string;
  category: string;
  categorySlug: string;
  excerpt: string;
  featuredImage?: string;
}

interface BlogSidebarProps {
  categories?: Category[];
  recentPosts?: RecentPost[];
  currentPostId?: number;
}

export default function BlogSidebar({ 
  categories = [], 
  recentPosts = [],
  currentPostId 
}: BlogSidebarProps) {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter out current post from recent posts
  const filteredRecentPosts = recentPosts.filter(post => post.id !== currentPostId);

  return (
    <aside className="space-y-6">
      {/* Search Widget */}
      <div className={`bg-white rounded-2xl shadow-lg p-6 border border-gray-100 transition-all ${
        isSticky ? 'sticky top-24' : ''
      }`}>
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
          <span className="w-1 h-6 bg-optizen-blue-500 rounded-full mr-3"></span>
          Search Blog
        </h3>
        <BlogSearch variant="sidebar" />
      </div>

      {/* CTA Widget */}
      <div className="bg-gradient-to-br from-optizen-blue-500 to-optizen-green-500 rounded-2xl shadow-lg p-6 text-white">
        <div className="flex items-center mb-3">
          <TrendingUp size={24} className="mr-2" />
          <h3 className="text-lg font-bold">Boost Your Store</h3>
        </div>
        <p className="text-sm text-white/90 mb-4">
          Get AI-powered SEO and video upsells to increase revenue and dominate search rankings.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center w-full px-4 py-3 bg-white text-optizen-blue-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
        >
          Explore Our Apps
          <ArrowRight className="ml-2" size={18} />
        </Link>
      </div>

      {/* Categories Widget */}
      {categories.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <span className="w-1 h-6 bg-optizen-green-500 rounded-full mr-3"></span>
            Categories
          </h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/${category.slug}`}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group"
              >
                <span className="text-gray-700 group-hover:text-optizen-blue-600 font-medium">
                  {category.name}
                </span>
                <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full group-hover:bg-optizen-blue-50 group-hover:text-optizen-blue-600">
                  {category.count}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Recent Posts Widget */}
      {filteredRecentPosts.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <span className="w-1 h-6 bg-optizen-blue-500 rounded-full mr-3"></span>
            Recent Posts
          </h3>
          <div className="space-y-4">
            {filteredRecentPosts.slice(0, 5).map((post) => (
              <Link
                key={post.id}
                href={`/${post.categorySlug}/${post.slug}`}
                className="block group"
              >
                <div className="flex gap-3">
                  {post.featuredImage && (
                    <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                      <Image
                        src={post.featuredImage}
                        alt={stripHtml(post.title)}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="80px"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 
                      className="font-semibold text-sm text-gray-900 group-hover:text-optizen-blue-600 transition-colors line-clamp-2 mb-1"
                      dangerouslySetInnerHTML={{ __html: post.title }}
                    />
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar size={12} className="mr-1" />
                      <span>{formatDate(post.date)}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Newsletter Widget (Optional - can add later) */}
      <div className="bg-gray-50 rounded-2xl shadow-lg p-6 border border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-2">Stay Updated</h3>
        <p className="text-sm text-gray-600 mb-4">
          Get the latest Shopify tips and strategies delivered to your inbox.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center w-full px-4 py-3 bg-optizen-blue-500 text-white font-semibold rounded-lg hover:bg-optizen-blue-600 transition-colors"
        >
          Contact Us
          <ArrowRight className="ml-2" size={18} />
        </Link>
      </div>
    </aside>
  );
}

