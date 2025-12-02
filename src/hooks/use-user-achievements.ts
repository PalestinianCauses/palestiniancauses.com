"use client";

// REVIEWED - 02

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
  });
};
