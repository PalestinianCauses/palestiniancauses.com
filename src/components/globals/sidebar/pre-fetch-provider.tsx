// REVIEWED

import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { PropsWithChildren } from "react";

import { getRoomList } from "@/actions/room";
import { getQueryClient } from "@/lib/query";

export const SidebarContentPreFetch = function SidebarContentPreFetch({
  children,
}: PropsWithChildren) {
  const queryClient = getQueryClient();

  queryClient.prefetchQuery({
    queryKey: ["room-list"],
    queryFn: async () => {
      const response = await getRoomList();
      if (!response.data || response.data.docs.length === 0 || response.error)
        return null;

      return response.data;
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
};
