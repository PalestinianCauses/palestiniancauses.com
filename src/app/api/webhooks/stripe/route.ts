// REVIEWED - 02
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

import { messages } from "@/lib/messages";
import { actionSafeExecute } from "@/lib/network";
import { payload } from "@/lib/payload";
import { ResponseSafeExecute } from "@/lib/types";
import { isNumber, isObject, isString } from "@/lib/types/guards";
import { createProductDownloadingURLsEmail } from "@/lib/utils/email-templates-product";
import { createProductDownloadingURLs } from "@/lib/utils/product-download-urls";
import { stripe } from "@/lib/utils/stripe";

export const POST = async function POST(
  req: Request,
): Promise<NextResponse<ResponseSafeExecute<{ received: boolean }>>> {
  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature");

  if (!signature) {
    const message = messages.actions.stripe.webhook.missingStripeSignature;
    return NextResponse.json({ data: null, error: message }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch {
    const message = messages.actions.stripe.webhook.verifyStripeSignature;
    return NextResponse.json({ data: null, error: message }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const userId = session.metadata?.userId;
    const productId = session.metadata?.productId;
    const orderId = session.metadata?.orderId;

    if (!userId || !productId || !orderId) {
      const message = messages.actions.stripe.webhook.missingIDsData;
      return NextResponse.json({ data: null, error: message }, { status: 400 });
    }

    // Only process if payment is actually completed
    if (session.payment_status !== "paid") {
      const data = { received: true };
      return NextResponse.json({ data, error: null }, { status: 200 });
    }

    const orderResponse = await actionSafeExecute(
      payload.findByID({
        collection: "orders",
        id: Number(orderId),
        depth: 2,
      }),
      messages.actions.order.notFound,
    );

    if (!orderResponse.data || orderResponse.error)
      return NextResponse.json(
        { data: null, error: orderResponse.error },
        { status: 404 },
      );

    const order = orderResponse.data;
    const product = order.items.find(
      (item) =>
        item.itemType === "product" &&
        ((isNumber(item.product) && item.product === Number(productId)) ||
          (isObject(item.product) && item.product.id === Number(productId))),
    )?.product;

    if (!product)
      return NextResponse.json(
        { data: null, error: messages.actions.product.notFound },
        { status: 404 },
      );

    const productData = isObject(product) ? product : null;

    if (!productData) {
      const message = messages.actions.product.notFound;
      return NextResponse.json({ data: null, error: message }, { status: 404 });
    }

    const userResponse = await actionSafeExecute(
      payload.findByID({
        collection: "users",
        id: Number(userId),
        depth: 0,
      }),
      messages.actions.user.notFound,
    );

    if (!userResponse.data || userResponse.error) {
      const message = userResponse.error;
      return NextResponse.json({ data: null, error: message }, { status: 404 });
    }

    const user = userResponse.data;

    const updateOrderResponse = await actionSafeExecute(
      payload.update({
        collection: "orders",
        id: Number(orderId),
        data: {
          orderStatus: "completed",
          productOrderStatus: "paid",
          stripePaymentIntentId: isString(session.payment_intent)
            ? session.payment_intent
            : null,
        },
      }),
      messages.actions.order.serverErrorUpdate,
    );

    if (!updateOrderResponse.data || updateOrderResponse.error) {
      const message = updateOrderResponse.error;
      return NextResponse.json({ data: null, error: message }, { status: 500 });
    }

    if (
      productData.type === "file" &&
      productData.files &&
      productData.files.length !== 0
    ) {
      const promises = await Promise.all(
        productData.files.map(async (fileItem) => {
          const fileId = isNumber(fileItem.file)
            ? fileItem.file
            : fileItem.file.id;

          if (!fileId)
            return {
              data: null,
              error: messages.actions.product.file.notFound,
            };

          const mediaResponse = await actionSafeExecute(
            payload.findByID({
              collection: "media-private",
              id: fileId,
              depth: 0,
            }),
            messages.actions.product.file.notFound,
          );

          if (!mediaResponse.data || mediaResponse.error) return mediaResponse;

          const usersCurrent = mediaResponse.data.users || [];

          const userIds = usersCurrent.map((u) => (isNumber(u) ? u : u.id));

          if (!userIds.includes(user.id))
            return actionSafeExecute(
              payload.update({
                collection: "media-private",
                id: fileId,
                data: {
                  users: [...userIds, user.id],
                },
              }),
              messages.actions.product.file.notFound,
            );

          return { data: mediaResponse.data, error: null };
        }),
      );

      if (promises.some((promise) => promise.error)) {
        const response = {
          data: null,
          error: messages.actions.product.file.notFound,
        };

        return NextResponse.json(response, { status: 500 });
      }
    }

    const downloadingURLs = createProductDownloadingURLs(productData);

    if (downloadingURLs.length === 0)
      return NextResponse.json(
        { data: null, error: messages.actions.product.file.notFound },
        { status: 404 },
      );

    const templateEmail = createProductDownloadingURLsEmail(
      productData.title,
      downloadingURLs,
    );

    const responseEmail = await actionSafeExecute(
      payload.sendEmail({
        to: user.email,
        subject: `Your download link(s) for ${productData.title} is/are ready`,
        html: templateEmail,
      }),
      messages.actions.order.serverError,
    );

    if (!responseEmail.data || responseEmail.error) {
      const message = responseEmail.error || messages.actions.order.serverError;
      return NextResponse.json({ data: null, error: message }, { status: 500 });
    }
  }

  // Handle cancelled checkout sessions
  if (
    event.type === "checkout.session.async_payment_failed" ||
    event.type === "checkout.session.expired"
  ) {
    const session = event.data.object;
    const orderId = session.metadata?.orderId;

    if (orderId)
      // Mark order as cancelled if payment failed or session expired
      await actionSafeExecute(
        payload.update({
          collection: "orders",
          id: parseInt(orderId, 10),
          data: {
            orderStatus: "cancelled",
            productOrderStatus: "failed",
          },
        }),
        messages.actions.order.serverErrorUpdate,
      );
  }

  const data = { received: true };
  return NextResponse.json({ data, error: null }, { status: 200 });
};
