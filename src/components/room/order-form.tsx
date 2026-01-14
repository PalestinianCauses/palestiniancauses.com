"use client";

// REVIEWED - 02

import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowUpRight,
  BriefcaseBusinessIcon,
  Loader2,
  PackageIcon,
  ShoppingBagIcon,
} from "lucide-react";
import { Fragment, type ReactNode, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { useOrder } from "@/hooks/use-order";
import { messages } from "@/lib/messages";
import { isObject } from "@/lib/types/guards";
import { cn } from "@/lib/utils/styles";
import { Order } from "@/payload-types";

import { Paragraph } from "../globals/typography";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

const OrderServiceOrPackageFormSchema = z.object({
  customerName: z.string().min(2),
  customerEmail: z.string().email(),
  customerPhone: z.string().optional(),
  customerMessage: z.string().max(1000).optional(),
});

type OrderServiceOrPackageFormData = z.infer<
  typeof OrderServiceOrPackageFormSchema
>;

export const OrderForm = function OrderForm({
  roomOwner,
  orderType,
  items,
  trigger,
}: {
  roomOwner: Order["roomOwner"];
  orderType: Order["orderType"];
  items: Order["items"];
  trigger: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const { createOrder } = useOrder();

  const form = useForm<OrderServiceOrPackageFormData>({
    resolver: zodResolver(OrderServiceOrPackageFormSchema),
    defaultValues: {
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      customerMessage: "",
    },
  });

  const handleSubmit = function handleSubmit(
    data: OrderServiceOrPackageFormData,
  ) {
    toast.loading(messages.actions.order.pending, {
      id: "create-order",
    });

    createOrder.mutate(
      { ...data, roomOwner, orderType, orderStatus: "new", items },
      {
        onSuccess: (response) => {
          if (!response.data || response.error)
            toast.error(response.error || messages.actions.order.serverError);
          else {
            toast.success(messages.actions.order.successServiceOrPackage);
            form.reset();
            setOpen(false);
          }
        },
      },
    );
  };

  const currency = useCallback(
    (item: Order["items"][number]) =>
      "currency" in item && item.currency ? String(item.currency) : "USD",
    [],
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="capitalize">Order {orderType}</DialogTitle>
          <DialogDescription>
            Kindly complete the form below to initiate your order for&nbsp;{" "}
            <span className="font-medium text-foreground">
              &quot;
              {items
                .map((item) =>
                  // eslint-disable-next-line no-nested-ternary
                  isObject(item.service)
                    ? item.service.name
                    : // eslint-disable-next-line no-nested-ternary
                      isObject(item.package)
                      ? item.package.name
                      : isObject(item.product)
                        ? item.product.title
                        : "Selected Item",
                )
                .join(", ")}
              &quot;.
            </span>{" "}
            Our team will reach out to you promptly via email or WhatsApp to
            confirm your request and provide further assistance.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="mb-5 flex flex-col items-stretch gap-2.5">
              {items.map((item, index) => (
                <div
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  className={cn("border-l-2 p-2.5 pr-5", {
                    "border-teal-500 bg-teal-500/10": orderType === "service",
                    "border-tertiary bg-tertiary/10": orderType === "package",
                    "border-tertiary-2 bg-tertiary-2/10":
                      orderType === "product",
                  })}>
                  <div className="flex items-center justify-between gap-5 xs:flex-row">
                    <div className="flex items-center justify-start gap-2.5">
                      {orderType === "service" && (
                        <BriefcaseBusinessIcon className="h-6 w-6 stroke-[1.5] text-teal-300" />
                      )}

                      {orderType === "package" && (
                        <PackageIcon className="h-6 w-6 stroke-[1.5] text-tertiary" />
                      )}

                      {orderType === "product" && (
                        <ShoppingBagIcon className="h-6 w-6 stroke-[1.5] text-tertiary-2" />
                      )}

                      <Paragraph className="text-base font-medium text-foreground xl:text-base">
                        {(orderType === "service" &&
                          isObject(item.service) &&
                          item.service.name) ||
                          (orderType === "package" &&
                            isObject(item.package) &&
                            item.package.name) ||
                          (orderType === "product" &&
                            isObject(item.product) &&
                            item.product.title)}
                      </Paragraph>
                    </div>
                    <Paragraph className="text-sm font-medium text-foreground lg:text-sm">
                      {orderType === "package" && isObject(item.package)
                        ? ((item.package.pricingType === "custom" ||
                            item.package.pricingType === "project") &&
                            `Starting at ${item.package.price} ${currency(item)}`) ||
                          (item.package.pricingType === "daily" &&
                            `${item.package.price} ${currency(item)} / per day`) ||
                          (item.package.pricingType === "fixed" &&
                            `${item.package.price} ${currency(item)}`) ||
                          (item.package.pricingType === "hourly" &&
                            `${item.package.price} ${currency(item)} / per hour`)
                        : item.price}
                    </Paragraph>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="customerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={createOrder.isPending} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="customerEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="e.g. resistance@gaza.com"
                        disabled={createOrder.isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="customerPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>WhatsApp Number</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="e.g. +1234567890"
                        disabled={createOrder.isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="customerMessage"
                render={({ field }) => (
                  <FormItem className="!mb-12">
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea {...field} disabled={createOrder.isPending} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-end gap-2.5">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setOpen(false)}
                  disabled={createOrder.isPending}>
                  Cancel
                </Button>
                <Button type="submit" disabled={createOrder.isPending}>
                  {createOrder.isPending ? (
                    <Fragment>
                      <Loader2 className="animate-spin" />
                      {messages.actions.order.pending}
                    </Fragment>
                  ) : (
                    <Fragment>
                      <ArrowUpRight />
                      <span className="capitalize">Order {orderType}</span>
                    </Fragment>
                  )}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
