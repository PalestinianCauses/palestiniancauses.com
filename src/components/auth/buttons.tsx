"use client";

// REVIEWED - 03

import Link from "next/link";
import { Fragment, startTransition } from "react";

import { useAutoRedirectOnTokenExpire } from "@/hooks/use-auto-redirect-on-token-expire";
import { useUser } from "@/hooks/use-user";
import { messages } from "@/lib/errors";
import { motions } from "@/lib/motion";

import { MotionDiv } from "../globals/motion";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

export const AuthButtons = function AuthButtons() {
  const { isPending, data: user, signOut } = useUser();
  useAutoRedirectOnTokenExpire();

  if (isPending)
    return (
      <div className="flex flex-row items-center justify-center gap-2.5">
        <MotionDiv
          viewport={{ once: true }}
          initial={motions.fadeIn.initial}
          whileInView={motions.fadeIn.whileInView}
          transition={motions.transition({ delay: 0.1 })}>
          <Skeleton className="h-10 w-24" />
        </MotionDiv>
        <MotionDiv
          viewport={{ once: true }}
          initial={motions.fadeIn.initial}
          whileInView={motions.fadeIn.whileInView}
          transition={motions.transition({ delay: 0.2 })}>
          <Skeleton className="h-10 w-24" />
        </MotionDiv>
      </div>
    );

  return (
    <ul className="flex flex-row items-center justify-center gap-2.5">
      {user && (user.role === "admin" || user.role === "system-user") ? (
        <MotionDiv
          viewport={{ once: true }}
          initial={motions.fadeIn.initial}
          whileInView={motions.fadeIn.whileInView}
          transition={motions.transition({ delay: 0.1 })}>
          <Button variant="link" asChild>
            <Link href="/admin">Dashboard</Link>
          </Button>
        </MotionDiv>
      ) : null}
      {user ? (
        <MotionDiv
          viewport={{ once: true }}
          initial={motions.fadeIn.initial}
          whileInView={motions.fadeIn.whileInView}
          transition={motions.transition({ delay: 0.2 })}>
          <Button
            variant="outline"
            disabled={signOut.isPending}
            onClick={() => {
              startTransition(() => {
                signOut.mutate();
              });
            }}>
            {signOut.isPending
              ? messages.actions.auth.signOut.pending
              : "Sign out"}
          </Button>
        </MotionDiv>
      ) : null}
      {!user ? (
        <Fragment>
          <MotionDiv
            viewport={{ once: true }}
            initial={motions.fadeIn.initial}
            whileInView={motions.fadeIn.whileInView}
            transition={motions.transition({ delay: 0.1 })}>
            <Button variant="outline" asChild>
              <Link href="/signup">Sign up</Link>
            </Button>
          </MotionDiv>
          <MotionDiv
            viewport={{ once: true }}
            initial={motions.fadeIn.initial}
            whileInView={motions.fadeIn.whileInView}
            transition={motions.transition({ delay: 0.2 })}>
            <Button asChild>
              <Link href="/signin">Sign in</Link>
            </Button>
          </MotionDiv>
        </Fragment>
      ) : null}
    </ul>
  );
};
