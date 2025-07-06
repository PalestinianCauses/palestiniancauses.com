// REVIEWED - 03

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  createComment,
  deleteComment,
  deleteCommentReplies,
  voteOnComment,
} from "@/actions/comments";
import { messages } from "@/lib/messages";
import { Comment } from "@/payload-types";

export const useComment = function useComment() {
  const createCommentMutation = useMutation({
    mutationFn: async (
      data: Omit<Comment, "id" | "createdAt" | "updatedAt">,
    ) => {
      const response = await createComment(data);
      return response;
    },
    onSuccess: (response) => {
      if (!response.data || response.error) {
        toast.error(response.error);
        return;
      }

      toast.success(response.data);
    },
    onSettled: () => {
      toast.dismiss("create-comment");
    },
  });

  const deleteCommentMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await deleteComment(id);
      return { id, ...response };
    },
    onSuccess: async (response) => {
      if (!response.data || response.error) {
        toast.error(response.error);
        return;
      }

      toast.success(response.data);

      const deleteRepliesResponse = await deleteCommentReplies(response.id);

      if (deleteRepliesResponse.data || deleteRepliesResponse.error)
        toast.error(deleteRepliesResponse.error);
    },
  });

  const voteOnCommentMutation = useMutation({
    mutationFn: async ({ id, vote }: { id: number; vote: "up" | "down" }) => {
      const response = await voteOnComment({ id, vote });
      return response;
    },
    onSuccess: (response) => {
      if (!response.data || response.error) {
        toast.error(response.error);
        return;
      }

      toast.success(messages.actions.comment.votes.success);
    },
  });

  return {
    createComment: createCommentMutation,
    voteOnComment: voteOnCommentMutation,
    deleteComment: deleteCommentMutation,
  };
};
