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

