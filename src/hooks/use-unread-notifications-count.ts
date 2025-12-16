"use client";

// REVIEWED - 01

import { useQuery } from "@tanstack/react-query";

import { getNotificationsCountUnRead as actionGetNotificationsCountUnRead } from "@/actions/notifications";
import { User } from "@/payload-types";

export const useNotificationsCountUnRead =
  function useNotificationsCountUnRead({ user }: { user?: User }) {
    const { data: response } = useQuery({
      queryKey: ["user-notifications-count-un-read", user?.id],
      queryFn: actionGetNotificationsCountUnRead,
      enabled: Boolean(user),
      refetchInterval: 30_000,
    });

    if (!response || !response.data || response.error) return 0;

    return response.data;
  };
