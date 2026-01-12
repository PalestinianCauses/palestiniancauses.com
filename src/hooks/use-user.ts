"use client";

// REVIEWED  - 21

import { useQuery } from "@tanstack/react-query";

import { messages } from "@/lib/messages";
import { actionSafeExecute } from "@/lib/network";
import { sdk } from "@/lib/query";

export const useUser = function useUser() {
  const query = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await actionSafeExecute(
        sdk.me({ collection: "users" }),
        messages.actions.user.serverError,
      );

      if (!response.data || !response.data.user || response.error) return null;

      return {
        ...response.data.user,
        collection: response.data.collection || "users",
      };
    },
  });

  return {
    ...query,
  };
};
