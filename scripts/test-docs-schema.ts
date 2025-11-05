import { config } from 'dotenv';
import { getPageByWpSlug } from '@/lib/wordpress';
import { generateSchemaOrg } from '@/lib/schema-generator';
import { docsMapping } from '@/lib/docs-mapping';

// Load environment variables from .env.local
config({ path: '.env.local' });

async function testDocsSchema() {
  console.log('🧪 Testing documentation schema generation (1 doc)...\n');
  
  console.log(`📚 Found ${docsMapping.length} documentation pages total`);
  
  // Test with just the FIRST doc
  const testDoc = docsMapping[0];
  const app = testDoc.app;
  
  console.log(`\n🎯 Testing with: ${testDoc.title}\n`);

  const page = await getPageByWpSlug(testDoc.wpSlug);
  if (!page) {
    console.log('❌ Could not fetch doc page');
    console.log(`   WP Slug: ${testDoc.wpSlug}`);
    return;
  }

  const url = `https://optizenapp.com/support-docs/${app}/${testDoc.nextSlug}`;
  
  console.log(`[TEST] Generating schema for: ${page.title.rendered}`);
  console.log(`Content length: ${page.content.rendered.length} characters`);
  
  if (page.content.rendered.length < 100) {
    console.log(`\n⚠️  WARNING: This page has very little content!`);
    console.log(`   This is likely a video tutorial page.`);
    console.log(`   Content preview: ${page.content.rendered.substring(0, 200)}`);
  }

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
    console.log(`\n✅ SUCCESS! Schema generated and cached`);
    console.log(`\n📊 Schema preview:`);
    console.log(JSON.stringify(schema, null, 2).substring(0, 500) + '...\n');
    console.log(`\n🎉 Test passed! Ready to run full docs schema generation.`);
  } else {
    console.log(`\n❌ FAILED - Schema generation returned null`);
  }
}

testDocsSchema().catch(console.error);

