const WP_API_URL = 'https://optizenapp-staging.p3ue6i.ap-southeast-2.wpstaqhosting.com/wp-json/wp/v2';

/**
 * Fetch with retry logic for WordPress API
 * Handles temporary 503/504 errors and rate limiting
 */
async function fetchWithRetry(
  url: string,
  options: RequestInit = {},
  maxRetries = 3
): Promise<Response> {
  let lastError: Error | null = null;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      if (attempt > 1) {
        console.log(`🔄 Retry attempt ${attempt}/${maxRetries} for: ${url.split('?')[0]}`);
      }
      
      const response = await fetch(url, options);
      
      // If successful, return immediately
      if (response.ok) {
        return response;
      }
      
      // Client error (4xx) - don't retry
      if (response.status >= 400 && response.status < 500) {
        return response;
      }
      
      // Server error (5xx) - retry with backoff
      if (response.status >= 500) {
        throw new Error(`Server error ${response.status}: ${response.statusText}`);
      }
      
      return response;
      
    } catch (error: any) {
      lastError = error;
      
      if (attempt < maxRetries) {
        const delay = 2000 * attempt; // 2s, 4s, 6s exponential backoff
        console.warn(`⚠️  Fetch failed (${error.message}). Retrying in ${delay/1000}s...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        console.error(`❌ All ${maxRetries} attempts failed for: ${url.split('?')[0]}`);
      }
    }
  }
  
  throw lastError || new Error('Fetch failed after retries');
}

export interface WordPressPost {
  id: number;
  date: string;
  modified: string;
  slug: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  author: number;
  featured_media: number;
  categories: number[];
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
      media_details: {
        width: number;
        height: number;
      };
    }>;
    'wp:term'?: Array<Array<{
      id: number;
      name: string;
      slug: string;
    }>>;
    author?: Array<{
      name: string;
      slug: string;
    }>;
  };
}

export interface WordPressCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  count: number;
}

export interface WordPressMedia {
  id: number;
  source_url: string;
  alt_text: string;
  media_details: {
    width: number;
    height: number;
  };
}

// Fetch all posts with optional filters
export async function getPosts(params?: {
  categories?: number;
  per_page?: number;
  page?: number;
  search?: string;
}): Promise<{ posts: WordPressPost[]; totalPages: number; totalPosts: number }> {
  const searchParams = new URLSearchParams({
    _embed: 'true',
    per_page: params?.per_page?.toString() || '10',
    page: params?.page?.toString() || '1',
    ...(params?.categories && { categories: params.categories.toString() }),
    ...(params?.search && { search: params.search }),
  });

  const response = await fetchWithRetry(`${WP_API_URL}/posts?${searchParams}`, {
    next: { revalidate: false }, // Cache permanently, only regenerate on deploy or manual revalidation
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch posts: ${response.statusText}`);
  }

  const posts = await response.json();
  const totalPages = parseInt(response.headers.get('X-WP-TotalPages') || '1');
  const totalPosts = parseInt(response.headers.get('X-WP-Total') || '0');

  return { posts, totalPages, totalPosts };
}

// Helper function to get SEO meta from Rank Math API or scrape from HTML
async function getSEOMetaFromRankMath(postUrl: string): Promise<{ seoTitle?: string; seoDescription?: string }> {
  // Try Rank Math REST API first (if Headless CMS Support is enabled)
  // Using correct endpoint: /wp-json/rankmath/v1/getHead
  const rankMathApiUrl = `https://optizenapp-staging.p3ue6i.ap-southeast-2.wpstaqhosting.com/wp-json/rankmath/v1/getHead?url=${encodeURIComponent(postUrl)}`;
  
  try {
    const apiResponse = await fetch(rankMathApiUrl, {
      next: { revalidate: false }, // Cache permanently
    });

    if (apiResponse.ok) {
      const data = await apiResponse.json();
      
      // Rank Math API returns success: true and head: "HTML meta tags"
      if (data.success && data.head) {
        // Rank Math doesn't include <title> tag, so we use og:title or twitter:title
        const ogTitleMatch = data.head.match(/<meta\s+property="og:title"\s+content="([^"]+)"/i);
        const twitterTitleMatch = data.head.match(/<meta\s+name="twitter:title"\s+content="([^"]+)"/i);
        const descMatch = data.head.match(/<meta\s+name="description"\s+content="([^"]+)"/i);
        
        const seoTitle = ogTitleMatch?.[1] || twitterTitleMatch?.[1];
        
        return {
          seoTitle: seoTitle,
          seoDescription: descMatch ? descMatch[1] : undefined,
        };
      }
    }
  } catch (error) {
    console.log('Rank Math API not available, falling back to HTML scraping');
  }

  // Fallback: Scrape from HTML
  try {
    const response = await fetchWithRetry(postUrl, {
      next: { revalidate: false }, // Cache permanently
    });

    if (!response.ok) {
      return {};
    }

    const html = await response.text();
    
    // Extract SEO title from meta tags
    const titleMatch = html.match(/<meta\s+(?:property="og:title"|name="twitter:title")\s+content="([^"]+)"/i);
    const seoTitle = titleMatch ? titleMatch[1] : undefined;
    
    // Extract SEO description from meta tags
    const descMatch = html.match(/<meta\s+name="description"\s+content="([^"]+)"/i);
    const seoDescription = descMatch ? descMatch[1] : undefined;

    return { seoTitle, seoDescription };
  } catch (error) {
    console.error('Error getting SEO meta:', error);
    return {};
  }
}

