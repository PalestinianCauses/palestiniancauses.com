"use client";

// REVIEWED

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { deleteUserAccount as deleteUserAccountAction } from "@/actions/account-deletion";

export const useDeleteAccount = function useDeleteAccount() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: deleteUserAccountAction,
    onSuccess: () => {
      queryClient.clear();
      router.push("/");
    },
  });
};
