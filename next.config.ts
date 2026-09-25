import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/index.html",
      },
    ];
  },
  async headers() {
    // public/ files default to max-age=0, forcing a revalidation round trip per asset on every visit
    const cache = (value: string) => [{ key: "Cache-Control", value }];
    return [
      { source: "/fonts/:path*", headers: cache("public, max-age=31536000, immutable") },
      { source: "/images/:path*", headers: cache("public, max-age=604800, stale-while-revalidate=2592000") },
      { source: "/videos/:path*", headers: cache("public, max-age=604800, stale-while-revalidate=2592000") },
      { source: "/assets/:path*", headers: cache("public, max-age=3600, stale-while-revalidate=86400") },
    ];
  },
};

export default nextConfig;
