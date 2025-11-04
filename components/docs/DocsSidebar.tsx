"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FileText, ChevronRight } from 'lucide-react';
import { appInfo, type AppType, type DocMapping } from '@/lib/docs-mapping';

interface DocsSidebarProps {
  currentApp: AppType;
  docs: DocMapping[];
  currentSlug: string[];
}

export default function DocsSidebar({ currentApp, docs, currentSlug }: DocsSidebarProps) {
  const pathname = usePathname();
  const otherApp: AppType = currentApp === 'optizenai' ? 'video-upsells' : 'optizenai';
  const currentInfo = appInfo[currentApp];
  const otherInfo = appInfo[otherApp];

  return (
    <aside className="lg:col-span-1">
      <div className="sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto">
        {/* App Switcher */}
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 border-2 border-gray-200 mb-6 shadow-sm">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Documentation
          </div>
          
          {/* Current App */}
          <div className={`mb-3 p-3 rounded-lg bg-gradient-to-br from-${currentInfo.color}-50 to-${currentInfo.color}-100 border-2 border-${currentInfo.color}-200`}>
            <div className="flex items-center gap-2">
              <span className="text-2xl">{currentInfo.icon}</span>
              <div>
                <div className="text-sm font-bold text-gray-900">{currentInfo.name}</div>
                <div className="text-xs text-gray-600">Current</div>
              </div>
            </div>
          </div>

          {/* Switch to Other App */}
          <Link
            href={`/support-docs/${otherApp}`}
            className="block p-3 rounded-lg border-2 border-gray-200 hover:border-gray-300 transition-all hover:shadow-sm"
          >
            <div className="flex items-center gap-2">
              <span className="text-2xl">{otherInfo.icon}</span>
              <div className="flex-1">
                <div className="text-sm font-semibold text-gray-900">{otherInfo.name}</div>
                <div className="text-xs text-gray-600">View docs</div>
              </div>
              <ChevronRight size={16} className="text-gray-400" />
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
            {currentInfo.name} Docs
          </h3>
          <ul className="space-y-1">
            {docs.map((doc) => {
              const isActive = `/${doc.nextSlug}` === `/${currentSlug.join('/')}`;
              const href = `/support-docs/${currentApp}/${doc.nextSlug}`;

              return (
                <li key={doc.nextSlug}>
                  <Link
                    href={href}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? `bg-${currentInfo.color}-100 text-${currentInfo.color}-700 shadow-sm`
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <FileText size={16} />
                    {doc.title || doc.nextSlug.split('/').pop()?.replace(/-/g, ' ')}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Help Card */}
        <div className="mt-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-700 text-white">
          <h4 className="text-sm font-bold mb-2">Need Help?</h4>
          <p className="text-xs text-gray-300 mb-4">
            Can't find what you're looking for?
          </p>
          <a
            href="mailto:support@optizenapp.com"
            className="inline-flex items-center justify-center px-4 py-2 bg-white text-gray-900 rounded-lg text-sm font-semibold hover:bg-gray-100 transition-colors w-full"
          >
            Contact Support
          </a>
        </div>
      </div>
    </aside>
  );
}

