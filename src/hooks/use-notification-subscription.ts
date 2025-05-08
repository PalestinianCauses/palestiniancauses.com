"use client";

// REVIEWED

import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import {
  getNotificationSubscription,
  notifySubscribers,
  subscribeToNotifications,
  unsubscribeFromNotifications,
} from "@/actions/notification-subscription";
import { queryClient } from "@/app/(app)/providers";
import { messages } from "@/lib/errors";
import { base64ToUint8Array } from "@/lib/utils";
import { NotificationSubscription } from "@/payload-types";

export const useNotificationSubscription =
  function useNotificationSubscription() {
    const [isAvailable, setIsAvailable] = useState(false);

    useEffect(() => {
      if ("serviceWorker" in navigator && "PushManager" in window)
        setIsAvailable(true);
    }, []);

    const { isPending, data: subscription } =
      useQuery<NotificationSubscription | null>({
        queryKey: ["notification-subscription"],
        queryFn: async () => {
          try {
            if (!isAvailable) return null;

            const serviceWorker = await navigator.serviceWorker.ready;
            const serviceWorkerSubscription =
              await serviceWorker.pushManager.getSubscription();

            if (!serviceWorkerSubscription) return null;

            const response = await getNotificationSubscription({
              endpoint: serviceWorkerSubscription.endpoint,
            });

            if (!response.data || response.error) return null;

            return response.data;
          } catch (error) {
            console.log(error);
            return null;
          }
        },
      });

    const subscribe = useMutation({
      mutationFn: async () => {
        const registration = await navigator.serviceWorker.ready;
        const registrationSubscription =
          await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: base64ToUint8Array(
              process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
            ),
          });

        const { userAgent } = navigator;
        const response = await subscribeToNotifications({
          endpoint: registrationSubscription.endpoint,
          keys: {
            p256dh: JSON.parse(
              JSON.stringify(registrationSubscription.getKey("p256dh")),
            ),
            auth: JSON.parse(
              JSON.stringify(registrationSubscription.getKey("auth")),
            ),
          },
          userAgent,
        });

        return { registrationSubscription, response };
      },
      onSuccess: async ({ registrationSubscription, response }) => {
        if (!response.data || response.error) {
          toast.error(response.error);
          return;
        }

        toast.success(response.data);
        queryClient.invalidateQueries({
          queryKey: ["notification-subscription"],
        });

        await notifySubscribers(
          {
            title: "Welcome to Our Notifications!",
            body: "You are now subscribed and ready to receive updates!",
            data: { url: "/" },
          },
          { endpoint: { equals: registrationSubscription.endpoint } },
        );
      },
    });

    const unsubscribe = useMutation({
      mutationFn: async () => {
        if (!subscription)
          return {
            data: messages.actions.notificationSubscription.serverErrorDelete,
            error: null,
          };

        const response = await unsubscribeFromNotifications({
          endpoint: subscription.endpoint,
        });

        return response;
      },
      onSuccess: async (response) => {
        if (!response.data || response.error) {
          toast.error(response.error);
          return;
        }

        const serviceWorker = await navigator.serviceWorker.ready;
        const serviceWorkerSubscription =
          await serviceWorker.pushManager.getSubscription();

        if (!serviceWorkerSubscription) return;
        serviceWorkerSubscription.unsubscribe();

        toast.success(response.data);
        queryClient.invalidateQueries({
          queryKey: ["notification-subscription"],
        });
      },
    });

    return {
      isPending,
      isAvailable,
      subscription,
      subscribe,
      unsubscribe,
    };
  };
