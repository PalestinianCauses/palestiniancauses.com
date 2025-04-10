// REVIEWED - 05
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
};

export default withPayload(nextConfig);
