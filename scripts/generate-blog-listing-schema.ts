import { config } from 'dotenv';
import { generateSchemaOrg } from '../lib/schema-generator';
import { getCategories, getPosts } from '../lib/wordpress';
import { stripHtml } from '../lib/blog-utils';

// Load environment variables
config({ path: '.env.local' });

async function generateBlogListingSchema() {
  console.log('🚀 Starting blog listing schema generation...\n');

  let totalGenerated = 0;
  let totalSkipped = 0;

  // 1. Generate schema for main blog index page
  console.log('📝 [1/2] Generating schema for main blog page...\n');
  
  try {
    // Fetch recent posts for the blog index
    const { posts: recentPosts } = await getPosts({ per_page: 12 });
    
    // Build content string with article listings
    const blogContent = `
      OptizenApp Blog - Shopify SEO & Video Upsell Tips
      
      Learn about Shopify SEO, video upsells, e-commerce growth strategies, and more. Expert tips and guides to help you grow your online store.
      
      Recent Articles:
      ${recentPosts.map((post, index) => `
        ${index + 1}. ${stripHtml(post.title.rendered)}
        ${stripHtml(post.excerpt.rendered)}
        Published: ${post.date}
        Category: ${post._embedded?.['wp:term']?.[0]?.[0]?.name || 'Blog'}
      `).join('\n')}
    `;

    const schema = await generateSchemaOrg({
      url: 'https://optizenapp.com/blog',
      title: 'Blog | OptizenApp - Shopify SEO & Video Upsell Tips',
      content: blogContent,
      excerpt: 'Learn about Shopify SEO, video upsells, e-commerce growth strategies, and more. Expert tips and guides to help you grow your online store.',
      datePublished: '2024-01-01T00:00:00Z',
      dateModified: new Date().toISOString(),
      category: 'Blog',
      breadcrumbs: [
        { name: 'Home', url: 'https://optizenapp.com' },
        { name: 'Blog', url: 'https://optizenapp.com/blog' },
      ],
      siteInfo: {
        name: 'OptizenApp',
        url: 'https://optizenapp.com',
        logoUrl: 'https://optizenapp.com/optizen-logo.png',
      },
    });

    if (schema) {
      totalGenerated++;
      console.log('  ✅ Blog index schema generated and cached\n');
    } else {
      totalSkipped++;
      console.log('  ⏭️  Blog index schema skipped (already cached)\n');
    }
  } catch (error: any) {
    console.error(`  ❌ Failed to generate blog index schema: ${error.message}\n`);
  }

  // 2. Generate schema for all category pages
  console.log('📁 [2/2] Generating schema for category pages...\n');
  
  try {
    const categories = await getCategories();
    console.log(`📄 Found ${categories.length} categories\n`);

    // Category descriptions
    const categoryDescriptions: Record<string, string> = {
      'aov': 'Discover proven strategies to increase your Average Order Value (AOV) and boost revenue without spending more on customer acquisition. Learn about product bundling, upselling techniques, and optimization tactics.',
      'shopify-questions': 'Get answers to common Shopify questions and learn best practices for managing your store. From setup to optimization, find expert guidance for all your Shopify needs.',
      'ai-prompts': 'Master the art of AI prompting for e-commerce. Learn how to create effective prompts for product descriptions, SEO content, and customer engagement using advanced AI techniques.',
      'shopify-seo': 'Optimize your Shopify store for search engines with expert SEO tips, best practices, and strategies. Learn how to rank higher and drive more organic traffic to your store.',
      'optizen-ai': 'Explore how OptizenAI can help you automate and optimize your Shopify store. Learn about AI-powered SEO tools, content generation, and advanced features to grow your business.',
      'content': 'Content marketing strategies and tips for e-commerce stores. Learn how to create compelling content that drives traffic, engages customers, and increases conversions.',
      'optizen': 'Updates, tutorials, and insights about Optizen apps. Stay informed about new features, best practices, and success stories from other Shopify merchants.',
      'silos': 'Learn about SEO siloing strategies to organize your content and improve search rankings. Discover how to create structured category hierarchies for better SEO performance.',
      'stats': 'E-commerce statistics, data insights, and analytics to help you make informed decisions. Understand industry benchmarks and key performance metrics for your store.',
    };

    for (let i = 0; i < categories.length; i++) {
      const category = categories[i];
      
      console.log(`[${i + 1}/${categories.length}] Generating schema for category: ${category.name}`);

      try {
        // Fetch posts for this category
        const { posts: categoryPosts } = await getPosts({ 
          categories: category.id, 
          per_page: 12 
        });

        // Build content string with article listings
        const categoryContent = `
          ${category.name} - OptizenApp Blog
          
          ${categoryDescriptions[category.slug] || category.description || `Articles about ${category.name}`}
          
          Articles in this category:
          ${categoryPosts.map((post, index) => `
            ${index + 1}. ${stripHtml(post.title.rendered)}
            ${stripHtml(post.excerpt.rendered)}
            Published: ${post.date}
          `).join('\n')}
        `;

        const schema = await generateSchemaOrg({
          url: `https://optizenapp.com/${category.slug}`,
          title: `${category.name} | OptizenApp Blog`,
          content: categoryContent,
          excerpt: categoryDescriptions[category.slug] || category.description || `Articles about ${category.name}`,
          datePublished: '2024-01-01T00:00:00Z',
          dateModified: new Date().toISOString(),
          category: category.name,
          breadcrumbs: [
            { name: 'Home', url: 'https://optizenapp.com' },
            { name: 'Blog', url: 'https://optizenapp.com/blog' },
            { name: category.name, url: `https://optizenapp.com/${category.slug}` },
          ],
          siteInfo: {
            name: 'OptizenApp',
            url: 'https://optizenapp.com',
            logoUrl: 'https://optizenapp.com/optizen-logo.png',
          },
        });

        if (schema) {
          totalGenerated++;
          console.log(`  ✅ Schema generated and cached\n`);
        } else {
          totalSkipped++;
          console.log(`  ⏭️  Schema skipped (already cached)\n`);
        }
      } catch (error: any) {
        console.error(`  ❌ Failed to generate schema for ${category.name}: ${error.message}\n`);
      }
    }
  } catch (error: any) {
    console.error(`❌ Failed to fetch categories: ${error.message}\n`);
  }

  console.log(`🎉 Blog listing schema generation complete!`);
  console.log(`✅ Generated: ${totalGenerated}`);
  console.log(`⏭️  Skipped (cached): ${totalSkipped}\n`);
}

generateBlogListingSchema();

