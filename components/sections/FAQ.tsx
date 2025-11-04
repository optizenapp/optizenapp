"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "How do I install the apps?",
    answer: "Both apps can be installed directly from the Shopify App Store with just one click. The setup wizard will guide you through the configuration process, which typically takes less than 5 minutes."
  },
  {
    question: "Is there a free trial available?",
    answer: "Yes! Both apps come with a 14-day free trial. No credit card required to start. You can explore all features and see the results before committing to a paid plan."
  },
  {
    question: "Can I use both apps together?",
    answer: "Absolutely! In fact, we recommend using both apps together for maximum impact. The Video Upsell increases your revenue per customer, while the SEO Tools bring more visitors to your store."
  },
  {
    question: "Will these apps slow down my store?",
    answer: "Not at all. Both apps are optimized for performance and have minimal impact on your store's loading speed. We use lazy loading and efficient code to ensure your store stays fast."
  },
  {
    question: "What kind of support do you offer?",
    answer: "We offer email support for all plans, with priority support for Professional and higher tiers. Enterprise customers get a dedicated account manager. Our average response time is under 2 hours."
  },
  {
    question: "Can I cancel anytime?",
    answer: "Yes, you can cancel your subscription at any time with no penalties or fees. Your data will be preserved for 30 days in case you want to reactivate."
  },
  {
    question: "Do you offer refunds?",
    answer: "We offer a 30-day money-back guarantee. If you're not satisfied with the apps for any reason, contact our support team for a full refund."
  },
  {
    question: "Are there any setup fees or hidden costs?",
    answer: "No hidden fees! The price you see is the price you pay. There are no setup fees, cancellation fees, or any other hidden costs."
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
        className="w-full py-6 flex items-center justify-between text-left hover:text-indigo-600 transition-colors"
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

export default function FAQ() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about our apps
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
            className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-semibold"
          >
            Contact our support team →
          </a>
        </div>
      </div>
    </section>
  );
}



