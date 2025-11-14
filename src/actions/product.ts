"use server";

// REVIEWED - 05

import { redirect } from "next/navigation";

import { messages } from "@/lib/messages";
import { actionSafeExecute } from "@/lib/network";
import { payload } from "@/lib/payload";
import { ResponseSafeExecute } from "@/lib/types";
import { isNumber, isObject } from "@/lib/types/guards";
import { Product } from "@/payload-types";

import { getAuthentication } from "./auth";

export const getProductFreeLinksExternal =
  async function getProductFreeLinksExternal(
    productSlug: string,
    redirectTo: string,
  ): Promise<ResponseSafeExecute<Pick<Product, "links">>> {
    const auth = await getAuthentication();

    if (!auth) redirect(["/signin", "?", "redirect", "=", redirectTo].join(""));

    const responseProduct = await actionSafeExecute(
      payload.find({
        collection: "products",
        where: { slug: { equals: productSlug }, price: { equals: 0 } },
        depth: 2,
      }),
      messages.actions.product.serverError,
    );

    if (!responseProduct.data || responseProduct.error) return responseProduct;

    if (responseProduct.data.docs.length !== 1)
      return { data: null, error: messages.actions.product.notFound };

    const product = responseProduct.data.docs[0];

    if (product.type !== "external" || !product.links || !product.links.length)
      return { data: null, error: messages.actions.product.external.notFound };

    const { links } = product;

    const responseHasOrder = await actionSafeExecute(
      payload.find({
        collection: "orders",
        where: { user: { equals: auth.id }, orderType: { equals: "product" } },
      }),
      messages.actions.order.serverError,
    );

    if (!responseHasOrder.data || responseHasOrder.error)
      return responseHasOrder;

    const hasOrder = responseHasOrder.data.docs.find((order) =>
      order.items.some(
        (item) =>
          item.itemType === "product" &&
          ((isNumber(item.product) && item.product === product.id) ||
            (isObject(item.product) && item.product.id === product.id)),
      ),
    );

    if (!hasOrder) {
      const responseOrder = await actionSafeExecute(
        payload.create({
          collection: "orders",
          data: {
            user: auth.id,
            orderType: "product",
            productOrderType: "free",
            total: 0,
            orderStatus: "not-applicable",
            productOrderStatus: "not-applicable",
            items: [
              {
                itemType: "product",
                product: product.id,
                quantity: 1,
                price: 0,
              },
            ],
          },
        }),
        messages.actions.order.serverError,
      );

      if (!responseOrder.data || responseOrder.error) return responseOrder;
    }

    return { data: { links }, error: null };
  };
