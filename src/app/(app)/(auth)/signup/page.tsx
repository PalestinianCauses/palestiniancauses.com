// REVIEWED - 04

import { Metadata } from "next";
import { Fragment } from "react";

import { SignUpForm } from "@/components/auth/forms/sign-up";

export const metadata: Metadata = {
  title: "Sign up",
};

export default function SignUpPage() {
  return (
    <Fragment>
      <div className="mb-8 flex flex-col items-center justify-center gap-2.5">
        <h2 className="text-center text-2xl font-semibold leading-none tracking-tight">
          Welcome at PalestinianCauses.
        </h2>
        <p className="text-center text-sm leading-normal text-muted-foreground">
          Let us be united together to share{" "}
          <span className="font-medium text-foreground">Gazans&apos;</span>{" "}
          voices.
        </p>
      </div>
      <SignUpForm />
    </Fragment>
  );
}
