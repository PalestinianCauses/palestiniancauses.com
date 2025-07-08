// REVIEWED - 14

import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

import { DiaryEntryList } from "@/components/diary-entry/list";
import { DiaryEntryListLoading } from "@/components/diary-entry/loading";
import { Container } from "@/components/globals/container";
import {
  FilterConfig,
  FilterControls,
} from "@/components/globals/filter-control";
import { Footer } from "@/components/globals/footer";
import { Paragraph, SectionHeading } from "@/components/globals/typography";
import { VideoOutroScene } from "@/components/globals/video-outro-scene";
import { Button } from "@/components/ui/button";
import { FiltersOptions } from "@/lib/types";

export const metadata: Metadata = {
  title: "The Truth Museum: Humans But From Gaza",
  description:
    "Welcome to The Truth Museum, the diary archive for our Humans But From Gaza initiative. Explore un-filtered narratives shared directly by individuals navigating life during the war in Gaza, revealing daily survival, loss, resilience, and hope under siege. Engage respectfully with these authentic testimonies to connect with the human experience often overlooked and deepen your understanding of Gaza.",

  openGraph: {
    images: [
      {
        url: "https://qwvvvruhbe.ufs.sh/f/ZhaM3m5tNWzXC1oaVJSjsK7EiPGHV1uLXdr0eRnvWfxmt5qM",
        width: 1200,
        height: 630,
        alt: "PalestinianCauses Humans But From Gaza Thumbnail",
      },
    ],
  },

  twitter: {
    images: [
      "https://qwvvvruhbe.ufs.sh/f/ZhaM3m5tNWzXC1oaVJSjsK7EiPGHV1uLXdr0eRnvWfxmt5qM",
    ],
  },
};

export default async function HumansButFromGazaPage(props: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  /* eslint-disable react/destructuring-assignment */
  const searchParams = await props.searchParams;

  const filters: FiltersOptions = {
    page:
      searchParams?.page && typeof searchParams?.page === "string"
        ? parseInt(searchParams?.page, 10)
        : 1,
    limit:
      searchParams?.limit && typeof searchParams?.limit === "string"
        ? parseInt(searchParams?.limit, 10)
        : 50,
    sort:
      searchParams?.sort && typeof searchParams.sort === "string"
        ? searchParams?.sort
        : "-date",
    search:
      searchParams?.title && typeof searchParams.title === "string"
        ? searchParams?.title
        : "",
    fields: { status: { equals: "approved" } },
  };

  const filterConfigs: FilterConfig[] = [
    {
      type: "search",
      param: "title",
      label: "Search By Title",
    },
    {
      type: "select",
      param: "sort",
      label: "Sort By",
      options: [
        { label: "Newest", value: ["-", "date"].join("") },
        { label: "Oldest", value: "date" },
      ],
    },
  ];

  return (
    <main className="relative pt-24 lg:pt-32 xl:pt-48">
      <Container className="mb-12 max-w-7xl xl:mb-24">
        <SectionHeading className="mb-8 max-w-xl lg:!max-w-3xl">
          The Truth Museum: Diaries from Humans But From Gaza.
        </SectionHeading>
        <Paragraph className="mb-8">
          Welcome to The Truth Museum, the diary archive for our Humans But From
          Gaza initiative. Explore un-filtered narratives shared directly by
          individuals navigating life during the war in Gaza, revealing daily
          survival, loss, resilience, and hope under siege. Engage respectfully
          with these authentic testimonies to connect with the human experience
          often overlooked and deepen your understanding of Gaza.
        </Paragraph>
        <div className="block w-full sm:hidden">
          <Button variant="default" className="w-full text-center" asChild>
            <Link href="/humans-but-from-gaza/share">Share your diary</Link>
          </Button>
        </div>
      </Container>
      <Container className="mb-12 flex max-w-7xl flex-col-reverse justify-between gap-5 sm:flex-row sm:items-end xl:mb-24">
        <div className="flex max-w-3xl flex-1 flex-col justify-stretch gap-5 sm:flex-row [&_#filter-control-sort]:min-w-48 [&_#filter-control-title]:w-full">
          <FilterControls
            filterConfigs={filterConfigs}
            pageDefault={filters.page}
            limitDefault={filters.limit}
            sortDefault={filters.sort}
            debounceTime={500}
          />
        </div>
        <div className="hidden sm:block">
          <Button variant="default" asChild>
            <Link href="/humans-but-from-gaza/share">Share your diary</Link>
          </Button>
        </div>
      </Container>
      <Container className="mb-12 grid max-w-7xl grid-cols-1 gap-16 xl:mb-24">
        <Suspense fallback={<DiaryEntryListLoading />}>
          <DiaryEntryList filters={filters} fieldsSearch={["title"]} />
        </Suspense>
      </Container>
      <Container className="mb-24 flex items-center justify-center lg:mb-32">
        <Button variant="default" size="lg" asChild>
          <Link href="/humans-but-from-gaza/share">Share your diary</Link>
        </Button>
      </Container>
      <VideoOutroScene
        duration={800}
        sequence={[
          {
            word: "Share",
            textColor: "text-primary-foreground",
            bgColor: "--primary",
          },
          {
            word: "Your Diary",
            textColor: "text-primary",
            bgColor: "--background",
          },
          {
            word: "With",
            textColor: "text-primary-foreground",
            bgColor: "--primary",
          },
          {
            word: "The Truth",
            textColor: "text-primary",
            bgColor: "--background",
          },
          {
            word: "Museum.",
            textColor: "text-primary-foreground",
            bgColor: "--primary",
          },
        ]}
        containerClassName="-mb-12 lg:-mb-24"
      />
      <Footer />
    </main>
  );
}
