"use client";

import { motion } from "framer-motion";
import { TrendingUp, Users, Video, Award } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "10,000+",
    label: "Active Stores",
    description: "Merchants trust our apps"
  },
  {
    icon: TrendingUp,
    value: "$400M+",
    label: "Revenue Generated",
    description: "For our customers"
  },
  {
    icon: Video,
    value: "5M+",
    label: "Video Views",
    description: "Engagement per month"
  },
  {
    icon: Award,
    value: "4.9★",
    label: "Average Rating",
    description: "From 1,200+ reviews"
  }
];

export default function Stats() {
  return (
    <section className="py-20 bg-gradient-to-br from-optizen-blue-500 to-optizen-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Trusted by Thousands
          </h2>
          <p className="text-xl text-optizen-blue-100 max-w-2xl mx-auto">
            Join the growing community of successful Shopify stores
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <stat.icon size={32} className="text-white" />
              </div>
              <div className="text-4xl md:text-5xl font-bold mb-2">
                {stat.value}
              </div>
              <div className="text-lg font-semibold mb-1">
                {stat.label}
              </div>
              <div className="text-sm text-optizen-blue-200">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}



