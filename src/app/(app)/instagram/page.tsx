"use client";

// REVIEWED - 20
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */

import { QuoteIcon } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

import {
  SectionHeading,
  SectionHeadingBadge,
  SectionTitle,
} from "@/components/globals/typography";

// eslint-disable-next-line import/no-cycle
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
// eslint-disable-next-line import/no-cycle
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
  | "1:1.414"
  | "1.6:1"
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
  "1:1.414": "w-[67.5rem] aspect-[1/1.414]",
  "1.6:1": "w-[67.5rem] aspect-[1.6/1]",
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
    {
      id: "ig-04",
      ref: useRef<HTMLDivElement>(null),
      as: "png",
    },
    {
      id: "ig-05",
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
    {
      id: "n-art-work-05",
      ref: useRef<HTMLDivElement>(null),
      as: "png",
    },
  ];

  const qrCodeFrames: ImageFrame[] = [
    {
      id: "qr-code-01",
      ref: useRef<HTMLDivElement>(null),
      as: "png",
    },
    {
      id: "qr-code-02",
      ref: useRef<HTMLDivElement>(null),
      as: "png",
    },
    {
      id: "qr-code-03",
      ref: useRef<HTMLDivElement>(null),
      as: "png",
    },
    {
      id: "qr-code-04",
      ref: useRef<HTMLDivElement>(null),
      as: "png",
    },
  ];

  return (
    <main>
      {/* Open Graph */}
      <ImageFrameRender frames={profileImagesFrames} />
      <ImageFrameRender frames={hoodiesFrames} />
      <ImageFrameRender frames={instagramFrames} />
      <ImageFrameRender frames={nArtWorkFrames} />
      <ImageFrameRender frames={qrCodeFrames} />
      {/* QR Code */}
      <Frame ref={qrCodeFrames[0].ref} dimensions="1:1.414" color="primary">
        <FrameContent className="h-[80rem] w-[60rem] justify-center">
          <SectionTitle className="mx-auto text-center font-bold !leading-[0.9] text-primary-foreground">
            {" "}
            <FrameHighlight className="text-primary before:-inset-x-2.5 before:bg-primary-foreground before:ring-primary-foreground">
              Stories
            </FrameHighlight>{" "}
            that <br />
            must be{" "}
            <FrameHighlight className="text-primary before:-inset-x-2.5 before:bg-primary-foreground before:ring-primary-foreground">
              told.
            </FrameHighlight>
          </SectionTitle>
          <FrameParagraph className="text-center">
            An intimate collection of diaries and art from the heart of{" "}
            <FrameParagraphHighlight className="bg-primary-foreground text-primary">
              Gaza.
            </FrameParagraphHighlight>{" "}
            In a library of{" "}
            <FrameParagraphHighlight className="bg-primary-foreground text-primary">
              millions
            </FrameParagraphHighlight>{" "}
            of stories, this one is waiting for{" "}
            <FrameParagraphHighlight className="bg-primary-foreground text-primary">
              you
            </FrameParagraphHighlight>{" "}
            — raw, un-
            <span className="-mr-px tracking-wide">fi</span>ltered, and deeply
            human.
          </FrameParagraph>
          <Image
            src="/qr-code-palestiniancauses.png"
            alt="QR Code"
            fill
            className="!static mx-auto my-12 !h-auto !w-full max-w-md object-cover object-center ring-4 ring-primary-foreground"
          />
          <FrameSquare className="mx-auto bg-primary-foreground text-primary ring-primary-foreground">
            <Image
              src="/logo-primary.png"
              alt="Primary Logo"
              fill
              className="!static !h-24 !w-24"
            />
          </FrameSquare>
        </FrameContent>
      </Frame>
      <Frame
        ref={qrCodeFrames[1].ref}
        dimensions="1.6:1"
        color="primary-foreground">
        <FrameImagesGrid>
          <div className="relative col-start-2 col-end-7 row-start-3 row-end-11">
            <FrameSquare className="mx-auto h-full w-full bg-primary-foreground ring-primary-foreground">
              <Image
                src="/logo-primary.png"
                alt="Primary Logo"
                fill
                className="!static !h-auto !max-w-xs"
              />
            </FrameSquare>
          </div>
          <div className="relative col-start-7 col-end-12 row-start-3 row-end-11 ring-2 ring-primary ring-offset-8 ring-offset-primary-foreground">
            <Image
              src="/qr-code-palestiniancauses.png"
              alt="QR Code"
              fill
              className="!static mx-auto max-w-md object-cover object-center"
            />
          </div>
        </FrameImagesGrid>
      </Frame>
      <Frame
        ref={qrCodeFrames[2].ref}
        dimensions="1.6:1"
        color="primary"
        className="flex-col">
        <SectionTitle className="mx-auto mb-6 text-center font-bold !leading-[0.9] text-primary-foreground">
          {" "}
          <FrameHighlight className="text-primary before:-inset-x-2.5 before:bg-primary-foreground before:ring-primary-foreground">
            Stories
          </FrameHighlight>{" "}
          that <br />
          must be{" "}
          <FrameHighlight className="text-primary before:-inset-x-2.5 before:bg-primary-foreground before:ring-primary-foreground">
            told.
          </FrameHighlight>
        </SectionTitle>
        <FrameParagraph className="mb-12 max-w-4xl text-center">
          Discover authentic diaries and art from the heart of Gaza. A
          perspective beyond the headlines.
        </FrameParagraph>
        <SectionHeadingBadge className="text-primary-foreground">
          Scan to Order Your Copy
        </SectionHeadingBadge>
      </Frame>
      <Frame
        ref={qrCodeFrames[3].ref}
        dimensions="9:16"
        color="primary-foreground">
        <FrameContent></FrameContent>
      </Frame>
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
              We
            </FrameHighlight>
            <FrameHighlight className="before:-inset-x-2.5 before:top-1/4 before:bg-primary-foreground before:ring-primary-foreground">
              Do Not
            </FrameHighlight>
            <FrameHighlight className="before:-inset-x-2.5 before:top-1/4 before:bg-primary-foreground before:ring-primary-foreground">
              Know.
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
              src="/we-do-not-know-refined.png"
              alt="N's Art-Work no. 03"
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
        <FrameContent className="h-auto">
          <FrameSquare className="shrink-0 bg-primary text-primary-foreground ring-primary">
            <QuoteIcon className="h-20 w-20 stroke-[1.5]" />
          </FrameSquare>
          <FrameParagraph>
            I don&apos;t know if my memory helps me remember the sound of birds
            alone in the morning, the sound of children&apos;s giggles, the
            voice of my friends who argue about a discussion and then assuage
            and start singing,{" "}
            <FrameParagraphHighlight className="bg-primary text-primary-foreground">
              or even the sound of someone&apos;s radio
            </FrameParagraphHighlight>{" "}
            <FrameParagraphHighlight className="bg-primary text-primary-foreground">
              broadcasting any news other than
            </FrameParagraphHighlight>{" "}
            &ldquo;that building was targeted, violent raids on..., a massacre
            of (…) family&ldquo;. No sound comes to my hearing except
            explosions, the collapse of buildings on the heads of those like me,
            the crying of the bereaved, and the grief of mothers, and in the
            background is the zanana&apos;s sound that never stops.
          </FrameParagraph>
          <FrameParagraph>
            I don&apos;t have enough time{" "}
            <FrameParagraphHighlight className="bg-primary text-primary-foreground">
              to recall my previous life&apos;s
            </FrameParagraphHighlight>{" "}
            <FrameParagraphHighlight className="bg-primary text-primary-foreground">
              details and assume weak possibilities
            </FrameParagraphHighlight>{" "}
            of its existence after the war ends. All of us in this war know one
            common thing...
          </FrameParagraph>
        </FrameContent>
      </Frame>
      <Frame ref={nArtWorkFrames[2].ref} dimensions="4:5" color="primary">
        <FrameContent className="justify-center">
          <FrameTitle>
            ...that we do not{" "}
            <FrameHighlight className="mx-2.5 text-primary before:-inset-x-2.5 before:bg-primary-foreground before:ring-primary-foreground">
              know!
            </FrameHighlight>{" "}
          </FrameTitle>
          <SectionHeadingBadge className="text-current ring-primary-foreground">
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
            <FrameHighlight className="text-primary-foreground before:-inset-x-2.5 before:bg-primary before:ring-primary">
              further
            </FrameHighlight>{" "}
            compelling{" "}
            <FrameHighlight className="z-20 -mx-2.5 text-primary-foreground before:-inset-x-2.5 before:bg-primary before:ring-primary">
              narratives
            </FrameHighlight>{" "}
            within:
          </FrameTitle>
        </FrameContent>
      </Frame>
      <Frame ref={nArtWorkFrames[4].ref} dimensions="4:5" color="primary">
        <FrameContent>
          <FrameTitle>
            Link in{" "}
            <FrameHighlight className="text-primary before:-inset-x-2.5 before:bg-primary-foreground before:ring-primary-foreground">
              bio.
            </FrameHighlight>{" "}
          </FrameTitle>
          <FrameSquare className="mt-auto bg-primary-foreground text-primary ring-primary-foreground">
            <Image
              src="/logo-primary.png"
              alt="Primary Logo"
              fill
              className="!static !h-24 !w-24"
            />
          </FrameSquare>
        </FrameContent>
        <FrameImagesGrid className="scale-1">
          <div className="col-start-6 col-end-13 row-start-4 row-end-13 -translate-y-10 ring ring-primary-foreground ring-offset-8 ring-offset-primary">
            <Image
              src="https://nwdtauhmkupvkywh.public.blob.vercel-storage.com/book-cover/book-cover-new.png"
              alt="A Human But From Gaza Book Cover"
              fill
              className="!static object-cover object-[top_left]"
            />
          </div>
        </FrameImagesGrid>
      </Frame>
      {/* Diary Entry */}
      <Frame ref={instagramFrames[0].ref} dimensions="4:5" color="primary">
        <FrameContent>
          <SectionHeadingBadge className="text-lg text-primary-foreground">
            The Truth Museum: Humans But From Gaza
          </SectionHeadingBadge>
          <FrameTitle>
            Will our Lean Years{" "}
            <FrameHighlight className="text-primary before:-inset-x-2.5 before:bg-primary-foreground before:ring-primary-foreground">
              Extend
            </FrameHighlight>{" "}
            beyond Two Years?
          </FrameTitle>
          <div className="relative mt-auto flex h-32 w-32 items-center justify-center bg-background text-primary ring-1 ring-background">
            <Image
              src="/logo-primary.png"
              alt="Primary Logo"
              fill
              className="!static !h-24 !w-24"
            />
          </div>
        </FrameContent>
      </Frame>
      <Frame
        ref={instagramFrames[1].ref}
        dimensions="4:5"
        color="primary-foreground">
        <FrameContent>
          <FrameSquare className="shrink-0 bg-primary text-primary-foreground ring-primary">
            <QuoteIcon className="h-20 w-20 stroke-[1.5]" />
          </FrameSquare>
          <FrameParagraph>
            Did you understand from the beginning of the diary that we are still
            waiting for those{" "}
            <FrameParagraphHighlight className="bg-primary text-primary-foreground">
              who would
            </FrameParagraphHighlight>{" "}
            <FrameParagraphHighlight className="bg-primary text-primary-foreground">
              liberate us from the well?
            </FrameParagraphHighlight>{" "}
            I reconsider what I said; I retract what I said because it&apos;s
            too late, our hope has been dashed, and the rope of the well that
            once hung there has burned away. This time we will save ourselves.
          </FrameParagraph>
          <FrameParagraph>
            I know the path&apos;s features have yet to take shape, but maybe we
            will dig the tunnel of freedom with our empty hands, using the
            cunning and wisdom of our ancestors,{" "}
            <FrameParagraphHighlight className="bg-primary text-primary-foreground">
              the prayers of bereaved mothers,
            </FrameParagraphHighlight>{" "}
            and the strength of our men, which resembles the burning power of
            the sun that...
          </FrameParagraph>
        </FrameContent>
      </Frame>
      <Frame ref={instagramFrames[2].ref} dimensions="4:5" color="primary">
        <FrameContent className="justify-center">
          <FrameTitle>
            is beyond the
            <FrameHighlight className="mx-2.5 text-primary before:-inset-x-2.5 before:bg-primary-foreground before:ring-primary-foreground">
              reach
            </FrameHighlight>{" "}
            of anyone to{" "}
            <FrameHighlight className="mx-2.5 text-primary before:-inset-x-2.5 before:bg-primary-foreground before:ring-primary-foreground">
              extinguish
            </FrameHighlight>{" "}
            the power of its flame.{" "}
          </FrameTitle>
          <SectionHeadingBadge className="text-current ring-primary-foreground">
            Composed by Basmala featured in The Truth Museum
          </SectionHeadingBadge>
        </FrameContent>
      </Frame>
      <Frame
        ref={instagramFrames[3].ref}
        dimensions="4:5"
        color="primary-foreground">
        <FrameContent>
          <FrameTitle>
            Discover the complete diary and{" "}
            <FrameHighlight className="text-primary-foreground before:-inset-x-2.5 before:bg-primary before:ring-primary">
              further
            </FrameHighlight>{" "}
            compelling{" "}
            <FrameHighlight className="z-20 -mx-2.5 text-primary-foreground before:-inset-x-2.5 before:bg-primary before:ring-primary">
              narratives
            </FrameHighlight>{" "}
            within:
          </FrameTitle>
        </FrameContent>
      </Frame>
      <Frame ref={instagramFrames[4].ref} dimensions="4:5" color="primary">
        <FrameContent>
          <FrameTitle>
            The{" "}
            <FrameHighlight className="text-primary before:-inset-x-2.5 before:bg-primary-foreground before:ring-primary-foreground">
              Truth
            </FrameHighlight>{" "}
            Museum. Link in{" "}
            <FrameHighlight className="text-primary before:-inset-x-2.5 before:bg-primary-foreground before:ring-primary-foreground">
              bio.
            </FrameHighlight>{" "}
          </FrameTitle>
          <FrameSquare className="mt-auto bg-primary-foreground text-primary ring-primary-foreground">
            <Image
              src="/logo-primary.png"
              alt="Primary Logo"
              fill
              className="!static !h-24 !w-24"
            />
          </FrameSquare>
        </FrameContent>
        <FrameImagesGrid className="scale-1">
          <div className="col-start-6 col-end-13 row-start-6 row-end-13 ring ring-primary-foreground ring-offset-8 ring-offset-primary">
            <Image
              src="/The-Truth-Museum.png"
              alt="The Truth Museum"
              fill
              className="!static object-cover object-[top_left]"
            />
          </div>
        </FrameImagesGrid>
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
