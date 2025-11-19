"use server";

// REVIEWED

import { messages } from "@/lib/messages";
import { actionSafeExecute } from "@/lib/network";
import { payload } from "@/lib/payload";
import { ResponseSafeExecute } from "@/lib/types";
import { User } from "@/payload-types";

export type PublicUserStats = {
  user: User;
  comments: number;
  diaryEntries: number;
  orders: number;
};

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

  const [comments, diaryEntries, orders] = await Promise.all([
    privacySettings.showActivity
      ? actionSafeExecute(
          payload.count({
            collection: "comments",
            where: { user: { equals: userId }, status: { equals: "approved" } },
          }),
          messages.actions.comment.serverErrorGet,
        )
      : { data: { totalDocs: 0 }, error: null },
    privacySettings.showActivity
      ? actionSafeExecute(
          payload.count({
            collection: "diary-entries",
            where: {
              author: { equals: userId },
              status: { equals: "approved" },
            },
          }),
          messages.actions.diaryEntry.serverErrorGet,
        )
      : { data: { totalDocs: 0 }, error: null },
    privacySettings.showOrders
      ? actionSafeExecute(
          payload.count({
            collection: "orders",
            where: { user: { equals: userId } },
          }),
          messages.actions.order.serverErrorGet,
        )
      : { data: { totalDocs: 0 }, error: null },
  ]);

  return {
    data: {
      user,
      comments: comments.data?.totalDocs ?? 0,
      diaryEntries: diaryEntries.data?.totalDocs ?? 0,
      orders: orders.data?.totalDocs ?? 0,
    },
    error: null,
  };
};
