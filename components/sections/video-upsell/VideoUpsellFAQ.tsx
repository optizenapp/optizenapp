"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "How do I install the app?",
    answer: "Can be installed directly from the Shopify App Store with just one click. The setup wizard will guide you through the configuration process, which typically takes less than 5 minutes."
  },
  {
    question: "Is there a free trial available?",
    answer: "Yes! 7-day free trial. You can explore all features and see the results before committing to a paid plan."
  },
  {
    question: "What kind of support do you offer?",
    answer: "We offer email support for all plans, with priority support for Professional and higher tiers. Enterprise customers get a dedicated account manager. Our average response time is under 2 hours."
  },
  {
    question: "Can I cancel anytime?",
    answer: "Yes, you can cancel your subscription at any time with no penalties or fees. Your data will be preserved in case you want to reactivate."
  },
  {
    question: "How do extra AI credits work?",
    answer: "With each plan you are allocated a set number of AI credits to create videos. If you need more - ie you want to create more campaigns, you can purchase AI credit bundles, without having to change your monthly subscription."
  }
];

function FAQItem({ faq, index }: { faq: typeof faqs[0]; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="border-b border-gray-200 last:border-0"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left hover:text-optizen-blue-500 transition-colors"
      >
        <span className="text-lg font-semibold text-gray-900 pr-8">
          {faq.question}
        </span>
        {isOpen ? (
          <Minus className="flex-shrink-0 text-optizen-blue-500" size={24} />
        ) : (
          <Plus className="flex-shrink-0 text-gray-400" size={24} />
        )}
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-gray-600 leading-relaxed">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function VideoUpsellFAQ() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about Optizen Video Upsell & Bundles
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-8">
          {faqs.map((faq, index) => (
            <FAQItem key={faq.question} faq={faq} index={index} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Still have questions?
          </p>
          <a
            href="/contact"
            className="inline-flex items-center text-optizen-blue-500 hover:text-optizen-blue-600 font-semibold"
          >
            Contact our support team →
          </a>
        </div>
      </div>
    </section>
  );
}

