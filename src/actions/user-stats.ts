"use server";

// REVIEWED - 03

import { messages } from "@/lib/messages";
import { actionSafeExecute } from "@/lib/network";
import { payload } from "@/lib/payload";
import { ResponseSafeExecute } from "@/lib/types";

import { getAuthentication } from "./auth";

export type UserStats = {
  id: number;
  type: "comment" | "diary-entry" | "order";
  createdAt: string;
};

export const getUserStats = async function getUserStats(): Promise<
  ResponseSafeExecute<UserStats[]>
> {
  const authentication = await getAuthentication();

  if (!authentication)
    return { data: null, error: messages.actions.user.unAuthenticated };

  const user = authentication;

  const responseComments = await actionSafeExecute(
    payload.find({
      ...(user
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
  );

  if (!responseComments.data || responseComments.error) return responseComments;

  const responseDiaryEntries = await actionSafeExecute(
    payload.find({
      ...(user
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
  );

  if (!responseDiaryEntries.data || responseDiaryEntries.error)
    return responseDiaryEntries;

  const responseOrders = await actionSafeExecute(
    payload.find({
      ...(user
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
  );

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
