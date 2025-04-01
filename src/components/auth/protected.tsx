"use client";

// REVIEWED

import { useRouter } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";

import { useUser } from "@/hooks/use-user";

import { Loading } from "../globals/loading";

export const Protected = function Protected({ children }: PropsWithChildren) {
  const router = useRouter();
  const { isPending, user } = useUser();

  useEffect(() => {
    if (!isPending && !user) router.push("/signin");
  }, [isPending, user, router]);

  if (isPending) return <Loading />;

  if (!user) return null;

  return children;
};
