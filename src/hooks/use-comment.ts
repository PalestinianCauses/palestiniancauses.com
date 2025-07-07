// REVIEWED - 04

import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

import { ResponseDataCollection } from "@/actions/collection";
import {
  createComment,
  deleteComment,
  deleteCommentReplies,
  voteOnComment,
} from "@/actions/comments";
import { Comment } from "@/payload-types";

type InfiniteDataComments = InfiniteData<ResponseDataCollection<"comments">>;

export const useComment = function useComment() {
  const queryClient = useQueryClient();

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
    mutationFn: async ({ id, vote }: { id: number; vote: "up" | "down" }) =>
      voteOnComment({ id, vote }),
    onMutate: async ({ id, vote }) => {
      await queryClient.cancelQueries({ queryKey: ["comment-replies", id] });

      const previousComment = queryClient.getQueryData<InfiniteDataComments>([
        "comment-replies",
        id,
      ]);

      queryClient.setQueryData<InfiniteDataComments>(
        ["comment-replies", id],
        (previous) =>
          previous && {
            ...previous,
            pages: previous.pages.map((page) => ({
              ...page,
              docs: page.docs.map((doc) =>
                doc.id === id
                  ? {
                      ...doc,
                      votesScore:
                        (doc.votesScore || 0) + (vote === "up" ? 1 : -1),
                    }
                  : doc,
              ),
            })),
          },
      );

      return { previousComment };
    },
    onSettled: (response, _, { id }, context) => {
      if (response)
        if (!response.data || response.error) {
          toast.error(response.error);

          if (context)
            queryClient.setQueryData<InfiniteDataComments>(
              ["comment-replies", id],
              context.previousComment,
            );
        }

      queryClient.invalidateQueries({ queryKey: ["comment-replies", id] });
    },
  });

  return {
    createComment: createCommentMutation,
    voteOnComment: voteOnCommentMutation,
    deleteComment: deleteCommentMutation,
  };
};
