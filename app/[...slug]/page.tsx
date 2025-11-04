import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPageByPath, getAllPagePaths, getPages, buildPageHierarchy, type WordPressPage, type PageHierarchy } from '@/lib/wordpress';
import { formatDate, stripHtml } from '@/lib/blog-utils';
import { generateSchemaOrg } from '@/lib/schema-generator';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PageSidebar from '@/components/ui/PageSidebar';
import FloatingCTA from '@/components/ui/FloatingCTA';

// Helper function to decode HTML entities
function decodeHtmlEntities(text: string): string {
  const entities: { [key: string]: string } = {
    '&#038;': '&',
    '&amp;': '&',
    '&#8211;': '\u2013', // en dash
    '&#8212;': '\u2014', // em dash
    '&#8216;': '\u2018', // left single quote
    '&#8217;': '\u2019', // right single quote
    '&#8220;': '\u201C', // left double quote
    '&#8221;': '\u201D', // right double quote
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#039;': "'",
  };
  
  return text.replace(/&#?\w+;/g, match => entities[match] || match);
}

// Helper function to replace WordPress staging links with production links
function replaceInternalLinks(content: string): string {
  // Replace staging domain with production domain (or relative URLs)
  const stagingDomain = 'https://optizenapp-staging.p3ue6i.ap-southeast-2.wpstaqhosting.com';
  const productionDomain = 'https://optizenapp.com';
  
  return content.replace(new RegExp(stagingDomain, 'g'), productionDomain);
}

interface PageProps {
  params: Promise<{
    slug: string[];
  }>;
}

// Generate static params for all pages
export async function generateStaticParams() {
  const paths = await getAllPagePaths();
  
  return paths.map(path => ({
    slug: path.split('/'),
  }));
}

// Generate metadata for each page
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const path = resolvedParams.slug.join('/');
  const page = await getPageByPath(path);

  if (!page) {
    return {
      title: 'Page Not Found',
    };
  }

  const seoMeta = (page as any).seoMeta || {};
  const title = decodeHtmlEntities(seoMeta.seoTitle || page.title.rendered);
  const description = decodeHtmlEntities(seoMeta.seoDescription || page.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 160));

  return {
    title: `${title} | OptizenApp`,
    description,
    openGraph: {
      title: `${title} | OptizenApp`,
      description,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | OptizenApp`,
      description,
    },
  };
}

// Helper to build breadcrumb path
function buildBreadcrumbs(path: string): { label: string; href: string }[] {
  const segments = path.split('/');
  const breadcrumbs = [{ label: 'Home', href: '/' }];
  
  let currentPath = '';
  segments.forEach((segment, index) => {
    currentPath += (index === 0 ? '' : '/') + segment;
    breadcrumbs.push({
      label: segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' '),
      href: `/${currentPath}`,
    });
  });
  
  return breadcrumbs;
}

// Helper to build sidebar pages with full paths
function buildSidebarPages(hierarchy: PageHierarchy[], allPages: WordPressPage[], basePath: string = ''): any[] {
  return hierarchy.map(item => {
    const segments: string[] = [item.page.slug];
    let currentPage = item.page;
    
    // Walk up the parent chain
    while (currentPage.parent !== 0) {
      const parent = allPages.find(p => p.id === currentPage.parent);
      if (!parent) break;
      segments.unshift(parent.slug);
      currentPage = parent;
    }
    
    const fullPath = segments.join('/');
    
    return {
      id: item.page.id,
      slug: item.page.slug,
      title: decodeHtmlEntities(item.page.title.rendered),
      path: fullPath,
      parent: item.page.parent,
      children: item.children.length > 0 ? buildSidebarPages(item.children, allPages) : [],
    };
  });
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const path = resolvedParams.slug.join('/');
  const page = await getPageByPath(path);

  if (!page) {
    notFound();
  }

  // Get all pages for sidebar
  const { pages: allPages } = await getPages({ per_page: 100 });
  
  // Find root parent for this page
  let rootParent = page;
  while (rootParent.parent !== 0) {
    const parent = allPages.find(p => p.id === rootParent.parent);
    if (!parent) break;
    rootParent = parent;
  }
  
  // Build hierarchy starting from root
  const hierarchy = buildPageHierarchy(allPages, rootParent.id);
  
  // Add root parent itself if it has children
  const sidebarHierarchy = rootParent.id === page.id 
    ? hierarchy 
    : [{ page: rootParent, children: hierarchy }];
  
  const sidebarPages = buildSidebarPages(sidebarHierarchy, allPages);
  const breadcrumbs = buildBreadcrumbs(path);

  // Get featured image
  const featuredImage = page._embedded?.['wp:featuredmedia']?.[0];

  // LLM-Powered Schema.org Generation
  const schema = await generateSchemaOrg({
    url: `https://optizenapp.com/${path}`,
    title: decodeHtmlEntities(stripHtml(page.title.rendered)),
    content: page.content.rendered,
    excerpt: stripHtml(page.excerpt.rendered),
    datePublished: page.date,
    dateModified: page.modified,
    category: rootParent.title.rendered,
    featuredImage: featuredImage && featuredImage.media_details ? {
      url: featuredImage.source_url,
      width: featuredImage.media_details.width,
      height: featuredImage.media_details.height,
      alt: featuredImage.alt_text,
    } : undefined,
    breadcrumbs: breadcrumbs.map(b => ({ name: b.label, url: b.href })),
    siteInfo: {
      name: 'OptizenApp',
      url: 'https://optizenapp.com',
      logoUrl: 'https://optizenapp.com/optizen-logo.png',
    },
  });

  return (
    <>
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
      
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <FloatingCTA />
      
      <main className="flex-1 pt-16">
        {/* Breadcrumbs */}
        <div className="bg-gray-50 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex items-center space-x-2 text-sm">
              {breadcrumbs.map((crumb, index) => (
                <div key={crumb.href} className="flex items-center">
                  {index > 0 && <span className="mx-2 text-gray-400">/</span>}
                  {index === breadcrumbs.length - 1 ? (
                    <span className="text-gray-900 font-medium">{crumb.label}</span>
                  ) : (
                    <Link href={crumb.href} className="text-gray-500 hover:text-optizen-blue-500 transition-colors">
                      {crumb.label}
                    </Link>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            {sidebarPages.length > 0 && (
              <div className="lg:col-span-1">
                <PageSidebar 
                  pages={sidebarPages} 
                  currentPath={path}
                  rootTitle={decodeHtmlEntities(rootParent.title.rendered)}
                />
              </div>
            )}

            {/* Main Content */}
            <article className={sidebarPages.length > 0 ? 'lg:col-span-3' : 'lg:col-span-4'}>
              {/* Featured Image */}
              {featuredImage && featuredImage.media_details && (
                <div className="mb-8 rounded-2xl overflow-hidden">
                  <Image
                    src={featuredImage.source_url}
                    alt={featuredImage.alt_text || page.title.rendered}
                    width={featuredImage.media_details.width}
                    height={featuredImage.media_details.height}
                    className="w-full h-auto"
                    priority
                  />
                </div>
              )}

              {/* Page Meta - WordPress content has its own H1, so we don't add another */}
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-8 pb-8 border-b border-gray-200">
                <time dateTime={page.date}>
                  Updated {formatDate(page.modified)}
                </time>
              </div>

              {/* Page Content - WordPress content includes the H1 title */}
              <div 
                className="prose prose-lg max-w-none
                  prose-headings:!text-gray-900 prose-headings:font-bold
                  prose-p:!text-gray-900 prose-p:leading-relaxed
                  prose-a:!text-optizen-blue-600 prose-a:!no-underline hover:prose-a:!underline prose-a:font-bold
                  prose-strong:!text-gray-900 prose-strong:font-semibold
                  prose-ul:!text-gray-900 prose-ol:!text-gray-900
                  prose-li:!text-gray-900
                  prose-blockquote:!text-gray-800 prose-blockquote:border-l-optizen-blue-500
                  prose-code:!text-optizen-blue-600 prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                  prose-pre:bg-gray-900 prose-pre:text-gray-100
                  prose-table:!text-gray-900
                  prose-th:!text-gray-900
                  prose-td:!text-gray-900
                  [&_*]:!text-gray-900"
                dangerouslySetInnerHTML={{ __html: replaceInternalLinks(page.content.rendered) }}
              />
            </article>
          </div>
        </div>
      </main>

      <Footer />
    </div>
    </>
  );
}

