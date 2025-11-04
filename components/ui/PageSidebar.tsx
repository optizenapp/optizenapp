"use client";

import Link from 'next/link';
import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface Page {
  id: number;
  slug: string;
  title: string;
  path: string;
  parent: number;
  children?: Page[];
}

interface PageSidebarProps {
  pages: Page[];
  currentPath: string;
  rootTitle?: string;
}

function PageItem({ page, currentPath, level = 0 }: { page: Page; currentPath: string; level?: number }) {
  const [isOpen, setIsOpen] = useState(true);
  const hasChildren = page.children && page.children.length > 0;
  const isActive = currentPath === page.path;

  return (
    <div className="space-y-1">
      <div className={`flex items-center gap-2 ${level > 0 ? 'ml-4' : ''}`}>
        {hasChildren && (
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
            aria-label={isOpen ? 'Collapse' : 'Expand'}
          >
            {isOpen ? (
              <ChevronDown size={16} className="text-gray-600" />
            ) : (
              <ChevronRight size={16} className="text-gray-600" />
            )}
          </button>
        )}
        <Link
          href={`/${page.path}`}
          className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            hasChildren ? '' : 'ml-7'
          } ${
            isActive
              ? 'bg-optizen-blue-100 text-optizen-blue-700'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          {page.title}
        </Link>
      </div>
      
      {hasChildren && isOpen && (
        <div className="space-y-1">
          {page.children!.map(child => (
            <PageItem key={child.id} page={child} currentPath={currentPath} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function PageSidebar({ pages, currentPath, rootTitle = "Navigation" }: PageSidebarProps) {
  if (!pages || pages.length === 0) {
    return null;
  }

  return (
    <aside className="bg-white border border-gray-200 rounded-xl p-6 sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto">
      <h3 className="text-lg font-bold text-gray-900 mb-4">{rootTitle}</h3>
      <nav className="space-y-1">
        {pages.map(page => (
          <PageItem key={page.id} page={page} currentPath={currentPath} />
        ))}
      </nav>
    </aside>
  );
}

