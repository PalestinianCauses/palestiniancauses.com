// REVIEWED

import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { PropsWithChildren } from "react";

import { getAuthentication } from "@/actions/auth";
import { getQueryClient } from "@/lib/query";

export const UserPreFetch = async function UserPreFetch({
  children,
}: PropsWithChildren) {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await getAuthentication();
      return response;
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
};