// Fetch a single post by slug
export async function getPostBySlug(slug: string): Promise<WordPressPost | null> {
  const response = await fetchWithRetry(`${WP_API_URL}/posts?slug=${slug}&_embed=true`, {
    next: { revalidate: false }, // Cache permanently
  });

  if (!response.ok) {
    return null;
  }

  const posts = await response.json();
  const post = posts[0] || null;

  if (post) {
    // Get category for URL construction
    const category = post._embedded?.['wp:term']?.[0]?.[0]?.slug || 'uncategorized';
    const postUrl = `https://optizenapp-staging.p3ue6i.ap-southeast-2.wpstaqhosting.com/${category}/${slug}/`;
    
    // Get SEO meta from Rank Math API or scrape from HTML as fallback
    const seoMeta = await getSEOMetaFromRankMath(postUrl);
    
    // Attach SEO meta to post object
    (post as any).seoMeta = seoMeta;
  }

  return post;
}

// Fetch all categories
export async function getCategories(): Promise<WordPressCategory[]> {
  const response = await fetchWithRetry(`${WP_API_URL}/categories?per_page=100`, {
    next: { revalidate: false }, // Cache permanently
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch categories: ${response.statusText}`);
  }

  return response.json();
}

// Fetch a single category by slug
export async function getCategoryBySlug(slug: string): Promise<WordPressCategory | null> {
  const response = await fetchWithRetry(`${WP_API_URL}/categories?slug=${slug}`, {
    next: { revalidate: false }, // Cache permanently
  });

  if (!response.ok) {
    return null;
  }

  const categories = await response.json();
  return categories[0] || null;
}

// Fetch media by ID
export async function getMediaById(id: number): Promise<WordPressMedia | null> {
  const response = await fetchWithRetry(`${WP_API_URL}/media/${id}`, {
    next: { revalidate: false }, // Cache permanently
  });

  if (!response.ok) {
    return null;
  }

  return response.json();
}

// Get all post slugs for static generation (with pagination)
export async function getAllPostSlugs(): Promise<Array<{ category: string; slug: string }>> {
  let allPosts: WordPressPost[] = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const response = await fetchWithRetry(`${WP_API_URL}/posts?per_page=100&page=${page}&_embed=true`, {
      next: { revalidate: false }, // Cache permanently
    });

    if (!response.ok) {
      break;
    }

    const posts: WordPressPost[] = await response.json();
    
    if (posts.length === 0) {
      hasMore = false;
    } else {
      allPosts = allPosts.concat(posts);
      page++;
      
      // Check if there are more pages
      const totalPages = response.headers.get('X-WP-TotalPages');
      if (totalPages && page > parseInt(totalPages)) {
        hasMore = false;
      }
    }
  }

  console.log(`📚 Fetched ${allPosts.length} posts for static generation`);
  
  return allPosts.map(post => {
    const category = post._embedded?.['wp:term']?.[0]?.[0]?.slug || 'uncategorized';
    return {
      category,
      slug: post.slug,
    };
  });
}

// ============================================
// PAGE FUNCTIONS (WordPress Pages, not Posts)
// ============================================

export interface WordPressPage {
  id: number;
  date: string;
  modified: string;
  slug: string;
  status: string;
  link: string;
  parent: number;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  featured_media: number;
  menu_order: number;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
      media_details: {
        width: number;
        height: number;
      };
    }>;
    up?: Array<{
      id: number;
      slug: string;
      title: {
        rendered: string;
      };
    }>;
  };
}

export interface PageHierarchy {
  page: WordPressPage;
  children: PageHierarchy[];
}

// Fetch all pages
export async function getPages(params?: {
  per_page?: number;
  page?: number;
  parent?: number;
}): Promise<{ pages: WordPressPage[]; totalPages: number; totalItems: number }> {
  const searchParams = new URLSearchParams({
    _embed: 'true',
    per_page: params?.per_page?.toString() || '100',
    page: params?.page?.toString() || '1',
    ...(params?.parent !== undefined && { parent: params.parent.toString() }),
  });

  const response = await fetchWithRetry(`${WP_API_URL}/pages?${searchParams}`, {
    next: { revalidate: false }, // Cache permanently
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch pages: ${response.statusText}`);
  }

  const pages = await response.json();
  const totalPages = parseInt(response.headers.get('X-WP-TotalPages') || '1');
  const totalItems = parseInt(response.headers.get('X-WP-Total') || '0');

  return { pages, totalPages, totalItems };
}

