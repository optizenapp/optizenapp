import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEOHero from "@/components/sections/seo/SEOHero";
import SEOFeatures from "@/components/sections/seo/SEOFeatures";
import SEOPricing from "@/components/sections/seo/SEOPricing";
import SEOFAQ from "@/components/sections/seo/SEOFAQ";
import SEOCTA from "@/components/sections/seo/SEOCTA";

export const metadata = {
  title: "OptizenAI SEO Tools - AI-Powered SEO Optimization for Shopify",
  description: "Enhance your Shopify store's search engine optimization with AI-powered features. Update product details, optimize collections, and improve SEO performance at scale.",
  keywords: ["Shopify SEO", "AI SEO optimization", "meta tags", "product SEO", "collection optimization"],
  alternates: {
    canonical: 'https://optizenapp.com/optizenai-seo',
  },
};

export default function SEOPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <SEOHero />
        <SEOFeatures />
        <SEOPricing />
        <SEOFAQ />
        <SEOCTA />
      </main>
      <Footer />
    </div>
  );
}

