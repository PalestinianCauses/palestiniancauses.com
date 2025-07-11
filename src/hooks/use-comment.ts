// REVIEWED - 06

import {
  InfiniteData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

import { ResponseDataCollection } from "@/actions/collection";
import {
  createComment,
  deleteComment,
  deleteCommentReplies,
  getCommentRepliesCount,
  voteOnComment,
} from "@/actions/comments";
import { Comment } from "@/payload-types";

import { useUser } from "./use-user";

type InfiniteDataComments = InfiniteData<ResponseDataCollection<"comments">>;

export const useCommentRepliesCount = function useCommentRepliesCount(
  id: number,
) {
  return useQuery({
    queryKey: ["comment-replies-count", id],
    queryFn: async () => {
      const response = await getCommentRepliesCount(id);
      return response;
    },
    enabled: Boolean(id),
  });
};

export const useComment = function useComment() {
  const queryClient = useQueryClient();
  const { user } = useUser();

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
    },
  });

  const deleteCommentRepliesMutation = useMutation({
    mutationFn: async (ids: number[]) => {
      const response = await deleteCommentReplies(ids);
      return response;
    },
  });

  const voteOnCommentMutation = useMutation({
    mutationFn: async ({ id, vote }: { id: number; vote: "up" | "down" }) =>
      voteOnComment({ id, vote }),
    onMutate: async ({ id, vote }) => {
      await queryClient.cancelQueries({ queryKey: ["comment-replies", id] });

      const previousCommentReplies =
        queryClient.getQueryData<InfiniteDataComments>(["comment-replies", id]);

      const updateVotesOptimistically = (comment: Comment) => {
        if (comment.id !== id) return comment;

        const votes = comment.votes || [];
        const userVoteCurrent = votes.find(
          (v) => (typeof v.user === "object" ? v.user.id : v.user) === user?.id,
        );

        let votesUpdated = [...votes];
        let votesScoreUpdated = comment.votesScore || 0;

        if (userVoteCurrent) {
          votesUpdated = votes.filter((v) => v.id !== userVoteCurrent.id);
          votesScoreUpdated -= userVoteCurrent.vote === "up" ? 1 : -1;

          if (userVoteCurrent.vote !== vote) {
            votesUpdated.push({ user: user!, vote });
            votesScoreUpdated += vote === "up" ? 1 : -1;
          }
        } else votesScoreUpdated += vote === "up" ? 1 : -1;

        return {
          ...comment,
          votes: votesUpdated,
          votesScore: votesScoreUpdated,
        };
      };

      queryClient.setQueryData<InfiniteDataComments>(
        ["comment-replies", id],
        (previous) =>
          previous && {
            ...previous,
            pages: previous.pages.map((page) => ({
              ...page,
              docs: page.docs.map(updateVotesOptimistically),
            })),
          },
      );

      queryClient.setQueriesData<InfiniteDataComments>(
        { queryKey: ["comments"] },
        (previous) =>
          previous && {
            ...previous,
            pages: previous.pages.map((page) => ({
              ...page,
              docs: page.docs.map(updateVotesOptimistically),
            })),
          },
      );

      return { previousCommentReplies };
    },
    onSettled: (response, _, { id }, context) => {
      if (response && (!response.data || response.error)) {
        toast.error(response.error);

        if (context)
          queryClient.setQueryData<InfiniteDataComments>(
            ["comment-replies", id],
            context.previousCommentReplies,
          );
      }

      queryClient.invalidateQueries({ queryKey: ["comment-replies", id] });
    },
  });

  return {
    createComment: createCommentMutation,
    voteOnComment: voteOnCommentMutation,
    deleteComment: deleteCommentMutation,
    deleteCommentReplies: deleteCommentRepliesMutation,
  };
};
