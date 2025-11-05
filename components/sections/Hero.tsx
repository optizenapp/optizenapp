"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-optizen-blue-50 text-optizen-blue-500 text-sm font-medium mb-8"
          >
            <span className="w-2 h-2 bg-optizen-blue-500 rounded-full mr-2 animate-pulse"></span>
            Trusted by 1000's of Shopify stores
          </motion.div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Boost Your Shopify Store with{" "}
            <span className="text-optizen-blue-500">SEO & Video Upsell Apps</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto">
            Increase revenue with video upsells and dominate search rankings with AI-powered SEO. 
            Everything you need to grow your Shopify store.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.a
              href="/optizenai-video-upsells-and-bundles"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-8 py-4 bg-optizen-blue-500 text-white font-semibold rounded-full hover:bg-optizen-blue-600 transition-colors shadow-lg shadow-optizen-blue-500/30"
            >
              Video Upsell App
              <ArrowRight className="ml-2" size={20} />
            </motion.a>
            
            <motion.a
              href="/optizenai-seo"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-8 py-4 bg-optizen-green-500 text-white font-semibold rounded-full hover:bg-optizen-green-600 transition-colors shadow-lg shadow-optizen-green-500/30"
            >
              SEO Tools App
              <ArrowRight className="ml-2" size={20} />
            </motion.a>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-sm text-gray-600">
            <div className="flex items-center">
              <span className="text-yellow-400 mr-1">★★★★★</span>
              <span>4.9 rating</span>
            </div>
            <div className="flex items-center">
              <Image 
                src="/shopify-partner-badge.jpeg" 
                alt="Shopify Partner" 
                width={120} 
                height={40}
                priority
                className="h-8 w-auto"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}



