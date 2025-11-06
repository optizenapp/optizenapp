#!/usr/bin/env tsx
/**
 * Helper Script: Update Schema for a Single Blog Post
 * 
 * Usage:
 *   npm run schema:update <post-slug>
 * 
 * Example:
 *   npm run schema:update how-to-use-video-in-ecommerce
 * 
 * This script:
 * 1. Fetches the post from WordPress
 * 2. Generates advanced schema using Claude AI
 * 3. Caches it locally for deployment
 * 4. Shows you what to commit
 */

import { config } from 'dotenv';
import { generateSchemaOrg } from '../lib/schema-generator';
import { getPostBySlug, getCategoryBySlug } from '../lib/wordpress';
import { stripHtml } from '../lib/blog-utils';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';

// Load environment variables
config({ path: '.env.local' });

async function updatePostSchema() {
  const slug = process.argv[2];
  
  if (!slug) {
    console.error('❌ Error: Please provide a post slug');
    console.log('\nUsage: npm run schema:update <post-slug>');
    console.log('Example: npm run schema:update how-to-use-video-in-ecommerce\n');
    process.exit(1);
  }

  console.log(`\n🚀 Updating schema for post: ${slug}\n`);

  try {
    // Fetch the post
    const post = await getPostBySlug(slug);

    if (!post) {
      console.error(`❌ Post with slug "${slug}" not found.`);
      process.exit(1);
    }

    const categoryData = post.categories.length > 0 
      ? await getCategoryBySlug(post._embedded?.['wp:term']?.[0]?.[0]?.slug || 'blog') 
      : null;
    const category = categoryData?.slug || 'blog';
    const authorName = post._embedded?.author?.[0]?.name || 'OptizenApp';
    const featuredImage = post._embedded?.['wp:featuredmedia']?.[0];

    const url = `https://optizenapp.com/${category}/${slug}`;

    console.log(`📝 Post: ${stripHtml(post.title.rendered)}`);
    console.log(`📁 Category: ${categoryData?.name || 'Content'}`);
    console.log(`🔗 URL: ${url}`);
    console.log(`📅 Modified: ${post.modified}\n`);

    const breadcrumbs = [
      { name: 'Home', url: 'https://optizenapp.com' },
      { name: categoryData?.name || 'Content', url: `https://optizenapp.com/${category}` },
      { name: stripHtml(post.title.rendered), url: url },
    ];

    // Generate schema
    console.log('⏳ Generating schema with Claude AI...\n');
    const schema = await generateSchemaOrg({
      url,
      title: stripHtml(post.title.rendered),
      content: post.content.rendered,
      excerpt: stripHtml(post.excerpt.rendered),
      author: authorName,
      datePublished: post.date,
      dateModified: post.modified,
      category: categoryData?.name || 'Blog',
      featuredImage: featuredImage ? {
        url: featuredImage.source_url,
        width: featuredImage.media_details?.width || 1200,
        height: featuredImage.media_details?.height || 630,
        alt: featuredImage.alt_text,
      } : undefined,
      breadcrumbs,
      siteInfo: {
        name: 'OptizenApp',
        url: 'https://optizenapp.com',
        logoUrl: 'https://optizenapp.com/optizen-logo.png',
      },
    });

    if (!schema) {
      console.error('❌ Schema generation failed.');
      process.exit(1);
    }

    // Get cache file path
    const cacheDir = path.join(process.cwd(), '.schema-cache');
    const cacheKey = crypto.createHash('md5').update(url).digest('hex');
    const filePath = path.join(cacheDir, `${cacheKey}.json`);

    // Show schema types
    const schemaTypes = (schema as any)['@graph'] 
      ? (schema as any)['@graph'].map((item: any) => item['@type']).join(', ')
      : (schema as any)['@type'];
    
    console.log('✅ Schema generated successfully!\n');
    console.log(`📊 Schema types: ${schemaTypes}\n`);
    console.log(`💾 Cached to: ${filePath}\n`);

    // Show next steps
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📦 NEXT STEPS:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log('1. Review the schema (optional):');
    console.log(`   cat ${filePath} | jq '.schema["@graph"][]["@type"]'\n`);
    console.log('2. Commit and push:');
    console.log(`   git add .schema-cache/${cacheKey}.json`);
    console.log(`   git commit -m "Update schema for ${slug}"`);
    console.log('   git push origin main\n');
    console.log('3. Wait for Vercel to deploy (~2 minutes)\n');
    console.log('4. Verify on live site:');
    console.log(`   https://validator.schema.org/#url=${encodeURIComponent(url)}\n`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

updatePostSchema();

