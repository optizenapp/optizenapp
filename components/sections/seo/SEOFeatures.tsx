"use client";

import { motion } from "framer-motion";
import { Sparkles, FileText, Tags, Filter, Image as ImageIcon, RefreshCw } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Product Updates",
    description: "Efficiently update product SEO titles, descriptions, H1 page titles, and internal linking at scale with full control over AI prompts.",
  },
  {
    icon: FileText,
    title: "Collection Page Optimization",
    description: "Add unique content below the product grid on collection pages to improve content optimization and SEO performance.",
  },
  {
    icon: Tags,
    title: "Tag Page SEO",
    description: "Edit tag pages including SEO titles, descriptions, H1 titles, and content to create structured category silos and sub-collections.",
  },
  {
    icon: Filter,
    title: "Smart Tag Filters",
    description: "Implement smart tag filter sidebars on collections for powerful internal linking and improved user experience.",
  },
  {
    icon: ImageIcon,
    title: "Variant Management",
    description: "Use Variant Tagger to add product variants as tags with one click. Variant Image Thumbnail Matcher ensures correct images on tag pages.",
  },
  {
    icon: RefreshCw,
    title: "Bulk Import & Export",
    description: "Streamline workflow by exporting and importing collection and tag pages via CSV files for efficient bulk updates.",
  },
];

const capabilities = [
  "AI-generated SEO titles and meta descriptions",
  "Product page SEO optimization at scale",
  "Collection and tag page content management",
  "Image alt text automation",
  "Full restore functionality",
  "Prompt repository access",
  "Shopify 2.0 compatibility",
  "Individual or bulk updates",
];

export default function SEOFeatures() {
  return (
    <>
      {/* Main Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Comprehensive SEO Tools
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to dominate search rankings and drive organic traffic to your Shopify store
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 p-8 rounded-2xl hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-optizen-green-100 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="text-optizen-green-500" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 md:p-12 rounded-2xl shadow-sm"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  What You Can Do with OptizenAI
                </h2>
                <p className="text-lg text-gray-600">
                  Powerful features to optimize every aspect of your store's SEO
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                {capabilities.map((capability, index) => (
                  <motion.div
                    key={capability}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-start"
                  >
                    <div className="w-1.5 h-1.5 bg-optizen-green-500 rounded-full mr-3 mt-2"></div>
                    <span className="text-gray-700">{capability}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}

