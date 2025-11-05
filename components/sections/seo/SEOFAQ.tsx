"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "How do I install the OptizenAI SEO app?",
    answer: "Can be installed directly from the Shopify App Store with just one click. The setup wizard will guide you through the configuration process, which typically takes less than 5 minutes."
  },
  {
    question: "Is there a free plan available?",
    answer: "Yes! OptizenAI offers a completely free plan that includes AI updates for product page SEO elements, access to the prompt repository, and 2,000 free AI words. You can upgrade to paid plans as your needs grow."
  },
  {
    question: "How do AI words work?",
    answer: "AI words are used to generate SEO content like titles, descriptions, and meta tags. Each plan includes a set amount of free AI words per month. The Free plan includes 2,000, Pro includes 125,000, and Enterprise includes 250,000 AI words."
  },
  {
    question: "Can I optimize collections and tag pages?",
    answer: "Yes! With the Pro and Enterprise plans, you can add content below product grids on collection pages, edit tag pages including SEO titles and descriptions, and create structured category silos for better SEO performance."
  },
  {
    question: "What kind of support do you offer?",
    answer: "We offer email support for all plans, with priority support for Pro and higher tiers. Enterprise customers get a dedicated account manager. Our average response time is under 2 hours."
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
        className="w-full py-6 flex items-center justify-between text-left hover:text-optizen-green-500 transition-colors"
      >
        <span className="text-lg font-semibold text-gray-900 pr-8">
          {faq.question}
        </span>
        {isOpen ? (
          <Minus className="flex-shrink-0 text-optizen-green-500" size={24} />
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

export default function SEOFAQ() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about OptizenAI SEO Tools
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
            className="inline-flex items-center text-optizen-green-500 hover:text-optizen-green-600 font-semibold"
          >
            Contact our support team →
          </a>
        </div>
      </div>
    </section>
  );
}

