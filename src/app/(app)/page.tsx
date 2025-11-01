// REVIEWED - 14
import { Metadata } from "next";

import { Loading } from "@/components/globals/loading";
import { SafeHydrate } from "@/components/globals/safe-hydrate";

import { RedirectProvider } from "./providers";

export const metadata: Metadata = {
  title: "Home",
};

const HomePage = function HomePage() {
  return (
    <RedirectProvider path="/a-human-but-from-gaza">
      <SafeHydrate isLoadingComponent={<Loading />}>{null}</SafeHydrate>
    </RedirectProvider>
  );
};

export default HomePage;
