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
  // OptizenAI SEO App Documentation
  // Example entries - replace with your actual WordPress page slugs
  {
    wpSlug: 'getting-started',
    nextSlug: 'getting-started',
    app: 'optizenai',
    order: 1,
  },
  {
    wpSlug: 'installation',
    nextSlug: 'installation',
    app: 'optizenai',
    order: 2,
  },
  {
    wpSlug: 'seo-features',
    nextSlug: 'seo-features',
    app: 'optizenai',
    order: 3,
  },
  
  // Video Upsells App Documentation
  // Add your video upsells docs here
  {
    wpSlug: 'video-getting-started',
    nextSlug: 'getting-started',
    app: 'video-upsells',
    order: 1,
  },
  {
    wpSlug: 'video-installation',
    nextSlug: 'installation',
    app: 'video-upsells',
    order: 2,
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

