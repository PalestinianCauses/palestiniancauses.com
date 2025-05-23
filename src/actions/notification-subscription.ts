"use server";

// REVIEWED - 03

import { Where } from "payload";
import {
  setVapidDetails as configVapid,
  sendNotification as notify,
} from "web-push";

import { messages } from "@/lib/errors";
import { payload } from "@/lib/payload";
import { ActionSafeExecute, actionSafeExecute } from "@/lib/utils";
import { NotificationSubscription } from "@/payload-types";

configVapid(
  "mailto:hello@palestiniancauses.com",
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!,
);

export const getNotificationSubscription =
  async function getNotificationSubscription(
    subscription: Pick<NotificationSubscription, "endpoint">,
  ): Promise<ActionSafeExecute<NotificationSubscription, string>> {
    const response = await actionSafeExecute(
      payload.find({
        collection: "notification-subscriptions",
        where: { endpoint: { equals: subscription.endpoint } },
      }),
      messages.actions.notificationSubscription.serverErrorGet,
    );

    if (!response.data || response.data.docs.length !== 1 || response.error)
      return {
        data: null,
        error: messages.actions.notificationSubscription.notFound,
      };

    return { data: response.data.docs[0], error: null };
  };

export const subscribeToNotifications = async function subscribeToNotifications(
  subscription: Omit<
    NotificationSubscription,
    "id" | "createdAt" | "updatedAt"
  >,
): Promise<ActionSafeExecute<string, string>> {
  const subscriptionExisting = await actionSafeExecute(
    payload.find({
      collection: "notification-subscriptions",
      where: { endpoint: { equals: subscription.endpoint } },
    }),
    messages.actions.notificationSubscription.serverErrorGet,
  );

  if (!subscriptionExisting.data || subscriptionExisting.error)
    return subscriptionExisting;

  if (subscriptionExisting.data.docs.length)
    return {
      data: messages.actions.notificationSubscription.duplication,
      error: null,
    };

  const response = await actionSafeExecute(
    payload.create({
      collection: "notification-subscriptions",
      data: subscription,
    }),
    messages.actions.notificationSubscription.serverError,
  );

  if (!response.data || response.error) return response;

  return {
    data: messages.actions.notificationSubscription.success,
    error: null,
  };
};

export const unsubscribeFromNotifications =
  async function unsubscribeFromNotifications(
    subscription: Pick<NotificationSubscription, "endpoint">,
  ): Promise<ActionSafeExecute<string, string>> {
    const response = await actionSafeExecute(
      payload.delete({
        collection: "notification-subscriptions",
        where: { endpoint: { equals: subscription.endpoint } },
      }),
      messages.actions.notificationSubscription.serverErrorDelete,
    );

    if (!response.data || response.error) return response;

    return {
      data: messages.actions.notificationSubscription.successDelete,
      error: null,
    };
  };

export const notifySubscribers = async function notifySubscribers(
  options: {
    title: string;
    body: string;
    data: { primaryKey?: string; dateOfArrival?: number; url: string };
    // eslint-disable-next-line no-undef
  } & NotificationOptions,
  where?: Where,
) {
  const subscriptions = await actionSafeExecute(
    payload.find({ collection: "notification-subscriptions", where }),
    messages.actions.notificationSubscription.serverErrorNotify,
  );

  if (!subscriptions.data || subscriptions.error) {
    console.log(subscriptions.error);
    return subscriptions;
  }

  const notifications = subscriptions.data.docs.map((subscription) =>
    notify(
      { endpoint: subscription.endpoint, keys: subscription.keys },
      JSON.stringify(options),
    ),
  );

  await Promise.all(notifications);

  console.log(messages.actions.notificationSubscription.successNotify);

  subscriptions.data.docs.forEach((subscription) => {
    console.log(subscription.id, options.title, options.body);
  });

  return {
    data: messages.actions.notificationSubscription.successNotify,
    error: null,
  };
};
