"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play, ArrowRight, Search } from "lucide-react";
import Image from "next/image";
import VideoModal from "@/components/ui/VideoModal";

export default function SEOHero() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  
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
            className="inline-flex items-center px-4 py-2 rounded-full bg-optizen-green-50 text-optizen-green-500 text-sm font-medium mb-8"
          >
            <Search size={16} className="mr-2" />
            OptizenAI SEO Tools
          </motion.div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            AI-Powered{" "}
            <span className="text-optizen-green-500">SEO Optimization</span>
            {" "}for Shopify
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto">
            Enhance your store's search engine optimization with AI-driven features. Update product details, 
            optimize collections, and improve SEO performance at scale.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.a
              href="https://apps.shopify.com/seo-meta-tag"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-8 py-4 bg-optizen-green-500 text-white font-semibold rounded-full hover:bg-optizen-green-600 transition-colors shadow-lg shadow-optizen-green-500/30"
            >
              Install App Now
              <ArrowRight className="ml-2" size={20} />
            </motion.a>
            
            <motion.button
              onClick={() => setIsVideoOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-8 py-4 bg-white text-gray-900 font-semibold rounded-full border-2 border-gray-200 hover:border-gray-300 transition-colors"
            >
              <Play className="mr-2" size={20} />
              Watch Demo
            </motion.button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-sm text-gray-600">
            <div className="flex items-center">
              <span className="font-semibold text-gray-900 mr-1">Free plan</span>
              <span>available</span>
            </div>
            <div className="flex items-center">
              <Image 
                src="/shopify-partner-badge.jpeg" 
                alt="Shopify Partner" 
                width={120} 
                height={40}
                className="h-8 w-auto"
              />
            </div>
            <div className="flex items-center">
              <span className="font-semibold text-gray-900 mr-1">2,000</span>
              <span>free AI words</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Video Modal */}
      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        videoId="yn6myGRqc8A"
      />
    </section>
  );
}

