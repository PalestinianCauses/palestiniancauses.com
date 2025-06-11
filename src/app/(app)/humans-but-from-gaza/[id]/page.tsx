// REVIEWED - 05

import { notFound, redirect } from "next/navigation";

import { getDiaryEntry, getDiaryEntryAuthor } from "@/actions/diary-entry";
import { DiaryEntryBadges } from "@/components/diary-entry/diary-entry-badges";
import { Container } from "@/components/globals/container";
import { Footer } from "@/components/globals/footer";
import { Paragraph, SectionHeading } from "@/components/globals/typography";
import { Separator } from "@/components/ui/separator";
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

  const authorId = parseInt(searchParams.author, 10);
  if (Number.isNaN(authorId)) redirect("/humans-but-from-gaza");

  const diaryEntry = await getDiaryEntry(parseInt(params.id, 10));
  const author = await getDiaryEntryAuthor(authorId);

  if (
    !diaryEntry.data ||
    diaryEntry.data.status !== "approved" ||
    diaryEntry.error
  )
    return notFound();

  return (
    <main className="relative pt-24 lg:pt-32 xl:pt-48">
      <Container className="mb-24 max-w-6xl lg:mb-32 xl:mb-48">
        <Container className="mx-0 mb-12 max-w-5xl px-0 lg:px-0">
          <DiaryEntryBadges
            isAnonymous={diaryEntry.data.isAnonymous}
            date={diaryEntry.data.date}
            author={author.data}
            className="mb-6"
          />
          <SectionHeading>{diaryEntry.data.title}</SectionHeading>
        </Container>
        <Container className="flex flex-col gap-8 px-0 lg:px-0">
          {splitByFlexibleNewLines(diaryEntry.data.content).map(
            (text, index) => (
              /* eslint-disable-next-line react/no-array-index-key */
              <Paragraph key={index}>{text}</Paragraph>
            ),
          )}
        </Container>
      </Container>
      <Separator />
      {/* <Container className="my-12 max-w-6xl lg:my-24 xl:my-32">
        <SubSectionHeading
          small
          className="mb-4 flex flex-row items-center gap-2.5">
          <MessageSquareTextIcon className="size-7 stroke-[1.5]" />
          Comments
        </SubSectionHeading>
        <Paragraph small className="mb-12">
          Share your thoughts and show your support. Your words matter - they
          can bring comfort, understanding, and solidarity to those sharing
          their experiences. Let&apos;s build a community of empathy and support
          together.
        </Paragraph>
        <CreateCommentForm />
      </Container> */}
      <Separator className="mb-12 lg:mb-24 xl:mb-32" />
      <Footer />
    </main>
  );
}
