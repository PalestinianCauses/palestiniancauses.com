// REVIEWED

import test, { expect } from "@playwright/test";

import { messages } from "@/lib/messages";
import { httpSafeExecute } from "@/lib/network";

let userTestingEmail: string | null = null;
let userTestingPassword: string | null = null;

const repeat = (value: string, times: number) =>
  Array.from({ length: times }, (_) => value).join("");

const diaryEntryContent = repeat("A ", 1500);

test.describe("Diary Entry: Create Diary Entry", () => {
  test.beforeEach(async ({ page }) => {
    userTestingEmail = ["testing-", Date.now(), "@example.com"].join("");
    userTestingPassword = "Secure-Password-012345678@";

    await page.goto("/signup");
    await page.getByTestId("first-name-input").fill("Testing");
    await page.getByTestId("last-name-input").fill("User");
    await page.getByTestId("email-input").fill(userTestingEmail);
    await page.getByTestId("password-input").fill(userTestingPassword);
    await page.getByTestId("signup-button").click();

    await expect(page).toHaveURL("/a-human-but-from-gaza");
  });

  test("should create a diary entry successfully", async ({ page }) => {
    await page.goto("/humans-but-from-gaza/share");
    await page
      .getByTestId("diary-title-input")
      .fill(`Testing Diary Entry ${Date.now()}`);
    await page.getByTestId("diary-date-trigger").click();
    await page.getByTestId("diary-date-calendar").getByText("16").click();
    await page.getByTestId("diary-content-input").fill(diaryEntryContent);
    await page.getByTestId("diary-submit-button").click();

    await expect(
      page.getByText(messages.actions.diaryEntry.success),
    ).toBeVisible();

    await expect(page).toHaveURL(
      [
        "/humans-but-from-gaza",
        [
          ["limit", 50].join("="),
          ["page", 1].join("="),
          ["sort", "-date"].join("="),
        ].join("&"),
      ].join("?"),
    );

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

  test("should show error when diary entry title is duplicated", async ({
    page,
  }) => {
    await page.goto("/humans-but-from-gaza/share");
    await page
      .getByTestId("diary-title-input")
      .fill("Debugging While the Lights are Out (Somewhere Else)");
    await page.getByTestId("diary-date-trigger").click();
    await page.getByTestId("diary-date-calendar").getByText("16").click();
    await page.getByTestId("diary-content-input").fill(diaryEntryContent);
    await page.getByTestId("diary-submit-button").click();

    await expect(
      page.getByText(
        messages.actions.diaryEntry.unique(
          "Debugging While the Lights are Out (Somewhere Else)",
        ),
      ),
    ).toBeVisible();

    await expect(page).toHaveURL("/humans-but-from-gaza/share");

    userTestingEmail = null;
    userTestingPassword = null;
  });
});
