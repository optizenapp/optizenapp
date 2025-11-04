"use client";

import { motion } from "framer-motion";
import { Video, Search, Check, ArrowRight } from "lucide-react";

const apps = [
  {
    id: "video-upsell",
    icon: Video,
    name: "Optizen Video Upsell",
    tagline: "Turn Browsers into Buyers",
    description: "Engage customers with video upsells and bundles. Increase your average order value by up to 30% with strategic product recommendations.",
    features: [
      "Video product recommendations",
      "One-click upsell & cross-sell",
      "Customizable video players",
      "Cart abandonment recovery",
      "A/B testing included",
      "Analytics dashboard"
    ],
    link: "https://apps.shopify.com/optizen-video-upsell",
    color: "blue"
  },
  {
    id: "seo-tools",
    icon: Search,
    name: "OptizenAI SEO Tools",
    tagline: "Dominate Search Rankings",
    description: "AI-powered SEO optimization for Shopify stores. Improve your search rankings and drive organic traffic with intelligent meta tag management.",
    features: [
      "AI-generated meta tags",
      "Bulk SEO optimization",
      "Rich snippets support",
      "Image alt text automation",
      "SEO audit reports",
      "Google Search Console integration"
    ],
    link: "https://apps.shopify.com/seo-meta-tag",
    color: "green"
  }
];

export default function Apps() {
  return (
    <section id="apps" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Shopify Apps
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Two powerful apps designed to help you grow your Shopify business
          </p>
        </div>

        <div className="space-y-12">
          {apps.map((app, index) => (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className={`grid md:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? "md:grid-flow-dense" : ""
              }`}
            >
              {/* Content */}
              <div className={index % 2 === 1 ? "md:col-start-2" : ""}>
                <div className={`inline-flex items-center px-4 py-2 rounded-full mb-4 ${
                  app.color === "blue" ? "bg-optizen-blue-100" : "bg-optizen-green-100"
                }`}>
                  <app.icon className={app.color === "blue" ? "text-optizen-blue-500" : "text-optizen-green-500"} size={20} />
                  <span className={`ml-2 font-semibold ${
                    app.color === "blue" ? "text-optizen-blue-500" : "text-optizen-green-500"
                  }`}>
                    {app.name}
                  </span>
                </div>
                
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {app.tagline}
                </h3>
                
                <p className="text-lg text-gray-600 mb-6">
                  {app.description}
                </p>

                <ul className="space-y-3 mb-8">
                  {app.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <Check className={`mr-3 mt-1 flex-shrink-0 ${
                        app.color === "blue" ? "text-optizen-blue-500" : "text-optizen-green-500"
                      }`} size={20} />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href={app.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center justify-center px-8 py-4 rounded-full font-semibold transition-colors ${
                      app.color === "blue"
                        ? "bg-optizen-blue-500 text-white hover:bg-optizen-blue-600"
                        : "bg-optizen-green-500 text-white hover:bg-optizen-green-600"
                    }`}
                  >
                    Install App
                    <ArrowRight className="ml-2" size={20} />
                  </a>
                  
                  <a
                    href={app.color === "blue" ? "/optizenai-video-upsells-and-bundles" : "/optizenai-seo"}
                    className="inline-flex items-center justify-center px-8 py-4 rounded-full font-semibold border-2 border-gray-400 hover:border-gray-600 transition-colors text-gray-900"
                  >
                    Learn More
                  </a>
                </div>
              </div>

              {/* Visual */}
              <div className={index % 2 === 1 ? "md:col-start-1 md:row-start-1" : ""}>
                <div className={`rounded-2xl overflow-hidden relative w-full aspect-video`}>
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${app.color === "blue" ? "pobU4YXMQas" : "yn6myGRqc8A"}?rel=0`}
                    title={`${app.name} Demo`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}



