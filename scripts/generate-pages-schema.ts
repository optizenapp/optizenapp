import { config } from 'dotenv';
import { getAllPagePaths, getPageByPath } from '@/lib/wordpress';
import { generateSchemaOrg } from '@/lib/schema-generator';

// Load environment variables from .env.local
config({ path: '.env.local' });

async function generatePageSchema() {
  console.log('🚀 Starting pages schema generation...\n');
  
  const pagePaths = await getAllPagePaths();
  console.log(`📄 Fetching pages from WordPress...`);
  console.log(`✅ Found ${pagePaths.length} pages\n`);

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
