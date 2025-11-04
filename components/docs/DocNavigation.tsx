import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { type AppType, type DocMapping } from '@/lib/docs-mapping';

interface DocNavigationProps {
  currentApp: AppType;
  docs: DocMapping[];
  currentSlug: string[];
}

export default function DocNavigation({ currentApp, docs, currentSlug }: DocNavigationProps) {
  const currentPath = currentSlug.join('/');
  const currentIndex = docs.findIndex((doc) => doc.nextSlug === currentPath);

  if (currentIndex === -1) {
    return null;
  }

  const prevDoc = currentIndex > 0 ? docs[currentIndex - 1] : null;
  const nextDoc = currentIndex < docs.length - 1 ? docs[currentIndex + 1] : null;

  if (!prevDoc && !nextDoc) {
    return null;
  }

  return (
    <div className="mt-12 pt-8 border-t border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Previous Page */}
        {prevDoc ? (
          <Link
            href={`/support-docs/${currentApp}/${prevDoc.nextSlug}`}
            className="group flex items-center gap-4 p-6 bg-white border-2 border-gray-200 rounded-xl hover:border-optizen-blue-300 hover:shadow-md transition-all"
          >
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 group-hover:bg-optizen-blue-100 flex items-center justify-center transition-colors">
              <ArrowLeft size={20} className="text-gray-600 group-hover:text-optizen-blue-600" />
            </div>
            <div className="flex-1 text-left">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                Previous
              </div>
              <div className="text-sm font-bold text-gray-900 group-hover:text-optizen-blue-700 transition-colors">
                {prevDoc.title || prevDoc.nextSlug.split('/').pop()?.replace(/-/g, ' ')}
              </div>
            </div>
          </Link>
        ) : (
          <div></div>
        )}

        {/* Next Page */}
        {nextDoc && (
          <Link
            href={`/support-docs/${currentApp}/${nextDoc.nextSlug}`}
            className="group flex items-center gap-4 p-6 bg-white border-2 border-gray-200 rounded-xl hover:border-optizen-green-300 hover:shadow-md transition-all md:ml-auto"
          >
            <div className="flex-1 text-right">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                Next
              </div>
              <div className="text-sm font-bold text-gray-900 group-hover:text-optizen-green-700 transition-colors">
                {nextDoc.title || nextDoc.nextSlug.split('/').pop()?.replace(/-/g, ' ')}
              </div>
            </div>
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 group-hover:bg-optizen-green-100 flex items-center justify-center transition-colors">
              <ArrowRight size={20} className="text-gray-600 group-hover:text-optizen-green-600" />
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}

