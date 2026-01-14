// REVIEWED - 18

import { MessageSquareTextIcon } from "lucide-react";
import { notFound } from "next/navigation";
import { ReactNode, Suspense } from "react";

import { CreateCommentForm } from "@/components/comments/forms/create";
import { CommentPreFetch } from "@/components/comments/pre-fetch";
import {
  DiaryEntryBadgesListItemLoading,
  DiaryEntryListItemBadges,
} from "@/components/diary-entry/list";
import { Container } from "@/components/globals/container";
import { Footer } from "@/components/globals/footer";
import { Loading } from "@/components/globals/loading";
import {
  Paragraph,
  SectionHeading,
  SubSectionHeading,
} from "@/components/globals/typography";
import { Separator } from "@/components/ui/separator";
import { messages } from "@/lib/messages";
import { actionSafeExecute } from "@/lib/network";
import { payload } from "@/lib/payload";

/* eslint-disable-next-line func-style  */
export async function generateMetadata(props: {
  params: Promise<{ id: string }>;
}) {
  // eslint-disable-next-line react/destructuring-assignment
  const params = await props.params;
  const diaryEntry = await actionSafeExecute(
    payload.findByID({
      collection: "diary-entries",
      id: parseInt(params.id, 10),
      depth: 0,
    }),
    messages.actions.diaryEntry.serverErrorGet,
  );

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

  const diaryEntry = await actionSafeExecute(
    payload.findByID({
      collection: "diary-entries",
      id: parseInt(params.id, 10),
      depth: 0,
    }),
    messages.actions.diaryEntry.serverErrorGet,
  );

  if (
    !diaryEntry.data ||
    diaryEntry.data.status !== "approved" ||
    diaryEntry.error
  )
    return notFound();

  return (
    <main className="section-padding-start-xl relative">
      <Container as="section" className="max-w-6xl">
        <Container className="mx-0 mb-12 max-w-5xl px-0 lg:px-0">
          <Suspense fallback={DiaryEntryBadgesListItemLoading}>
            <DiaryEntryListItemBadges diaryEntry={diaryEntry.data} />
          </Suspense>
          <SectionHeading>{diaryEntry.data.title}</SectionHeading>
        </Container>
        <Container className="flex flex-col gap-8 px-0 lg:px-0">
          {diaryEntry.data.content
            .split(/(?:\r?\n){2,}/)
            .filter((paragraph) => paragraph.trim() !== "")
            .map((paragraph, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <Paragraph key={`${paragraph}-${index}`}>
                {paragraph
                  .split(/(?:\r?\n)/)
                  .reduce<ReactNode[]>((accumulator, line, lineIndex) => {
                    if (lineIndex === 0) return [line];
                    // eslint-disable-next-line react/no-array-index-key
                    return [...accumulator, <br key={lineIndex} />, line];
                  }, [])}
              </Paragraph>
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
