// REVIEWED

import { messages } from "@/lib/messages";
import { httpSafeExecute } from "@/lib/network";

export interface UserTest {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export const generateUserTest = (): UserTest => ({
  email: `testing-${Date.now()}-${Math.random().toString(36).substring(7)}@example.com`,
  password: "Secure-Password-012345678@",
  firstName: "Testing",
  lastName: "User",
});

export const deleteUserTest = async (email: string): Promise<void> => {
  const response = await httpSafeExecute<string, string>({
    http: fetch(`${process.env.NEXT_PUBLIC_URL}/api/user`, {
      method: "DELETE",
      headers: {
        "X-Testing-Clean-Up-Secret":
          process.env.PLAYWRIGHT_TESTING_USER_CLEAN_UP_SECRET!,
      },
      body: JSON.stringify({ email }),
    }),
    errorDefault: messages.http.serverError,
    isData: (data) => typeof data === "string",
  });

  if (response.error)
    console.error(`Failed to delete test user ${email}:`, response.error);
  else if (response.data) console.log(`Deleted test user: ${email}`);
};

export const getExistingUserTest = (): UserTest => ({
  email: process.env.PLAYWRIGHT_TESTING_USER_EMAIL!,
  password: process.env.PLAYWRIGHT_TESTING_USER_PASSWORD!,
});
