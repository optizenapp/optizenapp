"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image 
                src="/optizen-logo.png" 
                alt="OptizenAI Logo" 
                width={200} 
                height={56}
                className="h-10 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/#apps" className="text-gray-600 hover:text-gray-900 transition-colors">
              Apps
            </Link>
            <Link href="/#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">
              Pricing
            </Link>
            <Link href="/support-docs" className="text-gray-600 hover:text-gray-900 transition-colors">
              Docs
            </Link>
            <Link href="/blog" className="text-gray-600 hover:text-gray-900 transition-colors">
              Blog
            </Link>
            <Link href="/#support" className="text-gray-600 hover:text-gray-900 transition-colors">
              Support
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/contact"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Contact
            </Link>
            <a
              href="https://apps.shopify.com/optizen-video-upsell"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-optizen-blue-500 text-white px-5 py-2 rounded-full hover:bg-optizen-blue-600 transition-colors text-sm font-medium"
            >
              Video Upsell
            </a>
            <a
              href="https://apps.shopify.com/seo-meta-tag"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-optizen-green-500 text-white px-5 py-2 rounded-full hover:bg-optizen-green-600 transition-colors text-sm font-medium"
            >
              SEO Tools
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-600 hover:text-gray-900"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link
              href="/#apps"
              className="block text-gray-600 hover:text-gray-900"
              onClick={() => setMobileMenuOpen(false)}
            >
              Apps
            </Link>
            <Link
              href="/#pricing"
              className="block text-gray-600 hover:text-gray-900"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="/support-docs"
              className="block text-gray-600 hover:text-gray-900"
              onClick={() => setMobileMenuOpen(false)}
            >
              Docs
            </Link>
            <Link
              href="/blog"
              className="block text-gray-600 hover:text-gray-900"
              onClick={() => setMobileMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              href="/#support"
              className="block text-gray-600 hover:text-gray-900"
              onClick={() => setMobileMenuOpen(false)}
            >
              Support
            </Link>
            <Link
              href="/contact"
              className="block text-gray-600 hover:text-gray-900"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <a
              href="https://apps.shopify.com/optizen-video-upsell"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-optizen-blue-500 text-white px-6 py-3 rounded-full hover:bg-optizen-blue-600 text-center font-medium"
            >
              Install Video Upsell
            </a>
            <a
              href="https://apps.shopify.com/seo-meta-tag"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-optizen-green-500 text-white px-6 py-3 rounded-full hover:bg-optizen-green-600 text-center font-medium"
            >
              Install SEO Tools
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}



