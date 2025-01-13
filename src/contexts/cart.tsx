"use client";

// REVIEWED

import {
  createContext,
  PropsWithChildren,
  use,
  useCallback,
  useContext,
  useMemo,
  useOptimistic,
} from "react";

import type {
  Cart,
  CartItem,
  Product,
  ProductVariant,
} from "@/lib/shopify/types";

type UpdateType = "plus" | "minus" | "delete";

type CartAction =
  | {
      type: "INSERT_ITEM";
      payload: { product: Product; variant: ProductVariant };
    }
  | {
      type: "UPDATE_ITEM";
      payload: { merchandiseId: string; updateType: UpdateType };
    };

type CartContextType = {
  cart: Cart | undefined;
  /* eslint-disable-next-line no-unused-vars */
  insertCartItem: (product: Product, variant: ProductVariant) => void;
  /* eslint-disable-next-line no-unused-vars */
  updateCartItem: (merchandiseId: string, updateType: UpdateType) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const calculateItemCost = function calculateItemCost(
  price: string,
  quantity: number,
): string {
  return (Number(price) * quantity).toString();
};

const createEmptyCart = function createEmptyCart(): Cart {
  return {
    id: undefined,
    checkoutUrl: "",
    lines: [],
    totalQuantity: 0,
    cost: {
      totalAmount: { amount: "0", currencyCode: "USD" },
      totalTaxAmount: { amount: "0", currencyCode: "USD" },
      subtotalAmount: { amount: "0", currencyCode: "USD" },
    },
  };
};

const createOrUpdateCartItem = function createOrUpdateCartItem(
  existingItem: CartItem | undefined,
  product: Product,
  variant: ProductVariant,
): CartItem {
  const quantity = existingItem ? existingItem.quantity + 1 : 1;
  const totalAmount = calculateItemCost(variant.price.amount, quantity);

  return {
    id: existingItem?.id,
    quantity,
    cost: {
      totalAmount: {
        amount: totalAmount,
        currencyCode: variant.price.currencyCode,
      },
    },
    merchandise: {
      id: variant.id,
      title: variant.title,
      selectedOptions: variant.selectedOptions,
      product: {
        id: product.id,
        handle: product.handle,
        title: product.title,
        featuredImage: product.featuredImage,
      },
    },
  };
};

const updateCartItem = function updateCartItem(
  item: CartItem,
  updateType: UpdateType,
): CartItem | null {
  if (updateType === "delete") return null;

  const quantityNew =
    updateType === "plus" ? item.quantity + 1 : item.quantity - 1;
  if (quantityNew === 0) return null;

  const singleItemAmount = Number(item.cost.totalAmount.amount) / item.quantity;
  const totalAmountNew = calculateItemCost(
    singleItemAmount.toString(),
    quantityNew,
  );

  return {
    ...item,
    quantity: quantityNew,
    cost: {
      ...item.cost,
      totalAmount: {
        ...item.cost.totalAmount,
        amount: totalAmountNew,
      },
    },
  };
};

const updateCartTotals = function updateCartTotals(
  lines: CartItem[],
): Pick<Cart, "totalQuantity" | "cost"> {
  const totalQuantity = lines.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = lines.reduce(
    (sum, item) => sum + Number(item.cost.totalAmount.amount),
    0,
  );

  const currencyCode = lines[0]?.cost.totalAmount.currencyCode ?? "USD";

  return {
    totalQuantity,
    cost: {
      totalAmount: { amount: totalAmount.toString(), currencyCode },
      totalTaxAmount: { amount: "0", currencyCode },
      subtotalAmount: { amount: totalAmount.toString(), currencyCode },
    },
  };
};

const cartReducer = function cartReducer(
  state: Cart | undefined,
  action: CartAction,
): Cart {
  const cartCurrent = state || createEmptyCart();

  switch (action.type) {
    case "INSERT_ITEM": {
      const { product, variant } = action.payload;
      const existingItem = cartCurrent.lines.find(
        (item) => item.merchandise.id === variant.id,
      );

      const updatedItem = createOrUpdateCartItem(
        existingItem,
        product,
        variant,
      );

      const linesUpdated = existingItem
        ? cartCurrent.lines.map((item) =>
            item.merchandise.id === variant.id ? updatedItem : item,
          )
        : [...cartCurrent.lines, updatedItem];

      return {
        ...cartCurrent,
        ...updateCartTotals(linesUpdated),
        lines: linesUpdated,
      };
    }
    case "UPDATE_ITEM": {
      const { merchandiseId, updateType } = action.payload;
      const linesUpdated = cartCurrent.lines
        .map((item) =>
          item.merchandise.id === merchandiseId
            ? updateCartItem(item, updateType)
            : item,
        )
        .filter(Boolean) as CartItem[];

      if (linesUpdated.length === 0)
        return {
          ...cartCurrent,
          lines: [],
          totalQuantity: 0,
          cost: {
            ...cartCurrent.cost,
            totalAmount: { ...cartCurrent.cost.totalAmount, amount: "0" },
          },
        };

      return {
        ...cartCurrent,
        ...updateCartTotals(linesUpdated),
        lines: linesUpdated,
      };
    }
    default:
      return cartCurrent;
  }
};

export const CartProvider = function CartProvider({
  children,
  cartPromise,
}: PropsWithChildren & {
  cartPromise: Promise<Cart | undefined>;
}) {
  const cartInitial = use(cartPromise);
  const [optimisticCart, updateOptimisticCart] = useOptimistic(
    cartInitial,
    cartReducer,
  );

  const insertCartItem = useCallback(
    (product: Product, variant: ProductVariant) => {
      updateOptimisticCart({
        type: "INSERT_ITEM",
        payload: { product, variant },
      });
    },
    [updateOptimisticCart],
  );

  // eslint-disable-next-line no-shadow
  const updateCartItem = useCallback(
    (merchandiseId: string, updateType: UpdateType) => {
      updateOptimisticCart({
        type: "UPDATE_ITEM",
        payload: { merchandiseId, updateType },
      });
    },
    [updateOptimisticCart],
  );

  const value = useMemo(
    () => ({
      cart: optimisticCart,
      insertCartItem,
      updateCartItem,
    }),
    [optimisticCart, insertCartItem, updateCartItem],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = function useCart() {
  const context = useContext(CartContext);
  if (context === undefined)
    throw new Error("useCart() must be used within a <CartProvider />");

  return context;
};
