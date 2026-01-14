// REVIEWED

import { headers } from "next/headers";

import { messages } from "@/lib/messages";
import { actionSafeExecute } from "@/lib/network";
import { payload } from "@/lib/payload";
import { isDefined } from "@/lib/types/guards";
import { User } from "@/payload-types";

export const getAuthentication =
  async function getAuthentication(): Promise<User | null> {
    const response = await actionSafeExecute(
      payload.auth({ headers: await headers() }),
      messages.actions.user.serverError,
    );

    if (!response.data || response.error || !isDefined(response.data.user))
      return null;

    return response.data.user;
  };
