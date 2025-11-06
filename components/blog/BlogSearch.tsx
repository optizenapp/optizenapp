"use client";

import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import Link from 'next/link';
import { stripHtml, truncateText } from '@/lib/blog-utils';

interface SearchResult {
  id: number;
  title: string;
  excerpt: string;
  slug: string;
  category: string;
  categorySlug: string;
}

interface BlogSearchProps {
  variant?: 'default' | 'sidebar';
}

export default function BlogSearch({ variant = 'default' }: BlogSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      setShowResults(false);
      return;
    }

    const searchPosts = async () => {
      setIsSearching(true);
      try {
        // Search via WordPress API
        const response = await fetch(
          `/api/search?q=${encodeURIComponent(query)}`
        );
        
        if (response.ok) {
          const data = await response.json();
          setResults(data.results || []);
          setShowResults(true);
        }
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setIsSearching(false);
      }
    };

    // Debounce search
    const timer = setTimeout(searchPosts, 300);
    return () => clearTimeout(timer);
  }, [query]);

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setShowResults(false);
  };

  const isSidebar = variant === 'sidebar';

  return (
    <div className={`relative ${isSidebar ? 'w-full' : 'max-w-2xl mx-auto'}`}>
      {/* Search Input */}
      <div className="relative">
        <Search 
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" 
          size={20} 
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search blog posts..."
          className={`w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-optizen-blue-500 focus:border-transparent text-gray-900 placeholder:text-gray-500 ${
            isSidebar ? 'text-sm' : 'text-base'
          }`}
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {showResults && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-xl max-h-96 overflow-y-auto">
          {isSearching ? (
            <div className="p-4 text-center text-gray-500">
              <div className="animate-spin inline-block w-6 h-6 border-2 border-optizen-blue-500 border-t-transparent rounded-full"></div>
              <p className="mt-2 text-sm">Searching...</p>
            </div>
          ) : results.length > 0 ? (
            <div className="py-2">
              <p className="px-4 py-2 text-xs text-gray-500 font-semibold uppercase">
                {results.length} {results.length === 1 ? 'Result' : 'Results'}
              </p>
              {results.map((result) => (
                <Link
                  key={result.id}
                  href={`/${result.categorySlug}/${result.slug}`}
                  onClick={clearSearch}
                  className="block px-4 py-3 hover:bg-gray-50 transition-colors border-t border-gray-100"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <h3 
                        className="font-semibold text-gray-900 mb-1 line-clamp-1"
                        dangerouslySetInnerHTML={{ __html: result.title }}
                      />
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {truncateText(stripHtml(result.excerpt), 120)}
                      </p>
                    </div>
                    <span className="flex-shrink-0 text-xs px-2 py-1 bg-optizen-blue-50 text-optizen-blue-600 rounded-full">
                      {result.category}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500">
              <Search size={48} className="mx-auto mb-3 text-gray-300" />
              <p className="font-semibold mb-1">No results found</p>
              <p className="text-sm">Try different keywords</p>
            </div>
          )}
        </div>
      )}

      {/* Backdrop to close results */}
      {showResults && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowResults(false)}
        />
      )}
    </div>
  );
}

