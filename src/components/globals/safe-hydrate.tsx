"use client";

// REVIEWED

import { PropsWithChildren, ReactNode, useEffect, useState } from "react";

export const SafeHydrate = function SafeHydrate({
  isLoading = false,
  isLoadingComponent,
  children,
}: PropsWithChildren<{
  isLoading?: boolean;
  isLoadingComponent?: ReactNode;
}>) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated || isLoading) return isLoadingComponent;

  return children;
};
