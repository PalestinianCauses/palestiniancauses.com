"use server";

// REVIEWED

import Stripe from "stripe";

import { messages } from "@/lib/messages";
import { actionSafeExecute } from "@/lib/network";
import { ResponseSafeExecute } from "@/lib/types";
import { isString } from "@/lib/types/guards";
import { stripe } from "@/lib/utils/stripe";
import { Order } from "@/payload-types";

import { getOrder } from "./order";

export const getStripeCheckoutSession = async function getStripeCheckoutSession(
  sessionId: string,
): Promise<
  ResponseSafeExecute<{
    session: Stripe.Checkout.Session;
    order: Order;
  }>
> {
  if (!sessionId)
    return {
      data: null,
      error: "Session ID is required",
    };

  const session = await actionSafeExecute(
    stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["payment_intent"],
    }),
    messages.actions.order.serverErrorGetCheckoutSession,
  );

  if (!session.data || session.error) return session;

  const orderId = session.data.metadata?.orderId;

  if (!isString(orderId))
    return {
      data: null,
      error: messages.actions.order.orderNotFound,
    };

  const orderResponse = await getOrder(Number(orderId));

  if (!orderResponse.data || orderResponse.error) return orderResponse;

  const order = orderResponse.data;

  if (session.data.payment_status !== "paid")
    return {
      data: null,
      error: messages.actions.order.paymentNotCompleted,
    };

  return {
    data: { session: session.data, order },
    error: null,
  };
};
