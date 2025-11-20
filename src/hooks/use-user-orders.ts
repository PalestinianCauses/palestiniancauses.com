"use client";

// REVIEWED

import { useQuery } from "@tanstack/react-query";

import { getUserOrders } from "@/actions/user-orders";

export const useUserOrders = function useUserOrders() {
  return useQuery({
    queryKey: ["user-orders"],
    queryFn: getUserOrders,
  });
};
