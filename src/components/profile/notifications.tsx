"use client";

// REVIEWED

import { useInfiniteQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import {
  ArrowDownIcon,
  ArrowUpRightIcon,
  BellDotIcon,
  BellOffIcon,
  BellRingIcon,
  BookTextIcon,
  DotIcon,
  MailCheckIcon,
  MessagesSquareIcon,
  Package2Icon,
  PencilLineIcon,
} from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

import { getCollection } from "@/actions/collection";
import { Skeleton } from "@/components/ui/skeleton";
import { useNotifications } from "@/hooks/use-notifications";
import { useUser } from "@/hooks/use-user";
import { isObject } from "@/lib/types/guards";
import { cn } from "@/lib/utils/styles";
import { Notification } from "@/payload-types";

import { SafeHydrate } from "../globals/safe-hydrate";
import { Paragraph, SubSectionHeading } from "../globals/typography";
import { Button } from "../ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

const mapLinks = {
  "comments": "/comments",
  "diary-entries": "/humans-but-from-gaza",
  "orders": "/admin/collections/orders",
  "blogs": "/blogs",
} as const;

const NotificationItem = function NotificationItem({
  userId,
  notification,
}: {
  userId: number;
  notification: Notification;
}) {
  const { markingAsRead } = useNotifications({ userId });

  let link = "#";

  // eslint-disable-next-line no-nested-ternary
  const resourceId = notification.resource
    ? isObject(notification.resource.value)
      ? notification.resource.value.id
      : notification.resource.value
    : null;

  if (notification.resourceType && resourceId)
    link = `${mapLinks[notification.resourceType]}/${resourceId}`;

  return (
    <div
      className={cn(
        "flex flex-col items-start justify-start gap-5 border-l-2 p-5 transition-all duration-100 ease-in-out hover:bg-muted/50 sm:flex-row sm:items-center",
        {
          "opacity-75": markingAsRead.isPending,
          "border-l-input": notification.read,
          "border-l-foreground": !notification.read,
        },
      )}>
      <div className="flex flex-1 flex-col items-start justify-start gap-2.5">
        <SubSectionHeading
          as="h3"
          className="flex items-center justify-start gap-2.5 text-lg !leading-none lg:text-lg lg:!leading-none xl:text-lg xl:!leading-none">
          {(notification.type === "comment" && (
            <MessagesSquareIcon className="size-6 text-foreground" />
          )) ||
            (notification.type === "diary-entry" && (
              <PencilLineIcon className="size-6 text-foreground" />
            )) ||
            (notification.type === "order" && (
              <Package2Icon className="size-6 text-foreground" />
            )) ||
            (notification.type === "blog" && (
              <BookTextIcon className="size-6 text-foreground" />
            )) ||
            (notification.type === "system" && (
              <BellDotIcon className="size-6 text-foreground" />
            )) || <BellDotIcon />}
          {notification.title}
          <DotIcon className="-mx-2.5 size-5 text-foreground/50" />
          <span className="font-mono text-sm font-normal leading-none tracking-normal text-foreground/50">
            {format(notification.createdAt, "MMMM d, yyyy 'at' h:mm a")}
          </span>
        </SubSectionHeading>
        <Paragraph className="mb-2.5 max-w-2xl text-base text-foreground/75 lg:text-base">
          {notification.message}
        </Paragraph>
        <Button variant="link" className="p-0" asChild>
          <Link href={link}>
            <ArrowUpRightIcon />
            View details
          </Link>
        </Button>
      </div>
      {!notification.read ? (
        <Button
          variant="outline"
          size="icon"
          disabled={markingAsRead.isPending}
          onClick={() => markingAsRead.mutate(notification.id)}>
          <MailCheckIcon />
        </Button>
      ) : null}
    </div>
  );
};

export const ProfileNotifications = function ProfileNotifications() {
  const { isLoading: isUserLoading, data: user } = useUser();

  const { markingEveryAsRead } = useNotifications({ userId: user?.id });

  const {
    isLoading,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    data,
  } = useInfiniteQuery({
    queryKey: ["notifications", user?.id],
    queryFn: async ({ pageParam = 1 }) => {
      if (!user) return null;

      const response = await getCollection({
        collection: "notifications",
        req: { user: { collection: "users", ...user } },
        user,
        filters: {
          page: pageParam,
          limit: 25,
          sort: "-createdAt",
          fields: { user: { equals: user.id } },
        },
        depth: 2,
      });

      if (!response.data || response.data.docs.length === 0 || response.error)
        return null;

      return response.data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage && lastPage.hasNextPage ? lastPage.nextPage : undefined,
    refetchOnWindowFocus: false,
  });

  const { notifications } = useMemo(() => {
    if (!data) return { notifications: [] };

    const pages = data.pages.flatMap((page) => (page ? page.docs : []));
    return { notifications: pages };
  }, [data]);

  return (
    <SafeHydrate
      isLoading={isUserLoading || isLoading}
      isLoadingComponent={
        <div className="space-y-5">
          {Array.from({ length: 10 }).map((_, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Skeleton key={index} className="h-32 w-full bg-foreground/5" />
          ))}
        </div>
      }>
      {(() => {
        if (!user) {
          return (
            <Card>
              <CardHeader>
                <CardTitle>User Authentication Required</CardTitle>
                <CardDescription>
                  Kindly sign in to securely access your notifications. We look
                  forward to keeping you informed.
                </CardDescription>
              </CardHeader>
            </Card>
          );
        }

        return (
          <div className="space-y-10">
            <div className="flex flex-wrap items-center justify-between gap-5">
              <div className="space-y-0.5">
                <SubSectionHeading
                  as="h2"
                  className="flex items-center gap-2.5 text-xl !leading-none lg:text-xl lg:!leading-none xl:text-xl xl:!leading-none">
                  <BellRingIcon className="size-6 stroke-[1.5]" />
                  Notifications
                </SubSectionHeading>
                <Paragraph className="max-w-2xl text-base lg:text-base">
                  Stay informed and engaged—review your latest notifications at
                  your convenience.
                </Paragraph>
              </div>
              <Button
                variant="outline"
                disabled={markingEveryAsRead.isPending}
                onClick={() => markingEveryAsRead.mutate()}>
                <BellDotIcon />
                {markingEveryAsRead.isPending
                  ? "Marking as read..."
                  : "Mark all notifications as read"}
              </Button>
            </div>
            <section
              className={cn("flex w-full flex-col gap-5", {
                "pointer-events-none opacity-50":
                  isFetching || markingEveryAsRead.isPending,
              })}>
              {notifications.length !== 0 ? (
                notifications.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    userId={user.id}
                    notification={notification}
                  />
                ))
              ) : (
                <div className="flex flex-col items-center justify-center gap-10 py-20">
                  <BellOffIcon className="size-20 stroke-[1.5]" />
                  <SubSectionHeading
                    as="h3"
                    className="flex max-w-2xl items-center gap-2.5 text-center text-xl tracking-normal lg:max-w-2xl lg:text-xl xl:max-w-2xl xl:text-xl">
                    No notifications are currently available at this time. We
                    will promptly inform you as soon as new updates arise.
                  </SubSectionHeading>
                </div>
              )}
            </section>

            {hasNextPage ? (
              <div className="flex w-full items-center justify-center">
                <Button
                  variant="link"
                  disabled={isFetchingNextPage}
                  onClick={() => fetchNextPage()}>
                  {isFetchingNextPage
                    ? "Loading more notifications..."
                    : "Read more notifications"}
                  <ArrowDownIcon />
                </Button>
              </div>
            ) : null}
          </div>
        );
      })()}
    </SafeHydrate>
  );
};
