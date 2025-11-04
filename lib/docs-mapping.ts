/**
 * Documentation URL Mapping Configuration
 * 
 * Maps WordPress support-docs pages to the new Next.js structure:
 * /support-docs/[app]/[slug] → WordPress page with slug
 * 
 * This allows you to keep editing in WordPress while having a better URL structure
 */

export type AppType = 'optizenai' | 'video-upsells';

export interface DocMapping {
  wpSlug: string;           // WordPress page slug (e.g., 'getting-started')
  nextSlug: string;         // Next.js URL slug (e.g., 'getting-started')
  app: AppType;             // Which app this doc belongs to
  title?: string;           // Optional override title
  order?: number;           // Optional order in sidebar
  parent?: string;          // Optional parent slug for nested docs
}

/**
 * Documentation mapping
 * 
 * Add WordPress support-docs page slugs here and assign them to an app.
 * The system will automatically fetch the content from WordPress.
 */
export const docsMapping: DocMapping[] = [
  // OptizenAI SEO App Documentation - All Plans
  {
    wpSlug: 'introduction-to-optizen',
    nextSlug: 'introduction',
    app: 'optizenai',
    title: 'Introduction to Optizen',
    order: 1,
  },
  {
    wpSlug: 'existing-users-new-ai-plan-options-26-06-2024',
    nextSlug: 'new-ai-plan-options',
    app: 'optizenai',
    title: 'New AI Plan Options',
    order: 2,
  },
  {
    wpSlug: 'new-users-getting-started-with-ai-features',
    nextSlug: 'getting-started-ai',
    app: 'optizenai',
    title: 'Getting Started with AI Features',
    order: 3,
  },
  {
    wpSlug: 'creating-saving-prompt-templates',
    nextSlug: 'prompt-templates',
    app: 'optizenai',
    title: 'Creating & Saving Prompt Templates',
    order: 4,
  },
  {
    wpSlug: 'updating-products-with-optizen-ai',
    nextSlug: 'updating-products',
    app: 'optizenai',
    title: 'Updating Products with AI',
    order: 5,
  },
  {
    wpSlug: 'updating-collections-tags-pages-with-ai',
    nextSlug: 'updating-collections-tags',
    app: 'optizenai',
    title: 'Updating Collections & Tags with AI',
    order: 6,
  },
  {
    wpSlug: 'updating-image-alt-text-with-optizenai',
    nextSlug: 'updating-image-alt-text',
    app: 'optizenai',
    title: 'Updating Image Alt Text',
    order: 7,
  },
  
  // OptizenAI SEO App - Pro & Enterprise Features
  {
    wpSlug: 'how-to-install-optizen',
    nextSlug: 'installation',
    app: 'optizenai',
    title: 'How to Install Optizen',
    order: 8,
  },
  {
    wpSlug: 'optizen-settings',
    nextSlug: 'settings',
    app: 'optizenai',
    title: 'Optizen Settings',
    order: 9,
  },
  {
    wpSlug: 'adding-content-to-collection-pages',
    nextSlug: 'collection-pages',
    app: 'optizenai',
    title: 'Adding Content to Collection Pages',
    order: 10,
  },
  {
    wpSlug: 'why-optimize-tag-pages',
    nextSlug: 'why-optimize-tag-pages',
    app: 'optizenai',
    title: 'Why Optimize Tag Pages?',
    order: 11,
  },
  {
    wpSlug: 'working-with-tag-pages',
    nextSlug: 'working-with-tag-pages',
    app: 'optizenai',
    title: 'Working with Tag Pages',
    order: 12,
  },
  {
    wpSlug: 'creating-a-tag-page-sitemap-xml',
    nextSlug: 'tag-page-sitemap',
    app: 'optizenai',
    title: 'Creating a Tag Page Sitemap',
    order: 13,
  },
  {
    wpSlug: 'using-the-sync-button',
    nextSlug: 'sync-button',
    app: 'optizenai',
    title: 'Using the Sync Button',
    order: 14,
  },
  {
    wpSlug: 'using-the-smart-tag-filters-feature',
    nextSlug: 'smart-tag-filters',
    app: 'optizenai',
    title: 'Using Smart Tag Filters',
    order: 15,
  },
  {
    wpSlug: 'exporting-shopify-collections',
    nextSlug: 'exporting-collections',
    app: 'optizenai',
    title: 'Exporting Collections',
    order: 16,
  },
  {
    wpSlug: 'importing-shopify-collections',
    nextSlug: 'importing-collections',
    app: 'optizenai',
    title: 'Importing Collections',
    order: 17,
  },
  {
    wpSlug: 'exporting-shopify-tag-pages',
    nextSlug: 'exporting-tag-pages',
    app: 'optizenai',
    title: 'Exporting Tag Pages',
    order: 18,
  },
  {
    wpSlug: 'importing-shopify-tag-pages',
    nextSlug: 'importing-tag-pages',
    app: 'optizenai',
    title: 'Importing Tag Pages',
    order: 19,
  },
  {
    wpSlug: 'why-upgrade-to-optizen-enterprise',
    nextSlug: 'upgrade-to-enterprise',
    app: 'optizenai',
    title: 'Why Upgrade to Enterprise?',
    order: 20,
  },
  {
    wpSlug: 'variant-tagger-variant-image-thumbnail-matcher',
    nextSlug: 'variant-tagger',
    app: 'optizenai',
    title: 'Variant Tagger & Image Matcher',
    order: 21,
  },
  
  // Video Upsells App Documentation
  // Add your video upsells docs here - using placeholders for now
  {
    wpSlug: 'video-upsell-getting-started',
    nextSlug: 'getting-started',
    app: 'video-upsells',
    title: 'Getting Started',
    order: 1,
  },
  {
    wpSlug: 'video-upsell-installation',
    nextSlug: 'installation',
    app: 'video-upsells',
    title: 'Installation Guide',
    order: 2,
  },
  {
    wpSlug: 'video-upsell-creating-campaigns',
    nextSlug: 'creating-campaigns',
    app: 'video-upsells',
    title: 'Creating Video Campaigns',
    order: 3,
  },
];

/**
 * Get WordPress slug from Next.js route params
 */
export function getWpSlugFromRoute(app: AppType, slug: string[]): string | null {
  const nextSlug = slug.join('/');
  const mapping = docsMapping.find(
    (m) => m.app === app && m.nextSlug === nextSlug
  );
  return mapping?.wpSlug || null;
}

/**
 * Get all docs for a specific app
 */
export function getDocsForApp(app: AppType): DocMapping[] {
  return docsMapping
    .filter((m) => m.app === app)
    .sort((a, b) => (a.order || 999) - (b.order || 999));
}

/**
 * Get app info
 */
export const appInfo: Record<AppType, { name: string; color: string; icon: string }> = {
  'optizenai': {
    name: 'OptizenAI SEO',
    color: 'optizen-green',
    icon: '🔍',
  },
  'video-upsells': {
    name: 'Video Upsells',
    color: 'optizen-blue',
    icon: '🎥',
  },
};

/**
 * Check if app type is valid
 */
export function isValidApp(app: string): app is AppType {
  return app === 'optizenai' || app === 'video-upsells';
}

