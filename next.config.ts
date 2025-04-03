import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  dangerouslyAllowedSVG: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
      },
    ]
  }
};

export default nextConfig;
