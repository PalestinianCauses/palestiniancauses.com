"use client";

// REVIEWED - 01

import { useQuery } from "@tanstack/react-query";

import { getUserStats } from "@/actions/user-stats";

export const useUserStats = function useUserStats() {
  const query = useQuery({
    queryKey: ["user-stats"],
    queryFn: () => getUserStats(),
    staleTime: 60 * 60 * 1000, // 60 minutes - stats don't change frequently
    gcTime: 24 * 60 * 60 * 1000, // 24 hours
  });

  return query;
};
