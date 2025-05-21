"use client";

// REVIEWED - 06
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";

import { useAutoRedirectOnTokenExpire } from "@/hooks/use-auto-redirect-on-token-expire";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 60 * 1000,
      refetchOnWindowFocus: true,
    },
  },
});

export const QueryProvider = function QueryProvider({
  children,
}: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export const TokenProvider = function TokenProvider() {
  useAutoRedirectOnTokenExpire();
  return null;
};
