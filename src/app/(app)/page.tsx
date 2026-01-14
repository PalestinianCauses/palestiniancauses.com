// REVIEWED - 16
import { Metadata } from "next";

import { Loading } from "@/components/globals/loading";
import { SafeHydrate } from "@/components/globals/safe-hydrate";

import { RedirectProvider } from "./providers";

export const metadata: Metadata = {
  title: "Home",
  description:
    "PalestinianCauses Digital Agency - A world-class digital services agency powered by Gazan talent, delivering outstanding, globally competitive digital solutions.",
  alternates: {
    canonical:
      process.env.NEXT_PUBLIC_URL || "https://www.palestiniancauses.com",
  },
};

const HomePage = function HomePage() {
  return (
    <RedirectProvider path="/a-human-but-from-gaza">
      <SafeHydrate isLoadingComponent={<Loading />}>{null}</SafeHydrate>
    </RedirectProvider>
  );
};

export default HomePage;
