// REVIEWED

import { getCollectionFiltered } from "@/actions/collection";
import { Container } from "@/components/globals/container";
import {
  FilterConfig,
  FilterControls,
} from "@/components/globals/filter-control";
import { Footer } from "@/components/globals/footer";
import { Paragraph, SectionHeading } from "@/components/globals/typography";
import { SelectOptions } from "@/lib/payload/types";

export default async function HumansButFromGazaPage(props: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  /* eslint-disable react/destructuring-assignment */
  const searchParams = await props.searchParams;

  const filters: SelectOptions = {
    page: parseInt(String(searchParams?.page || "1"), 10),
    limit: parseInt(String(searchParams?.limit || "10"), 10),
    sort: String(searchParams?.sort || "-createdAt"),
    search: String(searchParams?.title || ""),
  };

  const filterConfigs: FilterConfig[] = [
    {
      type: "search",
      param: "title",
      label: "Search By Title",
    },
  ];

  const diaryEntries = await getCollectionFiltered({
    collection: "diary-entries",
    filters,
    fields: ["title"],
  });

  console.log(filters, diaryEntries.data?.docs);

  return (
    <main className="relative pt-24 lg:pt-32 xl:pt-48">
      <Container className="max-w-7xl">
        <SectionHeading className="mb-8">
          The Truth Museum: Diaries from Humans But From Gaza.
        </SectionHeading>
        <Paragraph className="mb-8">
          Welcome to The Truth Museum, the diary archive for our Humans But From
          Gaza initiative. Explore unfiltered narratives shared directly by
          individuals navigating life during the war in Gaza, revealing daily
          survival, loss, resilience, and hope under siege. Engage respectfully
          with these authentic testimonies to connect with the human experience
          often overlooked and deepen your understanding of Gaza.
        </Paragraph>
      </Container>
      <Container>
        <FilterControls filterConfigs={filterConfigs} />
      </Container>
      <Footer />
    </main>
  );
}
