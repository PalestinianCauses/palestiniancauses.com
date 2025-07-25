// REVIEWED - 15

import { MessageSquareTextIcon } from "lucide-react";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import linesSplit from "split-lines";

import { getDiaryEntry } from "@/actions/diary-entry";
import { CreateCommentForm } from "@/components/comments/forms/create";
import { CommentPreFetch } from "@/components/comments/pre-fetch";
import { DiaryEntryListItemBadges } from "@/components/diary-entry/list";
import { Container } from "@/components/globals/container";
import { Footer } from "@/components/globals/footer";
import { Loading } from "@/components/globals/loading";
import {
  Paragraph,
  SectionHeading,
  SubSectionHeading,
} from "@/components/globals/typography";
import { Separator } from "@/components/ui/separator";

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
}) {
  /* eslint-disable react/destructuring-assignment */
  const params = await props.params;

  const diaryEntry = await getDiaryEntry(parseInt(params.id, 10));

  if (
    !diaryEntry.data ||
    diaryEntry.data.status !== "approved" ||
    diaryEntry.error
  )
    return notFound();

  return (
    <main className="relative pt-24 lg:pt-32 xl:pt-48">
      <Container as="section" className="max-w-6xl">
        <Container className="mx-0 mb-12 max-w-5xl px-0 lg:px-0">
          <DiaryEntryListItemBadges diaryEntry={diaryEntry.data} />
          <SectionHeading>{diaryEntry.data.title}</SectionHeading>
        </Container>
        <Container className="flex flex-col gap-8 px-0 lg:px-0">
          {linesSplit(diaryEntry.data.content)
            .filter(Boolean)
            .map((text, index) => (
              /* eslint-disable-next-line react/no-array-index-key */
              <Paragraph key={index}>{text}</Paragraph>
            ))}
        </Container>
      </Container>
      <Separator className="my-12 lg:my-24 xl:my-32" />
      <Container as="section" className="max-w-6xl">
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
        <CreateCommentForm
          on={{ relationTo: "diary-entries", value: diaryEntry.data.id }}
        />
      </Container>
      <Separator className="my-12 lg:my-24 xl:my-32" />
      <Container className="max-w-7xl">
        <Suspense fallback={<Loading className="min-h-80" />}>
          <CommentPreFetch
            on={{ relationTo: "diary-entries", value: diaryEntry.data.id }}
          />
        </Suspense>
      </Container>
      <Footer />
    </main>
  );
}
