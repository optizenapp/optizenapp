import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPageByWpSlug } from '@/lib/wordpress';
import { 
  getWpSlugFromRoute, 
  getDocsForApp, 
  isValidApp, 
  appInfo,
  docsMapping,
  type AppType 
} from '@/lib/docs-mapping';
import { formatDate, stripHtml } from '@/lib/blog-utils';
import { generateSchemaOrg } from '@/lib/schema-generator';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import DocsSidebar from '@/components/docs/DocsSidebar';
import TableOfContents from '@/components/docs/TableOfContents';
import DocNavigation from '@/components/docs/DocNavigation';
import { BookOpen, Clock } from 'lucide-react';

// Helper function to decode HTML entities
function decodeHtmlEntities(text: string): string {
  const entities: { [key: string]: string } = {
    '&#038;': '&',
    '&amp;': '&',
    '&#8211;': '\u2013',
    '&#8212;': '\u2014',
    '&#8216;': '\u2018',
    '&#8217;': '\u2019',
    '&#8220;': '\u201C',
    '&#8221;': '\u201D',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#039;': "'",
  };
  
  return text.replace(/&#?\w+;/g, match => entities[match] || match);
}

// Helper function to replace WordPress staging links with production links
function replaceInternalLinks(content: string): string {
  const stagingDomain = 'https://optizenapp-staging.p3ue6i.ap-southeast-2.wpstaqhosting.com';
  const productionDomain = 'https://optizenapp.com';
  return content.replace(new RegExp(stagingDomain, 'g'), productionDomain);
}

// Helper function to fix lazy-loaded iframes (convert data-src to src)
function fixLazyLoadedIframes(content: string): string {
  // Replace data-src with src for iframes (WordPress lazy loading)
  return content.replace(
    /<iframe([^>]*?)data-src="([^"]*)"([^>]*?)>/gi,
    '<iframe$1src="$2"$3>'
  );
}

interface PageProps {
  params: Promise<{
    app: string;
    slug: string[];
  }>;
}

// Generate static params for all documentation pages
export async function generateStaticParams() {
  const params: { app: string; slug: string[] }[] = [];

  // Generate params for each app
  (['optizenai', 'video-upsells'] as AppType[]).forEach((app) => {
    const docs = getDocsForApp(app);
    docs.forEach((doc) => {
      params.push({
        app,
        slug: doc.nextSlug.split('/'),
      });
    });
  });

  return params;
}

// Prevent on-demand generation - only serve pre-rendered pages
export const dynamicParams = false;

