// REVIEWED - 05

import { ArrowUpRightIcon, MessagesSquareIcon } from "lucide-react";
import Link from "next/link";

import { RedirectProvider } from "@/app/(app)/providers";
import { CommentItem } from "@/components/comments/item";
import { Paragraph, SubSectionHeading } from "@/components/globals/typography";
import { Button } from "@/components/ui/button";
import { messages } from "@/lib/messages";
import { actionSafeExecute } from "@/lib/network";
import { payload } from "@/lib/payload";
import { isObject } from "@/lib/types/guards";
import { cn } from "@/lib/utils/styles";
import { User } from "@/payload-types";

export const PublicProfileCommentsList =
  async function PublicProfileCommentsList({ user }: { user: User }) {
    const response = await actionSafeExecute(
      payload.find({
        collection: "comments",
        where: { user: { equals: user.id }, status: { equals: "approved" } },
      }),
      messages.actions.comment.serverErrorGet,
    );

    if (!response.data || response.error)
      return <RedirectProvider path={`/user/${user.id}`} />;

    return (
      <div className="space-y-10">
        <section className={cn("flex w-full flex-col gap-5", {})}>
          {response.data.docs.length !== 0 ? (
            response.data.docs.map((comment) => (
              <div key={comment.id} className="border border-input/50 p-5">
                {isObject(comment.on.value) ? (
                  <Button
                    variant="link"
                    className="mb-5 p-0 text-muted-foreground hover:text-foreground"
                    asChild>
                    <Link
                      href={`/${comment.on.relationTo === "diary-entries" ? "humans-but-from-gaza" : "blog"}/${comment.on.value.id}`}>
                      <ArrowUpRightIcon />
                      Commented on{" "}
                      <span className="text-foreground">
                        {comment.on.value.title.slice(0, 24)}
                        {comment.on.value.title.length > 24 ? "..." : ""}
                      </span>
                    </Link>
                  </Button>
                ) : null}

                <CommentItem
                  page="public-profile"
                  depth={0}
                  comment={comment}
                />
              </div>
            ))
          ) : (
            <div className="mx-auto flex max-w-4xl flex-col items-center justify-center pt-10 text-center">
              <div className="relative mb-6 flex w-max items-end lg:mb-8">
                <MessagesSquareIcon className="relative h-12 w-12 stroke-[1] lg:h-20 lg:w-20" />
              </div>
              <SubSectionHeading small className="mb-4 lg:mb-6">
                This user has not published any comments yet
              </SubSectionHeading>
              <Paragraph small className="mb-6 lg:mb-12">
                There are currently no comments available for this user. Explore
                other profiles or check back soon for more discussions and
                perspectives.
              </Paragraph>
            </div>
          )}
        </section>
      </div>
    );
  };
