"use server";

// REVIEWED - 20

import { revalidatePath } from "next/cache";

import { httpStatusesMessages, messages } from "@/lib/messages";
import { actionSafeExecute } from "@/lib/network";
import { payload } from "@/lib/payload";
import { hasPermission } from "@/lib/permissions";
import { getAuthentication } from "@/lib/server/auth";
import { ErrorPayload, ResponseSafeExecute } from "@/lib/types";
import { isResponseError } from "@/lib/types/guards";
import { DiaryEntry } from "@/payload-types";

import { notifySubscribers } from "./notification-subscription";

export const createDiaryEntry = async function createDiaryEntry(
  data: Omit<
    DiaryEntry,
    "id" | "status" | "author" | "createdAt" | "updatedAt"
  >,
): Promise<ResponseSafeExecute<string, string>> {
  const auth = await getAuthentication();

  if (!auth) {
    return {
      data: null,
      error: messages.actions.diaryEntry.unAuthenticated,
    };
  }

  const response = await actionSafeExecute<DiaryEntry, ErrorPayload>(
    payload.create({
      req: { user: { ...auth, collection: "users" } },
      user: auth,
      collection: "diary-entries",
      data: {
        title: data.title,
        date: data.date,
        content: data.content,
        status: hasPermission(auth, {
          resource: "diary-entries",
          action: "publish",
        })
          ? "approved"
          : "pending",
        author: auth,
        isAuthentic: data.isAuthentic,
        isAnonymous: data.isAnonymous,
      },
      overrideAccess: false,
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

  if (hasPermission(auth, { resource: "diary-entries", action: "publish" })) {
    const url = `${process.env.NEXT_PUBLIC_URL}/humans-but-from-gaza/${response.data.id}`;
    await notifySubscribers({
      title: data.title,
      body: "A new diary entry has been published.",
      data: { url },
    });
  }

  return {
    data: hasPermission(auth, { resource: "diary-entries", action: "publish" })
      ? messages.actions.diaryEntry.successPCAuthor
      : messages.actions.diaryEntry.success,
    error: null,
  };
};

export const deleteDiaryEntry = async function deleteDiaryEntry(
  id: number,
): Promise<ResponseSafeExecute<string, string>> {
  const auth = await getAuthentication();

  if (!auth)
    return { data: null, error: messages.actions.user.unAuthenticated };

  const response = await actionSafeExecute(
    payload.delete({
      collection: "diary-entries",
      id,
    }),
    messages.actions.diaryEntry.delete.serverError,
  );

  if (!response.data || response.error) return response;

  // Comments are automatically deleted via collection beforeDelete hook

  revalidatePath("/profile");

  return { data: messages.actions.diaryEntry.delete.success, error: null };
};
