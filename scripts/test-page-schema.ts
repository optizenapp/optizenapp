import { config } from 'dotenv';
import { getAllPagePaths, getPageByPath } from '@/lib/wordpress';
import { generateSchemaOrg } from '@/lib/schema-generator';

// Load environment variables from .env.local
config({ path: '.env.local' });

async function testPageSchema() {
  console.log('🧪 Testing page schema generation (1 page)...\n');
  
  const pagePaths = await getAllPagePaths();
  console.log(`📄 Found ${pagePaths.length} pages total`);
  
  // Test with just the FIRST page
  const testPath = pagePaths[0];
  
  console.log(`\n🎯 Testing with: ${testPath}\n`);

  const page = await getPageByPath(testPath);
  if (!page) {
    console.log('❌ Could not fetch page');
    return;
  }

  const url = `https://optizenapp.com/${testPath}`;
  
  console.log(`[TEST] Generating schema for: ${page.title.rendered}`);
  console.log(`Content length: ${page.content.rendered.length} characters`);

  const schema = await generateSchemaOrg({
    url,
    title: page.title.rendered,
    content: page.content.rendered,
    excerpt: page.excerpt.rendered,
    author: 'OptizenAI',
    datePublished: page.date,
    dateModified: page.modified,
    category: testPath.split('/')[0],
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
    console.log(`\n🎉 Test passed! Ready to run full page schema generation.`);
  } else {
    console.log(`\n❌ FAILED - Schema generation returned null`);
  }
}

testPageSchema().catch(console.error);

