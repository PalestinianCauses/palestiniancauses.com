// REVIEWED - 15
import { withPayload } from "@payloadcms/next/withPayload";
import withSerwistInit from "@serwist/next";
import { NextConfig } from "next";

const nextConfig: NextConfig = {
  // server
  experimental: {
    serverActions: {
      allowedOrigins: [process.env.NEXT_PUBLIC_DOMAIN!],
    },
  },

  eslint: { ignoreDuringBuilds: true },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.VERCEL_BLOB_STORAGE_DOMAIN!,
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: process.env.UPLOADTHING_DOMAIN!,
        pathname: "/f/**",
      },
    ],
  },

  webpack: (config, { webpack }) => {
    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /^pg-native$|^cloudflare:sockets$/,
      }),
    );

    return config;
  },
};

const withPWAConfig = withSerwistInit({
  swDest: "public/sw.js",
  swSrc: "src/app/(app)/sw.ts",
});

export default withPWAConfig(withPayload(nextConfig));
