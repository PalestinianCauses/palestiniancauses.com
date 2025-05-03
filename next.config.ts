// REVIEWED - 09
import { withPayload } from "@payloadcms/next/withPayload";
import { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: { ignoreDuringBuilds: true },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.UPLOADTHING_DOMAIN!,
        pathname: "/f/**",
      },
    ],
  },
  webpack: (config) => {
    config.externals.push("cloudflare:sockets");
    return config;
  },
};

export default withPayload(nextConfig);
