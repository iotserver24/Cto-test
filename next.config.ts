import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["zod"],
  env: {
    // No environment variables are explicitly exposed to the client
    // All server-side values should be accessed through lib/config.ts
  },
};

export default nextConfig;
