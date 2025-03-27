// REVIEWED

import { Metadata } from "next";
import { Fragment } from "react";

import { SignInForm } from "@/components/auth/forms/sign-in";

export const metadata: Metadata = {
  title: "Sign In",
};

export default function SignInPage() {
  return (
    <Fragment>
      <div className="mb-10 flex flex-col items-center justify-center gap-3">
        <h2 className="text-center text-2xl font-semibold leading-none">
          Welcome Back.
        </h2>
        <p className="text-center text-sm leading-normal text-muted-foreground">
          You missed us you at{" "}
          <span className="font-medium text-foreground">PalestinianCauses</span>
          , didn&apos;t you?
        </p>
      </div>
      <SignInForm />
    </Fragment>
  );
}
