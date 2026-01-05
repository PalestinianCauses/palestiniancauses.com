"use server";

// REVIEWED - 03

import { messages } from "@/lib/messages";
import { actionSafeExecute } from "@/lib/network";
import { payload } from "@/lib/payload";
import { ResponseSafeExecute } from "@/lib/types";

import { getAuthentication } from "./auth";

export const userOrdersCancel = async function userOrdersCancel(
  id: number,
): Promise<ResponseSafeExecute<string>> {
  const auth = await getAuthentication();

  if (!auth)
    return { data: null, error: messages.actions.user.unAuthenticated };

  const response = await actionSafeExecute(
    payload.update({
      req: { user: auth },
      user: auth,
      collection: "orders",
      where: { id: { equals: id } },
      data: { orderStatus: "cancelled" },
      overrideAccess: false,
    }),
    messages.actions.order.serverErrorCancel,
  );

  if (!response.data || response.error) return response;

  return { data: messages.actions.order.successCancel, error: null };
};
