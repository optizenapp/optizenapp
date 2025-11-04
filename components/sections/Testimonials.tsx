"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Store Owner, Fashion Boutique",
    image: "SJ",
    rating: 5,
    text: "Optizen Video Upsell increased our average order value by 28% in just the first month. The setup was incredibly easy and the results speak for themselves.",
    stats: { label: "AOV Increase", value: "28%" }
  },
  {
    name: "Michael Chen",
    role: "Marketing Director, Electronics Store",
    image: "MC",
    rating: 5,
    text: "The SEO tools are a game-changer. We've seen a 150% increase in organic traffic and our products are now ranking on the first page of Google.",
    stats: { label: "Traffic Boost", value: "150%" }
  },
  {
    name: "Emily Rodriguez",
    role: "Founder, Beauty & Cosmetics",
    image: "ER",
    rating: 5,
    text: "Both apps work seamlessly together. The video upsells convert like crazy and our SEO has never been better. Best investment we've made!",
    stats: { label: "Revenue Up", value: "45%" }
  }
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Loved by Store Owners
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            See what our customers are saying about their experience with Optizen apps
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-50 rounded-2xl p-8 relative"
            >
              <Quote className="absolute top-8 right-8 text-optizen-blue-200" size={40} />
              
              {/* Rating */}
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="text-yellow-400 fill-current" size={20} />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-700 mb-6 relative z-10">
                "{testimonial.text}"
              </p>

              {/* Stats Badge */}
              <div className="inline-block bg-optizen-blue-100 text-optizen-blue-500 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                {testimonial.stats.label}: <span className="text-optizen-blue-500">{testimonial.stats.value}</span>
              </div>

              {/* Author */}
              <div className="flex items-center">
                <div className="w-12 h-12 bg-optizen-blue-500 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                  {testimonial.image}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Footer */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="text-yellow-400 fill-current" size={24} />
              ))}
            </div>
            <span className="text-gray-900 font-semibold text-lg">4.9 out of 5</span>
            <span className="text-gray-600">from 1,200+ reviews</span>
          </div>
        </div>
      </div>
    </section>
  );
}



