import { getPageByWpSlug, getPages } from '@/lib/wordpress';
import { generateSchemaOrg } from '@/lib/schema-generator';
import { docsMapping } from '@/lib/docs-mapping';

async function generateDocsSchema() {
  console.log('🚀 Starting documentation schema generation...\n');
  
  const allApps = Object.keys(docsMapping);
  let totalGenerated = 0;
  let totalSkipped = 0;

  for (const app of allApps) {
    console.log(`\n📚 Processing ${app} documentation...`);
    const docPaths = docsMapping[app as keyof typeof docsMapping] || [];

    for (let i = 0; i < docPaths.length; i++) {
      const docPath = docPaths[i];
      const wpSlug = docPath.wpSlug;
      
      const page = await getPageByWpSlug(wpSlug);
      if (!page) {
        console.log(`  ⏭️  [${i + 1}/${docPaths.length}] Not found: ${docPath.title}`);
        continue;
      }

      const url = `https://optizenapp.com/support-docs/${app}/${docPath.nextSlug}`;
      
      console.log(`  [${i + 1}/${docPaths.length}] Generating schema for: ${page.title.rendered}`);

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
        console.log(`    ✅ Schema generated and cached`);
      } else {
        totalSkipped++;
        console.log(`    ⏭️  Skipped (cached or error)`);
      }
    }
  }

  console.log('\n🎉 Documentation schema generation complete!');
  console.log(`✅ Generated: ${totalGenerated}`);
  console.log(`⏭️  Skipped (cached): ${totalSkipped}`);
}

generateDocsSchema().catch(console.error);
