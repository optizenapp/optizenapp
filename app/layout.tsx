import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OptizenApp - Boost Your Shopify Store with AI-Powered Tools",
  description: "Increase revenue with video upsells and dominate search rankings with AI-powered SEO. Trusted by 10,000+ Shopify stores.",
  keywords: ["Shopify apps", "video upsell", "SEO tools", "Shopify SEO", "e-commerce growth"],
  authors: [{ name: "OptizenApp" }],
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    title: "OptizenApp - Shopify Apps for Growth",
    description: "Increase revenue with video upsells and dominate search rankings with AI-powered SEO.",
    type: "website",
    url: "https://optizenapp.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "OptizenApp - Shopify Apps for Growth",
    description: "Increase revenue with video upsells and dominate search rankings with AI-powered SEO.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
