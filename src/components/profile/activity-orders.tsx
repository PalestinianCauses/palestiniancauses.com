"use client";

// REVIEWED - 04

import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { format } from "date-fns/format";
import {
  ArrowDownIcon,
  Package2Icon,
  PackageCheckIcon,
  PackageIcon,
  PackageMinusIcon,
  PackagePlusIcon,
  PackageSearchIcon,
  PackageXIcon,
  XIcon,
} from "lucide-react";
import { useMemo } from "react";
import { toast } from "sonner";

import { getCollection } from "@/actions/collection";
import { getUserActivityOrdersStats } from "@/actions/user-activity-orders";
import { userOrdersCancel } from "@/actions/user-orders";
import { isObject } from "@/lib/types/guards";
import { cn } from "@/lib/utils/styles";
import { Order, User } from "@/payload-types";

import { SafeHydrate } from "../globals/safe-hydrate";
import { Paragraph, SubSectionHeading } from "../globals/typography";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

import { LoadingActivity, StatCard, StatusBadge } from "./globals";

const OrderItemType = function OrderItemType({
  orderType,
}: {
  orderType: Order["orderType"];
}) {
  return (
    <StatusBadge
      label={orderType}
      className={cn({
        "border-blue-500/10 bg-blue-500/10 text-blue-500 hover:bg-blue-500/10":
          orderType === "product",
        "border-teal-500/10 bg-teal-500/10 text-teal-500 hover:bg-teal-500/10":
          orderType === "service",
        "border-green-500/10 bg-green-500/10 text-green-500 hover:bg-green-500/10":
          orderType === "package",
      })}
    />
  );
};

const OrderItemStatus = function OrderItemStatus({
  orderStatus,
}: {
  orderStatus: Order["orderStatus"];
}) {
  return (
    <StatusBadge
      label={orderStatus.split("-").join(" ")}
      className={cn({
        "border-teal-500/10 bg-teal-500/10 text-teal-500 hover:bg-teal-500/10":
          orderStatus === "new",
        "border-green-500/10 bg-green-500/10 text-green-500 hover:bg-green-500/10":
          orderStatus === "completed",
        "border-yellow-500/10 bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/10":
          orderStatus === "in-progress",
        "border-red-500/10 bg-red-500/10 text-red-500 hover:bg-red-500/10":
          orderStatus === "cancelled",
        "border-primary/5 bg-primary/5 text-primary hover:bg-primary/5":
          orderStatus === "not-applicable",
      })}
    />
  );
};

