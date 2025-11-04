import { getServerSideSitemap } from 'next-sitemap';
import { getPosts, getAllPagePaths, getPages } from '@/lib/wordpress';

export async function GET() {
  // Fetch posts
  const { posts } = await getPosts({ per_page: 100 });
  
  // Fetch pages
  const { pages } = await getPages({ per_page: 100 });

  // Build post URLs
  const postFields = posts.map((post) => {
    const category = post._embedded?.['wp:term']?.[0]?.[0]?.slug || 'uncategorized';
    
    return {
      loc: `https://optizenapp.com/${category}/${post.slug}`,
      lastmod: post.modified,
      changefreq: 'weekly' as const,
      priority: 0.7,
    };
  });

  // Build page URLs
  const pagePaths = await getAllPagePaths();
  const pageFields = pagePaths.map((path) => {
    const page = pages.find(p => {
      // Find page by matching path
      const segments: string[] = [p.slug];
      let currentPage = p;
      while (currentPage.parent !== 0) {
        const parent = pages.find(parent => parent.id === currentPage.parent);
        if (!parent) break;
        segments.unshift(parent.slug);
        currentPage = parent;
      }
      return segments.join('/') === path;
    });

    return {
      loc: `https://optizenapp.com/${path}`,
      lastmod: page?.modified || new Date().toISOString(),
      changefreq: 'monthly' as const,
      priority: 0.8,
    };
  });

  // Combine posts and pages
  const allFields = [...postFields, ...pageFields];

  return getServerSideSitemap(allFields);
}

