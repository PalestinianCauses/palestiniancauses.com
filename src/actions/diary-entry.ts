"use server";

// REVIEWED - 13

import { httpStatusesMessages, messages } from "@/lib/messages";
import { actionSafeExecute } from "@/lib/network";
import { payload } from "@/lib/payload";
import { ErrorPayload, ResponseSafeExecute } from "@/lib/types";
import { isResponseError } from "@/lib/types/guards";
import { DiaryEntry, User } from "@/payload-types";

import { getAuthentication } from "./auth";
import { notifySubscribers } from "./notification-subscription";

export const createDiaryEntry = async function createDiaryEntry(
  data: Omit<
    DiaryEntry,
    "id" | "status" | "author" | "createdAt" | "updatedAt"
  >,
): Promise<ResponseSafeExecute<string, string>> {
  const auth = await getAuthentication();

  if (!auth || !auth.user) {
    return {
      data: null,
      error: messages.actions.diaryEntry.unAuthenticated,
    };
  }

  const { user } = auth;

  const response = await actionSafeExecute<DiaryEntry, ErrorPayload>(
    payload.create({
      collection: "diary-entries",
      data: {
        title: data.title,
        date: data.date,
        content: data.content,
        status:
          user.role === "admin" || user.role === "system-user"
            ? "approved"
            : "pending",
        author: user,
        isAuthentic: data.isAuthentic,
        isAnonymous: data.isAnonymous,
      },
    }),
    messages.actions.diaryEntry.serverErrorShare,
    isResponseError,
  );

  if (!response.data || response.error) {
    if (typeof response.error === "string")
      return { data: null, error: response.error };

    if (response.error.status === 400)
      return {
        data: null,
        error: messages.actions.diaryEntry.unique(data.title),
      };

    if (response.error.status === 401 || response.error.status === 403)
      return {
        data: null,
        error: httpStatusesMessages.diaryEntry[response.error.status],
      };

    return { data: null, error: messages.actions.diaryEntry.serverErrorShare };
  }

  if (user.role === "admin" || user.role === "system-user") {
    const url = `${process.env.NEXT_PUBLIC_URL}/humans-but-from-gaza/${response.data.id}`;
    await notifySubscribers({
      title: data.title,
      body: "A new diary entry has been published.",
      data: { url },
    });
  }

  return {
    data:
      user.role === "admin" || user.role === "system-user"
        ? messages.actions.diaryEntry.successPCAuthor
        : messages.actions.diaryEntry.success,
    error: null,
  };
};

export const getDiaryEntry = async function getDiaryEntry(
  id: number,
): Promise<ResponseSafeExecute<DiaryEntry>> {
  const response = await actionSafeExecute(
    payload.findByID({
      collection: "diary-entries",
      id,
      depth: 0,
    }),
    messages.actions.diaryEntry.serverErrorGet,
  );

  return response;
};

export const getDiaryEntryAuthor = async function getDiaryEntryAuthor(
  id: number,
): Promise<ResponseSafeExecute<Partial<User>>> {
  const response = await actionSafeExecute(
    payload.findByID({
      collection: "users",
      id,
      select: { firstName: true, lastName: true, role: true },
    }),
    messages.actions.diaryEntry.author.serverError,
  );

  return response;
};
