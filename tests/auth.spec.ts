// REVIEWED - 05

import { expect, test } from "@playwright/test";

import { messages } from "@/lib/messages";
import { httpSafeExecute } from "@/lib/network";

let userTestingEmail: string | null = null;
let userTestingPassword: string | null = null;

test.describe("Authentication: Sign Up Flows", () => {
  test("should allow user to sign up successfully", async ({ page }) => {
    userTestingEmail = ["testing-", Date.now(), "@example.com"].join("");
    userTestingPassword = "Secure-Password-012345678@";

    await page.goto("/signup");
    await page.getByTestId("first-name-input").fill("Testing");
    await page.getByTestId("last-name-input").fill("User");
    await page.getByTestId("email-input").fill(userTestingEmail);
    await page.getByTestId("password-input").fill(userTestingPassword);
    await page.getByTestId("signup-button").click();

    await expect(
      page.getByText(messages.actions.auth.signIn.success),
    ).toBeVisible();

    await expect(page).toHaveURL("/");

    const response = await httpSafeExecute<string, string>({
      http: fetch(`${process.env.NEXT_PUBLIC_URL}/api/user`, {
        method: "DELETE",

        headers: {
          "X-Testing-Clean-Up-Secret":
            process.env.PLAYWRIGHT_TESTING_USER_CLEAN_UP_SECRET!,
        },

        body: JSON.stringify({ email: userTestingEmail }),
      }),
      errorDefault: messages.http.serverError,
      isData: (data) => typeof data === "string",
    });

    if (response.data) console.log(response.data);

    userTestingEmail = null;
    userTestingPassword = null;
  });

  test("should show error when password entered is not as resilient as Gaza's people", async ({
    page,
  }) => {
    userTestingEmail = ["testing-", Date.now(), "@example.com"].join("");
    userTestingPassword = "password";

    await page.goto("/signup");
    await page.getByTestId("first-name-input").fill("Testing");
    await page.getByTestId("last-name-input").fill("User");
    await page.getByTestId("email-input").fill(userTestingEmail);
    await page.getByTestId("password-input").fill(userTestingPassword);
    await page.getByTestId("signup-button").click();

    await expect(
      page.getByText(messages.actions.auth.signUp.password),
    ).toBeVisible();

    await expect(page).toHaveURL("/signup");

    userTestingEmail = null;
    userTestingPassword = null;
  });

  test("should show error when user is already a family member", async ({
    page,
  }) => {
    await page.goto("/signup");

    await page.getByTestId("first-name-input").fill("Testing");
    await page.getByTestId("last-name-input").fill("User");

    await page
      .getByTestId("email-input")
      .fill(process.env.PLAYWRIGHT_TESTING_USER_EMAIL!);

    await page
      .getByTestId("password-input")
      .fill(process.env.PLAYWRIGHT_TESTING_USER_PASSWORD!);

    await page.getByTestId("signup-button").click();

    await expect(
      page.getByText(
        messages.actions.auth.signUp.duplication(
          process.env.PLAYWRIGHT_TESTING_USER_EMAIL!,
        ),
      ),
    ).toBeVisible();

    await expect(page).toHaveURL("/signup");
  });
});

test.describe("Authentication: Sign In Flows", () => {
  test("should allow user to sign in successfully", async ({ page }) => {
    userTestingEmail = process.env.PLAYWRIGHT_TESTING_USER_EMAIL!;
    userTestingPassword = process.env.PLAYWRIGHT_TESTING_USER_PASSWORD!;

    await page.goto("/signin");
    await page.getByTestId("email-input").fill(userTestingEmail);
    await page.getByTestId("password-input").fill(userTestingPassword);
    await page.getByTestId("signin-button").click();

    await expect(
      page.getByText(messages.actions.auth.signIn.success),
    ).toBeVisible();

    await expect(page).toHaveURL("/");
  });

  test("should show error when user is not yet a family member", async ({
    page,
  }) => {
    userTestingEmail = "non-existing-user@palestiniancauses.com";
    userTestingPassword = "Secure-Password-012345678@";

    await page.goto("/signin");
    await page.getByTestId("email-input").fill(userTestingEmail);
    await page.getByTestId("password-input").fill(userTestingPassword);
    await page.getByTestId("signin-button").click();

    await expect(
      page.getByText(messages.actions.auth.signIn.notFound(userTestingEmail)),
    ).toBeVisible();

    await expect(page).toHaveURL("/signin");
  });

  test("should show error when user's password entered is not correct", async ({
    page,
  }) => {
    userTestingEmail = process.env.PLAYWRIGHT_TESTING_USER_EMAIL!;
    userTestingPassword = "wrong-password";

    await page.goto("/signin");
    await page.getByTestId("email-input").fill(userTestingEmail);
    await page.getByTestId("password-input").fill(userTestingPassword);
    await page.getByTestId("signin-button").click();

    await expect(
      page.getByText(
        messages.actions.auth.signIn.unAuthenticated(userTestingEmail),
      ),
    ).toBeVisible();

    await expect(page).toHaveURL("/signin");
  });
});
