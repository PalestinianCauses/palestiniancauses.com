// REVIEWED

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Fragment } from "react";

import { ResetPassForm } from "@/components/auth/forms/reset-password";

export const metadata: Metadata = {
  title: "Reset Password",
  robots: { index: false, follow: false },
};

const ResetPasswordPage = async function ResetPasswordPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  if (!token) notFound();

  return (
    <Fragment>
      <div className="mb-8 flex flex-col items-center justify-center gap-2.5">
        <h2 className="text-center text-2xl font-semibold leading-none tracking-tight">
          Reset Password
        </h2>
        <p className="text-center text-sm leading-normal text-muted-foreground">
          Please enter your new password below to secure your account.
        </p>
      </div>
      <ResetPassForm token={token} />
    </Fragment>
  );
};

export default ResetPasswordPage;
