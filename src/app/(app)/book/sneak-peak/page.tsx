// REVIEWED
import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";

import { HeroBackgroundPattern } from "@/components/book/hero-background-pattern";
import { Button } from "@/components/ui/button";

export default function SneakPeakPage() {
  return (
    <main className="relative py-48">
      <HeroBackgroundPattern />
      <div className="absolute left-5 top-5 z-10">
        <Button variant="outline" className="rounded-full" asChild>
          <Link href="/book">
            <ChevronLeftIcon className="size-5" />
            <span>Back</span>
          </Link>
        </Button>
      </div>
      <div className="mx-auto max-w-3xl text-lg/9 text-muted-foreground">
        <section
          id="sneak-peak-01"
          data-section="sneak-peak-01"
          className="flex flex-col gap-10">
          <div className="flex flex-col items-start gap-2">
            <Button
              variant="outline"
              className="rounded-full border-0 bg-secondary/15 text-foreground ring-1 ring-inset ring-secondary/35 hover:bg-secondary"
              asChild>
              <span>Feb 5, 2024</span>
            </Button>
            <h2
              className="font-stretch text-balance bg-gradient-to-b from-foreground/25 via-foreground to-foreground/50 bg-cover bg-clip-text bg-center bg-no-repeat text-4xl font-semibold !leading-normal tracking-tight text-foreground sm:text-5xl"
              style={{ WebkitTextFillColor: "transparent" }}>
              A Humiliating Winter.
            </h2>
          </div>
          <p className="text-2xl/10">
            It&apos;s raining outside now, which is an extraordinary scene for
            me. The sky plays a tremendous symphony with the raindrops. However,
            they hit the windows made of leather posters and infiltrated through
            the walls. This weather amuses me.
          </p>
          <div className="flex flex-col gap-10">
            <p>
              When it started falling, I instantly closed my eyes, smelled the
              cold whiff, felt a yen for making a cup of coffee, and speedily
              crossed my mind to correspond with my friend, Eman, to share this
              friendly ambiance as we were accustomed to before the war.
            </p>
            <p>
              I wrote: Dear Eman, I am about to write to you as I used to do in
              wintertime: hold your hot mint cup, then get out to the balcony
              and enjoy the rain. But now...
            </p>
            <p
              className="font-stretch bg-gradient-to-b from-foreground/25 via-foreground to-foreground/50 bg-cover bg-clip-text bg-center bg-no-repeat text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
              style={{ WebkitTextFillColor: "transparent" }}>
              ...I request you to get your head out of the tent to see the
              weather.
            </p>
            <p>
              After that, while I was cleaning what got wet with the rain, I
              received a message from her: &ldquo;I missed all the details that
              used to bring us together under the rain, walking the long roads
              soaking wet and talking about our favorite movie or reciting
              poetry, but I almost forgot how one enjoys the winter in this war.
              I cannot bear this injustice anymore. Let me ask you, L.: What
              should I feel when I want to go to the bathroom far from the tent
              in the middle of the night, and I have my period, and the pain is
              killing me, and the rain is pouring down outside so I have to
              clean myself inside the tent, and my mom grabs a blanket to cover
              me. Is the whole wintertime enough for me to cry when I felt
              humiliated and disdained by the world?&ldquo;
            </p>
            <p>
              After I grudge the Israeli occupation, Arab countries,
              women&apos;s rights institutions, and the entire world, should I
              also hate winter? It is still raining outside, and we are still
              living in constant humiliation, indignity, and oppression.
            </p>
          </div>
        </section>
        <section
          id="sneak-peak-02"
          data-section="sneak-peak-02"
          className="mt-20 flex flex-col gap-10">
          <div className="flex flex-col items-start gap-2">
            <Button
              variant="outline"
              className="rounded-full border-0 bg-tertiary/15 text-foreground ring-1 ring-inset ring-tertiary/35 hover:bg-tertiary"
              asChild>
              <span>Apr 1, 2024</span>
            </Button>
            <h2
              className="font-stretch text-balance bg-gradient-to-b from-foreground/25 via-foreground to-foreground/50 bg-cover bg-clip-text bg-center bg-no-repeat text-4xl font-semibold !leading-normal tracking-tight text-foreground sm:text-5xl"
              style={{ WebkitTextFillColor: "transparent" }}>
              One Of Their Atrocities.
            </h2>
          </div>
          <p className="text-2xl/10">
            It started when they had set fire to the entire perimeter; all the
            surrounding houses were burnt, and the flames reached us through the
            windows; we tried to raise the curtains as well as move the
            furniture in an attempt not to burn with them. Houses were being
            burned one after the other; we knew it was just a matter of time
            before they reached us. We pleaded with the Red Cross. We were
            willing to accept martyrdom, but not this kind of burning.
            Unfortunately, all the communications indicated: &ldquo;The Red
            Cross couldn&apos;t do anything; you are in a closed military
            operations area.&ldquo; We tried to extinguish the fire using any
            means. Although we suffered from water scarcity, we took the risk
            and the small amounts left to extinguish the fire.
          </p>
          <div className="flex flex-col gap-10">
            <p>
              The day came, which I believe was the most challenging day of my
              life in all the months of the war. The army stormed in on us; all
              of them were shouting at each other to create confusion; some of
              them were masked, the guns were aimed at us, and the laser lights
              were everywhere.
            </p>
            <p>
              They separated us, took the men, and forced us, the women and
              children, to go to the south. Here began a forced, arduous,
              terrifying displacement. Under the scorching sun during Ramadan,
              while we were fasting, we did not have suhoor or Iftar the day
              before because we had run out of stock, with immense numbers of
              children and women. However, we do not know the fate of our men,
              and rage fills our hearts, and the gunfire from the quadcopters is
              shooting around us near our feet. As soon as anyone looks back, we
              end up in the south.
            </p>
            <p>
              I am talking about a narrative by a girl from northern Gaza when
              the occupation forces conquered their area. The idea of storming
              oppresses me...
            </p>
            <p
              className="font-stretch bg-gradient-to-b from-foreground/25 via-foreground to-foreground/50 bg-cover bg-clip-text bg-center bg-no-repeat text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
              style={{ WebkitTextFillColor: "transparent" }}>
              To be face to face with your occupier...
            </p>
            <p>
              ...showing you his ugliness in all sorts of ways. Nevertheless,
              not even being able to save yourself and your loved ones is highly
              oppressive.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