export const OrderItem = function OrderItem({
  isPublicProfile = false,
  order,
}: {
  isPublicProfile?: boolean;
  order: Order;
}) {
  const { mutate: orderCancel, isPending: isPendingOrderCancel } = useMutation({
    mutationFn: async (id: number) => {
      const response = await userOrdersCancel(id);
      return response;
    },
    onSuccess: (response) => {
      if (!response.data || response.error) {
        toast.error(response.error);
        return;
      }

      toast.success(response.data);
    },
  });

  return (
    <AccordionItem
      value={`order-${order.id}`}
      className="border border-input/50">
      <AccordionTrigger className="p-5 hover:no-underline sm:pr-10">
        <div className="flex flex-col items-start justify-center gap-5">
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-5">
            <OrderItemType orderType={order.orderType} />
            <OrderItemStatus orderStatus={order.orderStatus} />
          </div>
          <SubSectionHeading
            as="h3"
            className="text-lg capitalize lg:text-xl xl:text-xl">
            {order.orderType} order no. {order.id}{" "}
            <span className="px-2.5 pr-0 font-mono text-sm font-medium normal-case tracking-normal text-muted-foreground">
              on {format(order.createdAt, "MMMM d, yyyy 'at' h:mm a")}
            </span>
          </SubSectionHeading>
        </div>
      </AccordionTrigger>
      <AccordionContent className="border-t border-input/50 p-5">
        <div className="grid grid-cols-1 gap-5 md:p-5 lg:p-10">
          <div className="flex w-full flex-col items-start justify-start gap-2.5 sm:flex-row sm:items-center sm:justify-between">
            <SubSectionHeading
              as="h4"
              className="flex items-center justify-start gap-1.5 text-xs uppercase tracking-[0.2em] text-muted-foreground lg:text-xs xl:text-xs">
              Ordered By
            </SubSectionHeading>
            <Separator className="hidden w-full flex-1 bg-input/50 sm:block" />
            <SubSectionHeading
              as="h5"
              className="text-lg text-foreground lg:text-lg xl:text-lg">
              {isObject(order.user) && order.user.firstName
                ? [order.user.firstName, order.user.lastName]
                    .filter(Boolean)
                    .join(" ")
                : "Anonymous User"}
            </SubSectionHeading>
          </div>
          <div className="flex w-full flex-col items-start justify-start gap-2.5 sm:flex-row sm:items-center sm:justify-between">
            <SubSectionHeading
              as="h4"
              className="flex items-center justify-start gap-1.5 text-xs uppercase tracking-[0.2em] text-muted-foreground lg:text-xs xl:text-xs">
              Room Owner
            </SubSectionHeading>
            <Separator className="hidden w-full flex-1 bg-input/50 sm:block" />
            <SubSectionHeading
              as="h5"
              className="text-lg text-foreground lg:text-lg xl:text-lg">
              {isObject(order.roomOwner) && order.roomOwner.firstName
                ? [order.roomOwner.firstName, order.roomOwner.firstName]
                    .filter(Boolean)
                    .join(" ")
                : "N/A"}
            </SubSectionHeading>
          </div>
          <div className="flex w-full flex-col items-start justify-start gap-2.5 sm:flex-row sm:items-center sm:justify-between">
            <SubSectionHeading
              as="h4"
              className="flex items-center justify-start gap-1.5 text-xs uppercase tracking-[0.2em] text-muted-foreground lg:text-xs xl:text-xs">
              Order Type
            </SubSectionHeading>
            <Separator className="hidden w-full flex-1 bg-input/50 sm:block" />
            <OrderItemType orderType={order.orderType} />
          </div>
          <div className="flex w-full flex-col items-start justify-start gap-2.5 sm:flex-row sm:items-center sm:justify-between">
            <SubSectionHeading
              as="h4"
              className="flex items-center justify-start gap-1.5 text-xs uppercase tracking-[0.2em] text-muted-foreground lg:text-xs xl:text-xs">
              Order Status
            </SubSectionHeading>
            <Separator className="hidden w-full flex-1 bg-input/50 sm:block" />
            <OrderItemStatus orderStatus={order.orderStatus} />
          </div>
          <div className="flex w-full flex-col items-start justify-start gap-2.5 sm:flex-row sm:items-center sm:justify-between">
            <SubSectionHeading
              as="h4"
              className="flex items-center justify-start gap-1.5 text-xs uppercase tracking-[0.2em] text-muted-foreground lg:text-xs xl:text-xs">
              Product Order Type
            </SubSectionHeading>
            <Separator className="hidden w-full flex-1 bg-input/50 sm:block" />
            <StatusBadge
              label={order.productOrderType ? order.productOrderType : "N/A"}
              className={cn({
                "border-blue-500/10 bg-blue-500/10 text-blue-500 hover:bg-blue-500/10":
                  order.productOrderType === "paid",
                "border-teal-500/10 bg-teal-500/10 text-teal-500 hover:bg-teal-500/10":
                  order.productOrderType === "free",
                "border-primary/5 bg-primary/5 text-primary hover:bg-primary/5":
                  !order.productOrderType,
              })}
            />
          </div>
          <div className="mb-10 flex w-full flex-col items-start justify-start gap-2.5 sm:flex-row sm:items-center sm:justify-between">
            <SubSectionHeading
              as="h4"
              className="flex items-center justify-start gap-1.5 text-xs uppercase tracking-[0.2em] text-muted-foreground lg:text-xs xl:text-xs">
              Product Order Status
            </SubSectionHeading>
            <Separator className="hidden w-full flex-1 bg-input/50 sm:block" />
            <StatusBadge
              label={
                order.productOrderStatus
                  ? order.productOrderStatus.split("-").join(" ")
                  : "N/A"
              }
              className={cn({
                "border-blue-500/10 bg-blue-500/10 text-blue-500 hover:bg-blue-500/10":
                  order.productOrderStatus === "paid",
                "border-teal-500/10 bg-teal-500/10 text-teal-500 hover:bg-teal-500/10":
                  order.productOrderStatus === "refunded",
                "border-yellow-500/10 bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/10":
                  order.productOrderStatus === "pending",
                "border-red-500/10 bg-red-500/10 text-red-500 hover:bg-red-500/10":
                  order.productOrderStatus === "failed",
                "border-primary/5 bg-primary/5 text-primary hover:bg-primary/5":
                  order.productOrderStatus === "not-applicable",
              })}
            />
          </div>
          <Separator className="block w-full flex-1 bg-input/50 sm:hidden" />
          <div className="flex w-full flex-col items-start justify-start gap-2.5 sm:flex-row sm:items-center sm:justify-between">
            <SubSectionHeading
              as="h4"
              className="flex items-center justify-start gap-1.5 text-xs uppercase tracking-[0.2em] text-foreground lg:text-xs xl:text-xs">
              Order Items
            </SubSectionHeading>
            <Separator className="hidden w-full flex-1 bg-input/50 sm:block" />
          </div>
          <div className="mb-5 flex w-full flex-col gap-2.5">
            {order.items.map((orderItem) => (
              <div
                key={orderItem.id}
                className="flex w-full flex-col items-start justify-start gap-2.5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex w-full flex-col items-start justify-start gap-x-5 gap-y-2.5 sm:w-max sm:flex-row sm:items-center">
                  <SubSectionHeading
                    as="h5"
                    className="flex w-full items-center justify-between gap-2.5 text-base tracking-normal text-foreground sm:w-max sm:justify-start lg:text-base xl:text-base">
                    <span className="block max-w-60 truncate sm:max-w-80 md:max-w-sm">
                      {(isObject(orderItem.product) &&
                        orderItem.product.title) ||
                        (isObject(orderItem.service) &&
                          orderItem.service.name) ||
                        (isObject(orderItem.package) &&
                          orderItem.package.name)}{" "}
                    </span>
                    <div className="flex items-center justify-start gap-2.5">
                      <XIcon className="size-4 text-muted-foreground" />
                      {orderItem.quantity}
                    </div>
                  </SubSectionHeading>
                  <OrderItemType orderType={orderItem.itemType} />
                </div>
                <Paragraph className="text-mono text-base font-semibold text-foreground lg:text-base">
                  {orderItem.price} USD
                </Paragraph>
              </div>
            ))}
          </div>
          <div className="flex w-full flex-row items-center justify-between gap-5">
            <SubSectionHeading
              as="h4"
              className="flex items-center justify-start gap-1.5 text-xs uppercase tracking-[0.2em] text-foreground lg:text-xs xl:text-xs">
              Total
            </SubSectionHeading>
            <Separator className="w-full flex-1 bg-input/50" />
            <Paragraph className="text-mono text-base font-semibold text-foreground lg:text-base">
              {order.total} USD
            </Paragraph>
          </div>
          {!isPublicProfile && order.orderStatus === "new" ? (
            <Button
              variant="link"
              disabled={isPendingOrderCancel}
              onClick={() => orderCancel(order.id)}
              className="my-5 mb-0 w-max p-0 text-muted-foreground hover:text-foreground">
              <XIcon />
              {isPendingOrderCancel ? "Cancelling..." : "Cancel Order"}
            </Button>
          ) : null}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export const ActivityOrders = function ActivityOrders({
  user,
}: {
  user: User;
}) {
  const { isLoading: isLoadingStats, data: stats } = useQuery({
    queryKey: ["user-activity-orders-stats", user.id],
    queryFn: async () => {
      const response = await getUserActivityOrdersStats();
      return response;
    },
  });

  const queryKey = useMemo(() => ["user-activity-orders", user.id], [user.id]);

  const {
    isLoading,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    data,
  } = useInfiniteQuery({
    queryKey,
    queryFn: async ({ pageParam = 1 }) => {
      if (!user) return null;

      const response = await getCollection({
        collection: "orders",
        req: { user: { collection: "users", ...user } },
        user,
        filters: {
          page: pageParam,
          limit: 2,
          fields: { user: { equals: user.id } },
        },
        depth: 4,
      });

      if (!response.data || response.data.docs.length === 0 || response.error)
        return null;

      return response.data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage && lastPage.hasNextPage ? lastPage.nextPage : undefined,
  });

  const { orders } = useMemo(() => {
    if (!data) return { orders: [] };

    const pages = data.pages.flatMap((page) => (page ? page.docs : []));
    return { orders: pages };
  }, [data]);

  return (
    <SafeHydrate
      isLoading={isLoadingStats || isLoading}
      isLoadingComponent={LoadingActivity}>
      {(() => {
        if (
          !user ||
          !stats ||
          !stats.data ||
          stats.error ||
          !data ||
          orders.length === 0
        )
          return null;

        return (
          <div className="space-y-10">
            <div className="space-y-0.5">
              <SubSectionHeading
                as="h2"
                className="flex items-center gap-2.5 text-xl !leading-none lg:text-xl lg:!leading-none xl:text-xl xl:!leading-none">
                <Package2Icon className="size-6 stroke-[1.5]" />
                Orders Activity
              </SubSectionHeading>
              <Paragraph className="text-base lg:text-base">
                Your orders and their status across our platform
              </Paragraph>
            </div>

            <div className="!mb-20 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
              <StatCard
                color="blue"
                label="Total"
                value={stats.data.total}
                icon={PackageIcon}
              />

              <StatCard
                color="teal"
                label="New"
                value={stats.data.new}
                icon={PackagePlusIcon}
              />

              <StatCard
                color="green"
                label="Completed"
                value={stats.data.completed}
                icon={PackageCheckIcon}
              />

              <StatCard
                color="yellow"
                label="In Progress"
                value={stats.data.inProgress}
                icon={PackageSearchIcon}
              />

              <StatCard
                color="red"
                label="Cancelled"
                value={stats.data.cancelled}
                icon={PackageXIcon}
              />

              <StatCard
                color="primary"
                label="N/A"
                value={stats.data.notApplicable}
                icon={PackageMinusIcon}
              />
            </div>

            <section
              className={cn("flex w-full flex-col gap-5", {
                "pointer-events-none opacity-50": isFetching,
              })}>
              <Accordion type="single" collapsible className="space-y-5">
                {orders.map((order) => (
                  <OrderItem key={order.id} order={order} />
                ))}
              </Accordion>
            </section>

            {hasNextPage ? (
              <div className="flex w-full items-center justify-center">
                <Button
                  variant="link"
                  disabled={isFetchingNextPage}
                  onClick={() => fetchNextPage()}>
                  {isFetchingNextPage
                    ? "Loading more orders..."
                    : "Load more orders"}
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
