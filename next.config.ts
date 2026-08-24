import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.r2.dev" },
      { protocol: "https", hostname: "**.r2.cloudflarestorage.com" },
      { protocol: "https", hostname: process.env.R2_PUBLIC_HOSTNAME || "pub-placeholder.r2.dev" },
    ],
  },
};

export default nextConfig;
