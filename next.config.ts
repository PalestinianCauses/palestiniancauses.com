// REVIEWED - 04
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig = {
  experimental: { dynamicIO: true },
  eslint: { ignoreDuringBuilds: true },
};

export default withPayload(nextConfig);
