// REVIEWED - 01

import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { GeneratedTypes } from "payload";

import { getPublicCollection } from "@/lib/api/public";
import { getQueryClient } from "@/lib/query";
import { FiltersOptions } from "@/lib/types";
import { Comment } from "@/payload-types";

import { CommentList } from "./list";

export const CommentPreFetch = async function CommentPreFetch({
  on,
}: Pick<Comment, "on">) {
  const filters: FiltersOptions = {
    page: 1,
    limit: 5,
    sort: ["-votesScore", "-createdAt"],
    fields: {
      on: {
        equals: {
          relationTo: on.relationTo,
          value: typeof on.value === "object" ? on.value.id : on.value,
        },
      },
      parent: { exists: false },
      status: { equals: "approved" },
    },
  };

  const fieldsSearch: (keyof GeneratedTypes["collections"]["comments"])[] = [
    "user",
    "content",
  ];

  const queryKey = [
    "comments",
    on.relationTo,
    typeof on.value === "object" ? on.value.id : on.value,
    filters.page,
    filters.limit,
    (filters.sort &&
      (typeof filters.sort === "string"
        ? filters.sort
        : filters.sort.join(","))) ||
      undefined,
    fieldsSearch.join(","),
  ].filter(Boolean);

  const queryClient = getQueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey,
    queryFn: async ({ pageParam = filters.page }) => {
      const response = await getPublicCollection<"comments">({
        collection: "comments",
        page: pageParam,
        limit: filters.limit,
        // eslint-disable-next-line no-nested-ternary
        sort: filters.sort
          ? Array.isArray(filters.sort)
            ? filters.sort.join(",")
            : filters.sort
          : undefined,
        where: filters.fields,
        depth: 2,
      });

      if (!response.data || response.error || response.data.docs.length === 0)
        return null;

      return response.data;
    },
    initialPageParam: filters.page,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CommentList queryKey={queryKey} filters={filters} />
    </HydrationBoundary>
  );
};
