// REVIEWED - 01

import { createTemplateEmail } from "./email-templates";

export const createResetPassEmail = (resetPassLink: string): string =>
  createTemplateEmail({
    title: "Reset Your Password",
    titleSub: "You requested to reset your password",
    fields: [{ label: "Reset Link", value: resetPassLink, type: "text" }],
    footer:
      "This link will expire in 1 hour. In case you didn't request this password reset, please ignore this email.",
  });

export const createVerificationEmail = (verificationLink: string): string =>
  createTemplateEmail({
    title: "Verify Your Email Address",
    titleSub: "Welcome to PalestinianCauses! Please verify your email",
    fields: [
      {
        label: "Verification Link",
        value: verificationLink,
        type: "text",
      },
    ],
    footer:
      "This link will expire in 24 hours. In you didn't create an account, please ignore this email.",
  });

export const createVerificationChangeEmail = (
  newEmail: string,
  verificationLink: string,
): string =>
  createTemplateEmail({
    title: "Verify Your New Email Address",
    titleSub: `You requested to change your email to ${newEmail}`,
    fields: [
      {
        label: "New Email",
        value: newEmail,
        type: "email",
      },
      {
        label: "Verification Link",
        value: verificationLink,
        type: "text",
      },
    ],
    footer:
      "This link will expire in 24 hours. In case you didn't request this change, please contact support immediately.",
  });
