"use server";

// REVIEWED - 03

/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

import { TAGS } from "@/lib/constants";
import { createCart, getCart, insertToCart } from "@/lib/shopify";

export const createCartPlusSetCookie = async function createCartPlusSetCookie(
  key: string,
) {
  const cart = await createCart();
  (await cookies()).set(key, cart.id!);
};

export const insertItem = async function insertItem(
  key: string,
  selectedVariantId: string | undefined,
) {
  const cartId = (await cookies()).get(key)?.value;

  if (!cartId || !selectedVariantId) return "Error adding item to cart.";

  try {
    await insertToCart(cartId, [
      { merchandiseId: selectedVariantId, quantity: 1 },
    ]);

    revalidateTag(TAGS.cart);
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  } catch (error) {
    return "Error adding item to cart.";
  }
};

export const removeCartPlusRemoveCookie =
  async function removeCartPlusRemoveCookie(key: string) {
    (await cookies()).delete(key);
  };

export const getCheckoutUrl = async function getCheckoutUrl(key: string) {
  const cartId = (await cookies()).get(key)?.value;
  const cart = await getCart(cartId);
  return cart!.checkoutUrl;
};
