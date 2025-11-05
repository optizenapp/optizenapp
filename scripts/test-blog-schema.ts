import { config } from 'dotenv';
import { getAllPostSlugs, getPostBySlug } from '@/lib/wordpress';
import { generateSchemaOrg } from '@/lib/schema-generator';

// Load environment variables from .env.local
config({ path: '.env.local' });

async function testBlogSchema() {
  console.log('🧪 Testing blog post schema generation (1 post)...\n');
  
  const postSlugs = await getAllPostSlugs();
  console.log(`📝 Found ${postSlugs.length} blog posts total`);
  
  // Test with just the FIRST post
  const testSlug = postSlugs[0];
  const [category, slug] = testSlug.split('/');
  
  console.log(`\n🎯 Testing with: ${testSlug}\n`);

  const post = await getPostBySlug(category, slug);
  if (!post) {
    console.log('❌ Could not fetch post');
    return;
  }

  const url = `https://optizenapp.com/${category}/${slug}`;
  
  console.log(`[TEST] Generating schema for: ${post.title.rendered}`);

  const schema = await generateSchemaOrg({
    url,
    title: post.title.rendered,
    content: post.content.rendered,
    excerpt: post.excerpt.rendered,
    author: 'OptizenAI',
    datePublished: post.date,
    dateModified: post.modified,
    category,
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
    console.log(`\n🎉 Test passed! Ready to run full blog schema generation.`);
  } else {
    console.log(`\n❌ FAILED - Schema generation returned null`);
  }
}

testBlogSchema().catch(console.error);

