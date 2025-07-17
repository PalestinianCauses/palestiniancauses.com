// REVIEWED - 10
import { Metadata } from "next";

import { Intro } from "@/components/globals/intro";
import { PWAPromptInstall } from "@/components/pwa/prompt-install";

export const metadata: Metadata = {
  title: "Home | PalestinianCauses",
  description:
    'PalestinianCauses LLC is a mission-driven creative and digital platform dedicated to illuminating the Gazan experience, with an urgent focus on amplifying authentic voices and realities from Gaza during the current crisis. Through compelling storytelling, evocative artwork (as we showcased in our project "A Human But From Gaza"), and innovative digital solutions developed by our dedicated team, we strive to build global solidarity and foster deep empathy.',
};

const HomePage = async function HomePage() {
  return (
    <main className="grid h-full max-h-screen min-h-[48rem] grid-cols-1">
      <Intro />
      <PWAPromptInstall />
    </main>
  );
};

export default HomePage;
