"use server";

// REVIEWED

import { messages } from "@/lib/messages";
import { actionSafeExecute } from "@/lib/network";
import { payload } from "@/lib/payload";
import { ResponseSafeExecute } from "@/lib/types";
import { isDefined, isNumber } from "@/lib/types/guards";
import { Order, RoomsPackage, RoomsService } from "@/payload-types";

import { getAuthentication } from "./auth";

const getItemPrice = (
  item: RoomsService | RoomsPackage | number | null | undefined,
): number => {
  if (!item || isNumber(item)) return 0;
  if ("price" in item && typeof item.price === "number") return item.price;
  return 0;
};

export const createServiceOrPackageOrder =
  async function createServiceOrPackageOrder(
    data: Order,
  ): Promise<ResponseSafeExecute<string>> {
    if (data.orderType !== "service" && data.orderType !== "package")
      return {
        data: null,
        error: messages.actions.order.inCorrectOrderTypeError,
      };

    // Fetch item (service or package)
    const { items: orderItems } = data;

    const orderItemsPromises = orderItems.map(async (item) => {
      if (data.orderType !== item.itemType) return null;

      const collection =
        item.itemType === "service" ? "rooms-services" : "rooms-packages";
      let id: number | null = null;

      if (item.itemType === "service" && isDefined(item.service))
        if (isNumber(item.service)) id = item.service;
        else id = item.service.id;
      else if (item.itemType === "package" && isDefined(item.package))
        if (isNumber(item.package)) id = item.package;
        else id = item.package.id;

      if (!id) return null;

      return payload.findByID({
        collection,
        id,
        depth: 1,
      });
    });

    const items = await Promise.all(orderItemsPromises);

    if (items.filter(Boolean).length === 0)
      return { data: null, error: messages.actions.order.noOrderItemsError };

    const itemsWithPrices: Order["items"][number][] = [];
    let pricesTotal = 0;

    items.forEach((item) => {
      if (isDefined(item)) {
        const price = getItemPrice(item);
        pricesTotal += price;

        itemsWithPrices.push({
          itemType: data.orderType,
          [data.orderType]: item.id,
          quantity: 1,
          price,
        });
      }
    });

    // Get authenticated user (customer) if signed in
    const authentication = await getAuthentication();

    if (!authentication || !authentication.id)
      return { data: null, error: messages.actions.order.unAuthenticated };

    // Create order
    const orderResponse = await actionSafeExecute(
      payload.create({
        collection: "orders",
        data: {
          user: authentication.id,
          roomOwner: data.roomOwner,
          orderType: data.orderType,
          customerName: data.customerName,
          customerEmail: data.customerEmail,
          customerPhone: data.customerPhone || undefined,
          customerMessage: data.customerMessage || undefined,
          total: pricesTotal,
          orderStatus: "new",
          productOrderStatus: "not-applicable",
          items: itemsWithPrices,
        },
      }),
      messages.actions.order.serverError,
    );

    if (!orderResponse.data || orderResponse.error)
      return { data: null, error: orderResponse.error };

    // Email and WhatsApp notifications are handled automatically
    // via Orders collection's afterChange hook

    return {
      data: messages.actions.order.success,
      error: null,
    };
  };
