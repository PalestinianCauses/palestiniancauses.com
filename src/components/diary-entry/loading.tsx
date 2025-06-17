// REVIEWED

import { motions } from "@/lib/motion";

import { MotionDiv } from "../globals/motion";
import { Skeleton } from "../ui/skeleton";

export const DiaryEntryListLoading = function DiaryEntryListLoading() {
  return [1, 2, 3].map((id) => (
    <MotionDiv
      viewport={{ once: true }}
      initial={motions.fadeIn.initial}
      whileInView={motions.fadeIn.whileInView}
      transition={motions.transition({})}
      key={id}
      className="flex flex-col">
      <div className="mb-4 flex items-center gap-2.5 md:gap-5">
        <Skeleton className="h-5 w-full max-w-24 md:max-w-32 xl:max-w-40" />
        <Skeleton className="h-5 w-full max-w-24 md:max-w-32 xl:max-w-40" />
      </div>
      <Skeleton className="mb-6 h-8 w-full max-w-sm md:max-w-md xl:max-w-lg" />
      <div className="mb-8 flex flex-col items-start gap-3">
        <Skeleton className="h-3 w-full max-w-2xl md:max-w-3xl xl:max-w-4xl" />
        <Skeleton className="h-3 w-full max-w-xl md:max-w-2xl xl:max-w-3xl" />
        <Skeleton className="h-3 w-full max-w-3xl md:max-w-4xl xl:max-w-5xl" />
        <Skeleton className="h-3 w-full max-w-lg md:max-w-xl xl:max-w-2xl" />
      </div>
      <Skeleton className="h-8 w-28" />
    </MotionDiv>
  ));
};
