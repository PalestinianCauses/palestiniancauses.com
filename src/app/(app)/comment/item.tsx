"use client";

// REVIEWED - 03

import { CommentItem, CommentItemProps } from "@/components/comments/item";
import { Loading } from "@/components/globals/loading";
import { SafeHydrate } from "@/components/globals/safe-hydrate";
import { useHashScroll } from "@/hooks/use-hash-scroll";

export const PageCommentItem = function PageCommentItem({
  comment,
}: Pick<CommentItemProps, "comment">) {
  const { elementId, jumpToPlusHighlight } = useHashScroll();

  return (
    <SafeHydrate isLoadingComponent={<Loading className="min-h-80" />}>
      <CommentItem
        page="comment"
        depth={0}
        comment={comment}
        elementId={elementId}
        jumpToPlusHighlight={jumpToPlusHighlight}
      />
    </SafeHydrate>
  );
};
