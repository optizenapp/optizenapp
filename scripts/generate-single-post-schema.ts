import { config } from 'dotenv';
import { generateSchemaOrg } from '../lib/schema-generator';
import { getPostBySlug, getCategoryBySlug } from '../lib/wordpress';
import { stripHtml } from '../lib/blog-utils';
import fs from 'fs';
import path from 'path';

// Load environment variables
config({ path: '.env.local' });

async function generateSinglePostSchema() {
  const slug = 'how-to-use-video-in-ecommerce';
  const categorySlug = 'content';
  
  console.log(`🚀 Generating schema for: ${slug}\n`);

  try {
    // Fetch the post
    const post = await getPostBySlug(slug);
    if (!post) {
      console.error(`❌ Post not found: ${slug}`);
      return;
    }

    // Fetch category
    const category = await getCategoryBySlug(categorySlug);
    if (!category) {
      console.error(`❌ Category not found: ${categorySlug}`);
      return;
    }

    const url = `https://optizenapp.com/${categorySlug}/${slug}`;
    const authorName = post._embedded?.author?.[0]?.name || 'OptizenApp';

    console.log(`📝 Post: ${stripHtml(post.title.rendered)}`);
    console.log(`📁 Category: ${category.name}`);
    console.log(`🔗 URL: ${url}\n`);

    // Generate schema
    const schema = await generateSchemaOrg({
      url,
      title: stripHtml(post.title.rendered),
      content: post.content.rendered,
      excerpt: stripHtml(post.excerpt.rendered),
      author: authorName,
      datePublished: post.date,
      dateModified: post.modified,
      category: category.name,
      breadcrumbs: [
        { name: 'Home', url: 'https://optizenapp.com' },
        { name: 'Blog', url: 'https://optizenapp.com/blog' },
        { name: category.name, url: `https://optizenapp.com/${categorySlug}` },
        { name: stripHtml(post.title.rendered), url },
      ],
      siteInfo: {
        name: 'OptizenApp',
        url: 'https://optizenapp.com',
        logoUrl: 'https://optizenapp.com/optizen-logo.png',
      },
    });

    if (schema) {
      console.log(`✅ Schema generated successfully!\n`);
      
      // Save schema to a dedicated file for manual inspection
      const schemaDir = path.join(process.cwd(), '.schema-cache');
      const schemaFile = path.join(schemaDir, `${slug}-schema.json`);
      
      fs.writeFileSync(schemaFile, JSON.stringify(schema, null, 2));
      console.log(`💾 Schema saved to: ${schemaFile}\n`);
      
      // Display a preview
      console.log('📋 Schema Preview (first 500 chars):');
      console.log(JSON.stringify(schema, null, 2).substring(0, 500) + '...\n');
      
      console.log('🎉 Done! The schema is now cached and will be used on the next build.');
      console.log('📦 To deploy: git add -A && git commit -m "Add schema for video ecommerce post" && git push origin main');
    } else {
      console.log(`❌ Schema generation failed`);
    }
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

generateSinglePostSchema();

