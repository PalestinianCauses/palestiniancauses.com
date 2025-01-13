"use client";

// REVIEWED

import { useRouter, useSearchParams } from "next/navigation";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useOptimistic,
} from "react";

type ProductState = { [key: string]: string } & { image?: string };

type ProductContextType = {
  state: ProductState;
  /* eslint-disable-next-line no-unused-vars */
  updateImage: (index: string) => ProductState;
  /* eslint-disable-next-line no-unused-vars */
  updateOption: (name: string, value: string) => ProductState;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = function ProductProvider({
  children,
}: PropsWithChildren) {
  const searchParams = useSearchParams();

  const getInitialState = () => {
    const params: ProductState = {};

    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of searchParams.entries()) params[key] = value;
    return params;
  };

  const [state, setOptimisticState] = useOptimistic(
    getInitialState(),
    (previousState: ProductState, update: ProductState) => ({
      ...previousState,
      ...update,
    }),
  );

  const updateImage = useCallback(
    (index: string) => {
      const stateNew = { image: index };
      setOptimisticState(stateNew);
      return { ...state, ...stateNew };
    },
    [state, setOptimisticState],
  );

  const updateOption = useCallback(
    (name: string, value: string) => {
      const stateNew = { [name]: value };
      setOptimisticState(stateNew);
      return { ...state, ...stateNew };
    },
    [state, setOptimisticState],
  );

  const value = useMemo(
    () => ({
      state,
      updateImage,
      updateOption,
    }),
    [state, updateImage, updateOption],
  );

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

export const useUpdateURL = function useUpdateURL() {
  const router = useRouter();

  return (state: ProductState) => {
    const paramsNew = new URLSearchParams(window.location.search);
    Object.entries(state).forEach(([key, value]) => {
      paramsNew.set(key, value);
    });

    router.push(["?", paramsNew.toString()].join(""), { scroll: false });
  };
};

export const useProduct = function useProduct() {
  const context = useContext(ProductContext);
  if (context === undefined)
    throw new Error("useProduct() must be used within a <ProductProvider />");

  return context;
};
