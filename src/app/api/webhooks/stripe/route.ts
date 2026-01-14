// REVIEWED - 03
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

export const runtime = "nodejs";

export const POST = async function POST(
  req: Request,
): Promise<NextResponse<ResponseSafeExecute<{ received: boolean }>>> {
  try {
    const body = await req.text();
    const headersList = await headers();
    const signature = headersList.get("stripe-signature");

    if (!signature) {
      const message = messages.actions.stripe.webhook.missingStripeSignature;
      console.error("[Stripe Web Hook] Missing stripe-signature header");
      return NextResponse.json({ data: null, error: message }, { status: 400 });
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET!,
      );

      console.log(
        `[Stripe Web Hook] Received event: ${event.type} (ID: ${event.id})`,
      );
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Un-known error";

      console.error(
        `[Stripe Web Hook] Signature verification failed: ${errorMessage}`,
      );
      const message = messages.actions.stripe.webhook.verifyStripeSignature;
      return NextResponse.json({ data: null, error: message }, { status: 400 });
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const userId = session.metadata?.userId;
      const productId = session.metadata?.productId;
      const orderId = session.metadata?.orderId;

      console.log(
        `[Stripe Web Hook] Processing checkout.session.completed - Order: ${orderId}, User: ${userId}, Product: ${productId}`,
      );

      if (!userId || !productId || !orderId) {
        const message = messages.actions.stripe.webhook.missingIDsData;

        console.error(
          `[Stripe Web Hook] Missing metadata - userId: ${userId}, productId: ${productId}, orderId: ${orderId}`,
        );

        return NextResponse.json(
          { data: null, error: message },
          { status: 400 },
        );
      }

      // Only process if payment is actually completed
      if (session.payment_status !== "paid") {
        console.log(
          `[Stripe Web Hook] Payment not completed yet. Status: ${session.payment_status}`,
        );

        const data = { received: true };
        return NextResponse.json({ data, error: null }, { status: 200 });
      }

      console.log(`[Stripe Web Hook] Payment completed, processing order...`);

      const orderResponse = await actionSafeExecute(
        payload.findByID({
          collection: "orders",
          id: Number(orderId),
          depth: 2,
        }),
        messages.actions.order.notFound,
      );

      if (!orderResponse.data || orderResponse.error) {
        console.error(
          `[Stripe Web Hook] Order not found: ${orderId}`,
          orderResponse.error,
        );

        return NextResponse.json(
          { data: null, error: orderResponse.error },
          { status: 404 },
        );
      }

      const order = orderResponse.data;

      console.log(`[Stripe Web Hook] Order found: ${order.id}`);

      const product = order.items.find(
        (item) =>
          item.itemType === "product" &&
          ((isNumber(item.product) && item.product === Number(productId)) ||
            (isObject(item.product) && item.product.id === Number(productId))),
      )?.product;

      if (!product) {
        console.error(
          `[Stripe Web Hook] Product not found in order: ${productId}`,
        );

        return NextResponse.json(
          { data: null, error: messages.actions.product.notFound },
          { status: 404 },
        );
      }

      const productData = isObject(product) ? product : null;

      if (!productData) {
        const message = messages.actions.product.notFound;
        console.error(`[Stripe Web Hook] Product data is null: ${productId}`);

        return NextResponse.json(
          { data: null, error: message },
          { status: 404 },
        );
      }

      console.log(`[Stripe Web Hook] Product found: ${productData.title}`);

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
        console.error(`[Stripe Web Hook] User not found: ${userId}`, message);

        return NextResponse.json(
          { data: null, error: message },
          { status: 404 },
        );
      }

      const user = userResponse.data;
      console.log(`[Stripe Web Hook] User found: ${user.email}`);

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
        console.error(
          `[Stripe Web Hook] Failed to update order ${orderId}:`,
          message,
        );

        return NextResponse.json(
          { data: null, error: message },
          { status: 500 },
        );
      }

      console.log(`[Stripe Web Hook] Order ${orderId} updated successfully`);

      if (
        productData.type === "file" &&
        productData.files &&
        productData.files.length !== 0
      ) {
        console.log(
          `[Stripe Web Hook] Processing ${productData.files.length} file(s) for product`,
        );

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

            if (!mediaResponse.data || mediaResponse.error)
              return mediaResponse;

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
          console.error(
            `[Stripe Web Hook] Failed to grant file access for order ${orderId}`,
          );

          const response = {
            data: null,
            error: messages.actions.product.file.notFound,
          };

          return NextResponse.json(response, { status: 500 });
        }

        console.log(`[Stripe Web Hook] File access granted for user ${userId}`);
      }

      const downloadingURLs = createProductDownloadingURLs(productData);

      if (downloadingURLs.length === 0) {
        console.error(
          `[Stripe Web Hook] No download URLs generated for product ${productId}`,
        );

        return NextResponse.json(
          { data: null, error: messages.actions.product.file.notFound },
          { status: 404 },
        );
      }

      console.log(
        `[Stripe Web Hook] Generated ${downloadingURLs.length} download URL(s)`,
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
        const message =
          responseEmail.error || messages.actions.order.serverError;

        console.error(
          `[Stripe Web Hook] Failed to send email to ${user.email}:`,
          responseEmail.error,
        );

        return NextResponse.json(
          { data: null, error: message },
          { status: 500 },
        );
      }

      console.log(
        `[Stripe Web Hook] Successfully processed order ${orderId} and sent email to ${user.email}`,
      );
    }

    // Handle cancelled checkout sessions
    if (
      event.type === "checkout.session.async_payment_failed" ||
      event.type === "checkout.session.expired"
    ) {
      const session = event.data.object;
      const orderId = session.metadata?.orderId;

      console.log(
        `[Stripe Web Hook] Processing ${event.type} - Order: ${orderId}`,
      );

      if (orderId) {
        // Mark order as cancelled if payment failed or session expired
        const responseCancel = await actionSafeExecute(
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

        if (responseCancel.error) {
          console.error(
            `[Stripe Web Hook] Failed to cancel order ${orderId}:`,
            responseCancel.error,
          );
        } else {
          console.log(`[Stripe Web Hook] Order ${orderId} marked as cancelled`);
        }
      }
    }

    const data = { received: true };
    console.log(`[Stripe Web Hook] Successfully processed event ${event.id}`);
    return NextResponse.json({ data, error: null }, { status: 200 });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Un-known error";
    const errorStack = error instanceof Error ? error.stack : undefined;

    console.error(
      "[Stripe Web Hook] Unexpected error:",
      errorMessage,
      errorStack,
    );

    return NextResponse.json(
      { data: null, error: `Web Hook processing failed: ${errorMessage}` },
      { status: 500 },
    );
  }
};
