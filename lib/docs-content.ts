/**
 * Static content for support documentation pages
 * 
 * This replaces WordPress content fetching with static content.
 * Each doc page has its title, video URL, and content.
 */

export interface DocContent {
  wpSlug: string;
  videoUrl?: string;
  content: string;
}

export const docsContent: Record<string, DocContent> = {
  // OptizenAI Features (All Plans)
  'introduction-to-optizen': {
    wpSlug: 'introduction-to-optizen',
    videoUrl: 'https://www.youtube.com/watch?v=g_peEFfoeKE',
    content: `
      <h2>Introduction to Optizen</h2>
      <p>Welcome to Optizen! This guide will help you understand the core features and capabilities of our Shopify SEO optimization tools.</p>
      <p>Watch the video below to get started with Optizen and learn how to optimize your Shopify store for better search engine rankings.</p>
    `,
  },
  
  'new-ai-plan-for-existing-users': {
    wpSlug: 'new-ai-plan-for-existing-users',
    videoUrl: 'https://www.youtube.com/watch?v=BJg-qgor1U4',
    content: `
      <h2>New AI Plan for Existing Users</h2>
      <p>We've introduced new AI-powered features for existing Optizen users. Learn about the new plan options and how to upgrade your account.</p>
      <p>This video walks through the new AI features and how they can help automate your SEO workflow.</p>
    `,
  },
  
  'getting-started-with-ai-features': {
    wpSlug: 'getting-started-with-ai-features',
    videoUrl: 'https://www.youtube.com/watch?v=VJPBMtAqunQ',
    content: `
      <h2>Getting Started with AI Features</h2>
      <p>Optizen's AI features help you automatically generate optimized content for your products, collections, and tag pages.</p>
      <p>This guide will show you how to set up and start using AI-powered content generation in your Shopify store.</p>
    `,
  },
  
  'creating-and-saving-prompt-templates': {
    wpSlug: 'creating-and-saving-prompt-templates',
    videoUrl: 'https://www.youtube.com/watch?v=-joCedMRHnw',
    content: `
      <h2>Creating and Saving Prompt Templates</h2>
      <p>Prompt templates allow you to save and reuse your AI content generation settings across multiple products and pages.</p>
      <p>Learn how to create custom prompt templates that match your brand voice and SEO strategy.</p>
    `,
  },
  
  'updating-products-with-optizen-ai': {
    wpSlug: 'updating-products-with-optizen-ai',
    videoUrl: 'https://www.youtube.com/watch?v=u59KnP8UL08',
    content: `
      <h2>Updating Products with Optizen AI</h2>
      <p>Use AI to automatically generate and update product titles, descriptions, and meta tags for better SEO performance.</p>
      <p>This video demonstrates how to bulk update your product content using Optizen's AI features.</p>
    `,
  },
  
  'updating-collections-tag-page-with-ai': {
    wpSlug: 'updating-collections-tag-page-with-ai',
    videoUrl: 'https://www.youtube.com/watch?v=ducjjVMe4mg',
    content: `
      <h2>Updating Collections & Tag Pages with AI</h2>
      <p>Optimize your collection and tag pages with AI-generated content that improves search rankings and user engagement.</p>
      <p>Learn how to use AI to create compelling descriptions and meta content for your collection and tag pages.</p>
    `,
  },
  
  'updating-image-alt-text-in-shopify-optizen-ai': {
    wpSlug: 'updating-image-alt-text-in-shopify-optizen-ai',
    videoUrl: 'https://www.youtube.com/watch?v=p2cOlTJ1Pj0',
    content: `
      <h2>Updating Image Alt Text with AI</h2>
      <p>Image alt text is crucial for SEO and accessibility. Use Optizen's AI to automatically generate descriptive alt text for all your product images.</p>
      <p>This guide shows you how to bulk update image alt text across your entire store.</p>
    `,
  },
  
  // OptizenAI Pro & Enterprise Features
  'how-to-install-optizen': {
    wpSlug: 'how-to-install-optizen',
    videoUrl: undefined,
    content: `
      <h2>How to Install Optizen</h2>
      <p>Currently, to use advanced features of Optizen PRO and Enterprise, we will need to manually install these features.</p>
      <p><strong>Installation Process:</strong></p>
      <ol>
        <li>Send a support request via our Contact form</li>
        <li>Include your .myshopify.com URL</li>
        <li>We will make a limited permission access request</li>
        <li>Once approved, we complete the installation</li>
      </ol>
      <p><em>Note: If you plan on only using the AI feature, the standard install from the Shopify app store will work out of the box.</em></p>
    `,
  },
  
  'optizen-settings': {
    wpSlug: 'optizen-settings',
    videoUrl: 'https://www.youtube.com/watch?v=08bitXxfUjc',
    content: `
      <h2>Optizen Settings</h2>
      <p>Configure your Optizen settings to customize how the app works with your Shopify store.</p>
      <p>This video covers all the available settings and how to optimize them for your specific needs.</p>
    `,
  },
  
  'adding-content-to-collection-pages': {
    wpSlug: 'adding-content-to-collection-pages',
    videoUrl: 'https://www.youtube.com/watch?v=ivc1ZrRNff8',
    content: `
      <h2>Adding Content to Collection Pages</h2>
      <p>Collection pages are important for SEO. Learn how to add rich, optimized content to your collection pages using Optizen.</p>
      <p>This guide shows you how to create engaging collection descriptions that improve search rankings and conversions.</p>
    `,
  },
  
  'why-optimize-tag-pages': {
    wpSlug: 'why-optimize-tag-pages',
    videoUrl: 'https://www.youtube.com/watch?v=FOKFvjRxhro',
    content: `
      <h2>Why Optimize Tag Pages?</h2>
      <p>Tag pages are often overlooked but can be powerful SEO assets. Learn why optimizing tag pages can drive significant organic traffic to your store.</p>
      <p>This video explains the SEO benefits of tag pages and how to leverage them effectively.</p>
    `,
  },
  
  'working-with-tag-pages': {
    wpSlug: 'working-with-tag-pages',
    videoUrl: 'https://www.youtube.com/watch?v=sMWp65S-V6k',
    content: `
      <h2>Working with Tag Pages</h2>
      <p>Learn how to create, manage, and optimize tag pages in Shopify using Optizen's powerful tag page tools.</p>
      <p>This guide covers best practices for tag page optimization and content creation.</p>
    `,
  },
  
  'creating-a-tag-page-sitemap': {
    wpSlug: 'creating-a-tag-page-sitemap',
    videoUrl: 'https://www.youtube.com/watch?v=ankfrEUf8WY',
    content: `
      <h2>Creating a Tag Page Sitemap</h2>
      <p>Help search engines discover your tag pages by creating a dedicated sitemap. This improves indexing and can boost your SEO performance.</p>
      <p>Learn how to generate and submit a tag page sitemap using Optizen.</p>
    `,
  },
  
  'using-the-sync-button': {
    wpSlug: 'using-the-sync-button',
    videoUrl: undefined,
    content: `
      <h2>Using the Sync Button</h2>
      <p>There may be times where you can't find the tag or collection you want when using the search function in Optizen. To keep our databases clean, new tags and collections need to be synced to the app.</p>
      
      <h3>How to Sync</h3>
      <p>There are two "Sync" buttons:</p>
      <ul>
        <li>One under the Collections tab</li>
        <li>One under the Tags tab</li>
      </ul>
      <p>Each button serves the same purpose. Once clicked, it will sync any new collections and tags to the app.</p>
      
      <p><strong>Steps:</strong></p>
      <ol>
        <li>Click the "Sync" button to sync new tags and collections</li>
        <li>Depending on the size of your store, it may take a few minutes</li>
        <li>Once complete, you'll be able to search for and edit your new tags and collections</li>
      </ol>
      
      <img src="https://optizenapp.com/wp-content/uploads/2023/08/Syn-button.png" alt="Sync button location" />
      <img src="https://optizenapp.com/wp-content/uploads/2023/10/sync-button-2-1024x309.png" alt="Sync button in action" />
    `,
  },
  
  'using-smart-tag-filters': {
    wpSlug: 'using-smart-tag-filters',
    videoUrl: 'https://www.youtube.com/watch?v=i9m7XJhTc-o',
    content: `
      <h2>Using Smart Tag Filters</h2>
      <p>Smart tag filters help you quickly find and manage specific tags in your store. Learn how to use advanced filtering to work more efficiently.</p>
      <p>This video demonstrates how to use smart filters to organize and optimize your tag pages.</p>
    `,
  },
  
  // Importing & Exporting
  'export-shopify-collections-backup-and-updates': {
    wpSlug: 'export-shopify-collections-backup-and-updates',
    videoUrl: 'https://www.youtube.com/watch?v=uxyKs9g-7Uk',
    content: `
      <h2>Exporting Shopify Collections</h2>
      <p>Export your collection data for backup, bulk editing, or migration purposes. Optizen makes it easy to export all your collection content to CSV.</p>
      <p>Learn how to export collections and what data is included in the export file.</p>
    `,
  },
  
  'importing-shopify-collections-via-csv': {
    wpSlug: 'importing-shopify-collections-via-csv',
    videoUrl: 'https://www.youtube.com/watch?v=r0aa77GZIlY',
    content: `
      <h2>Importing Collections via CSV</h2>
      <p>Bulk update your collections by importing a CSV file. This is perfect for large-scale content updates or migrating from another platform.</p>
      <p>This guide shows you the CSV format and how to import collection data into Shopify using Optizen.</p>
    `,
  },
  
  'exporting-shopify-tag-pages': {
    wpSlug: 'exporting-shopify-tag-pages',
    videoUrl: 'https://www.youtube.com/watch?v=yeljB4EJelY',
    content: `
      <h2>Exporting Tag Pages</h2>
      <p>Export your tag page content for backup or bulk editing. Optizen allows you to export all your tag page data to CSV format.</p>
      <p>Learn how to export tag pages and manage your tag content more efficiently.</p>
    `,
  },
  
  'import-shopify-tag-pages-via-csv': {
    wpSlug: 'import-shopify-tag-pages-via-csv',
    videoUrl: 'https://www.youtube.com/watch?v=ilH1kSv5P3U',
    content: `
      <h2>Importing Tag Pages via CSV</h2>
      <p>Bulk update your tag pages by importing a CSV file. This is ideal for large stores with many tag pages to optimize.</p>
      <p>This video demonstrates the CSV format and import process for tag pages.</p>
    `,
  },
  
  // Enterprise Features
  'why-upgrade-to-optizen-enterprise': {
    wpSlug: 'why-upgrade-to-optizen-enterprise',
    videoUrl: 'https://www.youtube.com/watch?v=2HPMBnPjNqk',
    content: `
      <h2>Why Upgrade to Optizen Enterprise?</h2>
      <p>Optizen Enterprise includes advanced features designed for large stores and agencies managing multiple Shopify stores.</p>
      <p>Learn about the exclusive Enterprise features and how they can help scale your SEO efforts.</p>
    `,
  },
  
  'implementing-variant-tagger-variant-image-thumbnail-matcher': {
    wpSlug: 'implementing-variant-tagger-variant-image-thumbnail-matcher',
    videoUrl: 'https://www.youtube.com/watch?v=5hRbyc4nx5c',
    content: `
      <h2>Variant Tagger & Image Matcher</h2>
      <p>The Variant Tagger and Image Matcher are powerful Enterprise features that help you automatically organize product variants and match variant images.</p>
      <p>This guide shows you how to implement and use these advanced features to improve your product pages.</p>
    `,
  },
  
  // Video Upsells App Documentation
  'what-is-optizen-video-upsell': {
    wpSlug: 'what-is-optizen-video-upsell',
    videoUrl: undefined,
    content: `
      <h2>What Is Optizen Video Upsell?</h2>
      
      <p>Optizen Video Upsell is a powerful Shopify app that leverages your own or AI-generated video content to showcase complementary products directly on your store's product pages. Instead of relying on static images or text, Optizen creates engaging video demonstrations that capture attention and drive additional purchases at the moment your customers are most ready to buy.</p>
      
      <p>Here's how it works: When a customer views a product page, Optizen intelligently displays a targeted video upsell featuring a related item—complete with an exclusive discount. The video plays in a beautiful modal overlay, highlighting the benefits and features of the complementary product in a compelling 15-30 second presentation. With just one click, customers can add the upsell to their cart as an individual item or bundled together with the current product, while the discount is automatically applied at checkout.</p>
      
      <h3>💰 Why It Increases Revenue</h3>
      
      <p>Video content converts 80% better than static images because it creates an emotional connection and demonstrates value instantly. By presenting relevant upsells at the perfect moment—when customers are already in a buying mindset—you dramatically increase Average Order Value (AOV). The combination of AI-powered personalization, strategic timing, and exclusive discounts creates urgency that drives immediate action.</p>
      
      <p>Most merchants see AOV increases of 20-35% within the first month, with some top performers achieving 50%+ gains. Because the upsells are contextual and the videos—whether your own or AI-generated—are professionally presented, customers perceive them as helpful recommendations rather than intrusive sales tactics, resulting in higher conversion rates and customer satisfaction.</p>
    `,
  },
  
  'getting-started-video-upsell': {
    wpSlug: 'getting-started-video-upsell',
    videoUrl: 'https://www.youtube.com/watch?v=01LGxp136jE',
    content: `
      <h2>Getting Started</h2>
      
      <p>Welcome to Optizen Video Upsell! This guide will help you create your first AI-powered video upsell campaign in minutes.</p>
      
      <h3>Quick Start (5 minutes)</h3>
      
      <ol>
        <li><strong>Create Campaign:</strong> Click "Create Campaign" in the sidebar</li>
        <li><strong>Select Product:</strong> Choose which product to upsell</li>
        <li><strong>Add Your Own Or Generate AI Video:</strong> Add your own YouTube or Vimeo video, or let our state of the art AI video generation do the heavy lifting for you</li>
        <li><strong>Set Discount:</strong> Add percentage or fixed amount discount</li>
        <li><strong>Launch:</strong> Activate your campaign and start converting!</li>
      </ol>
      
      <h3>📺 Video Tutorials</h3>
      
      <div class="video-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; margin: 2rem 0;">
        <div class="video-card">
          <h4>Getting Started - Using Your Own Videos</h4>
          <iframe width="100%" height="200" src="https://www.youtube.com/embed/01LGxp136jE" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        
        <div class="video-card">
          <h4>Getting Started - Creating A Video Using AI</h4>
          <iframe width="100%" height="200" src="https://www.youtube.com/embed/y9XuZfUDgeY" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        
        <div class="video-card">
          <h4>Creating A Campaign By Uploading A Video</h4>
          <iframe width="100%" height="200" src="https://www.youtube.com/embed/I2nZDMgbcm0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        
        <div class="video-card">
          <h4>Customizing The App Block For Styling</h4>
          <iframe width="100%" height="200" src="https://www.youtube.com/embed/Ui38OFwpEM4" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        
        <div class="video-card">
          <h4>Adding The Discount App Block</h4>
          <iframe width="100%" height="200" src="https://www.youtube.com/embed/bm3Zr53ZlDM" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
      </div>
      
      <h3>🚀 Coming Soon...</h3>
      
      <p>We're constantly expanding Optizen with new campaign types to help you maximize revenue at every stage of the customer journey:</p>
      
      <ul>
        <li>🛒 Pre-Purchase Checkout Video Upsell</li>
        <li>🛍️ Cart Video Upsell</li>
        <li>✅ Post Purchase Video Upsell</li>
        <li>🎉 Thank You Page Video Upsell</li>
        <li>🔄 Multiple Flow Video Upsell</li>
      </ul>
    `,
  },
  
  'video-best-practices': {
    wpSlug: 'video-best-practices',
    videoUrl: undefined,
    content: `
      <h2>Video Best Practices</h2>
      
      <h3>📹 Using Your Own Videos</h3>
      
      <p>Optizen supports embedding your existing YouTube or Vimeo videos directly into your campaigns. This is perfect if you already have professional product content or want to use videos you've created for other marketing channels.</p>
      
      <h4>Video Types That Work Best:</h4>
      <ul>
        <li><strong>Product Demos:</strong> Show your product in action and highlight key features</li>
        <li><strong>Ad Reels:</strong> Repurpose your existing social media or advertising video content</li>
        <li><strong>Product CTAs:</strong> Direct call-to-action videos encouraging customers to add the upsell</li>
      </ul>
      
      <h4>📋 Video Requirements:</h4>
      <ul>
        <li><strong>Platforms:</strong> YouTube, Vimeo, TikTok, or Uploaded files</li>
        <li><strong>Privacy:</strong> Videos must be set to Public (not unlisted or private) for hosted platforms</li>
        <li><strong>Dimensions:</strong> Use YouTube Shorts for vertical/portrait videos (9:16) or standard dimensions for landscape (16:9)</li>
        <li><strong>Length:</strong> Keep videos under 60 seconds for best engagement</li>
      </ul>
      
      <h3>🤖 AI Video Generation</h3>
      
      <p>Our state-of-the-art AI video generator creates professional product videos in minutes. Simply provide your product URL, and our system automatically extracts product information from the page to generate a compelling video presentation.</p>
      
      <h4>How It Works:</h4>
      <ol>
        <li><strong>Add Product URL:</strong> Paste your Shopify product page URL</li>
        <li><strong>Automatic Information Extraction:</strong> Our system reads your product title, description, and images</li>
        <li><strong>Custom Prompt (Optional):</strong> Add specific talking points or benefits to emphasize</li>
        <li><strong>Personalize:</strong> Choose voice accent, gender, and avatar/persona</li>
        <li><strong>Select Dimensions:</strong> Pick from 3 aspect ratios - 16:9 (landscape), 9:16 (portrait), or 1:1 (square)</li>
      </ol>
      
      <h4>✨ Customization Options:</h4>
      <ul>
        <li><strong>Voice Accent:</strong> Choose from 240+ professional AI voices in multiple languages and accents</li>
        <li><strong>Gender:</strong> Select male, female, or neutral voice options</li>
        <li><strong>Avatar/Persona:</strong> Pick from diverse AI presenters to match your brand</li>
        <li><strong>Aspect Ratios:</strong> 16:9 for desktop, 9:16 for mobile/shorts, 1:1 for universal use</li>
      </ul>
      
      <h4>💾 Video Library:</h4>
      <p>When you generate an AI video, you'll have the option to click "Save to Video Library" to add it to your library. Once saved, you can reuse videos across multiple campaigns without having to regenerate them, saving time and AI credits. Simply select a video from your library when creating a new campaign instead of generating a new one.</p>
      
      <h3>🎬 Creating High-Converting Videos</h3>
      
      <h4>✅ Do's</h4>
      <ul>
        <li>Focus on benefits, not just features</li>
        <li>Keep videos under 60 seconds for best engagement</li>
        <li>Use clear, enthusiastic voice tones</li>
        <li>Highlight the discount/special offer</li>
        <li>Include a clear call-to-action</li>
      </ul>
      
      <h4>❌ Don'ts</h4>
      <ul>
        <li>Don't make videos too long (over 90 seconds)</li>
        <li>Avoid technical jargon or complex explanations</li>
        <li>Don't use robotic or monotone voices</li>
        <li>Avoid cluttered or busy backgrounds</li>
      </ul>
      
      <h3>📱 Video Formats & Placement</h3>
      <ul>
        <li><strong>16:9 (Landscape):</strong> Best for desktop, product demos</li>
        <li><strong>9:16 (Portrait):</strong> Perfect for mobile, social media style</li>
        <li><strong>1:1 (Square):</strong> Universal format, works everywhere</li>
      </ul>
    `,
  },
  
  'analytics-and-optimization': {
    wpSlug: 'analytics-and-optimization',
    videoUrl: 'https://www.youtube.com/watch?v=VL-MBcpqvQ8',
    content: `
      <h2>Analytics & Optimization</h2>
      
      <h3>📊 Key Metrics to Track</h3>
      
      <ul>
        <li><strong>Impressions:</strong> How many times your upsell was shown</li>
        <li><strong>Views:</strong> How many customers watched your video</li>
        <li><strong>Conversions:</strong> How many customers purchased the upsell</li>
        <li><strong>Revenue:</strong> Total additional revenue generated</li>
        <li><strong>Conversion Rate:</strong> Views ÷ Conversions (aim for 15%+)</li>
      </ul>
      
      <h3>🎯 Optimization Tips</h3>
      
      <ul>
        <li><strong>A/B Test Videos:</strong> Try different scripts and voices</li>
        <li><strong>Adjust Targeting:</strong> Refine cart value thresholds</li>
        <li><strong>Optimize Discounts:</strong> Test different discount amounts</li>
        <li><strong>Monitor Performance:</strong> Check analytics weekly</li>
      </ul>
      
      <h3>📊 Video Tutorials</h3>
      
      <div class="video-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; margin: 2rem 0;">
        <div class="video-card">
          <h4>Analytics & Optimization Tutorial</h4>
          <iframe width="100%" height="200" src="https://www.youtube.com/embed/VL-MBcpqvQ8" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        
        <div class="video-card">
          <h4>Billing & AI Credits Tutorial</h4>
          <iframe width="100%" height="200" src="https://www.youtube.com/embed/f3_pawwfG6g" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
      </div>
    `,
  },
  
  'troubleshooting-video-upsell': {
    wpSlug: 'troubleshooting-video-upsell',
    videoUrl: undefined,
    content: `
      <h2>Troubleshooting</h2>
      
      <h3>🔧 Common Issues</h3>
      
      <h4>❓ Upsell not showing on storefront</h4>
      <ul>
        <li>Check if campaign is active (green toggle in dashboard)</li>
        <li>Verify targeting rules match customer's cart</li>
        <li>Ensure theme has the Optizen app block installed</li>
        <li>Clear browser cache and test in incognito mode</li>
      </ul>
      
      <h4>❓ Discount not applying</h4>
      <ul>
        <li>Verify discount code was created (check campaign details)</li>
        <li>Ensure product is eligible for the discount</li>
        <li>Check if discount has usage limits or expiration</li>
        <li>Test checkout process manually</li>
      </ul>
      
      <h4>❓ Video not generating</h4>
      <ul>
        <li>Check product has clear title and description</li>
        <li>Ensure product images are high quality</li>
        <li>Try regenerating with different voice/style</li>
        <li>Contact support if issue persists</li>
      </ul>
      
      <h3>💬 Need More Help?</h3>
      <p>If you're still experiencing issues, please <a href="/contact">contact our support team</a> with details about your problem, and we'll help you resolve it quickly.</p>
    `,
  },
};

/**
 * Get content for a specific doc page by WordPress slug
 */
export function getDocContent(wpSlug: string): DocContent | null {
  return docsContent[wpSlug] || null;
}

/**
 * Convert YouTube URL to embed URL
 */
export function getYouTubeEmbedUrl(videoUrl: string): string {
  const videoId = videoUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/)?.[1];
  if (!videoId) return videoUrl;
  return `https://www.youtube.com/embed/${videoId}`;
}

