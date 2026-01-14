"use server";

// REVIEWED - 05

import { redirect } from "next/navigation";
import Stripe from "stripe";

import { messages } from "@/lib/messages";
import { actionSafeExecute } from "@/lib/network";
import { payload } from "@/lib/payload";
import { getAuthentication } from "@/lib/server/auth";
import { getProduct } from "@/lib/server/product";
import { ResponseSafeExecute } from "@/lib/types";
import { stripe } from "@/lib/utils/stripe";

import { createOrder, deleteOrder, updateOrder } from "./order";

export const createProductStripeCheckoutSession =
  async function createProductStripeCheckoutSession(
    productSlug: string,
  ): Promise<ResponseSafeExecute<string, string>> {
    const auth = await getAuthentication();

    if (!auth)
      return {
        data: null,
        error: messages.actions.user.unAuthenticated,
      };

    const productResponse = await getProduct(productSlug, auth);

    if (!productResponse.data || productResponse.error) return productResponse;

    const product = productResponse.data;

    if (product.price <= 0)
      return {
        data: null,
        error: messages.actions.product.notAvailableForPurchasing,
      };

    const existingOrderResponse = await actionSafeExecute(
      payload.find({
        req: { user: { ...auth, collection: "users" } },
        user: auth,
        collection: "orders",
        where: {
          "user": { equals: auth.id },
          "orderType": { equals: "product" },
          "items.itemType": { equals: "product" },
          "items.product.slug": { equals: product.slug },
          "or": [
            {
              and: [
                { orderStatus: { equals: "completed" } },
                { productOrderStatus: { equals: "paid" } },
              ],
            },
            {
              and: [
                { orderStatus: { equals: "in-progress" } },
                { productOrderStatus: { equals: "pending" } },
              ],
            },
          ],
        },
        depth: 2,
      }),
      messages.actions.order.serverErrorGet,
    );

    if (
      existingOrderResponse.data &&
      existingOrderResponse.data.docs.length === 1
    ) {
      const existingOrder = existingOrderResponse.data.docs[0];

      if (
        existingOrder.orderStatus === "completed" &&
        existingOrder.productOrderStatus === "paid"
      )
        redirect("/a-human-but-from-gaza/thank-you");

      if (
        existingOrder.orderStatus === "in-progress" &&
        existingOrder.productOrderStatus === "pending" &&
        existingOrder.stripeSessionId
      ) {
        const sessionResponse = await actionSafeExecute(
          stripe.checkout.sessions.retrieve(existingOrder.stripeSessionId),
          messages.actions.order.serverErrorGetCheckoutSession,
        );

        if (
          sessionResponse.data &&
          sessionResponse.data.status === "open" &&
          sessionResponse.data.payment_status !== "paid" &&
          sessionResponse.data.url &&
          !sessionResponse.error
        ) {
          return {
            data: sessionResponse.data.url,
            error: null,
          };
        }
      }
    }

    // Create order record (pending payment)
    const orderResponse = await createOrder({
      orderType: "product",
      productOrderType: "paid",
      orderStatus: "in-progress",
      productOrderStatus: "pending",
      items: [
        {
          itemType: "product",
          product: product.id,
          quantity: 1,
          price: product.price,
        },
      ],
    });

    if (!orderResponse.data || orderResponse.error)
      return {
        data: null,
        error: orderResponse.error || messages.actions.order.serverError,
      };

    const order = orderResponse.data;

    // Create Stripe checkout session
    const baseURL =
      process.env.NEXT_PUBLIC_URL || "https://palestiniancauses.com";

    // eslint-disable-next-line camelcase
    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      {
        quantity: 1,
        price_data: {
          currency: "USD",
          unit_amount: Math.round(product.price * 100),
          product_data: {
            name: product.title,
            description: product.description,
          },
        },
      },
    ];

    const sessionResponse = await actionSafeExecute(
      stripe.checkout.sessions.create({
        mode: "payment",
        // eslint-disable-next-line camelcase
        line_items,
        success_url: [
          `${baseURL}/a-human-but-from-gaza/thank-you`,
          ["session_id", "{CHECKOUT_SESSION_ID}"].join("="),
        ].join("?"),
        cancel_url: `${baseURL}/a-human-but-from-gaza`,
        customer_email: auth.email,
        metadata: {
          productSlug: product.slug,
          productId: product.id.toString(),
          orderId: order.id.toString(),
          userId: auth.id.toString(),
        },
        allow_promotion_codes: true,
      }),
      messages.actions.order.serverErrorCreateCheckoutSession,
    );

    if (
      !sessionResponse.data ||
      !sessionResponse.data.url ||
      sessionResponse.error
    ) {
      // Delete order if Stripe session creation fails
      const deleteOrderResponse = await deleteOrder(order.id);

      return {
        data: null,
        error:
          sessionResponse.error ||
          deleteOrderResponse.error ||
          messages.actions.order.serverErrorCreateCheckoutSession,
      };
    }

    // Update order with Stripe session ID
    const updateOrderResponse = await updateOrder(order.id, {
      stripeSessionId: sessionResponse.data.id,
    });

    if (!updateOrderResponse.data || updateOrderResponse.error)
      return {
        data: null,
        error: updateOrderResponse.error,
      };

    return {
      data: sessionResponse.data.url,
      error: null,
    };
  };
