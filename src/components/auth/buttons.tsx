// REVIEWED - 04

import Link from "next/link";

import { getAuth } from "@/actions/auth";
import { QueryProvider } from "@/app/(app)/providers";
import { motions } from "@/lib/motion";

import { MotionDiv } from "../globals/motion";
import { Button } from "../ui/button";

import { SignOutButton } from "./forms/sign-out-button";

export const AuthButtons = async function AuthButtons() {
  const auth = await getAuth();

  if (!auth || !auth.user)
    return (
      <MotionDiv
        viewport={{ once: true }}
        initial={motions.fadeIn.initial}
        whileInView={motions.fadeIn.whileInView}
        transition={motions.transition({ delay: 0.1 })}>
        <ul className="flex flex-row items-center justify-center gap-2.5">
          <Button variant="outline" asChild>
            <Link href="/signup">Sign up</Link>
          </Button>
          <Button asChild>
            <Link href="/signin">Sign in</Link>
          </Button>
        </ul>
      </MotionDiv>
    );

  return (
    <MotionDiv
      viewport={{ once: true }}
      initial={motions.fadeIn.initial}
      whileInView={motions.fadeIn.whileInView}
      transition={motions.transition({ delay: 0.1 })}>
      <ul className="flex flex-row items-center justify-center gap-2.5">
        <QueryProvider>
          <SignOutButton />
        </QueryProvider>
      </ul>
    </MotionDiv>
  );
};
