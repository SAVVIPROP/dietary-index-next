import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["mysql2", "drizzle-orm"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "img.youtube.com" },
      { protocol: "https", hostname: "*.manus.space" },
      { protocol: "https", hostname: "files.manuscdn.com" },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
