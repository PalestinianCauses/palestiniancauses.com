// REVIEWED
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

import { messages } from "@/lib/messages";
import { actionSafeExecute } from "@/lib/network";
import { payload } from "@/lib/payload";
import { ResponseSafeExecute } from "@/lib/types";
import { isNumber, isObject, isString } from "@/lib/types/guards";
import { createProductDownloadingURLsEmail } from "@/lib/utils/email-templates-product";
import { stripe } from "@/lib/utils/stripe";

export const POST = async function POST(
  req: Request,
): Promise<NextResponse<ResponseSafeExecute<{ received: boolean }>>> {
  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature");

  if (!signature)
    return NextResponse.json(
      {
        data: null,
        error: messages.actions.stripe.webhook.missingStripeSignature,
      },
      { status: 400 },
    );

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch {
    return NextResponse.json(
      {
        data: null,
        error: messages.actions.stripe.webhook.verifyStripeSignature,
      },
      { status: 400 },
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const userId = session.metadata?.userId;
    const productId = session.metadata?.productId;
    const orderId = session.metadata?.orderId;

    if (!userId || !productId || !orderId)
      return NextResponse.json(
        { data: null, error: messages.actions.stripe.webhook.missingIDsData },
        { status: 400 },
      );

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

    if (!productData || !productData.links || productData.links.length === 0)
      return NextResponse.json(
        { data: null, error: messages.actions.product.external.notFound },
        { status: 404 },
      );

    const userResponse = await actionSafeExecute(
      payload.findByID({
        collection: "users",
        id: Number(userId),
        depth: 0,
      }),
      messages.actions.user.notFound,
    );

    if (!userResponse.data || userResponse.error) {
      return NextResponse.json(
        { data: null, error: userResponse.error },
        { status: 404 },
      );
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

    if (!updateOrderResponse.data || updateOrderResponse.error)
      return NextResponse.json(
        { data: null, error: updateOrderResponse.error },
        { status: 500 },
      );

    const downloadingURLs = productData.links.map((link) => ({
      title: link.title,
      url: link.url,
      isFile: link.isFile || false,
      fileSize: link.fileSize || null,
    }));

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

    if (!responseEmail.data || responseEmail.error)
      return NextResponse.json(
        {
          data: null,
          error: responseEmail.error || messages.actions.order.serverError,
        },
        { status: 500 },
      );
  }

  return NextResponse.json(
    { data: { received: true }, error: null },
    { status: 200 },
  );
};
