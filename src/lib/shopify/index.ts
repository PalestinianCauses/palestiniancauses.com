// REVIEWED

/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-throw-literal */
/* eslint-disable no-undef */

import {
  HIDDEN_PRODUCT_TAG,
  SHOPIFY_GRAPHQL_API_ENDPOINT,
  TAGS,
} from "../constants";
import { isShopifyError } from "../type-guards";
import { ensureStartsWith } from "../utils";

import { createCartMutation, insertToCartMutation } from "./mutations/cart";
import { getCartQuery } from "./queries/cart";
import { getProductQuery, getProductsQuery } from "./queries/product";
import {
  Cart,
  Connection,
  Image,
  Product,
  ShopifyCart,
  ShopifyCartOperation,
  ShopifyCreateCartOperation,
  ShopifyInsertToCartOperation,
  ShopifyProduct,
  ShopifyProductOperation,
  ShopifyProductsOperation,
} from "./types";

const domain = process.env.SHOPIFY_STORE_DOMAIN
  ? ensureStartsWith(process.env.SHOPIFY_STORE_DOMAIN, "https://")
  : "";

const endpoint = [domain, SHOPIFY_GRAPHQL_API_ENDPOINT].join("");
const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!;

type ExtractVariables<T> = T extends { variables: object }
  ? T["variables"]
  : never;

export const shopifyFetch = async function shopifyFetch<T>({
  headers,
  cache = "force-cache",
  query,
  variables,
  tags,
}: {
  headers?: HeadersInit;
  cache?: RequestCache;
  query: string;
  variables?: ExtractVariables<T>;
  tags?: string[];
}): Promise<{ status: number; body: T } | never> {
  try {
    const result = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": token,
        ...headers,
      },
      body: JSON.stringify({
        ...(query && { query }),
        ...(variables && { variables }),
      }),
      cache,
      ...(tags && { next: { tags } }),
    });

    const body = await result.json();

    if (body.errors) throw body.errors[0];

    return {
      status: result.status,
      body,
    };
  } catch (error) {
    if (isShopifyError(error)) {
      throw {
        status: error.status || 500,
        message: error.message,
        cause: error.cause?.toString() || "unknown",
        query,
      };
    }

    throw {
      error,
      query,
    };
  }
};

export const removeEdgesPlusNodes = function removeEdgesPlusNodes<T>(
  array: Connection<T>,
): T[] {
  return array.edges.map((edge) => edge?.node);
};

const reShapeImages = (images: Connection<Image>, productTitle: string) => {
  const flattened = removeEdgesPlusNodes(images);

  return flattened.map((image) => {
    const filename = image.url.match(/.*\/(.*)\..*/)?.[1];
    return {
      ...image,
      altText: image.altText || `${productTitle} - ${filename}`,
    };
  });
};

const reShapeProduct = function reShapeProduct(
  product: ShopifyProduct,
  filterHiddenProducts: boolean = true,
) {
  if (
    !product ||
    (filterHiddenProducts && product.tags.includes(HIDDEN_PRODUCT_TAG))
  )
    return undefined;

  const { images, variants, ...rest } = product;

  return {
    ...rest,
    images: reShapeImages(images, product.title),
    variants: removeEdgesPlusNodes(variants),
  };
};

const reShapeProducts = function reShapeProducts(products: ShopifyProduct[]) {
  const productsReShaped = [];

  for (const product of products) {
    if (product) {
      const productReShaped = reShapeProduct(product);
      if (productReShaped) productsReShaped.push(productReShaped);
    }
  }

  return productsReShaped;
};

const reShapeCart = (cart: ShopifyCart): Cart => {
  if (!cart.cost?.totalTaxAmount)
    cart.cost.totalTaxAmount = {
      amount: "0.0",
      currencyCode: cart.cost.totalAmount.currencyCode,
    };

  return {
    ...cart,
    lines: removeEdgesPlusNodes(cart.lines),
  };
};

export const getProduct = async function getProduct(
  handle: string,
): Promise<Product | undefined> {
  const response = await shopifyFetch<ShopifyProductOperation>({
    query: getProductQuery,
    variables: { handle },
    tags: [TAGS.products],
  });

  return reShapeProduct(response.body.data.product, false);
};

export const getProducts = async function getProducts({
  query,
  reverse,
  sortKey,
}: {
  query?: string;
  reverse?: boolean;
  sortKey?: string;
}): Promise<Product[]> {
  const response = await shopifyFetch<ShopifyProductsOperation>({
    query: getProductsQuery,
    variables: { query, reverse, sortKey },
    tags: [TAGS.products],
  });

  return reShapeProducts(removeEdgesPlusNodes(response.body.data.products));
};

export const createCart = async function createCart(): Promise<Cart> {
  const response = await shopifyFetch<ShopifyCreateCartOperation>({
    cache: "no-store",
    query: createCartMutation,
  });

  return reShapeCart(response.body.data.cartCreate.cart);
};

export const insertToCart = async function insertToCart(
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[],
): Promise<Cart> {
  const response = await shopifyFetch<ShopifyInsertToCartOperation>({
    cache: "no-store",
    query: insertToCartMutation,
    variables: { cartId, lines },
  });

  return reShapeCart(response.body.data.cartLinesAdd.cart);
};

export const getCart = async function getCart(
  cartId: string | undefined,
): Promise<Cart | undefined> {
  if (!cartId) return undefined;

  const response = await shopifyFetch<ShopifyCartOperation>({
    query: getCartQuery,
    variables: { cartId },
    tags: [TAGS.cart],
  });

  if (!response.body.data.cart) return undefined;

  return reShapeCart(response.body.data.cart);
};