// Helper function to build full URL path for a page
function buildPagePath(page: WordPressPage, allPages: WordPressPage[]): string {
  const segments: string[] = [page.slug];
  let currentPage = page;

  // Walk up the parent chain
  while (currentPage.parent !== 0) {
    const parent = allPages.find(p => p.id === currentPage.parent);
    if (!parent) break;
    segments.unshift(parent.slug);
    currentPage = parent;
  }

  return segments.join('/');
}

// Fetch a single page by its full URL path (e.g., "shopify/apps/wholesale-gorilla")
export async function getPageByPath(path: string): Promise<WordPressPage | null> {
  // Fetch ALL pages with pagination to build complete hierarchy
  let allPages: WordPressPage[] = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const result = await getPages({ per_page: 100, page });
    allPages = allPages.concat(result.pages);
    
    if (page >= result.totalPages) {
      hasMore = false;
    } else {
      page++;
    }
  }
  
  // Build paths for all pages
  const pageWithPaths = allPages.map(p => ({
    page,
    path: buildPagePath(p, allPages),
  }));

  // Find the page matching the requested path
  const matchedPage = pageWithPaths.find(p => p.path === path);
  
  if (!matchedPage) {
    return null;
  }

  const page = matchedPage.page;
  
  // Get SEO meta from Rank Math
  const pageUrl = `https://optizenapp-staging.p3ue6i.ap-southeast-2.wpstaqhosting.com/${path}/`;
  const seoMeta = await getSEOMetaFromRankMath(pageUrl);
  
  // Attach SEO meta and full path to page object
  (page as any).seoMeta = seoMeta;
  (page as any).fullPath = path;

  return page;
}

// Build page hierarchy for a specific parent or root level
export function buildPageHierarchy(pages: WordPressPage[], parentId: number = 0): PageHierarchy[] {
  const children = pages
    .filter(page => page.parent === parentId)
    .sort((a, b) => a.menu_order - b.menu_order);

  return children.map(page => ({
    page,
    children: buildPageHierarchy(pages, page.id),
  }));
}

// Get all page paths for static generation
export async function getAllPagePaths(): Promise<string[]> {
  // Fetch ALL pages with pagination
  let allPages: WordPressPage[] = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const result = await getPages({ per_page: 100, page });
    allPages = allPages.concat(result.pages);
    
    if (page >= result.totalPages) {
      hasMore = false;
    } else {
      page++;
    }
  }

  console.log(`📄 Fetched ${allPages.length} pages for static generation`);
  
  return allPages.map(p => buildPagePath(p, allPages));
}

// Get sidebar navigation for a specific page (same parent/sibling pages)
export async function getPageSiblings(page: WordPressPage): Promise<WordPressPage[]> {
  const { pages: allPages } = await getPages({ per_page: 100 });
  
  // If page has a parent, get all siblings
  if (page.parent !== 0) {
    return allPages
      .filter(p => p.parent === page.parent)
      .sort((a, b) => a.menu_order - b.menu_order);
  }
  
  // If no parent, get all root-level pages
  return allPages
    .filter(p => p.parent === 0)
    .sort((a, b) => a.menu_order - b.menu_order);
}

// Fetch a single page by WordPress slug (for docs mapping)
export async function getPageByWpSlug(wpSlug: string): Promise<WordPressPage | null> {
  const response = await fetchWithRetry(`${WP_API_URL}/pages?slug=${wpSlug}&_embed=true`, {
    next: { revalidate: false }, // Cache permanently
  });

  if (!response.ok) {
    return null;
  }

  const pages = await response.json();
  const page = pages[0] || null;

  if (page) {
    // Get SEO meta from Rank Math
    const pageUrl = `https://optizenapp-staging.p3ue6i.ap-southeast-2.wpstaqhosting.com/${wpSlug}/`;
    const seoMeta = await getSEOMetaFromRankMath(pageUrl);
    
    // Attach SEO meta to page object
    (page as any).seoMeta = seoMeta;
  }

  return page;
}

