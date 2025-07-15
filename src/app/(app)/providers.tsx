"use client";

// REVIEWED - 11
import { QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useActivity } from "@/hooks/use-activity";
import { getQueryClient } from "@/lib/query";

export const QueryProvider = function QueryProvider({
  children,
}: PropsWithChildren) {
  const queryClient = getQueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export const ActivityProvider = function ActivityProvider() {
  const {
    isFetching,
    user,
    isInActivityWarning,
    isInActivityCountDown,
    staySignedIn,
    signOutDueToInActivity,
  } = useActivity();

  if (isFetching || !user) return null;

  return (
    <AlertDialog open={isInActivityWarning}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Your session is about to expire in {isInActivityCountDown} seconds!
          </AlertDialogTitle>
          <AlertDialogDescription>
            We noticed you&apos;ve been in-active for a while. To keep your
            session secure, we&apos;ll need to know if you&apos;d like to stay
            signed in. What would you prefer?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => signOutDueToInActivity()}>
            No, sign me out
          </AlertDialogCancel>
          <AlertDialogAction onClick={() => staySignedIn()}>
            Yes, keep me signed in
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
