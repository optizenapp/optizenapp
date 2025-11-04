/**
 * One-time script to pre-generate schema for all existing content
 * Run this locally, then commit the cache to git
 * 
 * Usage: npx tsx scripts/generate-initial-schema.ts
 */

import { getPosts, getPages } from '../lib/wordpress';
import { generateSchemaOrg } from '../lib/schema-generator';
import { setCachedSchema } from '../lib/schema-cache';

async function generateInitialSchema() {
  console.log('🚀 Starting one-time schema generation for existing content...\n');
  
  let totalGenerated = 0;
  let totalSkipped = 0;
  
  try {
    // 1. Generate schema for all blog posts
    console.log('📝 Fetching blog posts from WordPress...');
    const { posts } = await getPosts({ per_page: 100 });
    console.log(`✅ Found ${posts.length} posts\n`);
    
    for (let i = 0; i < posts.length; i++) {
      const post = posts[i];
      const category = post._embedded?.['wp:term']?.[0]?.[0]?.slug || 'uncategorized';
      const url = `https://optizenapp.com/${category}/${post.slug}`;
      
      console.log(`[${i + 1}/${posts.length}] Generating schema for: ${post.title.rendered}`);
      
      try {
        const schema = await generateSchemaOrg({
          url,
          title: post.title.rendered,
          content: post.content.rendered,
          excerpt: post.excerpt.rendered,
          author: 'OptizenAI Team',
          datePublished: post.date,
          dateModified: post.modified,
          category,
          featuredImage: post._embedded?.['wp:featuredmedia']?.[0] ? {
            url: post._embedded['wp:featuredmedia'][0].source_url,
            width: post._embedded['wp:featuredmedia'][0].media_details.width,
            height: post._embedded['wp:featuredmedia'][0].media_details.height,
            alt: post._embedded['wp:featuredmedia'][0].alt_text,
          } : undefined,
          breadcrumbs: [
            { name: 'Home', url: 'https://optizenapp.com' },
            { name: category, url: `https://optizenapp.com/${category}` },
            { name: post.title.rendered, url },
          ],
          siteInfo: {
            name: 'OptizenAI',
            url: 'https://optizenapp.com',
            logoUrl: 'https://optizenapp.com/optizen-logo.png',
          },
        });
        
        if (schema) {
          totalGenerated++;
          console.log(`  ✅ Schema generated and cached`);
        } else {
          totalSkipped++;
          console.log(`  ⏭️  Schema skipped (already cached)`);
        }
      } catch (error: any) {
        console.error(`  ❌ Error generating schema: ${error.message}`);
      }
      
      console.log('');
    }
    
    // 2. Generate schema for all pages
    console.log('\n📄 Fetching pages from WordPress...');
    const { pages } = await getPages({ per_page: 100 });
    console.log(`✅ Found ${pages.length} pages\n`);
    
    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];
      
      // Build page URL
      let pageUrl = 'https://optizenapp.com';
      if (page.slug === 'generated-homepage') {
        pageUrl = 'https://optizenapp.com';
      } else if (page.parent) {
        // Would need to build full path, skip for now
        console.log(`[${i + 1}/${pages.length}] Skipping nested page: ${page.title.rendered}`);
        continue;
      } else {
        pageUrl = `https://optizenapp.com/${page.slug}`;
      }
      
      console.log(`[${i + 1}/${pages.length}] Generating schema for: ${page.title.rendered}`);
      
      try {
        const schema = await generateSchemaOrg({
          url: pageUrl,
          title: page.title.rendered,
          content: page.content.rendered,
          excerpt: page.excerpt?.rendered,
          datePublished: page.date,
          dateModified: page.modified,
          featuredImage: page._embedded?.['wp:featuredmedia']?.[0] ? {
            url: page._embedded['wp:featuredmedia'][0].source_url,
            width: page._embedded['wp:featuredmedia'][0].media_details.width,
            height: page._embedded['wp:featuredmedia'][0].media_details.height,
            alt: page._embedded['wp:featuredmedia'][0].alt_text,
          } : undefined,
          breadcrumbs: [
            { name: 'Home', url: 'https://optizenapp.com' },
            { name: page.title.rendered, url: pageUrl },
          ],
          siteInfo: {
            name: 'OptizenAI',
            url: 'https://optizenapp.com',
            logoUrl: 'https://optizenapp.com/optizen-logo.png',
          },
        });
        
        if (schema) {
          totalGenerated++;
          console.log(`  ✅ Schema generated and cached`);
        } else {
          totalSkipped++;
          console.log(`  ⏭️  Schema skipped (already cached)`);
        }
      } catch (error: any) {
        console.error(`  ❌ Error generating schema: ${error.message}`);
      }
      
      console.log('');
    }
    
    console.log('\n🎉 Schema generation complete!');
    console.log(`✅ Generated: ${totalGenerated}`);
    console.log(`⏭️  Skipped (cached): ${totalSkipped}`);
    console.log(`\n💡 Next steps:`);
    console.log(`1. Review the generated schemas in .next/cache/schema/`);
    console.log(`2. Commit the cache directory to git`);
    console.log(`3. Deploy to Vercel - first build will be fast!`);
    
  } catch (error) {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  }
}

// Run the script
generateInitialSchema();

