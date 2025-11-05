import Link from "next/link";
import Image from "next/image";
import { Mail, Twitter, Linkedin, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company */}
          <div>
            <div className="mb-4">
              <Image 
                src="/optizen-logo.png" 
                alt="OptizenAI Logo" 
                width={160} 
                height={45}
                className="h-8 w-auto"
              />
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Powerful Shopify apps to boost your store's revenue and SEO performance.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Products</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://apps.shopify.com/optizen-video-upsell"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  Video Upsell
                </a>
              </li>
              <li>
                <a
                  href="https://apps.shopify.com/seo-meta-tag"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  SEO Tools
                </a>
              </li>
              <li>
                <Link href="#pricing" className="text-gray-600 hover:text-gray-900 text-sm">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/blog" className="text-gray-600 hover:text-gray-900 text-sm">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/shopify" className="text-gray-600 hover:text-gray-900 text-sm">
                  Learn Shopify
                </Link>
              </li>
              <li>
                <Link href="/pod-stores" className="text-gray-600 hover:text-gray-900 text-sm">
                  POD Stores
                </Link>
              </li>
              <li>
                <Link href="/videos-case-studies" className="text-gray-600 hover:text-gray-900 text-sm">
                  Case Studies
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & More */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Legal & More</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy-policy" className="text-gray-600 hover:text-gray-900 text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/affiliates-program" className="text-gray-600 hover:text-gray-900 text-sm">
                  Affiliates Program
                </Link>
              </li>
              <li>
                <Link href="/changelog" className="text-gray-600 hover:text-gray-900 text-sm">
                  Changelog
                </Link>
              </li>
              <li>
                <a 
                  href="https://copiq.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  Partner – Copiq
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} OptizenApp. All rights reserved.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-4">
            {/* Status Badge */}
            <a 
              href="https://optizenapp.instatus.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center px-3 py-1.5 rounded-full bg-white border border-gray-200 hover:border-gray-300 transition-colors group"
            >
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
              <span className="text-sm text-gray-700 group-hover:text-gray-900">All systems operational</span>
            </a>
            
            {/* Email */}
            <div className="flex items-center space-x-2">
              <Mail size={16} className="text-gray-400" />
              <a href="mailto:hello@optizenapp.com" className="text-gray-600 hover:text-gray-900 text-sm">
                hello@optizenapp.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}



