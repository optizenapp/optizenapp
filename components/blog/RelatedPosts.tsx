import Link from 'next/link';
import Image from 'next/image';
import { Clock, Calendar } from 'lucide-react';
import { WordPressPost } from '@/lib/wordpress';
import { formatDate, calculateReadingTime, stripHtml } from '@/lib/blog-utils';

interface RelatedPostsProps {
  posts: WordPressPost[];
  currentPostId: number;
}

export default function RelatedPosts({ posts, currentPostId }: RelatedPostsProps) {
  // Filter out current post and limit to 3
  const relatedPosts = posts.filter(post => post.id !== currentPostId).slice(0, 3);

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <section className="border-t border-gray-200 pt-12 mt-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Articles</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {relatedPosts.map((post) => {
          const featuredImage = post._embedded?.['wp:featuredmedia']?.[0];
          const category = post._embedded?.['wp:term']?.[0]?.[0];
          const readingTime = calculateReadingTime(post.content.rendered);

          return (
            <Link
              key={post.id}
              href={`/${category?.slug || 'blog'}/${post.slug}`}
              className="group"
            >
              <article className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-optizen-blue-300 hover:shadow-lg transition-all">
                {/* Featured Image */}
                {featuredImage && (
                  <div className="relative h-48 bg-gray-100 overflow-hidden">
                    <Image
                      src={featuredImage.source_url}
                      alt={featuredImage.alt_text || stripHtml(post.title.rendered)}
                      fill
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}

                <div className="p-6">
                  {/* Category Badge */}
                  {category && (
                    <span className="inline-block px-3 py-1 bg-optizen-blue-100 text-optizen-blue-600 rounded-full text-xs font-semibold mb-3">
                      {category.name}
                    </span>
                  )}

                  {/* Title */}
                  <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-optizen-blue-600 transition-colors line-clamp-2">
                    {stripHtml(post.title.rendered)}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {stripHtml(post.excerpt.rendered)}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{formatDate(post.date)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>{readingTime} min read</span>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

