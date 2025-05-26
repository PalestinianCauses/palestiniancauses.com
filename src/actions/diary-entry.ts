"use server";

// REVIEWED - 09

import { httpStatusesMessages, messages } from "@/lib/messages";
import { actionSafeExecute } from "@/lib/network";
import { payload } from "@/lib/payload";
import { ErrorPayload, ResponseSafeExecute } from "@/lib/types";
import { isResponseError } from "@/lib/types/guards";
import { DiaryEntry, User } from "@/payload-types";

import { notifySubscribers } from "./notification-subscription";

export const createDiaryEntry = async function createDiaryEntry(
  data: Omit<DiaryEntry, "id" | "status" | "createdAt" | "updatedAt">,
): Promise<ResponseSafeExecute<string>> {
  const author = typeof data.author === "object" ? data.author : null;

  if (!author) {
    return {
      data: null,
      error: messages.actions.diaryEntry.unAuthenticated,
    };
  }

  const responseDiaryEntry = await actionSafeExecute<DiaryEntry, ErrorPayload>(
    payload.create({
      collection: "diary-entries",
      data: {
        ...data,
        status:
          author.role === "admin" || author.role === "system-user"
            ? "approved"
            : "pending",
        author,
      },
    }),
    messages.actions.diaryEntry.serverErrorShare,
    isResponseError,
  );

  if (!responseDiaryEntry.data || responseDiaryEntry.error) {
    const response = {
      data: null,
      error: messages.actions.diaryEntry.serverErrorShare,
    };

    if (typeof responseDiaryEntry.error !== "string")
      if (responseDiaryEntry.error.status === 400)
        response.error = messages.actions.diaryEntry.unique(data.title);
      else if (
        responseDiaryEntry.error.status === 401 ||
        responseDiaryEntry.error.status === 403
      )
        response.error =
          httpStatusesMessages.diaryEntry[responseDiaryEntry.error.status];

    return response;
  }

  if (author.role === "admin" || author.role === "system-user")
    await notifySubscribers({
      title: data.title,
      body: "A new diary entry has been published.",
      data: { url: `/humans-but-from-gaza/${responseDiaryEntry.data.id}` },
    });

  return {
    data:
      author.role === "admin" || author.role === "system-user"
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
