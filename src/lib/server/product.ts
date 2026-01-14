// REVIEWED

import { messages } from "@/lib/messages";
import { actionSafeExecute } from "@/lib/network";
import { payload } from "@/lib/payload";
import { ResponseSafeExecute } from "@/lib/types";
import { Product, User } from "@/payload-types";

export const getProduct = async function getProduct(
  productSlug: string,
  user?: User,
): Promise<ResponseSafeExecute<Product>> {
  const response = await actionSafeExecute(
    payload.find({
      ...(user
        ? {
            req: { user: { collection: "users", ...user } },
            user,
            overrideAccess: false,
          }
        : {}),
      collection: "products",
      where: { slug: { equals: productSlug } },
      limit: 1,
      depth: 1,
    }),
    messages.actions.product.serverError,
  );

  if (!response.data || response.error || response.data.docs.length !== 1)
    return {
      data: null,
      error: messages.actions.product.notFound,
    };

  return { data: response.data.docs[0], error: null };
};
