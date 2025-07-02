"use client";

// REVIEWED

import { CommentItem, CommentItemProps } from "@/components/comments/item";
import { useHashScroll } from "@/hooks/use-hash-scroll";

export const PageCommentItem = function PageCommentItem({
  comment,
}: Pick<CommentItemProps, "comment">) {
  const { elementId, jumpToPlusHighlight } = useHashScroll();

  return (
    <CommentItem
      isPageComment
      depth={0}
      comment={comment}
      elementId={elementId}
      jumpToPlusHighlight={jumpToPlusHighlight}
    />
  );
};
