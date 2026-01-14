"use client";

// REVIEWED - 08

import { useMutation } from "@tanstack/react-query";
import { format } from "date-fns/format";
import {
  ArrowRightIcon,
  DownloadIcon,
  ExternalLinkIcon,
  Package2Icon,
  PackageCheckIcon,
  PackageIcon,
  PackageMinusIcon,
  PackagePlusIcon,
  PackageSearchIcon,
  PackageXIcon,
  XIcon,
} from "lucide-react";
import Link from "next/link";
import { Fragment } from "react";
import { toast } from "sonner";

import {
  userOrdersCancel,
  userOrdersGetCheckoutURL,
} from "@/actions/user-orders";
import { messages } from "@/lib/messages";
import { isObject, isString } from "@/lib/types/guards";
import { createProductDownloadingURLs } from "@/lib/utils/product-download-urls";
import { cn } from "@/lib/utils/styles";
import { Order } from "@/payload-types";

import { Paragraph, SubSectionHeading } from "../globals/typography";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

import { StatCard, StatusBadge } from "./globals";

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

  const { mutate: getCheckoutURL, isPending: isPendingCheckout } = useMutation({
    mutationFn: async (id: number) => {
      const response = await userOrdersGetCheckoutURL(id);
      return response;
    },
    onSuccess: (response) => {
      if (!response.data || response.error) {
        toast.error(
          response.error ||
            messages.actions.order.serverErrorGetCheckoutSession,
        );

        return;
      }

      window.location.href = response.data;
    },
  });

  const isInProgressProductOrder =
    !isPublicProfile &&
    order.orderType === "product" &&
    order.orderStatus === "in-progress" &&
    order.productOrderStatus === "pending";

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
            {order.items.map((orderItem) => {
              const isCompletePlusPaid =
                order.orderStatus === "completed" &&
                order.productOrderStatus === "paid" &&
                orderItem.itemType === "product";

              const downloadingURLs =
                isCompletePlusPaid && isObject(orderItem.product)
                  ? createProductDownloadingURLs(orderItem.product)
                  : [];

              return (
                <div key={orderItem.id} className="flex w-full flex-col gap-5">
                  <div className="flex w-full flex-col items-start justify-start gap-2.5 sm:flex-row sm:items-center sm:justify-between">
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
                  {downloadingURLs.length !== 0 ? (
                    <div className="space-y-2.5 p-0">
                      {downloadingURLs.map((link, index) => (
                        <Button
                          key={link.url || index}
                          variant="outline"
                          size="lg"
                          className="w-full justify-start px-5"
                          asChild>
                          <Link
                            href={link.url}
                            target="_blank"
                            rel="noreferrer noopener">
                            <ExternalLinkIcon />
                            <span className="mr-auto truncate">
                              {link.title}
                              {link.isFile && link.fileSize ? (
                                <span className="ml-2.5 font-mono text-sm leading-none text-muted-foreground">
                                  ({Math.round(link.fileSize / 1024 / 1024)} MB)
                                </span>
                              ) : null}
                            </span>
                            <DownloadIcon className="!size-5" />
                          </Link>
                        </Button>
                      ))}
                    </div>
                  ) : null}
                </div>
              );
            })}
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
          {isInProgressProductOrder ? (
            <div className="my-5 mb-0 flex flex-col items-start justify-start gap-5 sm:flex-row sm:items-center">
              {isString(order.stripeSessionId) ? (
                <Button
                  variant="default"
                  disabled={isPendingCheckout || isPendingOrderCancel}
                  onClick={() => getCheckoutURL(order.id)}
                  className="w-max">
                  {isPendingCheckout ? (
                    "Preparing your checkout—please hold on..."
                  ) : (
                    <Fragment>
                      Continue to Checkout
                      <ArrowRightIcon className="size-4" />
                    </Fragment>
                  )}
                </Button>
              ) : null}

              <Button
                variant="link"
                disabled={isPendingOrderCancel || isPendingCheckout}
                onClick={() => orderCancel(order.id)}
                className="w-max p-0 text-muted-foreground hover:text-foreground">
                <XIcon />
                {isPendingOrderCancel ? "Cancelling..." : "Cancel Order"}
              </Button>
            </div>
          ) : null}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export const ActivityOrders = function ActivityOrders({
  orders,
}: {
  orders: Order[];
}) {
  const total = orders.length;
  const news = orders.filter((order) => order.orderStatus === "new").length;
  const completed = orders.filter(
    (order) => order.orderStatus === "completed",
  ).length;
  const inProgress = orders.filter(
    (order) => order.orderStatus === "in-progress",
  ).length;
  const cancelled = orders.filter(
    (order) => order.orderStatus === "cancelled",
  ).length;
  const notApplicable = orders.filter(
    (order) => order.orderStatus === "not-applicable",
  ).length;
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
        <StatCard color="blue" label="Total" value={total} icon={PackageIcon} />

        <StatCard
          color="teal"
          label="New"
          value={news}
          icon={PackagePlusIcon}
        />

        <StatCard
          color="green"
          label="Completed"
          value={completed}
          icon={PackageCheckIcon}
        />

        <StatCard
          color="yellow"
          label="In Progress"
          value={inProgress}
          icon={PackageSearchIcon}
        />

        <StatCard
          color="red"
          label="Cancelled"
          value={cancelled}
          icon={PackageXIcon}
        />

        <StatCard
          color="primary"
          label="N/A"
          value={notApplicable}
          icon={PackageMinusIcon}
        />
      </div>

      <section className={cn("flex w-full flex-col gap-5", {})}>
        <Accordion type="single" collapsible className="space-y-5">
          {orders.map((order) => (
            <OrderItem key={order.id} order={order} />
          ))}
        </Accordion>
      </section>
    </div>
  );
};
