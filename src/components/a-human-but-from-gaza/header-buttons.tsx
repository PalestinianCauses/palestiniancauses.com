"use client";

// REVIEWED - 10

import { ArrowRightIcon, HeartIcon, Loader2Icon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Fragment, useTransition } from "react";
import { toast } from "sonner";

import { createProductStripeCheckoutSession } from "@/actions/stripe-create-checkout";
import { messages } from "@/lib/messages";

import { navigation } from "../globals/navigation";
import { Button } from "../ui/button";

export const HeaderButtons = function HeaderButtons() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();

  const doSecureCopy = () => {
    startTransition(async () => {
      const response = await createProductStripeCheckoutSession(
        "a-human-but-from-gaza",
      );

      if (!response.data || response.error) {
        // Check if error is due to un-authenticated user
        if (response.error === messages.actions.user.unAuthenticated) {
          const redirect = [
            `/signin`,
            `redirect=${encodeURIComponent(pathname)}`,
          ].join("?");

          router.push(redirect);
          return;
        }

        toast.error(
          response.error ||
          messages.actions.order.serverErrorCreateCheckoutSession,
        );

        return;
      }

      window.location.href = response.data;
    });
  };

  return (
    <div className="flex w-full flex-col items-stretch justify-center gap-2.5 sm:w-max sm:flex-row sm:items-center sm:gap-5">
      <div className="w-full">
        <Button
          size="lg"
          disabled={isPending}
          className="w-full"
          onClick={doSecureCopy}
          aria-busy={isPending}
          aria-label={
            isPending ? "Processing your order..." : "Secure Your Copy for $18"
          }>
          {isPending ? (
            <Fragment>
              <Loader2Icon className="size-5 animate-spin" aria-hidden="true" />
              Please wait while we process your order...
            </Fragment>
          ) : (
            <Fragment>
              Secure Your Copy – $18
              <ArrowRightIcon aria-hidden="true" />
            </Fragment>
          )}
        </Button>
      </div>
      <div className="w-full">
        <Button variant="outline" size="lg" className="w-full" asChild>
          <Link href={navigation[3].href} aria-label="Support Gazans">
            Support Gazans
            <HeartIcon aria-hidden="true" />
          </Link>
        </Button>
      </div>
    </div>
  );
};
