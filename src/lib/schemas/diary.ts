// REVIEWED - 07

import { z } from "zod";

import { messages } from "../messages";

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
        // Compare dates without mutating original date
        // Create new Date objects for comparison only
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const dateSelected = new Date(date);
        dateSelected.setHours(0, 0, 0, 0);

        // Allow any date in past or today, but not future dates
        return dateSelected.getTime() <= today.getTime();
      },
      {
        message: "Please enter a date that is not in the future.",
      },
    ),
  content: z.string().min(1500, messages.forms.diaryEntry.content),
  isAuthentic: z.boolean(),
  isAnonymous: z.boolean(),
});

export type DiaryEntrySchema = z.infer<typeof diaryEntrySchema>;
