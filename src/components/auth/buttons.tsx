// REVIEWED - 09

"use client";

import { useAuth } from "@/hooks/use-auth";
import { useUser } from "@/hooks/use-user";

import { AuthenticatedButtons } from "./authenticated-buttons";
import { AuthenticationButtonsLoading } from "./buttons-loading";
import { UnAuthenticatedButtons } from "./un-authenticated-buttons";

export const AuthenticationButtons = function AuthenticationButtons() {
  const { signOut } = useAuth();
  const { isPending, user } = useUser();

  if (isPending) return <AuthenticationButtonsLoading />;

  if (user) return <AuthenticatedButtons user={user} signOut={signOut} />;

  return <UnAuthenticatedButtons />;
};
