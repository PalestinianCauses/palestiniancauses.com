"use client";

// REVIEWED

import { useInfiniteQuery } from "@tanstack/react-query";
import { ArrowDownIcon } from "lucide-react";
import { useMemo } from "react";

import { getCollection } from "@/actions/collection";
import { Loading } from "@/components/globals/loading";
import { OrderItem } from "@/components/profile/activity-orders";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/styles";

export const OrdersList = function OrdersList({ userId }: { userId: number }) {
  const queryKey = useMemo(() => ["public-user-orders", userId], [userId]);

  const {
    isLoading,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    data,
  } = useInfiniteQuery({
    queryKey,
    queryFn: async ({ pageParam = 1 }) => {
      const response = await getCollection({
        collection: "orders",
        filters: {
          page: pageParam,
          limit: 2,
          fields: { user: { equals: userId } },
        },
        depth: 4,
      });

      if (!response.data || response.data.docs.length === 0 || response.error)
        return null;

      return response.data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage && lastPage.hasNextPage ? lastPage.nextPage : undefined,
  });

  const { orders } = useMemo(() => {
    if (!data) return { orders: [] };

    const pages = data.pages.flatMap((page) => (page ? page.docs : []));
    return { orders: pages };
  }, [data]);

  if (isLoading) return <Loading className="max-h-48 min-h-24" />;

  return (
    <div className="space-y-10">
      <section
        className={cn("flex w-full flex-col gap-5", {
          "pointer-events-none opacity-50": isFetching,
        })}>
        <Accordion type="single" collapsible>
          {orders.map((order) => (
            <OrderItem key={order.id} isPublicProfile order={order} />
          ))}
        </Accordion>
      </section>

      {hasNextPage ? (
        <div className="flex w-full items-center justify-center">
          <Button
            variant="link"
            disabled={isFetchingNextPage}
            onClick={() => fetchNextPage()}>
            {isFetchingNextPage ? "Loading more orders..." : "Load more orders"}
            <ArrowDownIcon />
          </Button>
        </div>
      ) : null}
    </div>
  );
};
