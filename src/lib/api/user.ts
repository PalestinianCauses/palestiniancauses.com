// REVIEWED

import { PaginatedDocs } from "payload";
import { z } from "zod";

import { User } from "@/payload-types";

import { messages } from "../messages";
import { httpSafeExecute } from "../network";
import { ResponseSafeExecute } from "../types";

export const getUserByEmail = async function getUserByEmail(
  email: string,
): Promise<ResponseSafeExecute<User>> {
  const baseURL = process.env.NEXT_PUBLIC_URL || "";
  const params = new URLSearchParams({ email });

  try {
    const response = await httpSafeExecute({
      http: fetch([`${baseURL}/api/public/users/by-email`, params].join("?"), {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
      }),
      errorDefault: messages.http.serverError,
      isData: (data): data is PaginatedDocs<User> => {
        const validate = z
          .object({ docs: z.array(z.object({ id: z.number() })) })
          .safeParse(data);

        return validate.success;
      },
    });

    if (!response.data || response.error || response.data.docs.length !== 1)
      return {
        data: null,
        error: messages.actions.user.notFound,
      };

    return { data: response.data.docs[0], error: null };
  } catch (error) {
    console.error("Failed to get user by email:", error);
    return { data: null, error: messages.http.serverError };
  }
};
