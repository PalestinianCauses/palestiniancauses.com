// REVIEWED

import { z } from "zod";

import { messages } from "../messages";

export const createCommentSchema = z.object({
  content: z
    .string()
    .min(12, messages.forms.minLength("comment", 12))
    .max(1200, messages.forms.maxLength("comment", 1200)),
});

export type CreateCommentSchema = z.infer<typeof createCommentSchema>;
