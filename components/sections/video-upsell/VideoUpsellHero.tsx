"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play, ArrowRight, Video } from "lucide-react";
import Image from "next/image";
import VideoModal from "@/components/ui/VideoModal";

export default function VideoUpsellHero() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-optizen-blue-50 text-optizen-blue-500 text-sm font-medium mb-8">
            <Video size={16} className="mr-2" />
            Optizen Video Upsell & Bundles
          </div>

          {/* Main Headline - NO ANIMATION for LCP optimization */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Improve AOV With{" "}
            <span className="text-optizen-blue-500">Video Upsells & Bundles</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto">
            Transform static product recommendations into engaging video experiences that boost sales. 
            Use your own videos or let AI create professional product videos from your inventory data.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.a
              href="https://apps.shopify.com/optizen-video-upsell"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-8 py-4 bg-optizen-blue-500 text-white font-semibold rounded-full hover:bg-optizen-blue-600 transition-colors shadow-lg shadow-optizen-blue-500/30"
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

            <motion.a
              href="https://fitnessgus.myshopify.com/products/harison-discover-hr-g3104-olympic-flat-bench-press?_bt=BAh7BkkiC19yYWlscwY6BkVUewhJIglkYXRhBjsAVEkiHWZpdG5lc3NndXMubXlzaG9waWZ5LmNvbQY7AEZJIghleHAGOwBUSSIdMjAyNS0xMS0wNFQwNjo1OToxNS42MThaBjsAVEkiCHB1cgY7AFRJIh5wZXJtYW5lbnRfcGFzc3dvcmRfYnlwYXNzBjsARg%3D%3D--8d56570a8a0fa02a3a3eae0e65b794988b10d540"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-8 py-4 bg-white text-gray-900 font-semibold rounded-full border-2 border-gray-200 hover:border-gray-300 transition-colors"
            >
              View Demo Store
            </motion.a>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-sm text-gray-600">
            <div className="flex items-center">
              <span className="font-semibold text-gray-900 mr-1">7-day</span>
              <span>free trial</span>
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
              <span className="font-semibold text-gray-900 mr-1">Works with</span>
              <span>latest themes</span>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        videoId="pobU4YXMQas"
      />
    </section>
  );
}

