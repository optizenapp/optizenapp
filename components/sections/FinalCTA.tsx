"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-3xl p-12 md:p-16 text-center text-white relative overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
          </div>

          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Ready to Grow Your Store?
            </h2>
            
            <p className="text-xl md:text-2xl text-indigo-100 mb-8 max-w-3xl mx-auto">
              Join thousands of successful Shopify stores using Optizen apps to increase revenue and dominate search rankings.
            </p>

            <div className="flex flex-wrap justify-center gap-6 mb-10">
              <div className="flex items-center">
                <Check className="mr-2" size={20} />
                <span>Free trials available</span>
              </div>
              <div className="flex items-center">
                <Check className="mr-2" size={20} />
                <span>Shopify Partner</span>
              </div>
              <div className="flex items-center">
                <Check className="mr-2" size={20} />
                <span>Cancel anytime</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="https://apps.shopify.com/optizen-video-upsell"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-indigo-600 font-semibold rounded-full hover:bg-gray-100 transition-colors shadow-lg"
              >
                Start Free Trial
                <ArrowRight className="ml-2" size={20} />
              </motion.a>
              
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-white font-semibold rounded-full border-2 border-white hover:bg-white/10 transition-colors"
              >
                Talk to Sales
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}



