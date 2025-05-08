"use server";

// REVIEWED - 0٧

import { httpStatusesMessages, messages } from "@/lib/errors";
import { payload } from "@/lib/payload";
import { ErrorPayload } from "@/lib/payload/types";
import { isError } from "@/lib/payload/utils";
import { ActionSafeExecute, actionSafeExecute } from "@/lib/utils";
import { DiaryEntry, User } from "@/payload-types";

import { notifySubscribers } from "./notification-subscription";

export const createDiaryEntry = async function createDiaryEntry(
  data: Omit<DiaryEntry, "id" | "status" | "createdAt" | "updatedAt">,
): Promise<ActionSafeExecute<string, string>> {
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
    isError,
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
          httpStatusesMessages[responseDiaryEntry.error.status].diaryEntry;

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
): Promise<ActionSafeExecute<DiaryEntry, string>> {
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
): Promise<ActionSafeExecute<Partial<User>, string>> {
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
