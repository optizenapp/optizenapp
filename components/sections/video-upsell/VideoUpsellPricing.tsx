"use client";

import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";

const pricingPlans = [
  {
    name: "Free",
    price: "Free",
    period: "",
    trial: "7 day free trial",
    description: "Perfect for testing video upsells",
    features: [
      "1 active video upsell campaign",
      "Up to 5 conversions & bundles",
      "YouTube / Vimeo videos only",
      "All available video upsell placements",
    ],
    popular: false,
    cta: "Start Free Trial",
  },
  {
    name: "Starter",
    price: "$9.99",
    period: "/month",
    addOn: "$2 per extra AI credit (Bundles of $2, $10, $20, $40)",
    description: "Best for growing stores",
    features: [
      "Unlimited video upsell & campaigns",
      "Unlimited conversions & bundles",
      "2 AI video credits/month",
      "YouTube/Vimeo + AI videos",
      "All available video upsell placements",
    ],
    popular: true,
    cta: "Get Started",
  },
  {
    name: "Pro",
    price: "$29.99",
    period: "/month",
    addOn: "$1.50 per extra AI credit (Bundles of $1.50, $7.50, $15, $30)",
    description: "For high-volume stores",
    features: [
      "Everything in Starter, plus:",
      "5 AI video credits / month",
      "All video upsell & bundle placements",
      "Priority support",
    ],
    popular: false,
    cta: "Get Started",
  },
];

export default function VideoUpsellPricing() {
  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Start free and scale as you grow. All charges are billed in USD every 30 days.
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
                plan.popular ? "ring-2 ring-optizen-blue-500 scale-105" : "border border-gray-200"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-optizen-blue-500 text-white text-sm font-semibold flex items-center">
                  <Star size={14} className="mr-1 fill-current" />
                  Most Popular
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 text-sm">{plan.description}</p>
              </div>

              <div className="mb-4">
                <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                <span className="text-gray-600">{plan.period}</span>
              </div>

              {plan.trial && (
                <p className="text-sm text-optizen-blue-500 font-medium mb-4">{plan.trial}</p>
              )}

              {plan.addOn && (
                <p className="text-xs text-gray-500 mb-6 p-3 bg-gray-50 rounded-lg">
                  {plan.addOn}
                </p>
              )}

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <Check className="text-optizen-blue-500 mr-3 mt-0.5 flex-shrink-0" size={20} />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href="https://apps.shopify.com/optizen-video-upsell"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full py-3 px-6 rounded-full font-semibold transition-colors block text-center ${
                  plan.popular
                    ? "bg-optizen-blue-500 text-white hover:bg-optizen-blue-600"
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
            All plans include a <span className="font-semibold text-gray-900">7-day free trial</span>. No credit card required.
          </p>
        </div>
      </div>
    </section>
  );
}

