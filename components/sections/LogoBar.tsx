"use client";

import { motion } from "framer-motion";

export default function LogoBar() {
  const partners = [
    "Shopify Partner",
    "Featured App",
    "Top Rated",
    "Best SEO Tool",
    "Most Popular",
    "Trusted Partner"
  ];

  return (
    <section className="py-12 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-gray-500 text-sm mb-8 uppercase tracking-wide">
          Trusted by leading Shopify stores worldwide
        </p>
        
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {partners.map((partner, index) => (
            <motion.div
              key={partner}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-center"
            >
              <div className="px-6 py-3 bg-gray-50 rounded-lg border border-gray-200">
                <span className="text-gray-600 font-medium text-sm">{partner}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}



