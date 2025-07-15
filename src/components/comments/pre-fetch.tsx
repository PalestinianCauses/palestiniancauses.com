// REVIEWED

import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { GeneratedTypes } from "payload";

import { messages } from "@/lib/messages";
import { actionSafeExecute } from "@/lib/network";
import { payload } from "@/lib/payload";
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
      const response = await actionSafeExecute(
        payload.find({
          collection: "comments",
          page: pageParam,
          limit: filters.limit,
          sort: filters.sort,
          where: filters.fields,
        }),
        messages.actions.comment.serverErrorGet,
      );

      if (!response.data || response.data.docs.length === 0 || response.error)
        return null;

      return response.data;
    },
    initialPageParam: filters.page,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CommentList
        queryKey={queryKey}
        filters={filters}
        fieldsSearch={fieldsSearch}
      />
    </HydrationBoundary>
  );
};
