import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import LogoBar from "@/components/sections/LogoBar";
import Features from "@/components/sections/Features";
import Apps from "@/components/sections/Apps";
import Pricing from "@/components/sections/Pricing";
import Testimonials from "@/components/sections/Testimonials";
import Stats from "@/components/sections/Stats";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import { generateSchemaOrg } from "@/lib/schema-generator";

export default async function Home() {
  // Generate schema for homepage
  const schema = await generateSchemaOrg({
    url: 'https://optizenapp.com',
    title: 'OptizenApp - Boost Your Shopify Store with AI-Powered Tools',
    content: `
      Boost Your Shopify Store with SEO & Video Upsell Apps
      Increase revenue with video upsells and dominate search rankings with AI-powered SEO. Everything you need to grow your Shopify store.
      
      Optizen Video Upsell - Turn Browsers into Buyers
      Engage customers with video upsells and bundles. Increase your average order value by up to 30% with strategic product recommendations.
      
      OptizenAI SEO Tools - Dominate Search Rankings
      AI-powered SEO optimization for Shopify stores. Improve your search rankings and drive organic traffic with intelligent meta tag management.
      
      Trusted by 10,000+ Shopify stores
      4.9 star rating from 1,200+ reviews
      $400M+ revenue generated for our customers
    `,
    excerpt: 'Increase revenue with video upsells and dominate search rankings with AI-powered SEO. Trusted by 10,000+ Shopify stores.',
    author: 'OptizenAI',
    datePublished: '2024-01-01T00:00:00Z',
    dateModified: '2024-01-01T00:00:00Z', // Static date - update manually when homepage content changes
    category: 'homepage',
    siteInfo: {
      name: 'OptizenAI',
      url: 'https://optizenapp.com',
      logoUrl: 'https://optizenapp.com/optizen-logo.png',
    },
  });

  return (
    <div className="min-h-screen">
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
      <Header />
      <main>
        <Hero />
        <LogoBar />
        <Features />
        <Apps />
        <Stats />
        <Testimonials />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
