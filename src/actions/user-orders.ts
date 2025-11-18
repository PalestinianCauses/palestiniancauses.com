"use server";

// REVIEWED

import { payload } from "@/lib/payload";
import { ResponseSafeExecute } from "@/lib/types";
import { Order } from "@/payload-types";

import { getAuthentication } from "./auth";

export const getUserOrders = async function getUserOrders(): Promise<
  ResponseSafeExecute<Order[]>
> {
  const auth = await getAuthentication();

  if (!auth) return { data: [], error: null };

  const response = await payload.find({
    collection: "orders",
    where: { user: { equals: auth.id } },
    sort: "-createdAt",
    limit: 100,
    depth: 2,
  });

  return { data: response.docs, error: null };
};
