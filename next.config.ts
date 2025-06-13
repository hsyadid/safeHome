import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Output standalone untuk production container
  output: "standalone",

  // Disable ESLint during build
  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
