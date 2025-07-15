"use client";

// REVIEWED - 01

import { CommentItem, CommentItemProps } from "@/components/comments/item";
import { Loading } from "@/components/globals/loading";
import { SafeHydrate } from "@/components/globals/safe-hydrate";
import { useHashScroll } from "@/hooks/use-hash-scroll";
import { useUser } from "@/hooks/use-user";

export const PageCommentItem = function PageCommentItem({
  comment,
}: Pick<CommentItemProps, "comment">) {
  const { isLoading, data: user } = useUser();
  const { elementId, jumpToPlusHighlight } = useHashScroll();

  return (
    <SafeHydrate
      isLoading={isLoading}
      isLoadingComponent={<Loading className="min-h-80" />}>
      <CommentItem
        isPageComment
        depth={0}
        user={user}
        comment={comment}
        elementId={elementId}
        jumpToPlusHighlight={jumpToPlusHighlight}
      />
    </SafeHydrate>
  );
};
