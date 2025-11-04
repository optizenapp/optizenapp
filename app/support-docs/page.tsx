import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { appInfo, getDocsForApp, type AppType } from '@/lib/docs-mapping';
import { BookOpen, ArrowRight, Search } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Support Documentation | OptizenApp',
  description: 'Get help with OptizenAI SEO and Video Upsells apps. Browse documentation, guides, and tutorials.',
  openGraph: {
    title: 'Support Documentation | OptizenApp',
    description: 'Get help with OptizenAI SEO and Video Upsells apps.',
    type: 'website',
  },
};

export default function SupportDocsPage() {
  const apps: AppType[] = ['optizenai', 'video-upsells'];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-optizen-blue-50 via-white to-optizen-green-50 border-b border-gray-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <BookOpen size={40} className="text-optizen-blue-500" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Support Documentation
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get help with our Shopify apps. Browse guides, tutorials, and documentation.
            </p>

            {/* Search Bar - Placeholder for future implementation */}
            <div className="mt-8 max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search documentation..."
                  className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-optizen-blue-500 focus:outline-none text-gray-900 placeholder-gray-500"
                  disabled
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Search coming soon
              </p>
            </div>
          </div>
        </div>

        {/* Documentation Apps */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {apps.map((app) => {
              const info = appInfo[app];
              const docs = getDocsForApp(app);

              return (
                <div
                  key={app}
                  className="bg-white rounded-2xl border-2 border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md transition-all overflow-hidden"
                >
                  {/* App Header */}
                  <div className={`bg-gradient-to-br from-${info.color}-50 to-${info.color}-100 p-8 border-b border-${info.color}-200`}>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-4xl">{info.icon}</span>
                      <h2 className="text-2xl font-bold text-gray-900">{info.name}</h2>
                    </div>
                    <p className="text-gray-700">
                      {app === 'optizenai' 
                        ? 'Documentation for AI-powered SEO optimization and meta tag management.'
                        : 'Documentation for video upsells, bundles, and cart optimization.'}
                    </p>
                  </div>

                  {/* Documentation List */}
                  <div className="p-8">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                      Documentation
                    </h3>
                    <ul className="space-y-2 mb-6">
                      {docs.slice(0, 5).map((doc) => (
                        <li key={doc.nextSlug}>
                          <Link
                            href={`/support-docs/${app}/${doc.nextSlug}`}
                            className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors group"
                          >
                            <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                              {doc.title || doc.nextSlug.split('/').pop()?.replace(/-/g, ' ')}
                            </span>
                            <ArrowRight size={16} className="text-gray-400 group-hover:text-gray-600" />
                          </Link>
                        </li>
                      ))}
                    </ul>

                    {/* View All Button */}
                    <Link
                      href={`/support-docs/${app}`}
                      className={`block w-full px-6 py-3 rounded-xl font-semibold text-center transition-all bg-gradient-to-r from-${info.color}-500 to-${info.color}-600 text-white hover:shadow-lg`}
                    >
                      View All {info.name} Docs
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Need More Help */}
          <div className="mt-16 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 md:p-12 text-center text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Can't find what you're looking for?
            </h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Our support team is here to help. Get in touch and we'll respond as soon as possible.
            </p>
            <a
              href="mailto:support@optizenapp.com"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
            >
              Contact Support
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

