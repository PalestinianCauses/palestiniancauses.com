// REVIEWED

"use client";

import Link from "next/link";

import { motions } from "@/lib/motion";

import { MotionDiv } from "../globals/motion";
import { Button } from "../ui/button";

export const UnAuthenticatedButtons = function UnAuthenticatedButtons() {
  return (
    <MotionDiv
      viewport={{ once: true }}
      initial={motions.fadeIn.initial}
      whileInView={motions.fadeIn.whileInView}
      transition={motions.transition({ delay: 0.1 })}>
      <ul className="flex flex-row items-center justify-center gap-2.5">
        <li>
          <Button variant="outline" asChild>
            <Link href="/signup">Sign up</Link>
          </Button>
        </li>
        <li>
          <Button asChild>
            <Link href="/signin">Sign in</Link>
          </Button>
        </li>
      </ul>
    </MotionDiv>
  );
};
