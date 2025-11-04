"use client";

import { motion } from "framer-motion";
import { Video, Sparkles, BarChart3, Package, Zap, Target } from "lucide-react";

const features = [
  {
    icon: Video,
    title: "Your Videos or AI-Generated",
    description: "Use your existing product videos or let our AI create professional product videos from your inventory data automatically.",
  },
  {
    icon: Target,
    title: "Strategic Placements",
    description: "Show upsells and bundles at key moments across product pages, cart, and checkout flow for maximum impact.",
  },
  {
    icon: BarChart3,
    title: "Dual Analytics Tracking",
    description: "Separate customer engagement metrics from revenue data. Track which campaigns generate results and optimize your strategy.",
  },
  {
    icon: Package,
    title: "Product Bundle Visualization",
    description: "Display combined items with professional imagery. Create fixed bundles, variant bundles, and custom combinations.",
  },
  {
    icon: Zap,
    title: "Quick Campaign Setup",
    description: "Launch comprehensive upsell strategies in minutes. No coding required - works directly in Shopify admin.",
  },
  {
    icon: Sparkles,
    title: "AI Video Credits",
    description: "Generate professional product videos automatically. Plans include AI credits with affordable add-on options.",
  },
];

const bundleTypes = [
  "Fixed bundles",
  "Variant bundles",
  "Upsell bundles",
  "Physical products",
  "Custom bundles",
];

const pricingOptions = [
  "Flat discounts",
  "Percentage discounts",
  "Cart discounts",
  "Dynamic pricing",
];

export default function VideoUpsellFeatures() {
  return (
    <>
      {/* Main Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Everything You Need to Increase AOV
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features designed to transform your product recommendations into revenue-generating video experiences
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
                <div className="w-12 h-12 bg-optizen-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="text-optizen-blue-500" size={24} />
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

      {/* Bundle Types & Pricing Options */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Bundle Types */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-sm"
            >
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-optizen-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <Package className="text-optizen-blue-500" size={20} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Bundle Types</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Create flexible bundle combinations that match your product strategy
              </p>
              <ul className="space-y-3">
                {bundleTypes.map((type) => (
                  <li key={type} className="flex items-center text-gray-700">
                    <div className="w-1.5 h-1.5 bg-optizen-blue-500 rounded-full mr-3"></div>
                    {type}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Pricing Options */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-sm"
            >
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-optizen-green-100 rounded-lg flex items-center justify-center mr-3">
                  <Target className="text-optizen-green-500" size={20} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Pricing You Can Set</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Flexible discount options to maximize conversions and profitability
              </p>
              <ul className="space-y-3">
                {pricingOptions.map((option) => (
                  <li key={option} className="flex items-center text-gray-700">
                    <div className="w-1.5 h-1.5 bg-optizen-green-500 rounded-full mr-3"></div>
                    {option}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}

