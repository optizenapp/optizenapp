import { config } from 'dotenv';
import { generateSchemaOrg } from '../lib/schema-generator';
import { getDocContent } from '../lib/docs-content';
import { docsMapping, appInfo } from '../lib/docs-mapping';
import { stripHtml } from '../lib/blog-utils';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';

// Load environment variables
config({ path: '.env.local' });

async function generateVideoUpsellDocsSchema() {
  console.log('🚀 Generating schema for Video Upsell documentation pages...\n');

  // Get all video-upsells docs
  const videoUpsellDocs = docsMapping.filter(doc => doc.app === 'video-upsells');
  
  if (videoUpsellDocs.length === 0) {
    console.log('⚠️  No Video Upsell docs found in mapping');
    return;
  }

  console.log(`📚 Found ${videoUpsellDocs.length} Video Upsell documentation pages\n`);

  for (const doc of videoUpsellDocs) {
    const content = getDocContent(doc.wpSlug);
    if (!content) {
      console.log(`⚠️  No content found for: ${doc.wpSlug}`);
      continue;
    }

    const url = `https://optizenapp.com/support-docs/video-upsells/${doc.nextSlug}`;
    console.log(`📝 Processing: ${doc.title}`);
    console.log(`   URL: ${url}`);

    const breadcrumbs = [
      { name: 'Home', url: 'https://optizenapp.com' },
      { name: 'Support Docs', url: 'https://optizenapp.com/support-docs' },
      { name: appInfo['video-upsells'].name, url: 'https://optizenapp.com/support-docs/video-upsells' },
      { name: doc.title || doc.nextSlug, url: url },
    ];

    try {
      const schema = await generateSchemaOrg({
        url,
        title: doc.title || doc.nextSlug,
        content: content.content,
        excerpt: stripHtml(content.content).substring(0, 160),
        author: 'OptizenApp',
        datePublished: '2025-11-06T00:00:00Z',
        dateModified: '2025-11-06T00:00:00Z',
        category: 'Video Upsells Documentation',
        breadcrumbs,
        siteInfo: {
          name: 'OptizenApp',
          url: 'https://optizenapp.com',
          logoUrl: 'https://optizenapp.com/optizen-logo.png',
        },
      });

      if (schema) {
        // Save to cache
        const cacheDir = path.join(process.cwd(), '.schema-cache');
        if (!fs.existsSync(cacheDir)) {
          fs.mkdirSync(cacheDir, { recursive: true });
        }
        
        const cacheKey = crypto.createHash('md5').update(url).digest('hex');
        const filePath = path.join(cacheDir, `${cacheKey}.json`);
        
        fs.writeFileSync(filePath, JSON.stringify({
          schema,
          generatedAt: new Date().toISOString(),
          contentModified: '2025-11-06T00:00:00Z',
          contentHash: crypto.createHash('md5').update(content.content).digest('hex')
        }, null, 2));
        
        console.log(`   ✅ Schema generated and cached: ${cacheKey}.json`);
        
        // Show schema types
        const types = (schema as any)['@graph'] 
          ? (schema as any)['@graph'].map((item: any) => item['@type']).join(', ')
          : (schema as any)['@type'];
        console.log(`   📊 Schema types: ${types}`);
      } else {
        console.log(`   ❌ Schema generation failed`);
      }
    } catch (error: any) {
      console.error(`   ❌ Error: ${error.message}`);
    }
    
    console.log(''); // Empty line between docs
  }

  console.log('🎉 Done! All Video Upsell documentation schemas generated.');
  console.log('\n📦 Next steps:');
  console.log('   1. Review the generated schemas in .schema-cache/');
  console.log('   2. Commit the cache files: git add .schema-cache/');
  console.log('   3. Push to deploy: git push origin main');
}

generateVideoUpsellDocsSchema().catch(console.error);

