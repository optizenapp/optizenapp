import { config } from 'dotenv';
import { getPageByWpSlug, getPages } from '@/lib/wordpress';
import { generateSchemaOrg } from '@/lib/schema-generator';
import { docsMapping } from '@/lib/docs-mapping';

// Load environment variables from .env.local
config({ path: '.env.local' });

async function generateDocsSchema() {
  console.log('🚀 Starting documentation schema generation...\n');
  console.log(`📚 Found ${docsMapping.length} documentation pages\n`);
  
  let totalGenerated = 0;
  let totalSkipped = 0;

  for (let i = 0; i < docsMapping.length; i++) {
    const docPath = docsMapping[i];
    const wpSlug = docPath.wpSlug;
    const app = docPath.app;
    
    const page = await getPageByWpSlug(wpSlug);
    if (!page) {
      console.log(`  ⏭️  [${i + 1}/${docsMapping.length}] Not found: ${docPath.title || wpSlug}`);
      continue;
    }

    const url = `https://optizenapp.com/support-docs/${app}/${docPath.nextSlug}`;
    
    console.log(`[${i + 1}/${docsMapping.length}] Generating schema for: ${page.title.rendered}`);

    const schema = await generateSchemaOrg({
      url,
      title: page.title.rendered,
      content: page.content.rendered,
      excerpt: page.excerpt.rendered,
      author: 'OptizenAI Support',
      datePublished: page.date,
      dateModified: page.modified,
      category: `support-docs-${app}`,
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

  console.log('\n🎉 Documentation schema generation complete!');
  console.log(`✅ Generated: ${totalGenerated}`);
  console.log(`⏭️  Skipped (cached): ${totalSkipped}`);
}

generateDocsSchema().catch(console.error);
