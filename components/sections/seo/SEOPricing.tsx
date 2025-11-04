"use client";

import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";

const pricingPlans = [
  {
    name: "Free",
    price: "Free",
    period: "",
    description: "Get started with essential SEO features",
    features: [
      "AI updates for product page SEO elements",
      "Access to prompt repository",
      "Individual or bulk updates",
      "Image alt text AI",
      "Full restore functionality",
      "2,000 free AI words",
    ],
    popular: false,
    cta: "Get Started Free",
  },
  {
    name: "Pro",
    price: "$19.99",
    period: "/month",
    description: "Best for growing stores",
    features: [
      "Everything in Free, plus:",
      "Add content below product grid on collections",
      "Optimize tag pages",
      "Choose which tag pages to index",
      "AI updates for collection and tag pages",
      "Shopify 2.0 compatibility",
      "Smart Tag Filter",
      "125,000 free AI words",
    ],
    popular: true,
    cta: "Start Free Trial",
  },
  {
    name: "Enterprise",
    price: "$29.99",
    period: "/month",
    description: "For high-volume stores",
    features: [
      "Everything in Pro, plus:",
      "250,000 free AI words",
      "Variant Tagger",
      "Variant Image Thumbnail Matcher",
      "Priority support",
      "Dedicated account manager",
    ],
    popular: false,
    cta: "Start Free Trial",
  },
];

export default function SEOPricing() {
  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Start free and scale as you grow. All paid plans include free trials.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all p-8 ${
                plan.popular ? "ring-2 ring-optizen-green-500 scale-105" : "border border-gray-200"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-optizen-green-500 text-white text-sm font-semibold flex items-center">
                  <Star size={14} className="mr-1 fill-current" />
                  Most Popular
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 text-sm">{plan.description}</p>
              </div>

              <div className="mb-6">
                <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                <span className="text-gray-600">{plan.period}</span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <Check className="text-optizen-green-500 mr-3 mt-0.5 flex-shrink-0" size={20} />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href="https://apps.shopify.com/seo-meta-tag"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full py-3 px-6 rounded-full font-semibold transition-colors block text-center ${
                  plan.popular
                    ? "bg-optizen-green-500 text-white hover:bg-optizen-green-600"
                    : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                }`}
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Free plan available forever. Paid plans include <span className="font-semibold text-gray-900">free trials</span>.
          </p>
        </div>
      </div>
    </section>
  );
}

