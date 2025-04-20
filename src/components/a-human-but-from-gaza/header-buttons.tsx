"use client";

// REVIEWED - 02

import { ArrowRightIcon, HeartIcon } from "lucide-react";
import Link from "next/link";
import { useTransition } from "react";

import {
  createCartPlusSetCookie,
  getCheckoutUrl,
  insertItem,
  removeCartPlusRemoveCookie,
} from "@/actions/cart";
import { motions } from "@/lib/motion";
import { Product } from "@/lib/shopify/types";

import { MotionDiv } from "../globals/motion";
import { navigation } from "../globals/navigation";
import { Button } from "../ui/button";

export const HeaderButtons = function HeaderButtons({
  product,
}: {
  product: Product;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex w-full flex-col items-stretch justify-center gap-2.5 sm:w-max sm:flex-row sm:items-center sm:gap-5">
      <MotionDiv
        viewport={{ once: true }}
        initial={motions.fadeIn.initial}
        animate={motions.fadeIn.whileInView}
        transition={motions.transition({ delay: 0.4 })}
        className="w-full">
        <Button
          size="lg"
          disabled={isPending}
          className="w-full"
          onClick={() => {
            startTransition(async () => {
              await createCartPlusSetCookie("internal-cart-id");
              await insertItem("internal-cart-id", product.variants[0].id);

              const checkoutUrl = await getCheckoutUrl("internal-cart-id");
              window.open(checkoutUrl, "_blank");

              await removeCartPlusRemoveCookie("internal-cart-id");
            });
          }}>
          {isPending ? "Redirecting..." : "Order For Free"}
          <ArrowRightIcon />
        </Button>
      </MotionDiv>
      <MotionDiv
        viewport={{ once: true }}
        initial={motions.fadeIn.initial}
        animate={motions.fadeIn.whileInView}
        transition={motions.transition({ delay: 0.5 })}
        className="w-full">
        <Button variant="outline" size="lg" className="w-full" asChild>
          <Link href={navigation[3].href} target="_blank">
            Support Gazans
            <HeartIcon />
          </Link>
        </Button>
      </MotionDiv>
    </div>
  );
};
