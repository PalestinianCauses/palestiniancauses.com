"use server";

// REVIEWED

import { messages } from "@/lib/messages";
import { actionSafeExecute } from "@/lib/network";
import { payload } from "@/lib/payload";
import { ResponseSafeExecute } from "@/lib/types";
import { Media } from "@/payload-types";

import { getAuthentication } from "./auth";

export const uploadMedia = async function uploadMedia({
  file,
  alt,
}: {
  file: File;
  alt: string;
}): Promise<ResponseSafeExecute<Media, string>> {
  const auth = await getAuthentication();

  if (!auth)
    return {
      data: null,
      error: messages.actions.user.unAuthenticated,
    };

  if (!file)
    return {
      data: null,
      error: messages.actions.media.upload.noFile,
    };

  // Convert File to Buffer for PayLoad
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const response = await actionSafeExecute(
    payload.create({
      collection: "media",
      data: { alt: alt || file.name },
      file: {
        data: buffer,
        mimetype: file.type,
        name: file.name,
        size: file.size,
      },
    }),
    messages.actions.media.upload.serverError,
  );

  return response;
};
