"use server";

// REVIEWED - 02

import { messages } from "@/lib/messages";
import { actionSafeExecute } from "@/lib/network";
import { payload } from "@/lib/payload";
import { ResponseSafeExecute } from "@/lib/types";

import { getAuthentication } from "./auth";

export type UserStats = {
  comments: number;
  diaryEntries: number;
  orders: number;
  activityRecent: Array<{
    type: "comment" | "diary-entry" | "order";
    title: string;
    date: string;
    link?: string;
  }>;
};

export const getUserStats = async function getUserStats(
  userId?: number,
): Promise<ResponseSafeExecute<UserStats>> {
  let targetUserId: number;

  if (userId !== undefined) targetUserId = userId;
  else {
    const auth = await getAuthentication();

    if (!auth)
      return {
        data: { comments: 0, diaryEntries: 0, orders: 0, activityRecent: [] },
        error: null,
      };

    targetUserId = auth.id;
  }

  const [
    commentsCount,
    diaryEntriesCount,
    ordersCount,
    commentsRecent,
    diaryEntriesRecent,
    ordersRecent,
  ] = await Promise.all([
    actionSafeExecute(
      payload.count({
        collection: "comments",
        where: {
          user: {
            equals: targetUserId,
          },
          status: {
            equals: "approved",
          },
        },
        depth: 0,
      }),
      messages.actions.comment.serverErrorGet,
    ),
    actionSafeExecute(
      payload.count({
        collection: "diary-entries",
        where: {
          author: {
            equals: targetUserId,
          },
          status: {
            equals: "approved",
          },
          isAnonymous: {
            equals: false,
          },
        },
        depth: 0,
      }),
      messages.actions.diaryEntry.serverErrorGet,
    ),
    actionSafeExecute(
      payload.count({
        collection: "orders",
        where: { user: { equals: targetUserId } },
        depth: 0,
      }),
      messages.actions.order.serverErrorGet,
    ),
    actionSafeExecute(
      payload.find({
        collection: "comments",
        where: {
          user: {
            equals: targetUserId,
          },
          status: {
            equals: "approved",
          },
        },
        sort: "-createdAt",
        limit: 3,
        depth: 1,
      }),
      messages.actions.comment.serverErrorGet,
    ),
    actionSafeExecute(
      payload.find({
        collection: "diary-entries",
        where: {
          author: {
            equals: targetUserId,
          },
          status: {
            equals: "approved",
          },
          isAnonymous: {
            equals: false,
          },
        },
        sort: "-createdAt",
        limit: 3,
        depth: 1,
      }),
      messages.actions.diaryEntry.serverErrorGet,
    ),
    actionSafeExecute(
      payload.find({
        collection: "orders",
        where: { user: { equals: targetUserId } },
        sort: "-createdAt",
        limit: 3,
        depth: 1,
      }),
      messages.actions.order.serverErrorGet,
    ),
  ]);

  const activityRecent: UserStats["activityRecent"] = [
    ...(commentsRecent.data
      ? commentsRecent.data.docs.map((comment) => ({
          type: "comment" as const,
          title: comment.content,
          date: comment.createdAt,
          link: `/comment/${comment.id}`,
        }))
      : []),
    ...(diaryEntriesRecent.data
      ? diaryEntriesRecent.data.docs.map((entry) => ({
          type: "diary-entry" as const,
          title: entry.title,
          date: entry.createdAt,
          link: `/humans-but-from-gaza/${entry.id}`,
        }))
      : []),
    ...(ordersRecent.data
      ? ordersRecent.data.docs.map((order) => ({
          type: "order" as const,
          title: `Order #${order.id}`,
          date: order.createdAt,
          link: undefined,
        }))
      : []),
  ]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10);

  return {
    data: {
      comments: commentsCount.data ? commentsCount.data.totalDocs : 0,
      diaryEntries: diaryEntriesCount.data
        ? diaryEntriesCount.data.totalDocs
        : 0,
      orders: ordersCount.data ? ordersCount.data.totalDocs : 0,
      activityRecent,
    },
    error: null,
  };
};
