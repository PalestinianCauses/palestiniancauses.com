// REVIEWED - 13
import { Metadata } from "next";

import { Loading } from "@/components/globals/loading";
import { SafeHydrate } from "@/components/globals/safe-hydrate";

import { RedirectProvider } from "./providers";

export const metadata: Metadata = {
  title: "Home | PalestinianCauses Digital Agency",
  description:
    "PalestinianCauses is a world-class digital services agency powered by Gazan talent, delivering bespoke web applications, strategic content creation, expert translation services, and comprehensive digital marketing solutions. We forge outstanding, globally competitive digital solutions while demonstrating how resilience transforms into innovation and excellence.",
};

const HomePage = function HomePage() {
  return (
    <RedirectProvider path="/a-human-but-from-gaza">
      <SafeHydrate isLoadingComponent={<Loading />}>{null}</SafeHydrate>
    </RedirectProvider>
  );
};

export default HomePage;
