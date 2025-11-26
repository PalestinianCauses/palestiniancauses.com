"use server";

// REVIEWED

import { messages } from "@/lib/messages";
import { actionSafeExecute } from "@/lib/network";
import { payload } from "@/lib/payload";
import { ResponseSafeExecute } from "@/lib/types";

import { getAuthentication } from "./auth";

type UserActivityCommentsStats = {
  total: number;
  approved: number;
  pending: number;
  rejected: number;
};

export const getUserActivityCommentsStats =
  async function getUserActivityCommentsStats(): Promise<
    ResponseSafeExecute<UserActivityCommentsStats>
  > {
    const authentication = await getAuthentication();

    if (!authentication)
      return { data: null, error: messages.actions.user.unAuthenticated };

    const user = authentication;

    const [responseApproved, responsePending, responseRejected] =
      await Promise.all([
        actionSafeExecute(
          payload.count({
            collection: "comments",
            where: {
              user: { equals: user.id },
              status: { equals: "approved" },
            },
          }),
          messages.actions.comment.serverErrorGet,
        ),
        actionSafeExecute(
          payload.count({
            collection: "comments",
            where: { user: { equals: user.id }, status: { equals: "pending" } },
          }),
          messages.actions.comment.serverErrorGet,
        ),
        actionSafeExecute(
          payload.count({
            collection: "comments",
            where: {
              user: { equals: user.id },
              status: { equals: "rejected" },
            },
          }),
          messages.actions.comment.serverErrorGet,
        ),
      ]);

    if (
      !responseApproved.data ||
      !responsePending.data ||
      !responseRejected.data ||
      responseApproved.error ||
      responsePending.error ||
      responseRejected.error
    ) {
      return { data: null, error: messages.actions.comment.serverErrorGet };
    }

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
