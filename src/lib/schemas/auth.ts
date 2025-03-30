// REVIEWED - 02

import { z } from "zod";

import { messages } from "../errors";

export const signInSchema = z.object({
  email: z
    .string()
    .email(messages.forms.valid("email"))
    .min(2, messages.forms.required("email")),
  password: z.string().min(2, messages.forms.required("password")),
});

export const signUpSchema = z.object({
  firstName: z.string().min(2, messages.forms.required("first name")),
  lastName: z.string().min(2, messages.forms.required("last name")),
  email: z
    .string()
    .email(messages.forms.valid("email"))
    .min(2, messages.forms.required("email")),
  password: z.string().min(8, messages.forms.required("password")),
});

export type SignInSchema = z.infer<typeof signInSchema>;
export type SignUpSchema = z.infer<typeof signUpSchema>;
