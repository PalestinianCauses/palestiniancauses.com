"use client";

// REVIEWED

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  getNotifications,
  markingEveryNotificationAsRead,
  markingNotificationAsRead,
} from "@/actions/notifications";

export const useNotifications = function useNotifications() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["notifications"],
    queryFn: () => getNotifications(),
  });

  const markingAsRead = useMutation({
    mutationFn: markingNotificationAsRead,
    onSuccess: (response) => {
      if (!response.data || response.error) toast.error(response.error);
      else queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });

  const markingEveryAsRead = useMutation({
    mutationFn: markingEveryNotificationAsRead,
    onSuccess: (response) => {
      if (!response.data || response.error) toast.error(response.error);
      else queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });

  return {
    ...query,
    markingAsRead,
    markingEveryAsRead,
  };
};
