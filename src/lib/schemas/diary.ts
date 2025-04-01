// REVIEWED

import { z } from "zod";

import { messages } from "../errors";

export const diaryEntrySchema = z.object({
  title: z.string().min(2, messages.forms.required("diary title")),
  date: z
    .date({ message: messages.forms.required("diary date") })
    .min(new Date("2023-07-10"), messages.forms.date("Oct 07, 2023", "today"))
    .max(
      new Date(Date.now() - 24 * 60 * 60 * 1000),
      messages.forms.date("Oct 10, 2023", "yesterday"),
    ),
  content: z.string().min(2, messages.forms.content),
  isAuthentic: z.boolean(),
  isAnonymous: z.boolean(),
});

export type DiaryEntrySchema = z.infer<typeof diaryEntrySchema>;
