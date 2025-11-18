"use client";

import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";

const pricingPlans = {
  videoUpsell: [
    {
      name: "Free",
      price: "Free",
      period: "",
      description: "Perfect for testing video upsells",
      features: [
        "7 day free trial",
        "1 active video upsell campaign",
        "Up to 5 conversions & bundles",
        "YouTube / Vimeo videos only",
        "All available video upsell placements"
      ],
      popular: false,
      cta: "Start Free Trial"
    },
    {
      name: "Starter",
      price: "$9.99",
      period: "/month",
      description: "Best for growing stores",
      features: [
        "Unlimited video upsell & campaigns",
        "Unlimited conversions & bundles",
        "2 AI video credits/month",
        "YouTube/Vimeo + AI videos",
        "All available video upsell placements",
        "$2 per extra AI credit"
      ],
      popular: true,
      cta: "Get Started"
    },
    {
      name: "Pro",
      price: "$29.99",
      period: "/month",
      description: "For high-volume stores",
      features: [
        "Everything in Starter, plus:",
        "5 AI video credits / month",
        "All video upsell & bundle placements",
        "Priority support",
        "$1.50 per extra AI credit"
      ],
      popular: false,
      cta: "Get Started"
    }
  ],
  seoTools: [
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
        "2,000 free AI words"
      ],
      popular: false,
      cta: "Get Started Free"
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
        "Smart Tag Filter",
        "125,000 free AI words"
      ],
      popular: true,
      cta: "Start Free Trial"
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
        "Dedicated account manager"
      ],
      popular: false,
      cta: "Start Free Trial"
    }
  ]
};

function PricingCard({ plan, color }: { plan: any; color: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`relative bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all p-8 ${
        plan.popular ? `ring-2 ${color === "blue" ? "ring-optizen-blue-500" : "ring-optizen-green-500"}` : "border border-gray-200"
      }`}
    >
      {plan.popular && (
        <div className={`absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-white text-sm font-semibold flex items-center ${
          color === "blue" ? "bg-optizen-blue-500" : "bg-optizen-green-500"
        }`}>
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
        {plan.features.map((feature: string) => (
          <li key={feature} className="flex items-start">
            <Check className={`mr-3 mt-0.5 flex-shrink-0 ${color === "blue" ? "text-optizen-blue-500" : "text-optizen-green-500"}`} size={20} />
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>

      <button
        className={`w-full py-3 px-6 rounded-full font-semibold transition-colors ${
          plan.popular
            ? color === "blue"
              ? "bg-optizen-blue-500 text-white hover:bg-optizen-blue-500"
              : "bg-optizen-green-500 text-white hover:bg-optizen-green-500"
            : "bg-gray-100 text-gray-900 hover:bg-gray-200"
        }`}
      >
        {plan.cta || "Get Started"}
      </button>
    </motion.div>
  );
}

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the perfect plan for your store. No hidden fees, cancel anytime.
          </p>
        </div>

        {/* Video Upsell Pricing */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            <span className="text-optizen-blue-500">Video Upsell</span> Pricing
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.videoUpsell.map((plan) => (
              <PricingCard key={plan.name} plan={plan} color="blue" />
            ))}
          </div>
        </div>

        {/* SEO Tools Pricing */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            <span className="text-optizen-green-500">SEO Tools</span> Pricing
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.seoTools.map((plan) => (
              <PricingCard key={plan.name} plan={plan} color="green" />
            ))}
          </div>
        </div>

        {/* Trust Message */}
        <div className="mt-12 text-center">
          <p className="text-gray-600">
            All plans include a <span className="font-semibold text-gray-900">7-day free trial</span>. No credit card required.
          </p>
        </div>
      </div>
    </section>
  );
}

