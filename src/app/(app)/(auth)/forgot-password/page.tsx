// REVIEWED

import type { Metadata } from "next";
import { Fragment } from "react";

import { ForgotPassForm } from "@/components/auth/forms/forgot-password";

export const metadata: Metadata = {
  title: "Forgot Password",
  robots: { index: false, follow: false },
};

const ForgotPasswordPage = function ForgotPasswordPage() {
  return (
    <Fragment>
      <div className="mb-8 flex flex-col items-center justify-center gap-2.5">
        <h2 className="text-center text-2xl font-semibold leading-none tracking-tight">
          Forgot Password
        </h2>
        <p className="text-center text-sm leading-normal text-muted-foreground">
          Please enter your email address below. You will receive a secure link
          to reset your password and regain access to your account.
        </p>
      </div>
      <ForgotPassForm />
    </Fragment>
  );
};

export default ForgotPasswordPage;
