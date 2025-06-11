"use server";

// REVIEWED

import { list, ListBlobResult } from "@vercel/blob";

import { messages } from "@/lib/messages";
import { actionSafeExecute } from "@/lib/network";
import { ResponseSafeExecute } from "@/lib/types";

export const getBlobsByPrefix = async function getBlobsByPrefix(
  prefix: string,
): Promise<ResponseSafeExecute<ListBlobResult>> {
  const response = await actionSafeExecute(
    list({ prefix, token: process.env.BLOB_READ_WRITE_TOKEN }),
    messages.actions.blob.serverError,
  );

  if (!response.data || response.error)
    return {
      data: null,
      error: response.error,
    };

  return response;
};
