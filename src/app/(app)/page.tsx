// REVIEWED - 04
import { Metadata } from "next";

import { Intro } from "@/components/globals/intro";
import { Navigation } from "@/components/globals/navigation";

export const metadata: Metadata = {
  title: "Home",
  description:
    'PalestinianCauses LLC is a mission-driven creative and digital platform dedicated to illuminating the Gazan experience, with an urgent focus on amplifying authentic voices and realities from Gaza during the current crisis. Through compelling storytelling, evocative artwork (as we showcased in our project "A Human But From Gaza"), and innovative digital solutions developed by our dedicated team, we strive to build global solidarity and foster deep empathy.',
};

const HomePage = async function HomePage() {
  return (
    <main className="grid h-screen max-h-screen min-h-[48rem] snap-y snap-mandatory grid-cols-1 divide-y divide-muted overflow-y-scroll lg:snap-none lg:grid-cols-2 lg:divide-x lg:divide-y-0 [&_>_*]:h-screen [&_>_*]:max-h-screen [&_>_*]:min-h-[48rem] [@media_(max-height:48rem)]:snap-none">
      <Intro />
      <Navigation />
    </main>
  );
};

export default HomePage;
