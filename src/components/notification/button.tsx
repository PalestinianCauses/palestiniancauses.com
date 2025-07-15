"use client";

// REVIEWED - 03

import { useNotificationSubscription } from "@/hooks/use-notification-subscription";
import { useUserAgentInfo } from "@/hooks/use-user-agent-info";

import { SafeHydrate } from "../globals/safe-hydrate";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

export const NotificationButton = function NotificationButton() {
  const { isRunningOnPWA } = useUserAgentInfo();
  const { isLoading, isAvailable, subscription, subscribe, unsubscribe } =
    useNotificationSubscription();

  if (!isRunningOnPWA || !isAvailable) return null;

  return (
    <SafeHydrate
      isLoading={isLoading}
      isLoadingComponent={<Skeleton className="h-5 w-full" />}>
      <div className="mr-auto text-sm leading-normal tracking-wide text-muted-foreground">
        {!subscription ? (
          <Button
            variant="link"
            className="mr-1.5 p-0"
            disabled={subscribe.isPending}
            onClick={() => subscribe.mutate()}>
            Subscribe to receive important updates.
          </Button>
        ) : (
          <Button
            variant="link"
            className="mr-1.5 p-0"
            disabled={unsubscribe.isPending}
            onClick={() => unsubscribe.mutate()}>
            Unsubscribe from updates.
          </Button>
        )}
      </div>
    </SafeHydrate>
  );
};
