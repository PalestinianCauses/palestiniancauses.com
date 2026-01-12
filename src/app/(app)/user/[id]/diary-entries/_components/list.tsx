// REVIEWED - 03

import { ArrowUpRightIcon, PencilOffIcon } from "lucide-react";
import Link from "next/link";

import { RedirectProvider } from "@/app/(app)/providers";
import { DiaryEntryListItem } from "@/components/diary-entry/list";
import { Paragraph, SubSectionHeading } from "@/components/globals/typography";
import { Button } from "@/components/ui/button";
import { messages } from "@/lib/messages";
import { actionSafeExecute } from "@/lib/network";
import { payload } from "@/lib/payload";
import { HumansButFromGazaPageLink } from "@/lib/utils/strings";
import { cn } from "@/lib/utils/styles";
import { User } from "@/payload-types";

export const PublicProfileDiaryEntriesList =
  async function PublicProfileDiaryEntriesList({ user }: { user: User }) {
    const response = await actionSafeExecute(
      payload.find({
        collection: "diary-entries",
        where: { author: { equals: user.id }, status: { equals: "approved" } },
      }),
      messages.actions.diaryEntry.serverErrorGet,
    );

    if (!response.data || response.error)
      return <RedirectProvider path={`/user/${user.id}`} />;

    return (
      <div className="space-y-10">
        <section className={cn("grid grid-cols-1 gap-10", {})}>
          {response.data.docs.length !== 0 ? (
            response.data.docs.map((diaryEntry) => (
              <DiaryEntryListItem key={diaryEntry.id} diaryEntry={diaryEntry} />
            ))
          ) : (
            <div className="mx-auto flex max-w-4xl flex-col items-center justify-center pt-10 text-center">
              <div className="relative mb-6 flex w-max items-end lg:mb-8">
                <PencilOffIcon className="relative h-12 w-12 stroke-[1] lg:h-20 lg:w-20" />
              </div>
              <SubSectionHeading small className="mb-4 lg:mb-6">
                This user has not published any diary entries yet
              </SubSectionHeading>
              <Paragraph small className="mb-6 lg:mb-12">
                There are currently no diary entries available for this user.
                Explore other profiles or check back soon for new stories and
                authentic perspectives.
              </Paragraph>
              <Button variant="default" asChild>
                <Link href={HumansButFromGazaPageLink}>
                  <ArrowUpRightIcon />
                  Read more diary entries
                </Link>
              </Button>
            </div>
          )}
        </section>
      </div>
    );
  };
