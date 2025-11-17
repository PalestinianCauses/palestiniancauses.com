// REVIEWED - 01

import { messages } from "@/lib/messages";

import { expect, test } from "./fixtures/auth";

const repeat = (value: string, times: number) =>
  Array.from({ length: times }, (_) => value).join("");

const diaryEntryContent = repeat("A ", 1500);

test.describe("Diary Entry: Create Diary Entry", () => {
  test("should create a diary entry successfully", async ({
    pageAuthenticated,
  }) => {
    await pageAuthenticated.goto("/humans-but-from-gaza/share");

    const title = `Testing Diary Entry ${Date.now()}`;

    await pageAuthenticated.getByTestId("diary-title-input").fill(title);
    await pageAuthenticated.getByTestId("diary-title-input").blur();

    const dateTrigger = pageAuthenticated.getByTestId("diary-date-trigger");
    await expect(dateTrigger).not.toContainText("Choose a date");

    await pageAuthenticated
      .getByTestId("diary-content-input")
      .fill(diaryEntryContent);
    await pageAuthenticated.getByTestId("diary-content-input").blur();
    await pageAuthenticated.waitForTimeout(1000);

    const submitButton = pageAuthenticated.getByTestId("diary-submit-button");

    await expect(submitButton).toBeEnabled();
    await submitButton.click();

    await expect(
      pageAuthenticated.getByText(messages.actions.diaryEntry.success),
    ).toBeVisible({ timeout: 5000 });

    await expect(pageAuthenticated).toHaveURL(
      [
        "/humans-but-from-gaza",
        [
          ["limit", 50].join("="),
          ["page", 1].join("="),
          ["sort", "-date"].join("="),
        ].join("&"),
      ].join("?"),
    );
  });

  test("should show error when diary entry title is duplicated", async ({
    pageAuthenticated,
  }) => {
    await pageAuthenticated.goto("/humans-but-from-gaza/share");

    const title = "Silent Exclamation Marks between Lines";

    await pageAuthenticated.getByTestId("diary-title-input").fill(title);
    await pageAuthenticated.getByTestId("diary-title-input").blur();

    const dateTrigger = pageAuthenticated.getByTestId("diary-date-trigger");
    await expect(dateTrigger).not.toContainText("Choose a date");

    await pageAuthenticated
      .getByTestId("diary-content-input")
      .fill(diaryEntryContent);
    await pageAuthenticated.getByTestId("diary-content-input").blur();
    await pageAuthenticated.waitForTimeout(1000);

    const submitButton = pageAuthenticated.getByTestId("diary-submit-button");

    await expect(submitButton).toBeEnabled();
    await submitButton.click();

    await expect(
      pageAuthenticated.getByText(messages.actions.diaryEntry.unique(title)),
    ).toBeVisible({ timeout: 10000 });

    await expect(pageAuthenticated).toHaveURL("/humans-but-from-gaza/share");
  });
});
