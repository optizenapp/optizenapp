import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'optizenapp-staging.p3ue6i.ap-southeast-2.wpstaqhosting.com',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
};

export default nextConfig;
