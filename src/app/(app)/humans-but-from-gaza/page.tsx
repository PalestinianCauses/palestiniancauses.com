// REVIEWED - 02

import { Metadata } from "next";
import Link from "next/link";

import { DiaryEntryList } from "@/components/diary-entry/list";
import { Container } from "@/components/globals/container";
import {
  FilterConfig,
  FilterControls,
} from "@/components/globals/filter-control";
import { Footer } from "@/components/globals/footer";
import { MotionDiv } from "@/components/globals/motion";
import { Paragraph, SectionHeading } from "@/components/globals/typography";
import { Button } from "@/components/ui/button";
import { motions } from "@/lib/motion";
import { SelectOptions } from "@/lib/payload/types";

import { QueryProvider } from "../providers";

export const metadata: Metadata = {
  title: "The Truth Museum: Humans But From Gaza",
  description:
    "Welcome to The Truth Museum, the diary archive for our Humans But From Gaza initiative. Explore un-filtered narratives shared directly by individuals navigating life during the war in Gaza, revealing daily survival, loss, resilience, and hope under siege. Engage respectfully with these authentic testimonies to connect with the human experience often overlooked and deepen your understanding of Gaza.",
};

export default async function HumansButFromGazaPage(props: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  /* eslint-disable react/destructuring-assignment */
  const searchParams = await props.searchParams;

  const selects: SelectOptions = {
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
        <SectionHeading className="mb-8">
          The Truth Museum: Diaries from Humans But From Gaza.
        </SectionHeading>
        <Paragraph>
          Welcome to The Truth Museum, the diary archive for our Humans But From
          Gaza initiative. Explore un-filtered narratives shared directly by
          individuals navigating life during the war in Gaza, revealing daily
          survival, loss, resilience, and hope under siege. Engage respectfully
          with these authentic testimonies to connect with the human experience
          often overlooked and deepen your understanding of Gaza.
        </Paragraph>
      </Container>
      <Container className="mb-12 flex max-w-7xl flex-col-reverse justify-between gap-5 sm:flex-row sm:items-end xl:mb-24">
        <div className="flex max-w-3xl flex-1 flex-col justify-stretch gap-5 sm:flex-row [&_#filter-control-sort]:min-w-48 [&_#filter-control-title]:w-full">
          <FilterControls
            filterConfigs={filterConfigs}
            pageDefault={selects.page}
            limitDefault={selects.limit}
            sortDefault={selects.sort}
          />
        </div>
        <MotionDiv
          viewport={{ once: true }}
          initial={motions.fadeIn.initial}
          whileInView={motions.fadeIn.whileInView}
          transition={motions.transition({})}>
          <Button variant="default" asChild>
            <Link href="/humans-but-from-gaza/share">Share your diary</Link>
          </Button>
        </MotionDiv>
      </Container>
      <Container className="mb-24 grid max-w-7xl grid-cols-1 gap-8 lg:mb-32 xl:mb-48 xl:gap-16">
        <QueryProvider>
          <DiaryEntryList selects={selects} fields={["title"]} />
        </QueryProvider>
      </Container>
      <Footer />
    </main>
  );
}