// Generate metadata for each documentation page
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const { app, slug } = resolvedParams;

  if (!isValidApp(app)) {
    return { title: 'Not Found' };
  }

  const wpSlug = getWpSlugFromRoute(app, slug);
  if (!wpSlug) {
    return { title: 'Documentation Not Found' };
  }

  const page = await getPageByWpSlug(wpSlug);
  if (!page) {
    return { title: 'Documentation Not Found' };
  }

  const seoMeta = (page as any).seoMeta || {};
  const title = decodeHtmlEntities(seoMeta.seoTitle || page.title.rendered);
  const description = decodeHtmlEntities(
    seoMeta.seoDescription || page.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 160)
  );
  const appName = appInfo[app].name;

  return {
    title: `${title} | ${appName} Documentation`,
    description,
    openGraph: {
      title: `${title} | ${appName} Documentation`,
      description,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${appName} Documentation`,
      description,
    },
  };
}

export default async function DocPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { app, slug } = resolvedParams;

  // Validate app
  if (!isValidApp(app)) {
    notFound();
  }

  // Get WordPress slug from mapping
  const wpSlug = getWpSlugFromRoute(app, slug);
  if (!wpSlug) {
    notFound();
  }

  // Fetch page from WordPress
  const page = await getPageByWpSlug(wpSlug);
  if (!page) {
    notFound();
  }

  // Get docs for sidebar
  const docs = getDocsForApp(app);
  const currentAppInfo = appInfo[app];

  // Build breadcrumbs
  const breadcrumbs = [
    { name: 'Home', url: 'https://optizenapp.com' },
    { name: 'Support Docs', url: 'https://optizenapp.com/support-docs' },
    { name: currentAppInfo.name, url: `https://optizenapp.com/support-docs/${app}` },
    { name: decodeHtmlEntities(stripHtml(page.title.rendered)), url: `https://optizenapp.com/support-docs/${app}/${slug.join('/')}` },
  ];

  // LLM-Powered Schema.org Generation for Documentation
  const schema = await generateSchemaOrg({
    url: `https://optizenapp.com/support-docs/${app}/${slug.join('/')}`,
    title: decodeHtmlEntities(stripHtml(page.title.rendered)),
    content: page.content.rendered,
    excerpt: stripHtml(page.excerpt.rendered),
    datePublished: page.date,
    dateModified: page.modified,
    category: `${currentAppInfo.name} Documentation`,
    breadcrumbs,
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
      
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
      
      <main className="flex-1 pt-16">
        {/* Breadcrumbs */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex items-center space-x-2 text-sm">
              <Link href="/" className="text-gray-500 hover:text-optizen-blue-500 transition-colors">
                Home
              </Link>
              <span className="text-gray-400">/</span>
              <Link href="/support-docs" className="text-gray-500 hover:text-optizen-blue-500 transition-colors">
                Support Docs
              </Link>
              <span className="text-gray-400">/</span>
              <Link 
                href={`/support-docs/${app}`} 
                className="text-gray-500 hover:text-optizen-blue-500 transition-colors"
              >
                {currentAppInfo.name}
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">
                {decodeHtmlEntities(page.title.rendered)}
              </span>
            </nav>
          </div>
        </div>

        {/* Documentation Header */}
        <div className={`bg-gradient-to-br from-${currentAppInfo.color}-50 to-white border-b border-${currentAppInfo.color}-100`}>
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">{currentAppInfo.icon}</span>
              <span className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
                {currentAppInfo.name} Documentation
              </span>
            </div>
          </div>
        </div>

        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 xl:grid-cols-6 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <DocsSidebar currentApp={app} docs={docs} currentSlug={slug} />
            </div>

            {/* Main Content */}
            <article className="lg:col-span-4 xl:col-span-4">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 lg:p-12">
                {/* Page Meta */}
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-6 pb-6 border-b border-gray-200">
                  <div className="flex items-center gap-1">
                    <Clock size={16} />
                    <span>Updated {formatDate(page.modified)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen size={16} />
                    <span>Documentation</span>
                  </div>
                </div>

                {/* Page Content - WordPress content includes the H1 title */}
                <div 
                  className="prose prose-lg max-w-none
                    prose-headings:!text-gray-900 prose-headings:font-bold
                    prose-h1:text-4xl prose-h1:mb-6 prose-h1:leading-tight
                    prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:scroll-mt-24
                    prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-h3:scroll-mt-24
                    prose-p:!text-gray-900 prose-p:leading-relaxed
                    prose-a:!text-optizen-blue-600 prose-a:!no-underline hover:prose-a:!underline prose-a:font-bold
                    prose-strong:!text-gray-900 prose-strong:font-semibold
                    prose-ul:!text-gray-900 prose-ol:!text-gray-900
                    prose-li:!text-gray-900 prose-li:my-1
                    prose-blockquote:!text-gray-800 prose-blockquote:border-l-optizen-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:py-1 prose-blockquote:px-6 prose-blockquote:rounded-r-lg
                    prose-code:!text-optizen-blue-600 prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:font-mono
                    prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-xl prose-pre:shadow-lg
                    prose-table:!text-gray-900 prose-table:border-collapse
                    prose-th:!text-gray-900 prose-th:bg-gray-100 prose-th:font-semibold prose-th:p-3 prose-th:border prose-th:border-gray-300
                    prose-td:!text-gray-900 prose-td:p-3 prose-td:border prose-td:border-gray-300
                    prose-img:rounded-xl prose-img:shadow-lg prose-img:border prose-img:border-gray-200
                    [&_*]:!text-gray-900"
                  dangerouslySetInnerHTML={{ __html: fixLazyLoadedIframes(replaceInternalLinks(page.content.rendered)) }}
                />

                {/* Doc Navigation */}
                <DocNavigation currentApp={app} docs={docs} currentSlug={slug} />
              </div>
            </article>

            {/* Table of Contents */}
            <div className="xl:col-span-1 hidden xl:block">
              <TableOfContents content={page.content.rendered} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
    </>
  );
}

