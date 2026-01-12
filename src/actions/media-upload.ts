"use server";

// REVIEWED - 06

import { messages } from "@/lib/messages";
import { actionSafeExecute } from "@/lib/network";
import { payload } from "@/lib/payload";
import { getAuthentication } from "@/lib/server/auth";
import { ResponseSafeExecute } from "@/lib/types";
import { MediaPrivate, MediaPublic } from "@/payload-types";

export const mediaUpload = async function mediaUpload({
  file,
  alt,
  collection = "media-public",
}: {
  file: File;
  alt: string;
  collection?: "media-private" | "media-public";
}): Promise<ResponseSafeExecute<MediaPrivate | MediaPublic, string>> {
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

  if (collection !== "media-private" && collection !== "media-public")
    return {
      data: null,
      error: messages.actions.media.upload.collectionError,
    };

  // Convert File to Buffer for PayLoad
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const response = await actionSafeExecute(
    payload.create({
      req: { user: { ...auth, collection: "users" } },
      user: auth,
      collection,
      data:
        collection === "media-private"
          ? { owner: auth.id, user: auth.id, alt: alt || file.name } // user for backward compatibility
          : { user: auth.id, alt: alt || file.name },
      file: {
        data: buffer,
        mimetype: file.type,
        name: file.name,
        size: file.size,
      },
      overrideAccess: false,
    }),
    messages.actions.media.upload.serverError,
  );

  return response;
};

export const mediaDelete = async function mediaDelete({
  id,
  collection = "media-public",
}: {
  id: number;
  collection?: "media-private" | "media-public";
}): Promise<ResponseSafeExecute<MediaPrivate | MediaPublic, string>> {
  const auth = await getAuthentication();

  if (!auth)
    return {
      data: null,
      error: messages.actions.user.unAuthenticated,
    };

  const response = await actionSafeExecute(
    payload.delete({
      req: { user: { ...auth, collection: "users" } },
      user: auth,
      collection,
      id,
      overrideAccess: false,
    }),
    messages.actions.media.upload.serverErrorDelete,
  );

  return response;
};
