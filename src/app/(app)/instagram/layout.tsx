// REVIEWED

import { PropsWithChildren } from "react";

import { QueryProvider } from "../providers";

const InstagramLayout = function InstagramLayout({
  children,
}: PropsWithChildren) {
  return <QueryProvider>{children}</QueryProvider>;
};

export default InstagramLayout;
