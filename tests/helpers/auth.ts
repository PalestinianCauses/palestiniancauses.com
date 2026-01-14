// REVIEWED

import { Page, expect } from "@playwright/test";

import { messages } from "@/lib/messages";

import { UserTest } from "./user";

export const signUp = async (page: Page, user: UserTest): Promise<void> => {
  await page.goto("/signup");
  await page.getByTestId("first-name-input").fill(user.firstName || "Testing");
  await page.getByTestId("last-name-input").fill(user.lastName || "User");
  await page.getByTestId("email-input").fill(user.email);
  await page.getByTestId("password-input").fill(user.password);
  await page.getByTestId("signup-button").click();

  await expect(
    page.getByText(messages.actions.auth.signIn.success),
  ).toBeVisible();

  await expect(page).toHaveURL("/a-human-but-from-gaza");
};

export const signIn = async (page: Page, user: UserTest): Promise<void> => {
  await page.goto("/signin");
  await page.getByTestId("email-input").fill(user.email);
  await page.getByTestId("password-input").fill(user.password);
  await page.getByTestId("signin-button").click();

  await expect(
    page.getByText(messages.actions.auth.signIn.success),
  ).toBeVisible();

  await expect(page).toHaveURL("/a-human-but-from-gaza");
};
