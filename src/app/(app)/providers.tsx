"use client";

// REVIEWED - 04

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren, useEffect } from "react";

export const ServiceWorkerRegistrationLogger =
  function ServiceWorkerRegistrationLogger() {
    useEffect(() => {
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker.ready
          .then((register) => console.log("[Service Worker]: Ready:", register))
          .catch((error) => console.error("[Service Worker]: Error:", error));
      }
    }, []);

    return null;
  };

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
