"use server";

// REVIEWED - 05

import { revalidatePath } from "next/cache";

import { messages } from "@/lib/messages";
import { actionSafeExecute } from "@/lib/network";
import { payload } from "@/lib/payload";
import { getAuthentication } from "@/lib/server/auth";
import { getOrder } from "@/lib/server/order";
import { ResponseSafeExecute } from "@/lib/types";
import { isString } from "@/lib/types/guards";
import { stripe } from "@/lib/utils/stripe";

export const userOrdersCancel = async function userOrdersCancel(
  id: number,
): Promise<ResponseSafeExecute<string>> {
  const auth = await getAuthentication();

  if (!auth)
    return { data: null, error: messages.actions.user.unAuthenticated };

  const response = await actionSafeExecute(
    payload.update({
      req: { user: { ...auth, collection: "users" } },
      user: auth,
      collection: "orders",
      where: { id: { equals: id } },
      data: { orderStatus: "cancelled" },
      overrideAccess: false,
    }),
    messages.actions.order.serverErrorCancel,
  );

  if (!response.data || response.error) return response;

  revalidatePath("/profile");

  return { data: messages.actions.order.successCancel, error: null };
};

export const userOrdersGetCheckoutURL = async function userOrdersGetCheckoutURL(
  id: number,
): Promise<ResponseSafeExecute<string>> {
  const orderResponse = await getOrder(id);

  if (!orderResponse.data || orderResponse.error) return orderResponse;

  const order = orderResponse.data;

  if (
    order.orderStatus !== "in-progress" ||
    order.productOrderStatus !== "pending" ||
    !isString(order.stripeSessionId)
  )
    return {
      data: null,
      error: messages.actions.order.orderNotAvailableForCheckout,
    };

  const stripeSessionResponse = await actionSafeExecute(
    stripe.checkout.sessions.retrieve(order.stripeSessionId),
    messages.actions.order.serverErrorGetCheckoutSession,
  );

  if (!stripeSessionResponse.data || stripeSessionResponse.error)
    return {
      data: null,
      error:
        stripeSessionResponse.error ||
        messages.actions.order.serverErrorGetCheckoutSession,
    };

  if (
    stripeSessionResponse.data.status !== "open" ||
    stripeSessionResponse.data.payment_status === "paid" ||
    !stripeSessionResponse.data.url
  ) {
    return {
      data: null,
      error: messages.actions.order.checkoutSessionNotAvailable,
    };
  }

  return {
    data: stripeSessionResponse.data.url,
    error: null,
  };
};
