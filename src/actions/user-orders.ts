"use server";

// REVIEWED - 01

import { messages } from "@/lib/messages";
import { actionSafeExecute } from "@/lib/network";
import { payload } from "@/lib/payload";
import { ResponseSafeExecute } from "@/lib/types";
import { Order } from "@/payload-types";

import { getAuthentication } from "./auth";

export const getUserOrders = async function getUserOrders(): Promise<
  ResponseSafeExecute<Order[]>
> {
  const auth = await getAuthentication();

  if (!auth) return { data: [], error: null };

  const response = await actionSafeExecute(
    payload.find({
      req: { user: { collection: "users", ...auth } },
      user: auth,
      collection: "orders",
      where: { user: { equals: auth.id } },
      sort: "-createdAt",
      limit: 100,
      depth: 2,
      overrideAccess: false,
    }),
    messages.actions.order.serverError,
  );

  if (!response.data || response.error) return response;

  return { data: response.data.docs, error: null };
};
