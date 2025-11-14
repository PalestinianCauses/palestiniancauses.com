// REVIEWED
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { createOrder } from "@/actions/order";
import { Order } from "@/payload-types";

export const useOrder = function useOrder() {
  const createOrderMutation = useMutation({
    mutationFn: async (
      data: Omit<Order, "id" | "user" | "total" | "createdAt" | "updatedAt">,
    ) => {
      const response = await createOrder(data);
      return response;
    },
    onSettled: () => {
      toast.dismiss("create-order");
    },
  });

  return {
    createOrder: createOrderMutation,
  };
};
