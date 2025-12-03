"use client";

// REVIEWED

import { ProfileStatistics } from "@/components/profile/statistics";
import { useUserActivityStats } from "@/hooks/use-user-stats";

export const PublicProfileStatistics = function PublicProfileStatistics({
  userId,
}: {
  userId: number;
}) {
  const { isLoading: isStatsLoading, data: stats } = useUserActivityStats({
    userId,
  });

  return <ProfileStatistics isStatsLoading={isStatsLoading} stats={stats} />;
};
