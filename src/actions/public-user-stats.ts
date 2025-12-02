"use server";

// REVIEWED - 03

import { messages } from "@/lib/messages";
import { actionSafeExecute } from "@/lib/network";
import { payload } from "@/lib/payload";
import { ResponseSafeExecute } from "@/lib/types";
import { User } from "@/payload-types";

import { getUser } from "./user";

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
  const userResponse = await getUser(userId);

  if (!userResponse.data || userResponse.error) return userResponse;

  const user = userResponse.data;

  const [commentsCount, diaryEntriesCount, ordersCount] = await Promise.all([
    actionSafeExecute(
      payload.count({
        collection: "comments",
        where: { user: { equals: user.id }, status: { equals: "approved" } },
      }),
      messages.actions.comment.serverErrorGet,
    ),
    actionSafeExecute(
      payload.count({
        collection: "diary-entries",
        where: {
          author: { equals: user.id },
          status: { equals: "approved" },
          isAnonymous: { equals: false },
        },
      }),
      messages.actions.diaryEntry.serverErrorGet,
    ),
    actionSafeExecute(
      payload.count({
        collection: "orders",
        where: { user: { equals: user.id } },
      }),
      messages.actions.order.serverErrorGet,
    ),
  ]);

  return {
    data: {
      user,
      comments: commentsCount.data ? commentsCount.data.totalDocs : 0,
      diaryEntries: diaryEntriesCount.data
        ? diaryEntriesCount.data.totalDocs
        : 0,
      orders: ordersCount.data ? ordersCount.data.totalDocs : 0,
    },
    error: null,
  };
};
