// REVIEWED - 10

"use client";

import { useAuth } from "@/hooks/use-auth";
import { useUser } from "@/hooks/use-user";

import { SafeHydrate } from "../globals/safe-hydrate";

import { AuthenticatedButtons } from "./authenticated-buttons";
import { AuthenticationButtonsLoading } from "./buttons-loading";
import { UnAuthenticatedButtons } from "./un-authenticated-buttons";

export const AuthenticationButtons = function AuthenticationButtons() {
  const { signOut } = useAuth();
  const { isLoading, data: user } = useUser();

  return (
    <SafeHydrate
      isLoading={isLoading}
      isLoadingComponent={<AuthenticationButtonsLoading />}>
      {(() => {
        if (user) return <AuthenticatedButtons user={user} signOut={signOut} />;

        return <UnAuthenticatedButtons />;
      })()}
    </SafeHydrate>
  );
};
