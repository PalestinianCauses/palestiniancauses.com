"use server";

// REVIEWED - 02

import { messages } from "@/lib/messages";
import { actionSafeExecute } from "@/lib/network";
import { payload } from "@/lib/payload";
import { ResponseSafeExecute } from "@/lib/types";
import { User } from "@/payload-types";

import { getUserStats } from "./user-stats";

export type PublicUserStats = {
  user: User;
  comments: number;
  diaryEntries: number;
  orders: number;
};

// public information no need to override access
export const getPublicUserStats = async function getPublicUserStats(
  userId: number,
): Promise<ResponseSafeExecute<PublicUserStats>> {
  const userResponse = await actionSafeExecute(
    payload.findByID({
      collection: "users",
      id: userId,
      depth: 1,
    }),
    messages.actions.user.serverError,
  );

  if (!userResponse.data || userResponse.error) return userResponse;

  const user = userResponse.data;

  const privacySettings = user.privacySettings || {
    showEmail: false,
    showActivity: true,
    showAchievements: true,
    showOrders: false,
  };

  const statsResponse = await getUserStats(userId);

  if (!statsResponse.data || statsResponse.error)
    return {
      data: null,
      error: statsResponse.error,
    };

  return {
    data: {
      user,
      comments: privacySettings.showActivity ? statsResponse.data.comments : 0,
      diaryEntries: privacySettings.showActivity
        ? statsResponse.data.diaryEntries
        : 0,
      orders: privacySettings.showOrders ? statsResponse.data.orders : 0,
    },
    error: null,
  };
};
