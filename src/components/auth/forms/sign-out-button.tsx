"use client";

// REVIEWED

import Link from "next/link";
import { Fragment, startTransition } from "react";

import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/use-user";
import { messages } from "@/lib/messages";

export const SignOutButton = function SignOutButton() {
  const { data: user, signOut } = useUser();

  if (!user) return null;

  return (
    <Fragment>
      {(user.role === "admin" || user.role === "system-user") && (
        <Button variant="link" asChild>
          <Link href="/admin">Dashboard</Link>
        </Button>
      )}

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
    </Fragment>
  );
};
