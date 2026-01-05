"use server";

// REVIEWED - 07

import { messages } from "@/lib/messages";
import { actionSafeExecute } from "@/lib/network";
import { payload } from "@/lib/payload";
import { ResponseSafeExecute } from "@/lib/types";
import { isNumber, isObject } from "@/lib/types/guards";
import { Order, Product } from "@/payload-types";

import { getAuthentication } from "./auth";
import { getProduct } from "./product";

export const createOrder = async function createOrder(
  data: Omit<Order, "id" | "user" | "total" | "createdAt" | "updatedAt">,
): Promise<ResponseSafeExecute<Order, string>> {
  // Get authenticated user (customer) if signed in
  const authentication = await getAuthentication();

  if (!authentication || !authentication.id)
    return { data: null, error: messages.actions.user.unAuthenticated };

  // Generate total price
  const pricesTotal = data.items.reduce(
    (accumulator, item) => accumulator + item.price,
    0,
  );

  // Create order
  const orderResponse = await actionSafeExecute(
    payload.create({
      req: { user: authentication },
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
    data: orderResponse.data,
    error: null,
  };
};

export const getOrder = async function getOrder(
  orderId: number,
): Promise<ResponseSafeExecute<Order, string>> {
  const auth = await getAuthentication();

  if (!auth)
    return { data: null, error: messages.actions.user.unAuthenticated };

  const response = await actionSafeExecute(
    payload.findByID({
      req: { user: auth },
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

export const updateOrder = async function updateOrder(
  orderId: number,
  data: Partial<Order>,
): Promise<ResponseSafeExecute<Order, string>> {
  const auth = await getAuthentication();

  if (!auth)
    return { data: null, error: messages.actions.user.unAuthenticated };

  const response = await actionSafeExecute(
    payload.update({
      req: { user: auth },
      user: auth,
      collection: "orders",
      where: { id: { equals: orderId } },
      data,
      overrideAccess: false,
    }),
    messages.actions.order.serverErrorUpdate,
  );

  if (!response.data || response.error) return response;

  return { data: response.data.docs[0], error: null };
};

export const deleteOrder = async function deleteOrder(
  orderId: number,
): Promise<ResponseSafeExecute<string, string>> {
  const auth = await getAuthentication();

  if (!auth)
    return { data: null, error: messages.actions.user.unAuthenticated };

  const response = await actionSafeExecute(
    payload.delete({
      req: { user: auth },
      user: auth,
      collection: "orders",
      where: { id: { equals: orderId } },
      overrideAccess: false,
    }),
    messages.actions.order.serverErrorDelete,
  );

  if (!response.data || response.error) return response;

  return { data: messages.actions.order.successDelete, error: null };
};

export const getUserProductOrder = async function getUserProductOrder(
  productSlug: string,
): Promise<ResponseSafeExecute<{ order: Order; product: Product }>> {
  const auth = await getAuthentication();

  if (!auth)
    return { data: null, error: messages.actions.user.unAuthenticated };

  const productResponse = await getProduct(productSlug, auth);

  if (
    !productResponse.data ||
    productResponse.data.docs.length === 0 ||
    productResponse.error
  )
    return { data: null, error: messages.actions.product.notFound };

  const product = productResponse.data.docs[0];

  const ordersResponse = await actionSafeExecute(
    payload.find({
      req: { user: { ...auth, collection: "users" } },
      user: auth,
      collection: "orders",
      where: {
        and: [
          { user: { equals: auth.id } },
          { orderType: { equals: "product" } },
          { productOrderStatus: { equals: "paid" } },
        ],
      },
      sort: "-createdAt",
      limit: 1,
      depth: 2,
      overrideAccess: false,
    }),
    messages.actions.order.serverErrorGet,
  );

  if (!ordersResponse.data || ordersResponse.error) return ordersResponse;

  const order = ordersResponse.data.docs.find((o) =>
    o.items.some(
      (item) =>
        item.itemType === "product" &&
        ((isNumber(item.product) && item.product === product.id) ||
          (isObject(item.product) && item.product.id === product.id)),
    ),
  );

  if (!order)
    return {
      data: null,
      error: messages.actions.order.noOrderItemsError,
    };

  return { data: { order, product }, error: null };
};
