"use client";

// REVIEWED

import { startTransition } from "react";

import { useUser } from "@/hooks/use-user";
import { messages } from "@/lib/errors";
import { motions } from "@/lib/motion";

import { MotionDiv } from "../globals/motion";
import { Button } from "../ui/button";

export const SignOutButton = function SignOutButton() {
  const { signOut } = useUser();

  return (
    <MotionDiv
      initial={motions.fadeIn.initial}
      animate={motions.fadeIn.whileInView}
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
        {signOut.isPending ? messages.actions.auth.signOut.pending : "Sign out"}
      </Button>
    </MotionDiv>
  );
};
