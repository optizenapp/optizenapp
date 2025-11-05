import { config } from 'dotenv';
import { generateSchemaOrg } from '@/lib/schema-generator';
import fs from 'fs';

// Load environment variables from .env.local
config({ path: '.env.local' });

async function testHomepageSchema() {
  console.log('🧪 Testing homepage schema generation...\n');

  const schema = await generateSchemaOrg({
    url: 'https://optizenapp.com',
    title: 'OptizenApp - Boost Your Shopify Store with AI-Powered Tools',
    content: `
      Boost Your Shopify Store with SEO & Video Upsell Apps
      Increase revenue with video upsells and dominate search rankings with AI-powered SEO. Everything you need to grow your Shopify store.
      
      Optizen Video Upsell - Turn Browsers into Buyers
      Engage customers with video upsells and bundles. Increase your average order value by up to 30% with strategic product recommendations.
      
      OptizenAI SEO Tools - Dominate Search Rankings
      AI-powered SEO optimization for Shopify stores. Improve your search rankings and drive organic traffic with intelligent meta tag management.
      
      Trusted by 10,000+ Shopify stores
      4.9 star rating from 1,200+ reviews
      $400M+ revenue generated for our customers
    `,
    excerpt: 'Increase revenue with video upsells and dominate search rankings with AI-powered SEO. Trusted by 10,000+ Shopify stores.',
    author: 'OptizenAI',
    datePublished: '2024-01-01T00:00:00Z',
    dateModified: new Date().toISOString(),
    category: 'homepage',
    siteInfo: {
      name: 'OptizenAI',
      url: 'https://optizenapp.com',
      logoUrl: 'https://optizenapp.com/optizen-logo.png',
    },
  });

  if (schema) {
    console.log('✅ Schema retrieved from cache\n');
    
    // Check schema types
    const graph = (schema as any)['@graph'];
    if (graph && Array.isArray(graph)) {
      console.log('📊 Schema types found:');
      const types = graph.map((item: any) => item['@type']).filter(Boolean);
      types.forEach((type: string) => console.log(`  - ${type}`));
      console.log(`\n✅ Total: ${types.length} schema types\n`);
      
      // Validate it's not just Article
      if (types.length === 1 && types[0] === 'Article') {
        console.log('❌ ERROR: Only Article schema found! Expected multiple types.');
        process.exit(1);
      }
      
      // Check for required types
      const requiredTypes = ['Organization', 'WebSite', 'WebPage', 'SoftwareApplication'];
      const missingTypes = requiredTypes.filter(type => !types.includes(type));
      
      if (missingTypes.length > 0) {
        console.log('⚠️  WARNING: Missing required types:', missingTypes.join(', '));
      } else {
        console.log('✅ All required schema types present!');
      }
      
      // Pretty print the schema
      console.log('\n📄 Full Schema Preview:');
      console.log(JSON.stringify(schema, null, 2).substring(0, 500) + '...\n');
      
    } else {
      console.log('⚠️  Schema does not have @graph array');
    }
  } else {
    console.log('❌ No schema returned');
    process.exit(1);
  }

  console.log('🎉 Homepage schema test complete!');
}

testHomepageSchema().catch(console.error);

