import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true, // Preload for faster font loading
  adjustFontFallback: true, // Reduce layout shift
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false, // Don't preload mono font (not critical)
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: "OptizenApp - Boost Your Shopify Store with AI-Powered Tools",
  description: "Increase revenue with video upsells and dominate search rankings with AI-powered SEO. Trusted by thousands of Shopify stores.",
  keywords: ["Shopify apps", "video upsell", "SEO tools", "Shopify SEO", "e-commerce growth"],
  authors: [{ name: "OptizenApp" }],
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon.png', type: 'image/png', sizes: '16x16' },
    ],
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    title: "OptizenApp - Shopify Apps for Growth",
    description: "Increase revenue with video upsells and dominate search rankings with AI-powered SEO.",
    type: "website",
    url: "https://optizenapp.com",
    images: [{ url: '/optizen-logo.png' }],
  },
  twitter: {
    card: "summary_large_image",
    title: "OptizenApp - Shopify Apps for Growth",
    description: "Increase revenue with video upsells and dominate search rankings with AI-powered SEO.",
    images: ['/optizen-logo.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to critical origins */}
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://optizenapp-staging.p3ue6i.ap-southeast-2.wpstaqhosting.com" />
        <link rel="dns-prefetch" href="https://apps.shopify.com" />
        
        {/* Preload critical assets */}
        <link rel="preload" href="/shopify-partner-badge.jpeg" as="image" type="image/jpeg" fetchPriority="high" />
        <link rel="preload" href="/optizen-logo.png" as="image" type="image/png" />
        
        {/* Mobile viewport optimization */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        
      {/* Google Analytics */}
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-PZG3J0PFEV"></script>
      <script dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-PZG3J0PFEV');
        `
      }} />
      
      {/* Google Ads Conversion Tracking */}
      <script async src="https://www.googletagmanager.com/gtag/js?id=AW-17668902622"></script>
      <script dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-17668902622');
        `
      }} />
      
      {/* Service Worker Registration */}
      <script dangerouslySetInnerHTML={{
        __html: `
          if ('serviceWorker' in navigator) {
            window.addEventListener('load', function() {
              navigator.serviceWorker.register('/sw.js').catch(function(){});
            });
          }
        `
      }} />
      
      {/* Explicit favicon links for better browser compatibility */}
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon.png" />
      <link rel="apple-touch-icon" href="/favicon.png" />
    </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
