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
    title: 'OptizenAI - Shopify SEO & Video Upsell Apps',
    content: homepageContent,
    excerpt: 'Boost your Shopify store with AI-powered SEO and video upsell tools. Increase AOV, improve search rankings, and automate customer engagement.',
    author: 'OptizenAI',
    datePublished: new Date().toISOString(),
    dateModified: new Date().toISOString(),
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
