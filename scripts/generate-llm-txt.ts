/**
 * Generate llm.txt file with all blog posts and pages from sitemap
 * 
 * Usage:
 *   npx tsx scripts/generate-llm-txt.ts
 */

import * as fs from 'fs';
import * as path from 'path';

async function fetchSitemap(url: string): Promise<string[]> {
  const response = await fetch(url);
  const xml = await response.text();
  
  // Extract all <loc> URLs from sitemap
  const urlMatches = xml.matchAll(/<loc>(.*?)<\/loc>/g);
  const urls = Array.from(urlMatches).map(match => match[1]);
  
  return urls;
}

function categorizeURL(url: string): { type: string; category?: string; slug: string; title: string } {
  const urlObj = new URL(url);
  const pathname = urlObj.pathname;
  const segments = pathname.split('/').filter(Boolean);
  
  // Homepage
  if (segments.length === 0) {
    return { type: 'home', slug: '', title: 'Homepage' };
  }
  
  // Blog index
  if (segments[0] === 'blog' && segments.length === 1) {
    return { type: 'blog-index', slug: 'blog', title: 'Blog' };
  }
  
  // Support docs
  if (segments[0] === 'support-docs') {
    return { 
      type: 'docs', 
      slug: segments.join('/'), 
      title: segments[segments.length - 1].split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    };
  }
  
  // Product pages
  if (segments[0] === 'optizenai-seo' || segments[0] === 'optizenai-video-upsells-and-bundles') {
    return { 
      type: 'product', 
      slug: segments[0], 
      title: segments[0] === 'optizenai-seo' ? 'OptizenAI SEO Tools' : 'Optizen Video Upsell & Bundles'
    };
  }
  
  // Contact, affiliates, etc.
  if (segments.length === 1) {
    return { 
      type: 'page', 
      slug: segments[0], 
      title: segments[0].split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    };
  }
  
  // Blog posts (category/slug)
  if (segments.length === 2) {
    return { 
      type: 'post', 
      category: segments[0],
      slug: segments[1], 
      title: segments[1].split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    };
  }
  
  // Everything else is a page
  return { 
    type: 'page', 
    slug: segments.join('/'), 
    title: segments[segments.length - 1].split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
  };
}

