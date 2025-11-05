"use client";

import { motion } from "framer-motion";
import { Zap, Shield, Sparkles, Rocket } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Optimize your store in minutes, not hours"
  },
  {
    icon: Shield,
    title: "Built for Shopify",
    description: "Native integration with Shopify 2.0 themes"
  },
  {
    icon: Sparkles,
    title: "AI-Powered",
    description: "Advanced AI technology for better results"
  },
  {
    icon: Rocket,
    title: "Proven Results",
    description: "Trusted by successful Shopify merchants"
  }
];

export default function Stats() {
  return (
    <section className="py-20 bg-gradient-to-br from-optizen-blue-500 to-optizen-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why Choose OptizenAI?
          </h2>
          <p className="text-xl text-optizen-blue-100 max-w-2xl mx-auto">
            Powerful tools designed specifically for Shopify store owners
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <feature.icon size={32} className="text-white" />
              </div>
              <div className="text-xl font-bold mb-2">
                {feature.title}
              </div>
              <div className="text-sm text-optizen-blue-200">
                {feature.description}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}



