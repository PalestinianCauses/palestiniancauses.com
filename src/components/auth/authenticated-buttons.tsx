// REVIEWED - 02

"use client";

import { UseMutationResult } from "@tanstack/react-query";
import Link from "next/link";
import { toast } from "sonner";

import { messages } from "@/lib/messages";
import { SafeExecuteConfig } from "@/lib/types";
import { User } from "@/payload-types";

import { Button } from "../ui/button";

export const AuthenticatedButtons = function AuthenticatedButtons({
  user,
  signOut,
}: {
  user: User;
  signOut: UseMutationResult<
    | {
        config: SafeExecuteConfig | undefined;
        data: { message: string };
        error: null;
      }
    | {
        config: SafeExecuteConfig | undefined;
        data: null;
        error: string | number;
      },
    Error,
    SafeExecuteConfig | undefined,
    unknown
  >;
}) {
  return (
    <ul className="flex flex-row items-center justify-center gap-2.5">
      {user.role !== "website-user" ? (
        <li>
          <Button variant="ghost" asChild>
            <Link href="/admin">Admin Dashboard</Link>
          </Button>
        </li>
      ) : null}
      <li>
        <Button
          variant="outline"
          disabled={signOut.isPending}
          onClick={() => {
            toast.loading(messages.actions.auth.signOut.pending, {
              id: "sign-out",
            });

            signOut.mutate({});
          }}>
          Sign out
        </Button>
      </li>
    </ul>
  );
};
