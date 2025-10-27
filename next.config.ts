import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
    formats: ['image/webp'],
  },
};

export default nextConfig;
