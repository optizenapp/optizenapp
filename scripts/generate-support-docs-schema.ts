import 'dotenv/config';
import { generateSchemaOrg } from '../lib/schema-generator';
import { docsMapping, appInfo } from '../lib/docs-mapping';
import { getDocContent } from '../lib/docs-content';
import { stripHtml } from '../lib/blog-utils';

async function generateSupportDocsSchema() {
  console.log('🚀 Starting support docs schema generation...\n');
  
  console.log(`📄 Found ${docsMapping.length} support doc pages\n`);

  let totalGenerated = 0;
  let totalSkipped = 0;

  for (let i = 0; i < docsMapping.length; i++) {
    const doc = docsMapping[i];
    const docContent = getDocContent(doc.wpSlug);
    
    if (!docContent) {
      console.log(`⚠️  No content found for: ${doc.wpSlug}`);
      continue;
    }

    const currentAppInfo = appInfo[doc.app];
    const url = `https://optizenapp.com/support-docs/${doc.app}/${doc.nextSlug}`;
    
    console.log(`[${i + 1}/${docsMapping.length}] Generating schema for: ${doc.title}`);
    
    try {
      // Build breadcrumbs
      const breadcrumbs = [
        { name: 'Home', url: 'https://optizenapp.com' },
        { name: 'Support Docs', url: 'https://optizenapp.com/support-docs' },
        { name: currentAppInfo.name, url: `https://optizenapp.com/support-docs/${doc.app}` },
        { name: doc.title || 'Documentation', url },
      ];

      const schema = await generateSchemaOrg({
        url,
        title: doc.title || 'Documentation',
        content: docContent.content,
        excerpt: stripHtml(docContent.content).substring(0, 160),
        datePublished: '2024-01-01T00:00:00Z', // Static date - update manually when content changes
        dateModified: '2024-01-01T00:00:00Z', // Static date - update manually when content changes
        category: `${currentAppInfo.name} Documentation`,
        breadcrumbs,
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
        console.log(`  ⏭️  Skipped (already cached)\n`);
      }
    } catch (error) {
      console.error(`  ❌ Error generating schema:`, error);
      console.log('');
    }
  }

  console.log('🎉 Support docs schema generation complete!');
  console.log(`✅ Generated: ${totalGenerated}`);
  console.log(`⏭️  Skipped (cached): ${totalSkipped}`);
}

generateSupportDocsSchema().catch(console.error);

