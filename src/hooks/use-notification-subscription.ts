"use client";

// REVIEWED - 05

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import {
  getNotificationSubscription,
  notifySubscribers,
  subscribeToNotifications,
  unsubscribeFromNotifications,
} from "@/actions/notification-subscription";
import { messages } from "@/lib/messages";
import { base64ToUint8Array } from "@/lib/utils/pwa";
import { NotificationSubscription } from "@/payload-types";

export const useNotificationSubscription =
  function useNotificationSubscription() {
    const queryClient = useQueryClient();
    const [isAvailable, setIsAvailable] = useState(false);

    useEffect(() => {
      if ("serviceWorker" in navigator && "PushManager" in window)
        setIsAvailable(true);
    }, []);

    const {
      isPending,
      isFetching,
      data: subscription,
    } = useQuery<NotificationSubscription | null>({
      queryKey: ["notification-subscription"],
      queryFn: async () => {
        try {
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
          console.error(error);
          return null;
        }
      },
      enabled: isAvailable,
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
          ...JSON.parse(JSON.stringify(registrationSubscription)),
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

        if (
          response.data !==
          messages.actions.notificationSubscription.duplication
        )
          await notifySubscribers(
            {
              title: "Thank you for Subscribing!",
              body: "You are now subscribed to receive timely updates and important news!",
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
      isPending: isPending || isFetching,
      isAvailable,
      subscription,
      subscribe,
      unsubscribe,
    };
  };
