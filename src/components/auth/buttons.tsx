// REVIEWED - 08

"use client";

import { useUser } from "@/hooks/use-user";

import { AuthenticatedButtons } from "./authenticated-buttons";
import { AuthenticationButtonsLoading } from "./buttons-loading";
import { UnAuthenticatedButtons } from "./un-authenticated-buttons";

export const AuthenticationButtons = function AuthenticationButtons() {
  const { isPending, data: user, signOut } = useUser();

  if (isPending) return <AuthenticationButtonsLoading />;

  if (user) return <AuthenticatedButtons user={user} signOut={signOut} />;

  return <UnAuthenticatedButtons />;
};
