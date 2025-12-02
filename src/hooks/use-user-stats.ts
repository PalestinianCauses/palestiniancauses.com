"use client";

// REVIEWED - 04

import { useQuery } from "@tanstack/react-query";

import { getUserStats } from "@/actions/user-stats";

export const useUserStats = function useUserStats({
  userId,
}: {
  userId?: number;
}) {
  const query = useQuery({
    queryKey: ["user-stats", userId],
    queryFn: async () => {
      const response = await getUserStats();
      return response;
    },
  });

  return query;
};
