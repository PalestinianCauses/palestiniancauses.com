// REVIEWED

import { expect, test } from "@playwright/test";

import { messages } from "@/lib/errors";
import { httpTryCatch } from "@/lib/utils";

let userTestingEmail: string | null = null;
let userTestingPassword: string | null = null;

test.describe("Authentication: Sign Up Flows", () => {
  test("should allow user to sign up successfully", async ({ page }) => {
    userTestingEmail = ["testing-", Date.now(), "@example.com"].join("");
    userTestingPassword = "secure-password-012345678@";

    await page.goto("/signup");
    await page.getByTestId("first-name-input").fill("Testing");
    await page.getByTestId("last-name-input").fill("User");
    await page.getByTestId("email-input").fill(userTestingEmail);
    await page.getByTestId("password-input").fill(userTestingPassword);
    await page.getByTestId("signup-button").click();

    await expect(page).toHaveURL("/");
    await expect(
      page.getByText(messages.actions.auth.signUp.success),
    ).toBeVisible();

    const response = await httpTryCatch(
      fetch("http://localhost:3000/api/user", {
        method: "DELETE",

        headers: {
          "X-Testing-Clean-Up-Secret":
            process.env.PLAYWRIGHT_TESTING_USER_CLEAN_UP_SECRET!,
        },

        body: JSON.stringify({ email: userTestingEmail }),
      }),
    );

    if (response.error) console.log(response.error);
    if (response.data) console.log(response.data);

    userTestingEmail = null;
    userTestingPassword = null;
  });

  test("should show error when password entered is not as resilient as Gaza's people", async ({
    page,
  }) => {
    userTestingEmail = ["testing-", Date.now(), "@example.com"].join("");
    userTestingPassword = "not-secure";

    await page.goto("/signup");
    await page.getByTestId("first-name-input").fill("Testing");
    await page.getByTestId("last-name-input").fill("User");
    await page.getByTestId("email-input").fill(userTestingEmail);
    await page.getByTestId("password-input").fill(userTestingPassword);
    await page.getByTestId("signup-button").click();

    await expect(
      page.getByText(messages.actions.auth.signUp.validation),
    ).toBeVisible();

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
  });
});
