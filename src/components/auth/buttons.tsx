// REVIEWED - 06

"use client";

import { useEffect, useState } from "react";

import { useUser } from "@/hooks/use-user";
import { motions } from "@/lib/motion";

import { MotionDiv } from "../globals/motion";
import { Skeleton } from "../ui/skeleton";

import { AuthenticatedButtons } from "./authenticated-buttons";
import { UnAuthenticatedButtons } from "./un-authenticated-buttons";

export const AuthenticationButtons = function AuthenticationButtons({
  serverState,
}: {
  serverState: boolean;
}) {
  const { isPending, data: user, signOut } = useUser();
  const [isAuthenticated, setIsAuthenticated] = useState(serverState);

  useEffect(() => {
    if (!isPending) setIsAuthenticated(Boolean(user));
  }, [isPending, user]);

  if (isPending && isAuthenticated !== Boolean(user))
    return (
      <MotionDiv
        viewport={{ once: true }}
        initial={motions.fadeIn.initial}
        whileInView={motions.fadeIn.whileInView}
        transition={motions.transition({ delay: 0.1 })}>
        <ul className="flex flex-row items-center justify-center gap-2.5">
          <li>
            <Skeleton className="h-10 w-24" />
          </li>
          <li>
            <Skeleton className="h-10 w-24" />
          </li>
        </ul>
      </MotionDiv>
    );

  if (isAuthenticated && user)
    return <AuthenticatedButtons user={user} signOut={signOut} />;

  return <UnAuthenticatedButtons />;
};
