"use client";

// REVIEWED

import { useQuery } from "@tanstack/react-query";

import { getUserAchievements } from "@/actions/user-achievements";

export const useUserAchievements = function useUserAchievements() {
  return useQuery({
    queryKey: ["user-achievements"],
    queryFn: () => getUserAchievements(),
    staleTime: 60 * 60 * 1000, // 60 minutes - achievements don't change frequently
    gcTime: 24 * 60 * 60 * 1000, // 24 hours
  });
};
