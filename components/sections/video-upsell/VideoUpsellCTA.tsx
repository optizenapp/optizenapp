"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

export default function VideoUpsellCTA() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-optizen-blue-500 to-optizen-blue-700 rounded-3xl p-12 md:p-16 text-center text-white relative overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
          </div>

          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Ready to Boost Your AOV?
            </h2>
            
            <p className="text-xl md:text-2xl text-optizen-blue-100 mb-8 max-w-3xl mx-auto">
              Join successful Shopify stores using video upsells to increase average order value and drive more revenue per customer.
            </p>

            <div className="flex flex-wrap justify-center gap-6 mb-10">
              <div className="flex items-center">
                <Check className="mr-2" size={20} />
                <span>7-day free trial</span>
              </div>
              <div className="flex items-center">
                <Check className="mr-2" size={20} />
                <span>Shopify Partner</span>
              </div>
              <div className="flex items-center">
                <Check className="mr-2" size={20} />
                <span>Works with latest themes</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="https://apps.shopify.com/optizen-video-upsell"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-optizen-blue-500 font-semibold rounded-full hover:bg-gray-100 transition-colors shadow-lg"
              >
                Install App Now
                <ArrowRight className="ml-2" size={20} />
              </motion.a>
              
              <motion.a
                href="https://apps.shopify.com/optizen-video-upsell"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-white font-semibold rounded-full border-2 border-white hover:bg-white/10 transition-colors"
              >
                View on Shopify App Store
              </motion.a>
            </div>

            <p className="mt-8 text-sm text-optizen-blue-200">
              Works directly in Shopify admin • Compatible with latest themes • Priority support available
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

