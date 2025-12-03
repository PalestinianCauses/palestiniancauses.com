"use client";

// REVIEWED - 01

import { useQuery } from "@tanstack/react-query";

import { getUserAchievements } from "@/actions/user-achievements";

export const usePublicUserAchievements = function usePublicUserAchievements({
  userId,
}: {
  userId?: number;
}) {
  return useQuery({
    queryKey: ["public-user-achievements", userId],
    queryFn: () => getUserAchievements(userId),
  });
};
