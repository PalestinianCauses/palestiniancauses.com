"use client";

// REVIEWED - 18
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */

import { QuoteIcon } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

import {
  Paragraph,
  SectionHeading,
  SectionHeadingBadge,
} from "@/components/globals/typography";

import {
  Frame,
  FrameContent,
  FrameHighlight,
  FrameImagesGrid,
  FrameParagraph,
  FrameParagraphHighlight,
  FrameSquare,
  FrameTitle,
  ImageFrame,
  ImageFrameRender,
} from "./_components/frame";
import { PSCLogo } from "./_components/psc-logo";

export type Properties = "bg" | "text" | "fill" | "stroke";
export type ThemeStyles = "fill" | "stroke";
export type ThemeColors =
  | "primary"
  | "primary-foreground"
  | "secondary"
  | "tertiary"
  | "tertiary-2"
  | "transparent";
export type Dimensions =
  | "open-graph"
  | "github"
  | "1:1"
  | "4:5"
  | "16:9"
  | "9:16";

export const themeClasses: {
  [K in ThemeColors]: { [K in Properties]: string };
} = {
  "primary": {
    bg: "bg-primary",
    text: "text-primary-foreground",
    fill: "fill-primary",
    stroke: "stroke-primary",
  },
  "primary-foreground": {
    bg: "bg-primary-foreground",
    text: "text-primary",
    fill: "fill-primary-foreground",
    stroke: "stroke-primary-foreground",
  },
  "secondary": {
    bg: "bg-secondary",
    text: "text-secondary-foreground",
    fill: "fill-secondary",
    stroke: "stroke-secondary",
  },
  "tertiary": {
    bg: "bg-tertiary",
    text: "text-tertiary-foreground",
    fill: "fill-tertiary",
    stroke: "stroke-tertiary",
  },
  "tertiary-2": {
    bg: "bg-tertiary-2",
    text: "text-tertiary-2-foreground",
    fill: "fill-tertiary-2",
    stroke: "stroke-tertiary-2",
  },
  "transparent": {
    bg: "bg-transparent",
    text: "text-transparent",
    fill: "fill-transparent",
    stroke: "stroke-transparent",
  },
};

export const dimensionsClasses: { [K in Dimensions]: string } = {
  "open-graph": "w-[75rem] h-[39.375rem]",
  "github": "w-[80rem] aspect-[2/1]",
  "1:1": "w-[67.5rem] aspect-square",
  "4:5": "w-[67.5rem] aspect-[4/5]",
  "16:9": "w-[67.5rem] aspect-[16/9]",
  "9:16": "w-[67.5rem] aspect-[9/16]",
};

