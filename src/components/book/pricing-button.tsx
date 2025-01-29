"use client";

// REVIEWED - 04
/* eslint-disable no-shadow */

import { HeartIcon } from "lucide-react";
import { startTransition, useActionState, useEffect } from "react";

import {
  createCartPlusSetCookie,
  insertItem,
  redirectToCheckout,
  removeCartPlusRemoveCookie,
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
    // @ts-expect-error PayPal is not defined
    // eslint-disable-next-line no-undef
    PayPal.Donation.Button({
      env: "production",
      hosted_button_id: process.env.NEXT_PUBLIC_PAYPAL_HOSTED_BUTTON_ID,
      image: {
        src: "https://pics.paypal.com/00/s/ZWRhZmExMzEtYmZmOC00OTM4LThhYzYtZGEwYTUwYTM2MDQx/file.PNG",
        alt: "Support a cause by donating.",
        title: "Support a cause by donating.",
      },
    }).render("#donate-button");
  }, []);

  const { variants } = product;

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

  useEffect(() => {
    removeCartPlusRemoveCookie();
  }, []);

  useEffect(() => {
    if (!cart) createCartPlusSetCookie();

    startTransition(async () => {
      if (cart?.totalQuantity === 0) {
        insertCartItem(product, variantFinal);
        await variantPlusAction();
      }
    });
  }, [cart, product, variantFinal, insertCartItem, variantPlusAction]);

  return (
    <div className="mx-auto max-w-xs px-8">
      <div id="donate-button-container" className="sr-only">
        <div id="donate-button" />
      </div>
      <p className="text-base font-medium text-muted-foreground">
        Support a cause by donating
      </p>
      <p className="mt-6 flex items-baseline justify-center gap-x-2">
        <span className="text-5xl font-semibold tracking-tight text-foreground">
          Only 15
        </span>
        <span className="text-sm/6 font-medium tracking-wide text-muted-foreground">
          USD
        </span>
      </p>
      <form
        action={async () => {
          await redirectToCheckout();
        }}>
        <Button
          type="button"
          variant="secondary"
          className="mt-10 w-full"
          onClick={() => {
            (
              document.querySelector("#donate-button img") as HTMLImageElement
            )?.click();
          }}>
          <HeartIcon /> Donate First
        </Button>
        <Button
          type="submit"
          variant="link"
          className="mx-auto mt-6 max-w-sm whitespace-normal text-center text-xs/5 text-muted-foreground">
          No, I just want my free copy of &quot;A Human But From Gaza&quot;
          e-book.
        </Button>
      </form>
    </div>
  );
};
