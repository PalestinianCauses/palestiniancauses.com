"use client";

// REVIEWED - 03

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  markingEveryNotificationAsRead,
  markingNotificationAsRead,
} from "@/actions/notifications";

export const useNotifications = function useNotifications({
  userId,
}: {
  userId?: number;
}) {
  const queryClient = useQueryClient();

  const markingAsRead = useMutation({
    mutationFn: markingNotificationAsRead,
    onSuccess: (response) => {
      if (!response.data || response.error) toast.error(response.error);
      else
        queryClient.invalidateQueries({
          queryKey: ["user-notifications", userId],
        });
    },
  });

  const markingEveryAsRead = useMutation({
    mutationFn: markingEveryNotificationAsRead,
    onSuccess: (response) => {
      if (!response.data || response.error) toast.error(response.error);
      else
        queryClient.invalidateQueries({
          queryKey: ["user-notifications", userId],
        });
    },
  });

  return {
    markingAsRead,
    markingEveryAsRead,
  };
};
