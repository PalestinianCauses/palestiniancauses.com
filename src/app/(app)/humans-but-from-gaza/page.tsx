// REVIEWED - 21

import { Metadata } from "next";
import Link from "next/link";
import { Where } from "payload";
import { Fragment, Suspense } from "react";

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
import { messages } from "@/lib/messages";
import { actionSafeExecute } from "@/lib/network";
import { payload } from "@/lib/payload";
import { FiltersOptions } from "@/lib/types";

export const metadata: Metadata = {
  title: "The Truth Museum: Humans But From Gaza",
  description:
    "Welcome to The Truth Museum, the diary archive for our Humans But From Gaza initiative. Explore un-filtered narratives shared directly by individuals navigating life during the war in Gaza, revealing daily survival, loss, resilience, and hope under siege. Engage respectfully with these authentic testimonies to connect with the human experience often overlooked and deepen your understanding of Gaza.",
  openGraph: {
    type: "website",
    siteName: "PalestinianCauses Digital Agency",
    url: `${process.env.NEXT_PUBLIC_URL || "https://www.palestiniancauses.com"}/humans-but-from-gaza`,
    title:
      "The Truth Museum: Humans But From Gaza | PalestinianCauses Digital Agency",
    description:
      "Welcome to The Truth Museum, the diary archive for our Humans But From Gaza initiative. Explore un-filtered narratives shared directly by individuals navigating life during the war in Gaza.",
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
    card: "summary_large_image",
    title:
      "The Truth Museum: Humans But From Gaza | PalestinianCauses Digital Agency",
    description:
      "Explore un-filtered narratives shared directly by individuals navigating life during the war in Gaza.",
    images: [
      "https://qwvvvruhbe.ufs.sh/f/ZhaM3m5tNWzXC1oaVJSjsK7EiPGHV1uLXdr0eRnvWfxmt5qM",
    ],
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_URL || "https://www.palestiniancauses.com"}/humans-but-from-gaza`,
  },
};

const DiaryEntryListPreFetch = async function DiaryEntryListPreFetch({
  filters,
}: {
  filters: FiltersOptions;
}) {
  const where: Where = { ...filters.fields };

  if (filters.search) where.or = [{ title: { contains: filters.search } }];

  const diaryEntries = await actionSafeExecute(
    payload.find({
      collection: "diary-entries",
      page: filters.page,
      limit: filters.limit,
      sort: filters.sort,
      where,
    }),
    messages.actions.comment.serverErrorGet,
  );

  return (
    <DiaryEntryList search={filters.search} diaryEntries={diaryEntries.data} />
  );
};

export default async function HumansButFromGazaPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;

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

  const filters: FiltersOptions = {
    page:
      params?.page && typeof params.page === "string"
        ? parseInt(params.page, 10)
        : 1,
    limit:
      params?.limit && typeof params.limit === "string"
        ? parseInt(params.limit, 10)
        : 50,
    sort:
      params?.sort && typeof params.sort === "string" ? params.sort : "-date",
    search:
      params?.title && typeof params.title === "string"
        ? params.title
        : undefined,
    fields: { status: { equals: "approved" } },
  };

  const siteURL =
    process.env.NEXT_PUBLIC_URL || "https://www.palestiniancauses.com";

  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "The Truth Museum: Humans But From Gaza",
    "url": `${siteURL}/humans-but-from-gaza`,
    "description":
      "Welcome to The Truth Museum, the diary archive for our Humans But From Gaza initiative. Explore un-filtered narratives shared directly by individuals navigating life during the war in Gaza.",
    "publisher": {
      "@type": "Organization",
      "name": "PalestinianCauses Digital Agency",
      "url": siteURL,
    },
  };

  return (
    <Fragment>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionPageSchema),
        }}
      />

      <main id="main-content" className="section-padding-start-xl relative">
        <Container className="mb-12 max-w-7xl xl:mb-24">
          <header>
            <SectionHeading as="h1" className="mb-8 max-w-xl lg:!max-w-3xl">
              The Truth Museum: Diaries from Humans But From Gaza.
            </SectionHeading>
            <Paragraph className="mb-8">
              Welcome to The Truth Museum, the diary archive for our Humans But
              From Gaza initiative. Explore un-filtered narratives shared
              directly by individuals navigating life during the war in Gaza,
              revealing daily survival, loss, resilience, and hope under siege.
              Engage respectfully with these authentic testimonies to connect
              with the human experience often overlooked and deepen your
              understanding of Gaza.
            </Paragraph>
          </header>
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
              limitDefault={100}
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
          <Suspense
            key={JSON.stringify(params)}
            fallback={<DiaryEntryListLoading />}>
            <DiaryEntryListPreFetch filters={filters} />
          </Suspense>
        </Container>
        <Container className="mb-24 flex items-center lg:mb-32 lg:justify-center">
          <Button variant="default" className="w-full md:w-max" asChild>
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
    </Fragment>
  );
}
