"use client";

// REVIEWED

import { useQuery } from "@tanstack/react-query";

import { getPublicUserStats } from "@/actions/public-user-stats";

export const usePublicUserStats = function usePublicUserStats(userId: number) {
  return useQuery({
    queryKey: ["public-user-stats", userId],
    queryFn: () => getPublicUserStats(userId),
  });
};
