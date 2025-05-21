// REVIEWED - 12
import { withPayload } from "@payloadcms/next/withPayload";
import withSerwistInit from "@serwist/next";
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
};

const withPWAConfig = withSerwistInit({
  swDest: "public/sw.js",
  swSrc: "src/app/(app)/sw.ts",
});

export default withPWAConfig(withPayload(nextConfig));
