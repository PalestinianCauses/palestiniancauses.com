"use server";

// REVIEWED - 02

import { messages } from "@/lib/messages";
import { actionSafeExecute } from "@/lib/network";
import { payload } from "@/lib/payload";
import { ResponseSafeExecute } from "@/lib/types";
import { Order } from "@/payload-types";

import { getAuthentication } from "./auth";

export const createOrder = async function createOrder(
  data: Omit<Order, "id" | "user" | "total" | "createdAt" | "updatedAt">,
): Promise<ResponseSafeExecute<string>> {
  // Get authenticated user (customer) if signed in
  const authentication = await getAuthentication();

  if (!authentication || !authentication.id)
    return { data: null, error: messages.actions.order.unAuthenticated };

  // Generate total price
  const pricesTotal = data.items.reduce(
    (accumulator, item) => accumulator + item.price,
    0,
  );

  // Create order
  const orderResponse = await actionSafeExecute(
    payload.create({
      req: { user: { collection: "users", ...authentication } },
      user: authentication,
      collection: "orders",
      data: { ...data, user: authentication.id, total: pricesTotal },
      overrideAccess: false,
    }),
    messages.actions.order.serverError,
  );

  if (!orderResponse.data || orderResponse.error)
    return { data: null, error: orderResponse.error };

  // Email and WhatsApp notifications are handled automatically
  // via Orders collection's afterChange hook

  return {
    data: messages.actions.order.success,
    error: null,
  };
};
