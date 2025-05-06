// REVIEWED - 10
import { withPayload } from "@payloadcms/next/withPayload";
import { NextConfig } from "next";
import withPWA from "next-pwa";

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

const withPWAConfig = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: false,
  importScripts: ["./worker/index.js"],
  customWorkerDir: "worker",
  buildExcludes: [/middleware-manifest\.json$/],
});

export default withPWAConfig(withPayload(nextConfig));
