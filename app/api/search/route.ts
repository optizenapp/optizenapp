import { NextResponse } from 'next/server';

const WP_API_URL = process.env.WORDPRESS_API_URL || 'https://optizenapp-staging.p3ue6i.ap-southeast-2.wpstaqhosting.com/wp-json/wp/v2';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query || query.length < 2) {
      return NextResponse.json({ results: [] });
    }

    // Search WordPress posts
    const response = await fetch(
      `${WP_API_URL}/posts?search=${encodeURIComponent(query)}&per_page=10&_embed=true`,
      {
        next: { revalidate: 60 }, // Cache for 1 minute
      }
    );

    if (!response.ok) {
      return NextResponse.json({ results: [] });
    }

    const posts = await response.json();

    // Format results
    const results = posts.map((post: any) => ({
      id: post.id,
      title: post.title.rendered,
      excerpt: post.excerpt.rendered,
      slug: post.slug,
      category: post._embedded?.['wp:term']?.[0]?.[0]?.name || 'Blog',
      categorySlug: post._embedded?.['wp:term']?.[0]?.[0]?.slug || 'blog',
    }));

    return NextResponse.json({ results });
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json({ results: [] }, { status: 500 });
  }
}

