const WP_API_URL = 'https://optizenapp-staging.p3ue6i.ap-southeast-2.wpstaqhosting.com/wp-json/wp/v2';

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

  const response = await fetch(`${WP_API_URL}/posts?${searchParams}`, {
    next: { revalidate: 3600 }, // Revalidate every hour
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch posts: ${response.statusText}`);
  }

  const posts = await response.json();
  const totalPages = parseInt(response.headers.get('X-WP-TotalPages') || '1');
  const totalPosts = parseInt(response.headers.get('X-WP-Total') || '0');

  return { posts, totalPages, totalPosts };
}

// Helper function to scrape SEO meta from page HTML
async function scrapeSEOMetaFromHTML(url: string): Promise<{ seoTitle?: string; seoDescription?: string }> {
  try {
    const response = await fetch(url, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return {};
    }

    const html = await response.text();
    
    // Extract SEO title from meta tags (Rank Math, Yoast, or default)
    const titleMatch = html.match(/<meta\s+(?:property="og:title"|name="twitter:title")\s+content="([^"]+)"/i);
    const seoTitle = titleMatch ? titleMatch[1] : undefined;
    
    // Extract SEO description from meta tags
    const descMatch = html.match(/<meta\s+name="description"\s+content="([^"]+)"/i);
    const seoDescription = descMatch ? descMatch[1] : undefined;

    return { seoTitle, seoDescription };
  } catch (error) {
    console.error('Error scraping SEO meta:', error);
    return {};
  }
}

// Fetch a single post by slug
export async function getPostBySlug(slug: string): Promise<WordPressPost | null> {
  const response = await fetch(`${WP_API_URL}/posts?slug=${slug}&_embed=true`, {
    next: { revalidate: 3600 },
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
    
    // Scrape SEO meta from actual page HTML
    const seoMeta = await scrapeSEOMetaFromHTML(postUrl);
    
    // Attach SEO meta to post object
    (post as any).seoMeta = seoMeta;
  }

  return post;
}

// Fetch all categories
export async function getCategories(): Promise<WordPressCategory[]> {
  const response = await fetch(`${WP_API_URL}/categories?per_page=100`, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch categories: ${response.statusText}`);
  }

  return response.json();
}

// Fetch a single category by slug
export async function getCategoryBySlug(slug: string): Promise<WordPressCategory | null> {
  const response = await fetch(`${WP_API_URL}/categories?slug=${slug}`, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    return null;
  }

  const categories = await response.json();
  return categories[0] || null;
}

// Fetch media by ID
export async function getMediaById(id: number): Promise<WordPressMedia | null> {
  const response = await fetch(`${WP_API_URL}/media/${id}`, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    return null;
  }

  return response.json();
}

// Get all post slugs for static generation
export async function getAllPostSlugs(): Promise<Array<{ category: string; slug: string }>> {
  const response = await fetch(`${WP_API_URL}/posts?per_page=100&_embed=true`, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    return [];
  }

  const posts: WordPressPost[] = await response.json();
  
  return posts.map(post => {
    const category = post._embedded?.['wp:term']?.[0]?.[0]?.slug || 'uncategorized';
    return {
      category,
      slug: post.slug,
    };
  });
}

