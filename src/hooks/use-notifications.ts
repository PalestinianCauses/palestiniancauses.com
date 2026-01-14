"use client";

// REVIEWED - 04

import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { PaginatedDocs } from "payload";
import { toast } from "sonner";

import {
  markingEveryNotificationAsRead,
  markingNotificationAsRead,
} from "@/actions/notifications";
import { messages } from "@/lib/messages";
import { Notification } from "@/payload-types";

type InfiniteNotifications = InfiniteData<PaginatedDocs<Notification>>;

export const useNotifications = function useNotifications({
  userId,
}: {
  userId?: number;
}) {
  const queryClient = useQueryClient();
  const queryKey = ["user-notifications", userId];

  const markingAsRead = useMutation({
    mutationFn: markingNotificationAsRead,
    onMutate: async (notificationId) => {
      await queryClient.cancelQueries({ queryKey });

      const previousData =
        queryClient.getQueryData<InfiniteNotifications>(queryKey);

      queryClient.setQueryData<InfiniteNotifications>(queryKey, (old) => {
        if (!old) return old;

        return {
          ...old,
          pages: old.pages.map((page) => {
            if (!page) return page;

            return {
              ...page,
              docs: page.docs.map((notification) =>
                notification.id === notificationId
                  ? { ...notification, read: true }
                  : notification,
              ),
            };
          }),
        };
      });

      return { previousData };
    },
    onError: (_error, _, context) => {
      if (context?.previousData)
        queryClient.setQueryData(queryKey, context.previousData);

      toast.error(messages.actions.notification.serverErrorRead);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  const markingEveryAsRead = useMutation({
    mutationFn: markingEveryNotificationAsRead,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });

      const previousData =
        queryClient.getQueryData<InfiniteNotifications>(queryKey);

      queryClient.setQueryData<InfiniteNotifications>(queryKey, (old) => {
        if (!old) return old;

        return {
          ...old,
          pages: old.pages.map((page) => {
            if (!page) return page;

            return {
              ...page,
              docs: page.docs.map((notification) => ({
                ...notification,
                read: true,
              })),
            };
          }),
        };
      });

      return { previousData };
    },
    onError: (error, _, context) => {
      if (context?.previousData)
        queryClient.setQueryData(queryKey, context.previousData);

      toast.error(messages.actions.notification.serverErrorRead);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  return {
    markingAsRead,
    markingEveryAsRead,
  };
};
