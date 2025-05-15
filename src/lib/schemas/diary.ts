// REVIEWED - 03

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
        const end = new Date();
        end.setUTCDate(end.getUTCDate() - 1);
        end.setUTCHours(0, 0, 0, 0);

        const start = new Date(2023, 9, 7);
        start.setUTCHours(0, 0, 0, 0);

        return (
          date.getTime() > start.getTime() && date.getTime() <= end.getTime()
        );
      },
      {
        message: messages.forms.date(
          new Date(2023, 9, 7).toLocaleDateString(),
          "yesterday",
        ),
      },
    ),
  content: z.string().min(2500, messages.forms.diaryEntry.content),
  isAuthentic: z.boolean(),
  isAnonymous: z.boolean(),
});

export type DiaryEntrySchema = z.infer<typeof diaryEntrySchema>;
