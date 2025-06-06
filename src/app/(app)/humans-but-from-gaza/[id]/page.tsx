// REVIEWED - 02

import { notFound } from "next/navigation";

import { getDiaryEntry, getDiaryEntryAuthor } from "@/actions/diary-entry";
import { DiaryEntryBadges } from "@/components/diary-entry/diary-entry-badges";
import { Container } from "@/components/globals/container";
import { Footer } from "@/components/globals/footer";
import { Paragraph, SectionHeading } from "@/components/globals/typography";
import { splitByFlexibleNewLines } from "@/lib/utils/strings";

/* eslint-disable-next-line func-style  */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const diaryEntry = await getDiaryEntry(parseInt((await params).id, 10));

  if (!diaryEntry.data || diaryEntry.error)
    return { title: "Diary Entry Not Found" };

  return {
    title: diaryEntry.data.title,
  };
}

export default async function HumanButFromGazaPage(props: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ author: string }>;
}) {
  /* eslint-disable react/destructuring-assignment */
  const params = await props.params;
  const searchParams = await props.searchParams;

  const diaryEntry = await getDiaryEntry(parseInt(params.id, 10));
  const author = await getDiaryEntryAuthor(parseInt(searchParams.author, 10));

  if (
    !diaryEntry.data ||
    diaryEntry.data.status !== "approved" ||
    diaryEntry.error
  )
    return notFound();

  return (
    <main className="relative pt-24 lg:pt-32 xl:pt-48">
      <Container className="mb-24 max-w-6xl lg:mb-32 xl:mb-48">
        <Container className="mx-0 mb-12 max-w-5xl px-0">
          <DiaryEntryBadges
            isAnonymous={diaryEntry.data.isAnonymous}
            date={diaryEntry.data.date}
            author={author.data}
            className="mb-6"
          />
          <SectionHeading>{diaryEntry.data.title}</SectionHeading>
        </Container>
        <Container className="flex flex-col gap-8 px-0">
          {splitByFlexibleNewLines(diaryEntry.data.content).map(
            (text, index) => (
              /* eslint-disable-next-line react/no-array-index-key */
              <Paragraph key={index}>{text}</Paragraph>
            ),
          )}
        </Container>
      </Container>
      <Footer />
    </main>
  );
}
