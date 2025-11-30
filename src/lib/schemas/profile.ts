// REVIEWED

import { z } from "zod";

import { messages } from "../messages";

export const profileSchema = z.object({
  firstName: z.string().min(1, messages.forms.required("first name")),
  lastName: z.string().min(1, messages.forms.required("last name")),
  email: z
    .string()
    .email(messages.forms.valid("email"))
    .min(2, messages.forms.required("email")),
  bio: z.string().max(500, messages.forms.maxLength("bio", 500)).optional(),
  github: z.string().optional(),
  instagram: z.string().optional(),
  twitter: z.string().optional(),
  linkedin: z.string().optional(),
  website: z
    .string()
    .url(messages.forms.valid("website URL"))
    .or(z.literal(""))
    .optional(),
  showEmail: z.boolean(),
  showActivity: z.boolean(),
  showAchievements: z.boolean(),
  showOrders: z.boolean(),
});

export type ProfileSchema = z.infer<typeof profileSchema>;
