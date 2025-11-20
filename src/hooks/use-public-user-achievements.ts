"use client";

// REVIEWED

import { useQuery } from "@tanstack/react-query";

import { getUserAchievements } from "@/actions/user-achievements";

export const usePublicUserAchievements = function usePublicUserAchievements(
  userId: number,
) {
  return useQuery({
    queryKey: ["public-user-achievements", userId],
    queryFn: () => getUserAchievements(userId),
  });
};
