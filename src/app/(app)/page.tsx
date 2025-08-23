// REVIEWED - 12
import { Metadata } from "next";

import { Loading } from "@/components/globals/loading";
import { SafeHydrate } from "@/components/globals/safe-hydrate";

import { RedirectProvider } from "./providers";

export const metadata: Metadata = {
  title: "Home | PalestinianCauses",
  description:
    'PalestinianCauses LLC is a mission-driven creative and digital platform dedicated to illuminating the Gazan experience, with an urgent focus on amplifying authentic voices and realities from Gaza during the current crisis. Through compelling storytelling, evocative artwork (as we showcased in our project "A Human But From Gaza"), and innovative digital solutions developed by our dedicated team, we strive to build global solidarity and foster deep empathy.',
};

const HomePage = function HomePage() {
  return (
    <RedirectProvider path="/a-human-but-from-gaza">
      <SafeHydrate isLoadingComponent={<Loading />}>{null}</SafeHydrate>
    </RedirectProvider>
  );
};

export default HomePage;
