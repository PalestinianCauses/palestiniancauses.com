"use server";

// REVIEWED

import { messages } from "@/lib/messages";
import { actionSafeExecute } from "@/lib/network";
import { payload } from "@/lib/payload";
import { ResponseSafeExecute } from "@/lib/types";

import { getAuthentication } from "./auth";

type UserActivityOrdersStats = {
  total: number;
  new: number;
  inProgress: number;
  completed: number;
  cancelled: number;
  notApplicable: number;
};

export const getUserActivityOrdersStats =
  async function getUserActivityOrdersStats(): Promise<
    ResponseSafeExecute<UserActivityOrdersStats>
  > {
    const authentication = await getAuthentication();

    if (!authentication)
      return { data: null, error: messages.actions.user.unAuthenticated };

    const user = authentication;

    const responseOrders = await actionSafeExecute(
      payload.find({
        req: { user: { collection: "users", ...user } },
        user,
        collection: "orders",
        where: { user: { equals: user.id } },
        select: { orderStatus: true },
        overrideAccess: false,
      }),
      messages.actions.order.serverErrorGet,
    );

    if (!responseOrders.data || responseOrders.error)
      return { data: null, error: messages.actions.order.serverErrorGet };

    const ordersNew = responseOrders.data.docs.filter(
      (order) => order.orderStatus === "new",
    );

    const ordersInProgress = responseOrders.data.docs.filter(
      (order) => order.orderStatus === "in-progress",
    );

    const ordersCompleted = responseOrders.data.docs.filter(
      (order) => order.orderStatus === "completed",
    );

    const ordersCancelled = responseOrders.data.docs.filter(
      (order) => order.orderStatus === "cancelled",
    );

    const ordersNotApplicable = responseOrders.data.docs.filter(
      (order) => order.orderStatus === "not-applicable",
    );

    const total =
      ordersNew.length +
      ordersInProgress.length +
      ordersCompleted.length +
      ordersCancelled.length +
      ordersNotApplicable.length;

    return {
      data: {
        total,
        new: ordersNew.length,
        inProgress: ordersInProgress.length,
        completed: ordersCompleted.length,
        cancelled: ordersCancelled.length,
        notApplicable: ordersNotApplicable.length,
      },
      error: null,
    };
  };
