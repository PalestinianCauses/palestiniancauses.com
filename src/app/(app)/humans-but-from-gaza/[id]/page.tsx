// REVIEWED - 07

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { MessageSquareTextIcon } from "lucide-react";
import { notFound, redirect } from "next/navigation";
import { GeneratedTypes } from "payload";
import { PropsWithChildren, Suspense } from "react";

import { getAuthentication } from "@/actions/auth";
import { getCollection } from "@/actions/collection";
import { getDiaryEntry, getDiaryEntryAuthor } from "@/actions/diary-entry";
import { CreateCommentForm } from "@/components/comments/forms/create";
import { CommentList } from "@/components/comments/list";
import { DiaryEntryBadges } from "@/components/diary-entry/diary-entry-badges";
import { Container } from "@/components/globals/container";
import { Footer } from "@/components/globals/footer";
import { Loading } from "@/components/globals/loading";
import {
  Paragraph,
  SectionHeading,
  SubSectionHeading,
} from "@/components/globals/typography";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { SelectOptions } from "@/lib/types";
import { splitByFlexibleNewLines } from "@/lib/utils/strings";
import { User } from "@/payload-types";

import { QueryProvider } from "../../providers";

const DiaryEntryPageBadges = async function DiaryEntryPageBadges({
  isAnonymous,
  date,
  authorId,
}: {
  isAnonymous: boolean;
  date: string;
  authorId: number;
}) {
  let author: Partial<User> | null = null;

  if (!isAnonymous) {
    const { data } = await getDiaryEntryAuthor(authorId);
    if (data) author = data;
  }

  return (
    <DiaryEntryBadges
      isAnonymous={isAnonymous}
      date={date}
      author={author}
      className="mb-6"
    />
  );
};

const DiaryEntryPageComments = async function DiaryEntryPageComments({
  children,
}: PropsWithChildren) {
  const queryClient = new QueryClient();
  queryClient.prefetchQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await getAuthentication();

      if (!response || !response.user) return null;

      return response.user;
    },
  });

  return (
    <QueryProvider>
      <HydrationBoundary state={dehydrate(queryClient)}>
        {children}
      </HydrationBoundary>
    </QueryProvider>
  );
};

const DiaryEntryPageCommentsList = async function DiaryEntryPageCommentsList({
  diaryEntryId,
}: {
  diaryEntryId: number;
}) {
  const commentsSelects: SelectOptions = {
    page: 1,
    limit: 50,
    sort: "-createdAt",
    fields: [
      {
        on: {
          equals: {
            relationTo: "diary-entries",
            value: diaryEntryId,
          },
        },
        parent: { exists: false },
        status: { equals: "approved" },
      },
    ],
  };

  const commentsFields: (keyof GeneratedTypes["collections"]["comments"])[] = [
    "user",
    "content",
    "votes",
    "createdAt",
  ];

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["comments", commentsSelects, commentsFields],
    queryFn: async () => {
      const response = await getCollection({
        collection: "comments",
        selects: commentsSelects,
        fields: commentsFields,
        depth: 1,
      });

      if (!response.data || response.data.docs.length === 0 || response.error)
        return null;

      return response.data;
    },
  });

  return (
    <QueryProvider>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CommentList selects={commentsSelects} fields={commentsFields} />
      </HydrationBoundary>
    </QueryProvider>
  );
};

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
          <Suspense
            fallback={<Skeleton className="mb-6 h-5 w-full max-w-lg" />}>
            <DiaryEntryPageBadges
              isAnonymous={diaryEntry.data.isAnonymous}
              date={diaryEntry.data.date}
              authorId={authorId}
            />
          </Suspense>
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
      <Container className="my-12 max-w-6xl lg:my-24 xl:my-32">
        <SubSectionHeading
          isMotion={false}
          small
          className="mb-4 flex flex-row items-center gap-2.5">
          <MessageSquareTextIcon className="size-7 stroke-[1.5]" />
          Comments
        </SubSectionHeading>
        <Paragraph isMotion={false} small className="mb-12">
          Share your thoughts and show your support. Your words matter - they
          can bring comfort, understanding, and solidarity to those sharing
          their experiences. Let&apos;s build a community of empathy and support
          together.
        </Paragraph>
        <Suspense fallback={<Loading className="min-h-96" />}>
          <DiaryEntryPageComments>
            <CreateCommentForm
              on={{ relationTo: "diary-entries", value: diaryEntry.data.id }}
            />
          </DiaryEntryPageComments>
        </Suspense>
        <Separator className="my-12 lg:my-24 xl:my-32" />
        <Suspense fallback={<Loading className="min-h-96" />}>
          <DiaryEntryPageCommentsList diaryEntryId={diaryEntry.data.id} />
        </Suspense>
      </Container>
      <Separator className="mb-12 lg:mb-24 xl:mb-32" />
      <Footer />
    </main>
  );
}
