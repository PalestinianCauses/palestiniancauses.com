"use client";

// REVIEWED

import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";

import { checkingPlusNotifyingAchievements as checkingPlusNotifyingAchievementsAction } from "@/actions/achievement-notifications";

import { useUser } from "./use-user";

export const useAchievementNotifications =
  function useAchievementNotifications() {
    const { data: user } = useUser();

    const {
      data: achievementNotifications,
      isLoading,
      isFetching,
    } = useQuery({
      queryKey: ["achievement-notifications", user?.id],
      queryFn: checkingPlusNotifyingAchievementsAction,
      enabled: Boolean(user),
      refetchInterval: 5 * 60_000,
    });

    useEffect(() => {
      if (
        !isLoading &&
        !isFetching &&
        achievementNotifications &&
        achievementNotifications.data &&
        achievementNotifications.data.length !== 0
      )
        achievementNotifications.data.forEach((achievement) => {
          toast.success(`Achievement Unlocked! 🎉`, {
            description: `${achievement.name}: ${achievement.description}`,
            duration: 5000,
          });
        });
    }, [achievementNotifications, isLoading, isFetching]);

    return achievementNotifications;
  };
