"use server";

// REVIEWED - 05

import { messages } from "@/lib/messages";
import { actionSafeExecute } from "@/lib/network";
import { payload } from "@/lib/payload";
import { ResponseSafeExecute } from "@/lib/types";
import { User } from "@/payload-types";

import { getAuthentication } from "./auth";
import { getUser } from "./user";

export type UserStats = {
  id: number;
  type: "comment" | "diary-entry" | "order";
  createdAt: string;
};

export const getUserActivityStats = async function getUserActivityStats(
  userId?: number,
): Promise<ResponseSafeExecute<UserStats[]>> {
  let user: User;

  if (userId) {
    const userResponse = await getUser(userId);
    if (!userResponse.data || userResponse.error)
      return { data: null, error: messages.actions.user.notFound };
    if (!userResponse.data.privacySettings.showActivity)
      return { data: null, error: messages.actions.user.notFound };
    user = userResponse.data;
  } else {
    const authentication = await getAuthentication();
    if (!authentication)
      return { data: null, error: messages.actions.user.unAuthenticated };
    user = authentication;
  }

  const [responseComments, responseDiaryEntries, responseOrders] =
    await Promise.all([
      actionSafeExecute(
        payload.find({
          ...(!userId
            ? {
                req: { user: { collection: "users", ...user } },
                user,
                overrideAccess: false,
              }
            : {}),
          collection: "comments",
          where: { user: { equals: user.id } },
          select: { id: true, createdAt: true },
        }),
        messages.actions.comment.serverErrorGet,
      ),
      actionSafeExecute(
        payload.find({
          ...(!userId
            ? {
                req: { user: { collection: "users", ...user } },
                user,
                overrideAccess: false,
              }
            : {}),
          collection: "diary-entries",
          where: { author: { equals: user.id } },
          select: { id: true, createdAt: true },
        }),
        messages.actions.diaryEntry.serverErrorGet,
      ),
      actionSafeExecute(
        payload.find({
          ...(!userId
            ? {
                req: { user: { collection: "users", ...user } },
                user,
                overrideAccess: false,
              }
            : {}),
          collection: "orders",
          where: { user: { equals: user.id } },
          select: { id: true, createdAt: true },
        }),
        messages.actions.order.serverErrorGet,
      ),
    ]);

  if (!responseComments.data || responseComments.error) return responseComments;

  if (!responseDiaryEntries.data || responseDiaryEntries.error)
    return responseDiaryEntries;

  if (!responseOrders.data || responseOrders.error) return responseOrders;

  const statsData: UserStats[] = [];

  statsData.push(
    ...responseComments.data.docs.map((comment) => ({
      id: comment.id,
      type: "comment" as const,
      createdAt: comment.createdAt,
    })),
  );
  statsData.push(
    ...responseDiaryEntries.data.docs.map((diaryEntry) => ({
      id: diaryEntry.id,
      type: "diary-entry" as const,
      createdAt: diaryEntry.createdAt,
    })),
  );
  statsData.push(
    ...responseOrders.data.docs.map((order) => ({
      id: order.id,
      type: "order" as const,
      createdAt: order.createdAt,
    })),
  );

  return { data: statsData, error: null };
};
