// REVIEWED - 07
import { withPayload } from "@payloadcms/next/withPayload";
import { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: { ignoreDuringBuilds: true },
  webpack: (config) => {
    config.externals.push("cloudflare:sockets");
    return config;
  },
};

export default withPayload(nextConfig);
