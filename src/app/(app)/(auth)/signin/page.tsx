// REVIEWED - 03

import { Metadata } from "next";
import { Fragment } from "react";

import { SignInForm } from "@/components/auth/forms/sign-in";
import { MotionH2, MotionP } from "@/components/globals/motion";
import { motions } from "@/lib/motion";

import { QueryProvider } from "../../providers";

export const metadata: Metadata = {
  title: "Sign in",
};

export default function SignInPage() {
  return (
    <Fragment>
      <div className="mb-8 flex flex-col items-center justify-center gap-2.5">
        <MotionH2
          initial={motions.fadeIn.initial}
          animate={motions.fadeIn.whileInView}
          transition={motions.transition({ duration: "fast", delay: 0.1 })}
          className="text-center text-2xl font-semibold leading-none tracking-tight">
          Welcome Back.
        </MotionH2>
        <MotionP
          initial={motions.fadeIn.initial}
          animate={motions.fadeIn.whileInView}
          transition={motions.transition({ duration: "fast", delay: 0.2 })}
          className="text-center text-sm leading-normal text-muted-foreground">
          Let us be united together to share{" "}
          <span className="font-medium text-foreground">Gazans&apos;</span>{" "}
          voices.
        </MotionP>
      </div>
      <QueryProvider>
        <SignInForm />
      </QueryProvider>
    </Fragment>
  );
}
