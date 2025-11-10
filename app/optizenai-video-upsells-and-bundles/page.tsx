import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import VideoUpsellHero from "@/components/sections/video-upsell/VideoUpsellHero";
import VideoUpsellFeatures from "@/components/sections/video-upsell/VideoUpsellFeatures";
import VideoUpsellPricing from "@/components/sections/video-upsell/VideoUpsellPricing";
import VideoUpsellCTA from "@/components/sections/video-upsell/VideoUpsellCTA";
import VideoUpsellFAQ from "@/components/sections/video-upsell/VideoUpsellFAQ";

export const metadata = {
  title: "Optizen Video Upsell & Bundles - Boost AOV with AI-Powered Video Upsells",
  description: "Transform static product recommendations into engaging video experiences. Use your own videos or AI-generated content for professional product upsells and bundles.",
  keywords: ["Shopify video upsell", "bundle builder", "AOV increase", "AI video generation", "product bundles"],
  alternates: {
    canonical: 'https://optizenapp.com/optizenai-video-upsells-and-bundles',
  },
};

export default function VideoUpsellPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <VideoUpsellHero />
        <VideoUpsellFeatures />
        <VideoUpsellPricing />
        <VideoUpsellFAQ />
        <VideoUpsellCTA />
      </main>
      <Footer />
    </div>
  );
}

