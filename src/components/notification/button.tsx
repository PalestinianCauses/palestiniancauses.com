"use client";

// REVIEWED - 02

import { useNotificationSubscription } from "@/hooks/use-notification-subscription";
import { useUserAgentInfo } from "@/hooks/use-user-agent-info";

import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

export const NotificationButton = function NotificationButton() {
  const { isRunningOnPWA } = useUserAgentInfo();
  const { isPending, isAvailable, subscription, subscribe, unsubscribe } =
    useNotificationSubscription();

  if (!isRunningOnPWA || !isAvailable) return null;

  if (isPending) return <Skeleton className="h-5 w-full" />;

  return !subscription ? (
    <p className="mr-auto text-sm leading-normal tracking-wide text-muted-foreground">
      <Button
        variant="link"
        className="mr-1.5 p-0"
        disabled={subscribe.isPending}
        onClick={() => subscribe.mutate()}>
        Subscribe to receive important updates.
      </Button>
    </p>
  ) : (
    <p className="mr-auto text-sm leading-normal tracking-wide text-muted-foreground">
      <Button
        variant="link"
        className="mr-1.5 p-0"
        disabled={unsubscribe.isPending}
        onClick={() => unsubscribe.mutate()}>
        Unsubscribe from updates.
      </Button>
    </p>
  );
};
