// REVIEWED - 05

import { z } from "zod";

import { messages } from "../messages";
import { isResilientPassword } from "../utils/passwords";

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
  password: z
    .string()
    .min(8, messages.forms.required("password"))
    .refine(
      (value) => isResilientPassword(value, 8),
      messages.actions.auth.signUp.password,
    ),
});

export const forgotPassSchema = z.object({
  email: z
    .string()
    .email(messages.forms.valid("email"))
    .min(2, messages.forms.required("email")),
});

export const resetPassSchema = z
  .object({
    password: z.string().min(1, messages.forms.required("password")),
    confirmPassword: z
      .string()
      .min(1, messages.forms.required("password confirmation")),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message:
      "The passwords entered do not match. Kindly ensure both fields contain same password.",
    path: ["confirmPassword"],
  })
  .refine((data) => isResilientPassword(data.password, 8), {
    message: messages.actions.auth.signUp.password,
    path: ["password"],
  });

export type SignInSchema = z.infer<typeof signInSchema>;
export type SignUpSchema = z.infer<typeof signUpSchema>;
export type ForgotPassSchema = z.infer<typeof forgotPassSchema>;
export type ResetPassSchema = z.infer<typeof resetPassSchema>;
