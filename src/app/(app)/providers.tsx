"use client";

// REVIEWED - 19
import { QueryClientProvider } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";
import { toast } from "sonner";

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
import { useAchievementNotifications } from "@/hooks/use-achievement-notifications";
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

  // Check for achievement notifications
  useAchievementNotifications();

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

export const RedirectProvider = function RedirectProvider({
  path,
  messageToast,
  children,
}: { path: string; messageToast?: string } & PropsWithChildren) {
  const router = useRouter();

  useEffect(() => {
    if (messageToast) toast.error(messageToast);
    router.push(path);
  }, [router, path, messageToast]);

  return children;
};
