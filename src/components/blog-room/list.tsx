// REVIEWED - 03

import { ArrowUpRightIcon, BookAlertIcon } from "lucide-react";
import Link from "next/link";

import { Paragraph, SubSectionHeading } from "@/components/globals/typography";
import { Button } from "@/components/ui/button";
import { messages } from "@/lib/messages";
import { actionSafeExecute } from "@/lib/network";
import { payload } from "@/lib/payload";
import { cn } from "@/lib/utils/styles";

import { BlogRoomListItem } from "./item";

export const BlogRoomListLoading = function BlogRoomListLoading() {
  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          className="h-96 animate-pulse border border-input bg-foreground/5"
        />
      ))}
    </div>
  );
};

export const BlogRoomList = async function BlogRoomList() {
  const response = await actionSafeExecute(
    payload.find({
      collection: "blogs-rooms",
      page: 1,
      limit: 10,
      depth: 2,
    }),
    messages.actions.blogRoom.serverErrorGet,
  );

  if (!response.data || response.error || response.data.docs.length === 0)
    return (
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-center pt-10 text-center">
        <div className="relative mb-6 flex w-max items-end lg:mb-8">
          <BookAlertIcon className="relative h-12 w-12 stroke-[1] lg:h-20 lg:w-20" />
        </div>
        <SubSectionHeading small className="mb-4 lg:mb-6">
          The Riwaq Is Not Yet Available
        </SubSectionHeading>
        <Paragraph small className="mb-6 lg:mb-12">
          At this time, there are no rooms published for you to join in The
          Riwaq. We invite you to explore other areas or return soon, as new
          rooms and conversations are regularly introduced. Thank you for your
          interest and curiosity.
        </Paragraph>
        <Button variant="default" asChild>
          <Link href="/">
            <ArrowUpRightIcon />
            Return to Home
          </Link>
        </Button>
      </div>
    );

  return (
    <div className="space-y-10">
      <section className={cn("grid grid-cols-1 gap-10")}>
        {response.data.docs.map((room) => (
          <BlogRoomListItem key={room.id} room={room} />
        ))}
      </section>
    </div>
  );
};
