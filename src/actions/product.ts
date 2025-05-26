"use server";

// REVIEWED - 03

import { redirect } from "next/navigation";

import { messages } from "@/lib/messages";
import { actionSafeExecute } from "@/lib/network";
import { payload } from "@/lib/payload";
import { ResponseSafeExecute } from "@/lib/types";
import { Product } from "@/payload-types";

import { getAuthentication } from "./auth";

export const getProductFreeLinksExternal =
  async function getProductFreeLinksExternal(
    productSlug: string,
    redirectTo: string,
  ): Promise<ResponseSafeExecute<Pick<Product, "links">>> {
    const auth = await getAuthentication();

    if (!auth || !auth.user)
      redirect(["/signin", "?", "redirect", "=", redirectTo].join(""));

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
        where: { user: { equals: auth.user.id } },
      }),
      messages.actions.order.serverError,
    );

    if (!responseHasOrder.data || responseHasOrder.error)
      return responseHasOrder;

    if (responseHasOrder.data.docs.length === 0) {
      const responseOrder = await actionSafeExecute(
        payload.create({
          collection: "orders",
          data: {
            user: auth.user.id,
            type: "free",
            total: 0,
            status: "not-applicable",
            items: [
              {
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
