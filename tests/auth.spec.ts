// REVIEWED - 07

import { expect, test } from "@playwright/test";

import { messages } from "@/lib/messages";

import { test as testWithFixtures } from "./fixtures/auth";
import { signIn } from "./helpers/auth";
import { getExistingUserTest } from "./helpers/user";

test.describe("Authentication: Sign Up Flows", () => {
  testWithFixtures(
    "should allow user to sign up successfully",
    async ({ pageAuthenticated: _pageAuthenticated }) => {
      // User is automatically created, signed up, and will be cleaned up
    },
  );

  testWithFixtures(
    "should show error when password entered is not as resilient as Gaza's people",
    async ({ page, newUser }) => {
      const user = newUser;
      user.password = "password";

      await page.goto("/signup");
      await page
        .getByTestId("first-name-input")
        .fill(user.firstName || "Testing");
      await page.getByTestId("last-name-input").fill(user.lastName || "User");
      await page.getByTestId("email-input").fill(user.email);
      await page.getByTestId("password-input").fill(user.password);
      await page.getByTestId("signup-button").click();

      await expect(
        page.getByText(messages.actions.auth.signUp.password),
      ).toBeVisible();

      await expect(page).toHaveURL("/signup");
    },
  );

  test("should show error when user is already a family member", async ({
    page,
  }) => {
    const existingUser = getExistingUserTest();

    await page.goto("/signup");
    await page.getByTestId("first-name-input").fill("Testing");
    await page.getByTestId("last-name-input").fill("User");
    await page.getByTestId("email-input").fill(existingUser.email);
    await page.getByTestId("password-input").fill(existingUser.password);
    await page.getByTestId("signup-button").click();

    await expect(
      page.getByText(
        messages.actions.auth.signUp.duplication(existingUser.email),
      ),
    ).toBeVisible();

    await expect(page).toHaveURL("/signup");
  });
});

test.describe("Authentication: Sign In Flows", () => {
  test("should allow user to sign in successfully", async ({ page }) => {
    const user = getExistingUserTest();

    await signIn(page, user);
  });

  test("should show error when user is not yet a family member", async ({
    page,
  }) => {
    const user = {
      email: "non-existing-user@palestiniancauses.com",
      password: "Secure-Password-012345678@",
    };

    await page.goto("/signin");
    await page.getByTestId("email-input").fill(user.email);
    await page.getByTestId("password-input").fill(user.password);
    await page.getByTestId("signin-button").click();

    await expect(
      page.getByText(messages.actions.auth.signIn.notFound(user.email)),
    ).toBeVisible();

    await expect(page).toHaveURL("/signin");
  });

  test("should show error when user's password entered is not correct", async ({
    page,
  }) => {
    const user = getExistingUserTest();
    user.password = "wrong-password";

    await page.goto("/signin");
    await page.getByTestId("email-input").fill(user.email);
    await page.getByTestId("password-input").fill(user.password);
    await page.getByTestId("signin-button").click();

    await expect(
      page.getByText(messages.actions.auth.signIn.unAuthenticated(user.email)),
    ).toBeVisible();

    await expect(page).toHaveURL("/signin");
  });
});
