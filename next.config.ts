import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // The 1 % form reads its PDF fonts from disk at runtime, which file tracing
  // cannot see on its own.
  outputFileTracingIncludes: {
    "/api/dohodnina": ["./lib/fonts/**"],
  },
};

export default nextConfig;
