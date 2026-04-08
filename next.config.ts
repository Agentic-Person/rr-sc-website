import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "d2xsxph8kpxj0f.cloudfront.net" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  turbopack: {
    resolveAlias: {
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
  },
  webpack(config) {
    config.resolve.alias["@assets"] = path.resolve(__dirname, "attached_assets");
    return config;
  },
};

export default nextConfig;
