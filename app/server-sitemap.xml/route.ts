import { getServerSideSitemap } from 'next-sitemap';
import { getAllPostSlugs, getPosts } from '@/lib/wordpress';

export async function GET() {
  const { posts } = await getPosts({ per_page: 100 });

  const fields = posts.map((post) => {
    const category = post._embedded?.['wp:term']?.[0]?.[0]?.slug || 'uncategorized';
    
    return {
      loc: `https://optizenapp.com/${category}/${post.slug}`,
      lastmod: post.modified,
      changefreq: 'weekly' as const,
      priority: 0.7,
    };
  });

  return getServerSideSitemap(fields);
}

