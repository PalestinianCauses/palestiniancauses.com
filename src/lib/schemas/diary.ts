// REVIEWED - 02

import { z } from "zod";

import { messages } from "../errors";

export const diaryEntrySchema = z.object({
  title: z
    .string()
    .min(2, messages.forms.required("diary title"))
    .max(100, messages.forms.maxLength("diary title", 100)),
  date: z
    .preprocess(
      (value) => {
        if (value instanceof Date) return value;
        if (typeof value === "string") {
          const date = new Date(value);
          return Number.isNaN(date.getTime()) ? value : date;
        }

        return value;
      },
      z.date({ invalid_type_error: messages.forms.valid("diary date") }),
    )
    .refine(
      (date) => {
        const today = new Date();
        today.setUTCHours(0, 0, 0, 0);

        const yesterday = new Date(today);
        yesterday.setUTCDate(today.getUTCDate() - 1);

        const october7th2023 = new Date(2023, 9, 7);
        october7th2023.setUTCHours(0, 0, 0, 0);

        return (
          date.getTime() <= yesterday.getTime() &&
          date.getTime() > october7th2023.getTime()
        );
      },
      {
        message: messages.forms.diaryEntry.date(
          "October 7th. 2023",
          "yesterday",
        ),
      },
    ),
  content: z.string().min(2500, messages.forms.diaryEntry.content),
  isAuthentic: z.boolean(),
  isAnonymous: z.boolean(),
});

export type DiaryEntrySchema = z.infer<typeof diaryEntrySchema>;
