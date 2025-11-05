import { config } from 'dotenv';
import fs from 'fs';
import path from 'path';
import { getPosts, getPages, getCategories } from '../lib/wordpress';

// Load environment variables
config({ path: '.env.local' });

interface ExportedPost {
  id: number;
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  date: string;
  modified: string;
  author: string;
  category: string;
  categoryId: number;
  featuredImage?: {
    url: string;
    alt: string;
    width: number;
    height: number;
  };
  seoTitle?: string;
  seoDescription?: string;
}

interface ExportedPage {
  id: number;
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  date: string;
  modified: string;
  featuredImage?: {
    url: string;
    alt: string;
    width: number;
    height: number;
  };
  seoTitle?: string;
  seoDescription?: string;
}

async function exportContent() {
  console.log('🚀 Starting WordPress content export...\n');

  const contentDir = path.join(process.cwd(), 'content');
  const postsDir = path.join(contentDir, 'posts');
  const pagesDir = path.join(contentDir, 'pages');
  const categoriesFile = path.join(contentDir, 'categories.json');

  // Create directories
  if (!fs.existsSync(contentDir)) {
    fs.mkdirSync(contentDir, { recursive: true });
  }
  if (!fs.existsSync(postsDir)) {
    fs.mkdirSync(postsDir, { recursive: true });
  }
  if (!fs.existsSync(pagesDir)) {
    fs.mkdirSync(pagesDir, { recursive: true });
  }

  // Export categories
  console.log('📁 Exporting categories...');
  try {
    const categories = await getCategories();
    fs.writeFileSync(categoriesFile, JSON.stringify(categories, null, 2));
    console.log(`✅ Exported ${categories.length} categories\n`);
  } catch (error: any) {
    console.error(`❌ Failed to export categories: ${error.message}\n`);
  }

  // Export all posts
  console.log('📝 Exporting blog posts...');
  let totalPosts = 0;
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    try {
      const { posts, totalPages } = await getPosts({ per_page: 100, page });
      
      for (const post of posts) {
        const categorySlug = post._embedded?.['wp:term']?.[0]?.[0]?.slug || 'uncategorized';
        const categoryName = post._embedded?.['wp:term']?.[0]?.[0]?.name || 'Uncategorized';
        const categoryId = post._embedded?.['wp:term']?.[0]?.[0]?.id || 0;
        
        const exportedPost: ExportedPost = {
          id: post.id,
          slug: post.slug,
          title: post.title.rendered,
          content: post.content.rendered,
          excerpt: post.excerpt.rendered,
          date: post.date,
          modified: post.modified,
          author: post._embedded?.author?.[0]?.name || 'OptizenApp',
          category: categorySlug,
          categoryId: categoryId,
          featuredImage: post._embedded?.['wp:featuredmedia']?.[0] ? {
            url: post._embedded['wp:featuredmedia'][0].source_url,
            alt: post._embedded['wp:featuredmedia'][0].alt_text || '',
            width: post._embedded['wp:featuredmedia'][0].media_details?.width || 0,
            height: post._embedded['wp:featuredmedia'][0].media_details?.height || 0,
          } : undefined,
          seoTitle: (post as any).seoMeta?.seoTitle,
          seoDescription: (post as any).seoMeta?.seoDescription,
        };

        // Create category directory if it doesn't exist
        const categoryDir = path.join(postsDir, categorySlug);
        if (!fs.existsSync(categoryDir)) {
          fs.mkdirSync(categoryDir, { recursive: true });
        }

        // Write post to file
        const postFile = path.join(categoryDir, `${post.slug}.json`);
        fs.writeFileSync(postFile, JSON.stringify(exportedPost, null, 2));
        totalPosts++;
      }

      console.log(`  ✓ Exported page ${page}/${totalPages} (${posts.length} posts)`);
      
      hasMore = page < totalPages;
      page++;
    } catch (error: any) {
      console.error(`❌ Failed to export posts page ${page}: ${error.message}`);
      hasMore = false;
    }
  }

  console.log(`✅ Exported ${totalPosts} blog posts\n`);

  // Export all pages
  console.log('📄 Exporting pages...');
  let totalPagesExported = 0;

  try {
    const { pages } = await getPages({ per_page: 100 });
    
    for (const page of pages) {
      const exportedPage: ExportedPage = {
        id: page.id,
        slug: page.slug,
        title: page.title.rendered,
        content: page.content.rendered,
        excerpt: page.excerpt.rendered,
        date: page.date,
        modified: page.modified,
        featuredImage: page._embedded?.['wp:featuredmedia']?.[0] ? {
          url: page._embedded['wp:featuredmedia'][0].source_url,
          alt: page._embedded['wp:featuredmedia'][0].alt_text || '',
          width: page._embedded['wp:featuredmedia'][0].media_details?.width || 0,
          height: page._embedded['wp:featuredmedia'][0].media_details?.height || 0,
        } : undefined,
        seoTitle: (page as any).seoMeta?.seoTitle,
        seoDescription: (page as any).seoMeta?.seoDescription,
      };

      const pageFile = path.join(pagesDir, `${page.slug}.json`);
      fs.writeFileSync(pageFile, JSON.stringify(exportedPage, null, 2));
      totalPagesExported++;
    }

    console.log(`✅ Exported ${totalPagesExported} pages\n`);
  } catch (error: any) {
    console.error(`❌ Failed to export pages: ${error.message}\n`);
  }

  console.log('🎉 Content export complete!');
  console.log(`\n📊 Summary:`);
  console.log(`   Posts: ${totalPosts}`);
  console.log(`   Pages: ${totalPagesExported}`);
  console.log(`\n📁 Content saved to: ${contentDir}`);
}

exportContent().catch(console.error);

