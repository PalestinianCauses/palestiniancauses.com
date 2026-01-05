"use server";

// REVIEWED - 02

import { messages } from "@/lib/messages";
import { actionSafeExecute } from "@/lib/network";
import { payload } from "@/lib/payload";
import { ResponseSafeExecute } from "@/lib/types";

import { getAuthentication } from "./auth";

type UserActivityDiaryEntriesStats = {
  total: number;
  approved: number;
  pending: number;
  rejected: number;
};

export const getUserActivityDiaryEntriesStats =
  async function getUserActivityDiaryEntriesStats(): Promise<
    ResponseSafeExecute<UserActivityDiaryEntriesStats>
  > {
    const authentication = await getAuthentication();

    if (!authentication)
      return { data: null, error: messages.actions.user.unAuthenticated };

    const user = authentication;

    const [responseApproved, responsePending, responseRejected] =
      await Promise.all([
        actionSafeExecute(
          payload.count({
            req: { user },
            user,
            collection: "diary-entries",
            where: {
              author: { equals: user.id },
              status: { equals: "approved" },
            },
            overrideAccess: false,
          }),
          messages.actions.diaryEntry.serverErrorGet,
        ),
        actionSafeExecute(
          payload.count({
            req: { user },
            user,
            collection: "diary-entries",
            where: {
              author: { equals: user.id },
              status: { equals: "pending" },
            },
            overrideAccess: false,
          }),
          messages.actions.diaryEntry.serverErrorGet,
        ),
        actionSafeExecute(
          payload.count({
            req: { user },
            user,
            collection: "diary-entries",
            where: {
              author: { equals: user.id },
              status: { equals: "rejected" },
            },
            overrideAccess: false,
          }),
          messages.actions.diaryEntry.serverErrorGet,
        ),
      ]);

    if (
      !responseApproved.data ||
      !responsePending.data ||
      !responseRejected.data ||
      responseApproved.error ||
      responsePending.error ||
      responseRejected.error
    )
      return { data: null, error: messages.actions.diaryEntry.serverErrorGet };

    return {
      data: {
        total:
          responseApproved.data.totalDocs +
          responsePending.data.totalDocs +
          responseRejected.data.totalDocs,
        approved: responseApproved.data.totalDocs,
        pending: responsePending.data.totalDocs,
        rejected: responseRejected.data.totalDocs,
      },
      error: null,
    };
  };
