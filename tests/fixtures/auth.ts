// REVIEWED

import { test as base, Page } from "@playwright/test";

import { signUp } from "../helpers/auth";
import {
  deleteUserTest,
  generateUserTest,
  getExistingUserTest,
  UserTest,
} from "../helpers/user";

type AuthFixtures = {
  pageAuthenticated: Page;
  newUser: UserTest;
  existingUser: UserTest;
};

export const test = base.extend<AuthFixtures>({
  pageAuthenticated: async ({ page }, use, testInfo) => {
    const user = generateUserTest();
    await signUp(page, user);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    await use(page);

    if (testInfo.status === "passed" || testInfo.status === "failed")
      await deleteUserTest(user.email);
  },

  newUser: async (
    // eslint-disable-next-line no-empty-pattern
    {},
    use,
    testInfo,
  ) => {
    const user = generateUserTest();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    await use(user);

    if (testInfo.status === "passed" || testInfo.status === "failed")
      await deleteUserTest(user.email);
  },

  existingUser: async (
    // eslint-disable-next-line no-empty-pattern
    {},
    use,
  ) => {
    const user = getExistingUserTest();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    await use(user);
  },
});

export { expect } from "@playwright/test";
