// REVIEWED

import { PropsWithChildren } from "react";

export const Container = function Container({ children }: PropsWithChildren) {
  return <div className="mx-auto max-w-7xl px-6 lg:px-8">{children}</div>;
};
