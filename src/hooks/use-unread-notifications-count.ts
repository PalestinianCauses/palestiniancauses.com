"use client";

// REVIEWED - 02

import { useQuery } from "@tanstack/react-query";

import { sdk } from "@/lib/query";
import { User } from "@/payload-types";

export const useNotificationsCountUnRead =
  function useNotificationsCountUnRead({ user }: { user?: User }) {
    const { data: count } = useQuery({
      queryKey: ["user-notifications-count-un-read", user?.id],
      queryFn: async () => {
        const response = await sdk.count({
          collection: "notifications",
          where: {
            and: [{ user: { equals: user?.id } }, { read: { equals: false } }],
          },
        });

        return response.totalDocs || 0;
      },
      enabled: Boolean(user),
      refetchInterval: 30_000,
    });

    return count || 0;
  };
