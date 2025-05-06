// REVIEWED

declare module "next-pwa" {
  import { NextConfig } from "next";

  type PWAConfig = {
    dest: string;
    register?: boolean;
    skipWaiting?: boolean;
    disable?: boolean;
    importScripts?: string[];
    customWorkerDir?: string;
    buildExcludes?: (string | RegExp)[];
  };

  export default function withPWA(
    _config?: PWAConfig,
  ): (_nextConfig: NextConfig) => NextConfig;
}
