// REVIEWED - 05

import { Skeleton } from "../ui/skeleton";

export const DiaryEntryBadgesLoading = function DiaryEntryBadgesLoading() {
  return (
    <div className="relative flex flex-wrap items-center gap-3 before:absolute before:-left-5 before:top-0 before:h-full before:w-px before:bg-foreground lg:gap-5">
      <Skeleton className="h-5 w-full max-w-24 md:max-w-32 xl:max-w-40" />
      <Skeleton className="h-5 w-full max-w-24 md:max-w-32 xl:max-w-40" />
    </div>
  );
};
