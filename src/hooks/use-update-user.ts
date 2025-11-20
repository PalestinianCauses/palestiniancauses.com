"use client";

// REVIEWED

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateUser as updateUserAction } from "@/actions/user";

export const useUpdateUser = function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};
