"use client";

// REVIEWED

import { FrappeProvider } from "frappe-react-sdk";
import { PropsWithChildren } from "react";

export const Providers = function Providers({ children }: PropsWithChildren) {
  return (
    <FrappeProvider url={process.env.NEXT_PUBLIC_FRAPPE_URL}>
      {children}
    </FrappeProvider>
  );
};