async function generateLLMTxt() {
  console.log('🤖 Generating llm.txt from sitemap...\n');

  // Fetch sitemaps
  console.log('📥 Fetching sitemaps...');
  const [staticUrls, dynamicUrls] = await Promise.all([
    fetchSitemap('https://optizenapp.com/sitemap.xml'),
    fetchSitemap('https://optizenapp.com/server-sitemap.xml'),
  ]);

  const allUrls = [...staticUrls, ...dynamicUrls];
  console.log(`✓ Found ${allUrls.length} total URLs\n`);

  // Categorize URLs
  const categorized = allUrls.map(url => ({ url, ...categorizeURL(url) }));
  
  const posts = categorized.filter(u => u.type === 'post');
  const pages = categorized.filter(u => u.type === 'page');
  const docs = categorized.filter(u => u.type === 'docs');
  const products = categorized.filter(u => u.type === 'product');
  
  // Group posts by category
  const postsByCategory = posts.reduce((acc, post) => {
    const cat = post.category || 'uncategorized';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(post);
    return acc;
  }, {} as Record<string, typeof posts>);
  
  console.log(`📊 Categorized:`);
  console.log(`   - ${posts.length} blog posts`);
  console.log(`   - ${pages.length} pages`);
  console.log(`   - ${docs.length} documentation pages`);
  console.log(`   - ${products.length} product pages\n`);

  // Start building the content
  let content = `# OptizenApp - Shopify Apps for SEO & Video Upsells

> AI-powered tools to boost your Shopify store's revenue and search rankings

## About

OptizenApp provides two powerful Shopify apps:
1. **OptizenAI SEO Tools** - AI-powered SEO optimization for Shopify stores
2. **Optizen Video Upsell & Bundles** - Video-based upsells and product bundles

Trusted by thousands of Shopify merchants worldwide with a 4.9/5 rating.

## Products

### OptizenAI SEO Tools
- AI-powered meta tag optimization
- Bulk product and collection SEO updates
- Image alt text automation
- Tag page optimization
- Smart Tag Filter & Variant Tagger
- URL: https://optizenapp.com/optizenai-seo

### Optizen Video Upsell & Bundles
- Video-based product upsells
- AI video generation
- Product bundle builder
- Strategic placement across product pages
- Dual analytics tracking
- URL: https://optizenapp.com/optizenai-video-upsells-and-bundles

## Key Features

- **AI-Powered**: Advanced AI for SEO content and video generation
- **Easy Setup**: Install in minutes, no coding required
- **Shopify Native**: Built specifically for Shopify 2.0 themes
- **Proven Results**: Increase AOV by up to 30%, improve search rankings
- **Free Trials**: 7-day free trial on all plans

## Pricing

### SEO Tools
- Free: Essential SEO features + 2,000 AI words
- Pro ($19.99/mo): Collection optimization + 125,000 AI words
- Enterprise ($29.99/mo): 250,000 AI words + priority support

### Video Upsell
- Free: 1 campaign, up to 5 conversions
- Starter ($9.99/mo): Unlimited campaigns + 2 AI video credits
- Pro ($29.99/mo): 5 AI video credits + priority support

## Documentation

- Main Docs: https://optizenapp.com/support-docs
- SEO Docs: https://optizenapp.com/support-docs/optizenai
- Video Upsell Docs: https://optizenapp.com/support-docs/video-upsells
- Shopify Guides: https://optizenapp.com/shopify

## Contact & Support

- Email: support@optizenai.com
- Contact Form: https://optizenapp.com/contact
- Affiliate Program: https://optizenapp.com/affiliates-program (25% recurring commissions)

## Technical Details

- Platform: Shopify App Store
- Technology: Next.js, AI-powered (Claude/OpenAI)
- Integrations: Shopify 2.0, YouTube, Vimeo
- Security: SOC 2 compliant, bank-level encryption

## Company

- Website: https://optizenapp.com
- Shopify Partner: Verified
- Rating: 4.9/5 stars from 1,200+ reviews
- Stores Served: 10,000+ Shopify merchants
- Revenue Generated: $400M+ for customers

---

`;

  // Add Blog Posts by Category
  content += `## Blog Posts (${posts.length} total)\n\n`;
  
  const categoryNames: Record<string, string> = {
    'aov': 'Average Order Value (AOV)',
    'shopify-questions': 'Shopify Questions',
    'ai-prompts': 'AI Prompts',
    'shopify-seo': 'Shopify SEO',
    'optizen-ai': 'OptizenAI',
    'content': 'Content Marketing',
    'optizen': 'Optizen Updates',
    'silos': 'SEO Silos',
    'stats': 'E-commerce Statistics',
  };
  
  for (const [categorySlug, categoryPosts] of Object.entries(postsByCategory)) {
    const categoryName = categoryNames[categorySlug] || categorySlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    
    content += `### ${categoryName} (${categoryPosts.length} posts)\n\n`;
    
    for (const post of categoryPosts) {
      content += `- [${post.title}](${post.url})\n`;
    }
    content += `\n`;
  }

  // Add Documentation
  if (docs.length > 0) {
    content += `## Documentation (${docs.length} pages)\n\n`;
    
    for (const doc of docs) {
      content += `- [${doc.title}](${doc.url})\n`;
    }
    content += `\n`;
  }

  // Add Other Pages
  if (pages.length > 0) {
    content += `## Other Pages (${pages.length} pages)\n\n`;
    
    for (const page of pages) {
      content += `- [${page.title}](${page.url})\n`;
    }
    content += `\n`;
  }

  // Add footer
  content += `---

## Popular Topics

- Shopify product bundles
- Video upselling strategies
- Shopify SEO optimization
- AI-powered meta tags
- Average Order Value (AOV) increase
- Collection page optimization
- Product variant management
- Shopify sub-collections
- Shopify canonical URLs
- Shopify sitemaps
- Shopify 301 redirects

## API & Integration

For developers and partners:
- REST API available for enterprise customers
- Webhook support for real-time updates
- Custom integration support available

## Social Proof

- Featured in Shopify App Store
- Top-rated SEO app
- Most popular video upsell solution
- Trusted by leading Shopify stores worldwide

---

Last updated: ${new Date().toISOString().split('T')[0]}
Total URLs: ${allUrls.length} (${posts.length} posts + ${pages.length} pages + ${docs.length} docs)
Generated automatically from sitemap - run 'npm run llm:generate' to update
`;

  // Write to file
  const outputPath = path.join(process.cwd(), 'public', 'llm.txt');
  fs.writeFileSync(outputPath, content, 'utf-8');
  
  console.log(`✅ Successfully generated llm.txt`);
  console.log(`📝 File: ${outputPath}`);
  console.log(`📊 Size: ${(content.length / 1024).toFixed(2)} KB`);
  console.log(`📄 Content: ${posts.length} posts + ${pages.length} pages`);
  console.log(`\n🎉 Done! File is ready at: public/llm.txt`);
}

// Run the script
generateLLMTxt().catch((error) => {
  console.error('❌ Error generating llm.txt:', error);
  process.exit(1);
});

