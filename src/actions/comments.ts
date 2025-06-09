"use server";

// REVIEWED - 01

import { messages } from "@/lib/messages";
import { actionSafeExecute } from "@/lib/network";
import { payload } from "@/lib/payload";
import { ResponseSafeExecute } from "@/lib/types";
import { Comment } from "@/payload-types";

export const createComment = async function createComment(
  data: Omit<Comment, "id" | "createdAt" | "updatedAt">,
): Promise<ResponseSafeExecute<string, string>> {
  const response = await actionSafeExecute(
    payload.create({
      collection: "comments",
      data,
      overrideAccess: false,
    }),
    messages.actions.comment.serverErrorCreate,
  );

  if (response.data && !response.error)
    return { data: messages.actions.comment.successCreate, error: null };

  //     revalidatePath(
  //       data.on.relationTo === "diary-entries"
  //         ? `/humans-but-from-gaza/${typeof data.on.value === "number" ? data.on.value : data.on.value.id}`
  //         : `/blogs/${typeof data.on.value === "number" ? data.on.value : data.on.value.id}`,
  //     );

  return response;
};
