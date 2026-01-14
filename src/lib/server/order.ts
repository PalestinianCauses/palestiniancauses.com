// REVIEWED - 01

import { messages } from "@/lib/messages";
import { actionSafeExecute } from "@/lib/network";
import { payload } from "@/lib/payload";
import { ResponseSafeExecute } from "@/lib/types";
import { Order, Product } from "@/payload-types";

import { isObject } from "../types/guards";

import { getAuthentication } from "./auth";

export const getOrder = async function getOrder(
  orderId: number,
): Promise<ResponseSafeExecute<Order, string>> {
  const auth = await getAuthentication();

  if (!auth)
    return { data: null, error: messages.actions.user.unAuthenticated };

  const response = await actionSafeExecute(
    payload.findByID({
      req: { user: { ...auth, collection: "users" } },
      user: auth,
      collection: "orders",
      id: orderId,
      depth: 2,
      overrideAccess: false,
    }),
    messages.actions.order.serverErrorGet,
  );

  if (!response.data || response.error) return response;

  return { data: response.data, error: null };
};

export const getUserProductOrder = async function getUserProductOrder(
  productSlug: string,
): Promise<ResponseSafeExecute<{ order: Order; product: Product }>> {
  const auth = await getAuthentication();

  if (!auth)
    return { data: null, error: messages.actions.user.unAuthenticated };

  const orderResponse = await actionSafeExecute(
    payload.find({
      req: { user: { ...auth, collection: "users" } },
      user: auth,
      collection: "orders",
      where: {
        and: [
          { user: { equals: auth.id } },
          { orderType: { equals: "product" } },
          { orderStatus: { equals: "completed" } },
          { productOrderStatus: { equals: "paid" } },
          {
            "items.itemType": { equals: "product" },
            "items.product.slug": { equals: productSlug },
          },
        ],
      },
      sort: "-createdAt",
      limit: 1,
      depth: 2,
      overrideAccess: false,
    }),
    messages.actions.order.serverErrorGet,
  );

  if (
    !orderResponse.data ||
    orderResponse.error ||
    orderResponse.data.docs.length !== 1
  )
    return {
      data: null,
      error: orderResponse.error || messages.actions.order.noOrderItemsError,
    };

  const order = orderResponse.data.docs[0];
  const product = orderResponse.data.docs[0].items.find(
    (item) =>
      item.itemType === "product" &&
      isObject(item.product) &&
      item.product.slug === productSlug,
  )?.product;

  if (!isObject(product))
    return {
      data: null,
      error: messages.actions.product.notFound,
    };

  return {
    data: {
      order,
      product,
    },
    error: null,
  };
};
