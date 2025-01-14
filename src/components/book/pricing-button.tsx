"use client";

// REVIEWED - 01
/* eslint-disable no-shadow */

import { useActionState, useEffect } from "react";

import {
  createCartPlusSetCookie,
  insertItem,
  redirectToCheckout,
} from "@/actions/cart";
import { useCart } from "@/contexts/cart";
import { useProduct } from "@/contexts/product";
import { Product, ProductVariant } from "@/lib/shopify/types";

import { Button } from "../ui/button";

export const PricingButton = function PricingButton({
  product,
}: {
  product: Product;
}) {
  const [, formAction] = useActionState(insertItem, null);

  const { cart, insertCartItem } = useCart();
  const { state } = useProduct();

  useEffect(() => {
    if (!cart) createCartPlusSetCookie();
  }, [cart]);

  const {
    variants,
    priceRange: { minVariantPrice },
  } = product;

  const variant = variants.find((variant: ProductVariant) =>
    variant.selectedOptions.every(
      (option) => option.value === state[option.name.toLowerCase()],
    ),
  );

  const variantIdDefault = variants.length === 1 ? variants[0]?.id : undefined;
  const variantIdSelected = variant?.id || variantIdDefault;
  const variantPlusAction = formAction.bind(null, variantIdSelected);

  const variantFinal = variants.find(
    (variant) => variant.id === variantIdSelected,
  )!;

  return (
    <div className="mx-auto max-w-xs px-8">
      <p className="text-base font-medium text-muted-foreground">
        Support a cause by paying once.
      </p>
      <p className="mt-6 flex items-baseline justify-center gap-x-2">
        <span className="text-5xl font-semibold tracking-tight text-foreground">
          Only {Number(minVariantPrice.amount).toFixed(0)}
        </span>
        <span className="text-sm/6 font-medium tracking-wide text-muted-foreground">
          {minVariantPrice.currencyCode}
        </span>
      </p>
      <form
        action={async () => {
          if (cart?.totalQuantity === 0) {
            insertCartItem(product, variantFinal);
            await variantPlusAction();
          }

          await redirectToCheckout();
        }}>
        <Button type="submit" variant="tertiary" className="mt-10 w-full">
          Get access
        </Button>
      </form>
      <p className="mt-6 text-xs/5 text-muted-foreground">
        The current pricing is for our e-book, our hard-copy is coming soon.
      </p>
    </div>
  );
};
