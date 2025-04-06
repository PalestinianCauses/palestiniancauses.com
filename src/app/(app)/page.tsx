// REVIEWED - 02

import { Intro } from "@/components/globals/intro";
import { Navigation } from "@/components/globals/navigation";

const HomePage = async function HomePage() {
  return (
    <main className="grid h-screen max-h-screen min-h-[48rem] snap-y snap-mandatory grid-cols-1 divide-y divide-muted overflow-y-scroll lg:snap-none lg:grid-cols-2 lg:divide-x lg:divide-y-0 [&_>_*]:h-screen [&_>_*]:max-h-screen [&_>_*]:min-h-[48rem]">
      <Intro />
      <Navigation />
    </main>
  );
};

export default HomePage;
