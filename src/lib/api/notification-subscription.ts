// REVIEWED

import { z } from "zod";

import { NotificationSubscription } from "@/payload-types";

import { messages } from "../messages";
import { httpSafeExecute } from "../network";
import { ResponseSafeExecute } from "../types";

export const getNotificationSubscription =
  async function getNotificationSubscription(
    subscription: Pick<NotificationSubscription, "endpoint">,
  ): Promise<ResponseSafeExecute<NotificationSubscription, string | number>> {
    const baseURL = process.env.NEXT_PUBLIC_URL || "";
    const params = new URLSearchParams({ endpoint: subscription.endpoint });

    try {
      const response = await httpSafeExecute({
        http: fetch(
          [
            `${baseURL}/api/public/notification-subscriptions/by-endpoint`,
            params,
          ].join("?"),
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            cache: "no-store",
          },
        ),
        errorDefault: messages.http.serverError,
        isData: (data): data is NotificationSubscription => {
          const validate = z
            .object({
              id: z.number(),
              endpoint: z.string(),
              keys: z.object({ p256dh: z.string(), auth: z.string() }),
              userAgent: z.string(),
            })
            .safeParse(data);

          return validate.success;
        },
      });

      return response;
    } catch (error) {
      console.error("Failed to get notification subscription:", error);
      return {
        data: null,
        error: messages.actions.notificationSubscription.notFound,
      };
    }
  };
