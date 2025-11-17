// REVIEWED

import { expect, test } from "@playwright/test";

import { messages } from "@/lib/messages";

import { signIn, signUp } from "./helpers/auth";
import { deleteUserTest, generateUserTest } from "./helpers/user";

test.describe("Comment: Create Comment", () => {
  let userTestSecond: string | null = null;

  test("should create a comment successfully", async ({ page }) => {
    const user = generateUserTest();
    userTestSecond = user.email;

    await signUp(page, user);

    await page.goto("/humans-but-from-gaza/9");

    await page
      .getByTestId("comment-content-input")
      .fill(
        "This is a test comment created by PalestinianCauses Testing Suite",
      );

    await page.getByTestId("comment-submit-button").click();

    await expect(
      page.getByText(messages.actions.comment.successCreate),
    ).toBeVisible();

    await expect(page).toHaveURL("/humans-but-from-gaza/9");
  });

  test("should allow user to reply to a comment successfully", async ({
    page,
  }) => {
    if (!userTestSecond)
      throw new Error(
        "Second test user email not found. Please run previous tests first.",
      );

    const user = {
      email: userTestSecond,
      password: "Secure-Password-012345678@",
    };

    await signIn(page, user);

    await page.goto("/humans-but-from-gaza/9");

    await page.getByTestId("comment-reply-button").first().click();

    await page
      .getByTestId("comment-reply-content-input")
      .fill("This is a test reply created by PalestinianCauses Testing Suite");

    await page.getByTestId("comment-reply-submit-button").click();

    await expect(
      page.getByText(messages.actions.comment.successCreate),
    ).toBeVisible();

    await expect(
      page
        .getByText(
          "This is a test reply created by PalestinianCauses Testing Suite",
        )
        .first(),
    ).toBeVisible();

    await expect(page).toHaveURL("/humans-but-from-gaza/9");
  });

  test("should allow user to delete a comment successfully", async ({
    page,
  }) => {
    if (!userTestSecond)
      throw new Error(
        "Second test user email not found. Please run previous tests first.",
      );

    const user = {
      email: userTestSecond,
      password: "Secure-Password-012345678@",
    };

    await signIn(page, user);

    await page.goto("/humans-but-from-gaza/9");
    await page.getByTestId("comment-delete-button").first().click();
    await expect(
      page.getByText(messages.actions.comment.successDelete),
    ).toBeVisible({ timeout: 10000 });

    await expect(page).toHaveURL("/humans-but-from-gaza/9");

    await deleteUserTest(userTestSecond);
    userTestSecond = null;
  });
});
