// WordPress API configuration
const WP_API_URL = process.env.WORDPRESS_API_URL || 'https://optizenapp-staging.p3ue6i.ap-southeast-2.wpstaqhosting.com/wp-json/wp/v2';
const WP_BASE_URL = process.env.WORDPRESS_BASE_URL || 'https://optizenapp-staging.p3ue6i.ap-southeast-2.wpstaqhosting.com';

/**
 * Fetch with retry logic for WordPress API
 * Handles temporary 503/504 errors and rate limiting
 */
async function fetchWithRetry(
  url: string,
  options: RequestInit = {},
  maxRetries?: number
): Promise<Response> {
  // Use shorter retries during Vercel builds to avoid timeouts
  const isVercelBuild = process.env.VERCEL === '1';
  const retries = maxRetries ?? (isVercelBuild ? 3 : 5);
  const timeout = isVercelBuild ? 20000 : 30000; // 20s for Vercel, 30s otherwise
  
  let lastError: Error | null = null;
  
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      if (attempt > 1) {
        console.log(`🔄 Retry attempt ${attempt}/${retries} for: ${url.split('?')[0]}`);
      }
      
      const response = await fetch(url, {
        ...options,
        signal: AbortSignal.timeout(timeout),
      });
      
      // If successful, return immediately
      if (response.ok) {
        if (attempt > 1) {
          console.log(`✅ Success on attempt ${attempt}`);
        }
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
      
      if (attempt < retries) {
        // Shorter delays during Vercel builds: 2s, 4s, 6s vs 3s, 6s, 9s, 12s, 15s
        const delay = isVercelBuild ? 2000 * attempt : 3000 * attempt;
        console.warn(`⚠️  Fetch failed (${error.message}). Retrying in ${delay/1000}s...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        console.error(`❌ All ${retries} attempts failed for: ${url.split('?')[0]}`);
        console.error(`❌ Last error: ${error.message}`);
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
    orderby: 'date',
    order: 'desc',
    ...(params?.categories && { categories: params.categories.toString() }),
    ...(params?.search && { search: params.search }),
  });

  const response = await fetchWithRetry(`${WP_API_URL}/posts?${searchParams}`, {
    next: { revalidate: 300 }, // Revalidate every 5 minutes to show new posts
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
  const rankMathApiUrl = `${WP_BASE_URL}/wp-json/rankmath/v1/getHead?url=${encodeURIComponent(postUrl)}`;
  
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
    const postUrl = `${WP_BASE_URL}/${category}/${slug}/`;
    
    // Get SEO meta from Rank Math API or scrape from HTML as fallback
    const seoMeta = await getSEOMetaFromRankMath(postUrl);
    
    // Attach SEO meta to post object
    (post as any).seoMeta = seoMeta;
    
    // Fix image URLs in content to point to staging server
    if (post.content && post.content.rendered) {
      post.content.rendered = fixImageUrls(post.content.rendered);
    }
    if (post.excerpt && post.excerpt.rendered) {
      post.excerpt.rendered = fixImageUrls(post.excerpt.rendered);
    }
  }

  return post;
}

// Helper function to fix image URLs to use staging server
function fixImageUrls(content: string): string {
  const stagingDomain = 'https://optizenapp-staging.p3ue6i.ap-southeast-2.wpstaqhosting.com';
  
  // Replace relative URLs
  content = content.replace(/src="\/wp-content\//g, `src="${stagingDomain}/wp-content/`);
  content = content.replace(/srcset="\/wp-content\//g, `srcset="${stagingDomain}/wp-content/`);
  
  // Replace any other domain's wp-content URLs with staging
  content = content.replace(/src="https?:\/\/[^/]+\/wp-content\//g, `src="${stagingDomain}/wp-content/`);
  content = content.replace(/srcset="https?:\/\/[^/]+\/wp-content\//g, `srcset="${stagingDomain}/wp-content/`);
  
  return content;
}

// Fetch all categories
export async function getCategories(): Promise<WordPressCategory[]> {
  try {
    const response = await fetchWithRetry(`${WP_API_URL}/categories?per_page=100`, {
      next: { revalidate: false }, // Cache permanently
    });

    if (!response.ok) {
      console.warn(`⚠️  Failed to fetch categories: ${response.statusText}`);
      return []; // Return empty array instead of throwing
    }

    return response.json();
  } catch (error) {
    console.warn('⚠️  WordPress API unavailable, returning empty categories:', error);
    return []; // Graceful fallback
  }
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
  try {
    let allPosts: WordPressPost[] = [];
    let page = 1;
    let hasMore = true;

    console.log('🔍 [getAllPostSlugs] Starting to fetch all post slugs from WordPress...');

    while (hasMore) {
      console.log(`🔍 [getAllPostSlugs] Fetching page ${page}...`);
      const response = await fetchWithRetry(`${WP_API_URL}/posts?per_page=100&page=${page}&_embed=true`, {
        next: { revalidate: false }, // Cache permanently
      });

      if (!response.ok) {
        console.error(`❌ [getAllPostSlugs] Failed to fetch page ${page}: ${response.status} ${response.statusText}`);
        throw new Error(`WordPress API returned ${response.status} for posts page ${page}`);
      }

      const posts: WordPressPost[] = await response.json();
      console.log(`✅ [getAllPostSlugs] Page ${page} returned ${posts.length} posts`);
      
      if (posts.length === 0) {
        hasMore = false;
      } else {
        allPosts = allPosts.concat(posts);
        page++;
        
        // Check if there are more pages
        const totalPages = response.headers.get('X-WP-TotalPages');
        console.log(`📄 [getAllPostSlugs] Total pages available: ${totalPages}`);
        if (totalPages && page > parseInt(totalPages)) {
          hasMore = false;
        }
      }
    }

    console.log(`✅ [getAllPostSlugs] Successfully fetched ${allPosts.length} posts for static generation`);
    
    if (allPosts.length === 0) {
      console.warn('⚠️  [getAllPostSlugs] No posts found! This will cause all blog posts to 404.');
    }
    
    const slugs = allPosts.map(post => {
      const category = post._embedded?.['wp:term']?.[0]?.[0]?.slug || 'uncategorized';
      return {
        category,
        slug: post.slug,
      };
    });
    
    console.log(`📝 [getAllPostSlugs] First 5 slugs: ${slugs.slice(0, 5).map(s => `/${s.category}/${s.slug}`).join(', ')}`);
    
    return slugs;
  } catch (error) {
    console.error('❌ [getAllPostSlugs] CRITICAL ERROR - WordPress API unavailable during build!');
    console.error('❌ This will cause ALL blog posts to 404!');
    console.error('❌ Error details:', error);
    // FAIL THE BUILD instead of silently returning empty array
    throw error;
  }
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
  let currentPage = 1;
  let hasMore = true;

  while (hasMore) {
    const result = await getPages({ per_page: 100, page: currentPage });
    allPages = allPages.concat(result.pages);
    
    if (currentPage >= result.totalPages) {
      hasMore = false;
    } else {
      currentPage++;
    }
  }
  
  // Build paths for all pages
  const pageWithPaths = allPages.map(p => ({
    page: p,
    path: buildPagePath(p, allPages),
  }));

  // Find the page matching the requested path
  const matchedPage = pageWithPaths.find(p => p.path === path);
  
  if (!matchedPage) {
    return null;
  }

  const page = matchedPage.page;
  
  // Get SEO meta from Rank Math
  const pageUrl = `${WP_BASE_URL}/${path}/`;
  const seoMeta = await getSEOMetaFromRankMath(pageUrl);
  
  // Attach SEO meta and full path to page object
  (page as any).seoMeta = seoMeta;
  (page as any).fullPath = path;
  
  // Fix image URLs in content to point to staging server
  if (page.content && page.content.rendered) {
    page.content.rendered = fixImageUrls(page.content.rendered);
  }
  if (page.excerpt && page.excerpt.rendered) {
    page.excerpt.rendered = fixImageUrls(page.excerpt.rendered);
  }

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
  try {
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
  } catch (error) {
    console.warn('⚠️  WordPress API unavailable, returning empty pages array:', error);
    return []; // Graceful fallback - build will succeed with no pages
  }
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

/**
 * Scrape HTML content from a WordPress page
 * Used for pages built with Thrive Architect or other page builders
 * that don't expose content via REST API
 */
async function scrapePageContent(pageUrl: string): Promise<string | null> {
  try {
    const response = await fetchWithRetry(pageUrl, {
      next: { revalidate: false }, // Cache permanently for static generation
      cache: 'force-cache', // Force Next.js to cache this for static generation
    });

    if (!response.ok) {
      console.warn(`⚠️  Failed to scrape content from: ${pageUrl}`);
      return null;
    }

    const html = await response.text();
    
    // Extract content from Thrive Architect main content area
    // Find the opening tar-main-content div
    const startMatch = html.match(/<div[^>]*id="tve_editor"[^>]*class="[^"]*tar-main-content[^"]*"[^>]*>/i);
    
    let contentMatch = null;
    
    if (startMatch) {
      const startIndex = startMatch.index! + startMatch[0].length;
      // Find the corresponding closing div before the footer
      const footerIndex = html.indexOf('<footer', startIndex);
      if (footerIndex > startIndex) {
        const content = html.substring(startIndex, footerIndex);
        contentMatch = [null, content]; // Fake match array for consistency
      }
    }
    
    if (!contentMatch) {
      // Fallback: Look for content between header and footer
      contentMatch = html.match(/<\/header>([\s\S]*?)<footer/i);
    }
    
    if (contentMatch && contentMatch[1]) {
      let content = contentMatch[1].trim();
      
      // Clean up: Remove header/footer symbols, scripts, styles, and Thrive-specific elements
      content = content
        // Remove Thrive header/footer/sidebar symbols
        .replace(/<div[^>]*thrv_header[^>]*>[\s\S]*?<\/div>/gi, '')
        .replace(/<div[^>]*thrv_footer[^>]*>[\s\S]*?<\/div>/gi, '')
        .replace(/<aside[^>]*>[\s\S]*?<\/aside>/gi, '')
        .replace(/<div[^>]*class="[^"]*sidebar[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '')
        // Remove scripts, styles, comments
        .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
        .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
        .replace(/<!--[\s\S]*?-->/g, '')
        // Remove Thrive-specific wrapper divs but keep content
        .replace(/<div[^>]*class="[^"]*thrv_wrapper[^"]*"[^>]*>/gi, '<div>')
        .replace(/<div[^>]*class="[^"]*tve_[^"]*"[^>]*>/gi, '<div>')
        .replace(/<div[^>]*class="[^"]*tcb-[^"]*"[^>]*>/gi, '<div>')
        .replace(/<div[^>]*class="[^"]*thrive-[^"]*"[^>]*>/gi, '<div>')
        // Remove all inline styles
        .replace(/\s+style="[^"]*"/gi, '')
        // Remove all data attributes
        .replace(/\s+data-[a-z-]+="[^"]*"/gi, '')
        // Remove all Thrive-specific classes but keep basic HTML structure
        .replace(/\s+class="[^"]*"/gi, (match) => {
          // Keep only basic semantic classes if any, remove Thrive classes
          return '';
        })
        // Clean up empty divs
        .replace(/<div>\s*<\/div>/gi, '')
        .replace(/<div><div>/gi, '<div>')
        .replace(/<\/div><\/div>/gi, '</div>');
      
      return content;
    }
    
    console.warn(`⚠️  Could not extract content from: ${pageUrl}`);
    return null;
    
  } catch (error) {
    console.error(`❌ Error scraping content from ${pageUrl}:`, error);
    return null;
  }
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
    const pageUrl = `${WP_BASE_URL}/${wpSlug}/`;
    const seoMeta = await getSEOMetaFromRankMath(pageUrl);
    
    // Attach SEO meta to page object
    (page as any).seoMeta = seoMeta;
    
    // For support docs pages, scrape the HTML content since REST API doesn't return
    // page builder content (Thrive Architect, Elementor, etc.)
    if (wpSlug.includes('optizen') || wpSlug.includes('video-upsell')) {
      console.log(`📄 Scraping HTML content for: ${wpSlug}`);
      const scrapedContent = await scrapePageContent(pageUrl);
      
      if (scrapedContent) {
        // Replace the REST API content with scraped content
        page.content.rendered = scrapedContent;
        console.log(`✅ Successfully scraped content for: ${wpSlug}`);
      } else {
        console.warn(`⚠️  Using REST API content (may be empty) for: ${wpSlug}`);
      }
    }
  }

  return page;
}

