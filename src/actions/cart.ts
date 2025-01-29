"use server";

// REVIEWED - 01

/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { TAGS } from "@/lib/constants";
import { createCart, getCart, insertToCart } from "@/lib/shopify";

export const createCartPlusSetCookie =
  async function createCartPlusSetCookie() {
    const cart = await createCart();
    (await cookies()).set("cartId", cart.id!);
  };

export const insertItem = async function insertItem(
  previousState: any,
  selectedVariantId: string | undefined,
) {
  const cartId = (await cookies()).get("cartId")?.value;

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
  async function removeCartPlusRemoveCookie() {
    (await cookies()).delete("cartId");
  };

export const redirectToCheckout = async function redirectToCheckout() {
  const cartId = (await cookies()).get("cartId")?.value;
  const cart = await getCart(cartId);
  redirect(cart!.checkoutUrl);
};
