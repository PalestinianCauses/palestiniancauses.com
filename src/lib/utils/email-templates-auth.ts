// REVIEWED - 05

import { createTemplateEmail } from "./email-templates";

export const createResetPassEmail = (resetPassLink: string): string =>
  createTemplateEmail({
    title: "Reset Your Password",
    titleSub: "You requested to reset your password",
    fields: [
      {
        label: "Your Reset Password Link",
        value: resetPassLink,
        type: "link",
      },
    ],
    footer:
      "This link will expire in 1 hour.<br>IF YOU DID NOT REQUEST THIS PASSWORD RESET, IGNORE THIS EMAIL.",
  });

export const createVerificationEmail = (verificationLink: string): string =>
  createTemplateEmail({
    title: "Verify Your Email Address",
    titleSub: "Welcome to PalestinianCauses! Please verify your email address",
    fields: [
      {
        label: "Your Verification Link",
        value: verificationLink,
        type: "link",
      },
    ],
    footer:
      "This link will expire in 24 hours.<br>IF YOU DID NOT CREATE AN ACCOUNT, IGNORE THIS EMAIL.",
  });

export const createVerificationChangeEmail = (
  newEmail: string,
  verificationLink: string,
): string =>
  createTemplateEmail({
    title: "Verify Your New Email Address",
    titleSub: `You requested to change your email address to ${newEmail}`,
    fields: [
      {
        label: "Your New Email Address",
        value: newEmail,
        type: "email",
      },
      {
        label: "Your Verification Link",
        value: verificationLink,
        type: "link",
      },
    ],
    footer:
      "This link will expire in 24 hours.<br>IF YOU DID NOT REQUEST THIS EMAIL ADDRESS CHANGE, CONTACT SUPPORT IMMEDIATELY.",
  });
