// REVIEWED - 07

import { PayloadSDK } from "@payloadcms/sdk";
import {
  defaultShouldDehydrateQuery,
  isServer,
  QueryClient,
} from "@tanstack/react-query";

import { Config } from "@/payload-types";

const createQueryClient = function createQueryClient() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30 * 60 * 1000,
        gcTime: 30 * 60 * 1000,
      },
      dehydrate: {
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === "pending",
        shouldRedactErrors: () => false,
      },
    },
  });

  return queryClient;
};

let browserQueryClient: QueryClient | undefined;

export const getQueryClient = function getQueryClient() {
  if (isServer) return createQueryClient();

  if (!browserQueryClient) browserQueryClient = createQueryClient();
  return browserQueryClient;
};

export const sdk = new PayloadSDK<Config>({
  // eslint-disable-next-line prefer-template
  baseURL: process.env.NEXT_PUBLIC_URL! + "/api",
});
