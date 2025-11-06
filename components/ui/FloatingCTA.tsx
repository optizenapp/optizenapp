"use client";

import Link from 'next/link';
import { X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(true);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Desktop/Laptop Sidebar - Sticky on scroll after 300px */}
      <div className={`hidden lg:block fixed right-4 z-40 w-64 transition-all duration-300 ${
        isSticky ? 'top-24 opacity-100' : 'top-[-300px] opacity-0'
      }`}>
        <div className="bg-gradient-to-br from-optizen-blue-50 to-optizen-green-50 rounded-2xl border-2 border-optizen-blue-200 shadow-xl p-4 relative">
          {/* Close button */}
          <button
            onClick={() => setIsVisible(false)}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close"
          >
            <X size={16} />
          </button>

          <h3 className="text-base font-bold text-gray-900 mb-3 pr-5 leading-tight">
            Boost Your Shopify Performance - SEO & Upsells
          </h3>
          
          <div className="space-y-2">
            <a
              href="https://apps.shopify.com/optizen-video-upsell"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full px-4 py-2 rounded-full font-semibold text-center text-xs bg-optizen-blue-500 text-white hover:bg-optizen-blue-600 transition-colors shadow-md hover:shadow-lg"
            >
              Video Upsell App
            </a>
            <a
              href="https://apps.shopify.com/seo-meta-tag"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full px-4 py-2 rounded-full font-semibold text-center text-xs bg-optizen-green-500 text-white hover:bg-optizen-green-600 transition-colors shadow-md hover:shadow-lg"
            >
              SEO Tools App
            </a>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet - Sticky bottom bar for screens smaller than 1024px */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-optizen-blue-500 to-optizen-green-500 shadow-2xl">
        <div className="relative px-4 py-3 max-w-5xl mx-auto">
          {/* Close button */}
          <button
            onClick={() => setIsVisible(false)}
            className="absolute top-2 right-2 text-white/80 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X size={18} />
          </button>

          {/* Text - Hidden on very small screens */}
          <p className="hidden sm:block text-white font-semibold text-center text-sm mb-2.5 pr-8">
            Boost Your Shopify Performance - SEO & Upsells
          </p>
          
          <div className="flex gap-2 sm:gap-3">
            <a
              href="https://apps.shopify.com/optizen-video-upsell"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full font-semibold text-center bg-white text-optizen-blue-500 hover:bg-gray-100 transition-colors text-xs sm:text-sm shadow-lg"
            >
              Video Upsell
            </a>
            <a
              href="https://apps.shopify.com/seo-meta-tag"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full font-semibold text-center bg-white text-optizen-green-500 hover:bg-gray-100 transition-colors text-xs sm:text-sm shadow-lg"
            >
              SEO Tools
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

