"use client";

// REVIEWED - 01

import { useQuery } from "@tanstack/react-query";

import { getUserAchievements } from "@/actions/user-achievements";

export const useUserAchievements = function useUserAchievements({
  userId,
}: {
  userId?: number;
}) {
  return useQuery({
    queryKey: ["user-achievements", userId],
    queryFn: () => getUserAchievements(),
    staleTime: 60 * 60 * 1000, // 60 minutes - achievements don't change frequently
    gcTime: 24 * 60 * 60 * 1000, // 24 hours
  });
};
