import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { dev }) => {
    // Only disable cache in development
    if (dev) {
      config.cache = false;
    }
    return config;
  },
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/documents',
      },
    ];
  },
};

export default nextConfig;