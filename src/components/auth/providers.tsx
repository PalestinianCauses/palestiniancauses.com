// REVIEWED - 01

import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { ComponentType, PropsWithChildren } from "react";

import { QueryProvider } from "@/app/(app)/providers";
import { payload } from "@/lib/payload";
import { getQueryClient } from "@/lib/query";

export const AuthenticationUserPreFetch = function AuthenticationUserPreFetch({
  children,
}: PropsWithChildren) {
  const queryClient = getQueryClient();
  queryClient.prefetchQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await payload.auth({ headers: await headers() });
      if (!response.user) return null;
      return response.user;
    },
  });

  return (
    <QueryProvider>
      <HydrationBoundary state={dehydrate(queryClient)}>
        {children}
      </HydrationBoundary>
    </QueryProvider>
  );
};

export const withAuthenticationPreFetch = function withAuthenticationPreFetch<
  P extends object,
>(Component: ComponentType<P>) {
  return function AuthenticatedPage(props: P) {
    return (
      <AuthenticationUserPreFetch>
        <Component {...props} />
      </AuthenticationUserPreFetch>
    );
  };
};
