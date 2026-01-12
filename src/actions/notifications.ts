"use server";

// REVIEWED - 07

import { messages } from "@/lib/messages";
import { actionSafeExecute } from "@/lib/network";
import { payload } from "@/lib/payload";
import { getAuthentication } from "@/lib/server/auth";
import { ResponseSafeExecute } from "@/lib/types";
import { isObject } from "@/lib/types/guards";

export const markingNotificationAsRead =
  async function markingNotificationAsRead(
    id: number,
  ): Promise<ResponseSafeExecute<string>> {
    const auth = await getAuthentication();

    if (!auth)
      return {
        data: null,
        error: messages.actions.user.unAuthenticated,
      };

    const notificationResponse = await actionSafeExecute(
      payload.findByID({
        req: { user: { ...auth, collection: "users" } },
        user: auth,
        collection: "notifications",
        id,
        depth: 0,
        overrideAccess: false,
      }),
      messages.actions.notification.serverError,
    );

    if (!notificationResponse.data || notificationResponse.error)
      return {
        data: null,
        error: messages.actions.notification.notFound,
      };

    const notification = notificationResponse.data;
    const notificationUserId = isObject(notification.user)
      ? notification.user.id
      : notification.user;

    if (notificationUserId !== auth.id)
      return {
        data: null,
        error: messages.actions.user.unAuthorized,
      };

    const updateResponse = await actionSafeExecute(
      payload.update({
        req: { user: { ...auth, collection: "users" } },
        user: auth,
        collection: "notifications",
        id,
        data: { read: true },
        overrideAccess: false,
      }),
      messages.actions.notification.serverError,
    );

    if (!updateResponse.data || updateResponse.error)
      return {
        data: null,
        error: messages.actions.notification.serverError,
      };

    return { data: messages.actions.notification.successRead, error: null };
  };

export const markingEveryNotificationAsRead =
  async function markingEveryNotificationAsRead(): Promise<
    ResponseSafeExecute<string>
  > {
    const auth = await getAuthentication();

    if (!auth)
      return {
        data: null,
        error: messages.actions.user.unAuthenticated,
      };

    const notificationsResponse = await actionSafeExecute(
      payload.update({
        req: { user: { ...auth, collection: "users" } },
        user: auth,
        collection: "notifications",
        where: { user: { equals: auth.id }, read: { equals: false } },
        data: { read: true },
        overrideAccess: false,
      }),
      messages.actions.notification.serverError,
    );

    if (!notificationsResponse.data || notificationsResponse.error)
      return {
        data: null,
        error: notificationsResponse.error,
      };

    return {
      data: messages.actions.notification.successEveryRead,
      error: null,
    };
  };
