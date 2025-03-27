// REVIEWED

import { z } from "zod";

import { messages } from "../errors";

export const signInSchema = z.object({
  email: z
    .string()
    .email(messages.forms.required("email"))
    .min(2, messages.forms.required("email")),
  password: z.string().min(2, messages.forms.required("password")),
});

export type SignInSchema = z.infer<typeof signInSchema>;
