"use server";

// REVIEWED - 01

import { httpStatusesMessages, messages } from "@/lib/errors";
import { payload } from "@/lib/payload";
import { isError } from "@/lib/payload/utils";
import { actionTryCatch, ActionTryCatchReturn } from "@/lib/utils";
import { DiaryEntry } from "@/payload-types";

export const createDiaryEntry = async function createDiaryEntry(
  data: Omit<DiaryEntry, "id" | "status" | "createdAt" | "updatedAt">,
) {
  const response: ActionTryCatchReturn<string, string> = {
    data: null,
    error: null,
  };

  const user = typeof data.author === "object" ? data.author : null;

  if (!user) {
    response.error = messages.actions.diaryEntry.unAuthenticated;
    return response;
  }

  const { data: diaryEntryData, error: diaryEntryError } = await actionTryCatch(
    payload.create({
      collection: "diary-entries",
      data: { ...data, status: "pending", author: data.author },
      req: { user: { ...user, collection: "users" } },
      overrideAccess: false,
    }),
  );

  if (diaryEntryError) {
    if (
      isError(diaryEntryError) &&
      (diaryEntryError.status === 400 ||
        diaryEntryError.status === 401 ||
        diaryEntryError.status === 403)
    )
      response.error =
        diaryEntryError.status === 400
          ? messages.actions.diaryEntry.unique(data.title)
          : httpStatusesMessages[diaryEntryError.status].diaryEntry;
    else response.error = httpStatusesMessages[500].diaryEntry;

    return response;
  }

  if (diaryEntryData) {
    response.data = messages.actions.diaryEntry.success;
    return response;
  }

  if (
    (response.data && response.error) ||
    (!response.data && !response.error)
  ) {
    response.error = httpStatusesMessages[500].http;
  }

  return diaryEntryData;
};