const InstagramStudioPage = function InstagramStudioPage() {
  // Followers from my GitHub profile, please ignore this :)

  const frames: ImageFrame[] = [
    {
      id: "open-graph-01",
      ref: useRef<HTMLDivElement>(null),
      as: "jpeg",
    },
    {
      id: "open-graph-02",
      ref: useRef<HTMLDivElement>(null),
      as: "jpeg",
    },
    {
      id: "open-graph-03",
      ref: useRef<HTMLDivElement>(null),
      as: "jpeg",
    },
    {
      id: "open-graph-04",
      ref: useRef<HTMLDivElement>(null),
      as: "jpeg",
    },
    {
      id: "i-g-story-template-01",
      ref: useRef<HTMLDivElement>(null),
      as: "jpeg",
    },
    {
      id: "i-g-story-template-02",
      ref: useRef<HTMLDivElement>(null),
      as: "jpeg",
    },
    {
      id: "github-01",
      ref: useRef<HTMLDivElement>(null),
      as: "jpeg",
    },
  ];

  const profileImagesFrames: ImageFrame[] = [
    {
      id: "profile-primary",
      ref: useRef<HTMLDivElement>(null),
      as: "png",
    },
    {
      id: "profile-primary-foreground",
      ref: useRef<HTMLDivElement>(null),
      as: "png",
    },
    {
      id: "logo-primary",
      ref: useRef<HTMLDivElement>(null),
      as: "png",
    },
    {
      id: "logo-primary-foreground",
      ref: useRef<HTMLDivElement>(null),
      as: "png",
    },
  ];

  const hoodiesFrames: ImageFrame[] = [
    {
      id: "black-hoodie-back",
      ref: useRef<HTMLDivElement>(null),
      as: "png",
    },
    {
      id: "white-hoodie-back",
      ref: useRef<HTMLDivElement>(null),
      as: "png",
    },
    {
      id: "red-hoodie-back",
      ref: useRef<HTMLDivElement>(null),
      as: "png",
    },
  ];

  const instagramFrames: ImageFrame[] = [
    {
      id: "ig-01",
      ref: useRef<HTMLDivElement>(null),
      as: "png",
    },
    {
      id: "ig-02",
      ref: useRef<HTMLDivElement>(null),
      as: "png",
    },
    {
      id: "ig-03",
      ref: useRef<HTMLDivElement>(null),
      as: "png",
    },
  ];

  const nArtWorkFrames: ImageFrame[] = [
    {
      id: "n-art-work-01",
      ref: useRef<HTMLDivElement>(null),
      as: "png",
    },
    {
      id: "n-art-work-02",
      ref: useRef<HTMLDivElement>(null),
      as: "png",
    },
    {
      id: "n-art-work-03",
      ref: useRef<HTMLDivElement>(null),
      as: "png",
    },
    {
      id: "n-art-work-04",
      ref: useRef<HTMLDivElement>(null),
      as: "png",
    },
  ];

  return (
    <main>
      {/* Open Graph */}
      <ImageFrameRender frames={profileImagesFrames} />
      <ImageFrameRender frames={hoodiesFrames} />
      <ImageFrameRender frames={nArtWorkFrames} />
      {/* N's Art-Work */}
      <Frame
        ref={nArtWorkFrames[0].ref}
        dimensions="4:5"
        color="primary-foreground">
        <FrameContent>
          <FrameSquare className="mb-auto bg-primary-foreground text-primary ring-primary-foreground">
            <Image
              src="/logo-primary.png"
              alt="Primary Logo"
              fill
              className="!static !h-24 !w-24"
            />
          </FrameSquare>
          <FrameTitle className="flex flex-col flex-wrap items-start">
            <FrameHighlight className="before:-inset-x-2.5 before:top-1/4 before:bg-primary-foreground before:ring-primary-foreground">
              The
            </FrameHighlight>
            <FrameHighlight className="before:-inset-x-2.5 before:top-1/4 before:bg-primary-foreground before:ring-primary-foreground">
              Sole
            </FrameHighlight>
            <FrameHighlight className="before:-inset-x-2.5 before:top-1/4 before:bg-primary-foreground before:ring-primary-foreground">
              Su<span className="-mr-1 tracking-wide">rv</span>ivor.
            </FrameHighlight>
          </FrameTitle>
          <SectionHeadingBadge className="bg-primary text-lg text-primary-foreground ring-primary">
            Artwork by N. — Digitally Enhanced for a Re
            <span className="-mr-px tracking-wide">fi</span>ned Experience
          </SectionHeadingBadge>
        </FrameContent>
        <FrameImagesGrid>
          <div className="relative col-start-1 col-end-13 row-start-1 row-end-13">
            <Image
              src="/the-sole-survivor-refined.png"
              alt="N's Art-Work no. 01"
              fill
              className="!static object-cover object-top"
            />
          </div>
        </FrameImagesGrid>
      </Frame>
      <Frame
        ref={nArtWorkFrames[1].ref}
        dimensions="4:5"
        color="primary-foreground">
        <FrameContent>
          <FrameSquare className="bg-primary text-primary-foreground ring-primary">
            <QuoteIcon className="h-20 w-20 stroke-[1.5]" />
          </FrameSquare>
          <FrameParagraph>
            As all Gazan parents do during the war when the sounds of explosions
            around them become louder, my mother encompasses us every night with
            her commandments:{" "}
            <FrameParagraphHighlight className="bg-primary text-primary-foreground">
              Let us sleep together in the same
            </FrameParagraphHighlight>{" "}
            <FrameParagraphHighlight className="bg-primary text-primary-foreground">
              room—stuck together.
            </FrameParagraphHighlight>{" "}
            Is everyone here? Do not leave the room. Oh, Allah, we pray that a
            missile does not hit us, but if one did,{" "}
            <FrameParagraphHighlight className="bg-primary text-primary-foreground">
              let us die together.
            </FrameParagraphHighlight>{" "}
            Later, none will be left mourned for the departure of others.
          </FrameParagraph>
          <FrameParagraph>
            Today, I knew that my friend, Fairouz Al-Assi, was the{" "}
            <FrameParagraphHighlight className="bg-primary text-primary-foreground">
              sole survivor
            </FrameParagraphHighlight>{" "}
            of her family. My beloved was martyred, and my crying increased as I
            wondered :
          </FrameParagraph>
        </FrameContent>
      </Frame>
      <Frame ref={nArtWorkFrames[2].ref} dimensions="4:5" color="primary">
        <FrameContent className="justify-center">
          <FrameTitle>
            Who is the{" "}
            <FrameHighlight className="mx-2.5 text-primary before:-inset-x-2.5 before:bg-primary-foreground before:ring-primary-foreground">
              su<span className="-mr-1 tracking-wide">rv</span>ivor?
            </FrameHighlight>{" "}
            Breathing or{" "}
            <FrameHighlight className="mx-2.5 text-primary before:-inset-x-2.5 before:bg-primary-foreground before:ring-primary-foreground">
              dead?
            </FrameHighlight>
          </FrameTitle>
          <SectionHeadingBadge className="text-current">
            Composed by L. featured in The Volume &quot;A Human But From
            Gaza&quot;
          </SectionHeadingBadge>
        </FrameContent>
      </Frame>
      <Frame
        ref={nArtWorkFrames[3].ref}
        dimensions="4:5"
        color="primary-foreground">
        <FrameContent>
          <FrameTitle>
            Discover the complete diary and{" "}
            <FrameHighlight className="text-primary-foreground before:-inset-x-2.5 before:inset-y-1.5 before:bg-primary before:ring-primary">
              further
            </FrameHighlight>
            <FrameHighlight className="z-20 -mx-2.5 text-primary-foreground before:-inset-x-2.5 before:inset-y-1.5 before:bg-primary before:ring-primary">
              compelling
            </FrameHighlight>{" "}
            <FrameHighlight className="-mx-2.5 text-primary-foreground before:-inset-x-2.5 before:inset-y-1.5 before:bg-primary before:ring-primary">
              narratives
            </FrameHighlight>{" "}
            <FrameHighlight className="-mx-2.5 text-primary-foreground before:-inset-x-2.5 before:inset-y-1.5 before:bg-primary before:ring-primary">
              within:
            </FrameHighlight>
          </FrameTitle>
          <FrameSquare className="mt-auto bg-background text-primary-foreground ring-input">
            <Image
              src="/logo-primary.png"
              alt="Primary Logo"
              fill
              className="!static !h-24 !w-24"
            />
          </FrameSquare>
        </FrameContent>
        <FrameImagesGrid className="scale-1">
          <div className="col-start-6 col-end-13 row-start-5 row-end-13 ring ring-primary ring-offset-8 ring-offset-primary-foreground">
            <Image
              src="https://nwdtauhmkupvkywh.public.blob.vercel-storage.com/book-cover/book-cover-new.png"
              alt="A Human But From Gaza Book Cover"
              fill
              className="!static object-cover object-top"
            />
          </div>
        </FrameImagesGrid>
      </Frame>
      {/* Diary Entry */}
      <Frame
        ref={instagramFrames[0].ref}
        dimensions="4:5"
        color="primary-foreground">
        <FrameContent>
          <SectionHeadingBadge className="bg-background text-lg ring-primary/20">
            The Truth Museum: Humans But From Gaza
          </SectionHeadingBadge>
          <SectionHeading className="!text-9xl font-bold text-primary lg:!leading-[0.9] xl:!leading-[0.9]">
            I don&apos;t want <br /> to use exclam-ation marks for only{" "}
            <span className="relative z-10 mr-2 inline-block text-primary before:absolute before:-right-2 before:left-0 before:top-1/2 before:z-[-1] before:block before:h-28 before:-translate-y-1/2 before:bg-background before:ring-1 before:ring-input">
              critique.
            </span>
          </SectionHeading>
          <div className="relative mt-auto flex h-32 w-32 items-center justify-center bg-background text-primary ring-1 ring-input">
            <Image
              src="/logo-primary.png"
              alt="Primary Logo"
              fill
              className="!static !h-24 !w-24"
            />
          </div>
        </FrameContent>
        {/* <FrameImagesGrid>
          <div className="relative col-start-3 col-end-13 row-start-8 row-end-13 ring-2 ring-primary">
            <div className="absolute bottom-0 left-2.5 right-2.5 z-10 h-20 bg-gradient-to-t from-background to-background" />
            <Image
              src="/i-g-01.png"
              alt="Screen Shot 01"
              fill
              sizes="42rem"
              className="!relative bg-primary-foreground object-cover object-[top_left]"
            />
          </div>
        </FrameImagesGrid> */}
      </Frame>
      <Frame ref={instagramFrames[1].ref} dimensions="4:5" color="primary">
        <FrameContent>
          <SectionHeadingBadge className="text-lg text-primary-foreground">
            Authored with dedication by Basmala.
          </SectionHeadingBadge>
          <SectionHeading className="!text-8xl font-bold text-primary-foreground lg:!leading-[0.9] xl:!leading-[0.9]">
            Basmala shares another piece of{" "}
            <span className="relative z-10 mr-2 inline-block text-primary before:absolute before:-right-2 before:left-0 before:top-1/2 before:z-[-1] before:block before:h-20 before:-translate-y-1/2 before:bg-primary-foreground">
              her
            </span>{" "}
            soul with us.
          </SectionHeading>
          <Paragraph className="!text-4xl font-medium !leading-relaxed text-primary-foreground">
            I wanna use them when I take a picture of myself in the courtyard of
            the Al-Aqsa Mosque, when the mother of the prisoner is heralded with
            the glad tidings about her son&apos;s release from captivity. When I
            am touching the Kaaba&apos;s covering without being drained after
            crossing the limits between it and between the cities between my
            town. When I understand{" "}
            <span className="bg-primary-foreground px-2.5 font-medium text-primary">
              a new Quranic miracle while reading
            </span>{" "}
            <span className="bg-primary-foreground px-2.5 font-medium text-primary">
              the Quran.
            </span>
          </Paragraph>
        </FrameContent>
      </Frame>
      <Frame
        ref={instagramFrames[2].ref}
        dimensions="4:5"
        color="primary-foreground">
        <FrameContent>
          <SectionHeading className="!text-8xl font-bold text-primary lg:!leading-[0.9] xl:!leading-[0.9]">
            Basmala explores the un-spoken realities—the fear, exhaustion, and
            shock that live in the pauses between{" "}
            <span className="relative z-10 mr-2 inline-block text-primary before:absolute before:-right-2 before:left-0 before:top-1/2 before:z-[-1] before:block before:h-20 before:-translate-y-1/2 before:bg-background before:ring-1 before:ring-input">
              words.
            </span>
          </SectionHeading>
          <Paragraph className="!text-4xl font-medium !leading-relaxed text-primary">
            We invite you to read the words between the lines.
          </Paragraph>
          <Paragraph className="!text-4xl font-medium !leading-relaxed text-primary">
            Tap the link in our bio for the full entry.
          </Paragraph>
          <Paragraph className="!text-4xl font-medium !leading-relaxed text-primary">
            Please leave a comment to let{" "}
            <span className="bg-primary px-2.5 font-medium text-primary-foreground">
              Basmala
            </span>{" "}
            know that her silent exclamation marks are being{" "}
            <span className="bg-primary px-2.5 font-medium text-primary-foreground">
              seen and
            </span>{" "}
            <span className="bg-primary px-2.5 font-medium text-primary-foreground">
              felt
            </span>{" "}
            across the world. 🔗
          </Paragraph>
        </FrameContent>
      </Frame>
      {/* Logo */}
      <Frame
        ref={profileImagesFrames[2].ref}
        dimensions="1:1"
        color="primary-foreground"
        className="bg-transparent">
        <div className="-mb-16 w-[56.625rem]">
          <PSCLogo />
        </div>
      </Frame>
      <Frame
        ref={profileImagesFrames[3].ref}
        dimensions="1:1"
        color="primary"
        className="bg-transparent">
        <div className="-mb-16 w-[56.625rem]">
          <PSCLogo color="primary-foreground" />
        </div>
      </Frame>
      {/* Social Media Avatars */}
      <Frame
        ref={profileImagesFrames[0].ref}
        dimensions="1:1"
        color="primary-foreground">
        <div className="-mb-16 w-[47.5rem]">
          <PSCLogo />
        </div>
      </Frame>
      <Frame ref={profileImagesFrames[1].ref} dimensions="1:1" color="primary">
        <div className="-mb-16 w-[47.5rem]">
          <PSCLogo color="primary-foreground" />
        </div>
      </Frame>
      {/* Social Media Templates */}
      <Frame ref={frames[6].ref} dimensions="9:16" color="primary-foreground">
        <div className="mb-52 mt-auto w-[10rem]">
          <PSCLogo />
        </div>
      </Frame>
      <Frame ref={frames[5].ref} dimensions="9:16" color="primary">
        <div className="mb-52 mt-auto w-[10rem]">
          <PSCLogo color="primary-foreground" />
        </div>
      </Frame>
      {/* GitHub */}
      <Frame ref={frames[6].ref} dimensions="github" color="primary">
        <FrameContent className="h-[32rem] w-[70rem]">
          <SectionHeading className="!max-w-none !text-7xl font-bold text-primary-foreground lg:!leading-none xl:!leading-none">
            Join our open-source <br />
            <span className="relative z-10 mr-2 inline-block font-semibold text-primary before:absolute before:-right-2 before:left-0 before:top-1/2 before:z-[-1] before:block before:h-16 before:-translate-y-1/2 before:bg-primary-foreground">
              mission.
            </span>{" "}
            Contribute to strengthen PalestinianCauses{" "}
            <span className="relative z-10 inline-block pl-1 font-semibold text-primary before:absolute before:-right-2 before:left-0 before:top-1/2 before:z-[-1] before:block before:h-16 before:-translate-y-1/2 before:bg-primary-foreground">
              identity.
            </span>{" "}
          </SectionHeading>
          <SectionHeadingBadge className="text-lg text-primary-foreground">
            Maintained By Shawqi Hatem (@shawqicauses)
          </SectionHeadingBadge>
        </FrameContent>
        <FrameImagesGrid>
          <div className="relative col-start-7 col-end-13 row-start-6 row-end-13 translate-y-2.5 p-2.5 ring-2 ring-primary">
            <Image
              src="/i-g-01.png"
              alt="Screen Shot UI 07"
              fill
              sizes="42rem"
              className="!relative bg-primary-foreground object-cover object-center"
            />
          </div>
        </FrameImagesGrid>
      </Frame>
      {/* Hoodies */}
      <Frame
        ref={hoodiesFrames[0].ref}
        dimensions="4:5"
        color="primary-foreground"
        className="bg-transparent">
        <SectionHeading className="!text-9xl">
          CODE <br />
          <span className="relative z-10 inline-block pl-2 font-[900] text-primary-foreground before:absolute before:-right-2 before:left-0 before:top-1/2 before:z-[-1] before:block before:h-28 before:-translate-y-1/2 before:bg-primary">
            WRITTEN
          </span>{" "}
          <br />
          WITH
          <br />
          THE{" "}
          <span className="relative z-10 inline-block pl-2 font-[900] text-primary-foreground before:absolute before:-right-2 before:left-0 before:top-1/2 before:z-[-1] before:block before:h-28 before:-translate-y-1/2 before:bg-primary">
            SOUND
          </span>{" "}
          <br /> OF <br />
          <span className="relative z-10 inline-block pl-2 font-[900] text-primary-foreground before:absolute before:-right-2 before:left-0 before:top-1/2 before:z-[-1] before:block before:h-28 before:-translate-y-1/2 before:bg-primary">
            BOMBS.
          </span>{" "}
          <br />{" "}
          <span className="text-7xl font-medium italic tracking-normal text-primary/20">
            (Still Transmitting Truth).
          </span>
        </SectionHeading>
      </Frame>
      <Frame
        ref={hoodiesFrames[1].ref}
        dimensions="4:5"
        color="primary"
        className="bg-transparent">
        <SectionHeading className="!text-9xl text-primary-foreground">
          <span className="relative z-10 inline-block pl-2 font-extrabold text-primary before:absolute before:-right-2 before:left-0 before:top-1/2 before:z-[-1] before:block before:h-28 before:-translate-y-1/2 before:bg-primary-foreground">
            RUINS
          </span>{" "}
          <br />
          AT
          <br />
          <span className="relative z-10 inline-block pl-2 font-extrabold text-primary before:absolute before:-right-2 before:left-0 before:top-1/2 before:z-[-1] before:block before:h-28 before:-translate-y-1/2 before:bg-primary-foreground">
            DUSK
          </span>{" "}
          <br />
          REBUILDING
          <br />
          AT{" "}
          <span className="relative z-10 inline-block pl-2 font-extrabold text-primary before:absolute before:-right-2 before:left-0 before:top-1/2 before:z-[-1] before:block before:h-28 before:-translate-y-1/2 before:bg-primary-foreground">
            DAWN.
          </span>{" "}
          <br />{" "}
          <span className="text-7xl font-semibold italic tracking-normal text-primary-foreground/20">
            (Gaza Strip).
          </span>
        </SectionHeading>
      </Frame>
      <Frame
        ref={hoodiesFrames[2].ref}
        dimensions="4:5"
        color="primary-foreground"
        className="bg-transparent">
        <SectionHeading className="!text-9xl">
          UNDER <br />
          <span className="relative z-10 ml-40 inline-block pl-2 font-[900] text-primary-foreground before:absolute before:-right-2 before:left-0 before:top-1/2 before:z-[-1] before:block before:h-28 before:-translate-y-1/2 before:bg-primary">
            ASHES.
          </span>{" "}
          <br />
          BUILDING{" "}
          <span className="relative z-10 inline-block pl-2 font-[900] text-primary-foreground before:absolute before:-right-2 before:left-0 before:top-1/2 before:z-[-1] before:block before:h-28 before:-translate-y-1/2 before:bg-primary">
            THE
          </span>{" "}
          <br /> NEXT
          <span className="relative z-10 ml-40 inline-block pl-2 font-[900] text-primary-foreground before:absolute before:-right-2 before:left-0 before:top-1/2 before:z-[-1] before:block before:h-28 before:-translate-y-1/2 before:bg-primary">
            SUN.
          </span>{" "}
          <br />{" "}
          <span className="text-7xl font-medium italic tracking-normal text-primary/20">
            (GAZA&apos;S LIGHT).
          </span>
        </SectionHeading>
      </Frame>
    </main>
  );
};

export default InstagramStudioPage;
