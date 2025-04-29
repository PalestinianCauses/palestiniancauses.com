"use server";

// REVIEWED

import { redirect } from "next/navigation";

import { messages } from "@/lib/errors";
import { payload } from "@/lib/payload";
import {
  ActionSafeExecute,
  actionSafeExecute,
  isNumber,
  isString,
} from "@/lib/utils";
import { Media } from "@/payload-types";

import { getAuth } from "./auth";

export const getFreeProductFiles = async function getFreeProductFiles(
  productSlug: string,
  redirectTo: string,
): Promise<
  ActionSafeExecute<
    { title: string; file: Omit<Media, "url"> & { url: string } }[],
    string
  >
> {
  const auth = await getAuth();

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

  if (product.type !== "file" || !product.files || !product.files.length)
    return { data: null, error: messages.actions.product.file.notFound };

  const files: { title: string; file: Omit<Media, "url"> & { url: string } }[] =
    [];

  product.files.forEach((element) => {
    if (
      !element.file ||
      isNumber(element.file) ||
      !element.file.url ||
      !isString(element.file.url)
    )
      return;

    files.push({
      title: element.title,
      file: { ...element.file, url: element.file.url },
    });
  });

  if (!files.length)
    return { data: null, error: messages.actions.product.file.notFound };

  const responseHasOrder = await actionSafeExecute(
    payload.find({
      collection: "orders",
      where: { user: { equals: auth.user.id } },
    }),
    messages.actions.order.serverError,
  );

  if (!responseHasOrder.data || responseHasOrder.error) return responseHasOrder;

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
          orderedAt: new Date(Date.now()).toLocaleString(),
        },
      }),
      messages.actions.order.serverError,
    );

    if (!responseOrder.data || responseOrder.error) return responseOrder;
  }

  return { data: files, error: null };
};
