// REVIEWED - 05

import {
  defaultShouldDehydrateQuery,
  isServer,
  QueryClient,
} from "@tanstack/react-query";

const createQueryClient = function createQueryClient() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30 * 60 * 1000,
        gcTime: 30 * 60 * 1000,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
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
