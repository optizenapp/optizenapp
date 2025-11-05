import { config } from 'dotenv';
import { generateSchemaOrg } from '@/lib/schema-generator';
import fs from 'fs';
import path from 'path';

// Load environment variables from .env.local
config({ path: '.env.local' });

async function generateHomepageSchema() {
  console.log('🚀 Starting homepage schema generation...\n');
  
  // Read the homepage file to get content
  const homepagePath = path.join(process.cwd(), 'app', 'page.tsx');
  let homepageContent = 'OptizenAI - Shopify SEO & Video Upsell Apps. Boost your store with AI-powered tools for product optimization and upsell automation.';
  
  try {
    if (fs.existsSync(homepagePath)) {
      homepageContent = fs.readFileSync(homepagePath, 'utf-8').substring(0, 2000);
    }
  } catch (e) {
    console.log('⚠️  Could not read homepage content, using default description');
  }

  console.log(`📄 Generating schema for: OptizenAI Homepage`);

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
    dateModified: '2024-01-01T00:00:00Z', // Static date - update manually when homepage content changes
    category: 'homepage',
    siteInfo: {
      name: 'OptizenAI',
      url: 'https://optizenapp.com',
      logoUrl: 'https://optizenapp.com/optizen-logo.png',
    },
  });
  
  if (schema) {
    console.log(`✅ Homepage schema generated and cached\n`);
  } else {
    console.log(`⚠️  Homepage schema skipped (already cached or error)\n`);
  }

  console.log('🎉 Homepage schema generation complete!');
}

generateHomepageSchema().catch(console.error);
