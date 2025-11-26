import { TrendingUp, Search, Zap, Shield } from "lucide-react";

const features = [
  {
    icon: TrendingUp,
    title: "Increase Revenue",
    description: "Boost your average order value with video upsells and cross-sells at the perfect moment.",
  },
  {
    icon: Search,
    title: "Dominate SEO",
    description: "Rank higher on Google with AI-powered SEO optimization and meta tag management.",
  },
  {
    icon: Zap,
    title: "Quick Setup",
    description: "Install in minutes with no coding required. Start seeing results immediately.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-level security with SOC 2 compliance and data encryption.",
  },
];

export default function Features() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Everything you need to grow
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Powerful features designed to help Shopify store owners increase revenue and visibility.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-optizen-blue-100 rounded-xl flex items-center justify-center mb-4">
                <feature.icon className="text-optizen-blue-500" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}



