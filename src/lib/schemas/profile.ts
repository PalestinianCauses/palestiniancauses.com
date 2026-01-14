// REVIEWED - 02

import { z } from "zod";

import { messages } from "../messages";
import { isResilientPassword } from "../utils/passwords";

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
  room: z.number().optional(),
  showEmail: z.boolean(),
  showActivity: z.boolean(),
  showAchievements: z.boolean(),
  showOrders: z.boolean(),
});

export const updatePassSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, messages.forms.required("current password")),
    newPassword: z.string().min(1, messages.forms.required("new password")),
    confirmPassword: z
      .string()
      .min(1, messages.forms.required("password confirmation")),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message:
      "The passwords entered do not match. Kindly ensure both fields contain same password.",
    path: ["confirmPassword"],
  })
  .refine((data) => isResilientPassword(data.newPassword, 8), {
    message: messages.actions.auth.signUp.password,
    path: ["newPassword"],
  });

export type ProfileSchema = z.infer<typeof profileSchema>;
export type UpdatePassSchema = z.infer<typeof updatePassSchema>;
