"use client";

// REVIEWED - 05

import { useQuery } from "@tanstack/react-query";

import { getUserActivityStats } from "@/actions/user-stats";

export const useUserActivityStats = function useUserActivityStats({
  userId,
}: {
  userId?: number;
}) {
  const query = useQuery({
    queryKey: ["user-stats", userId],
    queryFn: async () => {
      const response = await getUserActivityStats(userId);
      return response;
    },
  });

  return query;
};
