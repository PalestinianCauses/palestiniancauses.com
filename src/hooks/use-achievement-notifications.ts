"use client";

// REVIEWED - 02

import { useQuery } from "@tanstack/react-query";

import { checkingPlusNotifyingAchievements as checkingPlusNotifyingAchievementsAction } from "@/actions/achievement-notifications";

import { useUser } from "./use-user";

export const useAchievementNotifications =
  function useAchievementNotifications() {
    const { data: user } = useUser();

    useQuery({
      queryKey: ["user-achievement-notifications", user?.id],
      queryFn: checkingPlusNotifyingAchievementsAction,
      enabled: Boolean(user),
      refetchInterval: 5 * 60_000,
    });

    // Notifications are now created in notifications collection
    // and will appear in profile notifications page
    return null;
  };
