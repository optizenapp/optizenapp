import { config } from 'dotenv';
import { getAllPagePaths, getPageByPath } from '@/lib/wordpress';
import { generateSchemaOrg } from '@/lib/schema-generator';

// Load environment variables from .env.local
config({ path: '.env.local' });

async function generatePageSchema() {
  console.log('🚀 Starting pages schema generation...\n');
  
  const allPagePaths = await getAllPagePaths();
  
  // Filter out support docs pages (they're handled separately in Next.js)
  const pagePaths = allPagePaths.filter(path => {
    // Exclude any path that contains support doc slugs
    const excludePatterns = [
      'introduction-to-optizen',
      'new-ai-plan',
      'getting-started-with-ai',
      'prompt-templates',
      'updating-products-with-optizen-ai',
      'updating-collections-tag-page-with-ai',
      'updating-image-alt-text',
      'how-to-install-optizen',
      'optizen-settings',
      'collection-pages',
      'tag-pages',
      'tag-page-sitemap',
      'sync-button',
      'smart-tag-filters',
      'exporting-collections',
      'importing-collections',
      'exporting-tag-pages',
      'importing-tag-pages',
      'upgrade-to-enterprise',
      'variant-tagger',
      'video-upsell',
    ];
    
    return !excludePatterns.some(pattern => path.includes(pattern));
  });
  
  console.log(`📄 Fetching pages from WordPress...`);
  console.log(`✅ Found ${allPagePaths.length} total pages`);
  console.log(`📝 Generating schema for ${pagePaths.length} pages (excluding support docs)\n`);

  let totalGenerated = 0;
  let totalSkipped = 0;

  for (let i = 0; i < pagePaths.length; i++) {
    const path = pagePaths[i];
    const page = await getPageByPath(path);
    
    if (!page) continue;

    const url = `https://optizenapp.com/${path}`;
    
    console.log(`[${i + 1}/${pagePaths.length}] Generating schema for: ${page.title.rendered}`);

    const schema = await generateSchemaOrg({
      url,
      title: page.title.rendered,
      content: page.content.rendered,
      excerpt: page.excerpt.rendered,
      author: 'OptizenAI',
      datePublished: page.date,
      dateModified: page.modified,
      category: path.split('/')[0],
      siteInfo: {
        name: 'OptizenAI',
        url: 'https://optizenapp.com',
        logoUrl: 'https://optizenapp.com/optizen-logo.png',
      },
    });
    
    if (schema) {
      totalGenerated++;
      console.log(`  ✅ Schema generated and cached\n`);
    } else {
      totalSkipped++;
      console.log(`  ⏭️  Skipped (cached or error)\n`);
    }
  }

  console.log('\n🎉 Pages schema generation complete!');
  console.log(`✅ Generated: ${totalGenerated}`);
  console.log(`⏭️  Skipped (cached): ${totalSkipped}`);
}

generatePageSchema().catch(console.error);
