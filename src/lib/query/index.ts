// REVIEWED - 01

import {
  defaultShouldDehydrateQuery,
  isServer,
  QueryClient,
} from "@tanstack/react-query";

const createQueryClient = function createQueryClient() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 60 * 1000,
        refetchOnWindowFocus: true,
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
