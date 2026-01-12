// REVIEWED - 11

import {
  InfiniteData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

import {
  createComment,
  deleteComment,
  voteOnComment,
} from "@/actions/comments";
import {
  countPublicCollection,
  PublicCollectionResponse,
} from "@/lib/api/public";
import { Comment, User } from "@/payload-types";

type InfiniteDataComments = InfiniteData<PublicCollectionResponse<"comments">>;

// IDs > 1 trillion are optimistic (generated with Date.now())
const isOptimisticId = (id: number) => id > 1_000_000_000_000_000;

export const useCommentRepliesCount = function useCommentRepliesCount(
  id: number,
) {
  return useQuery({
    queryKey: ["comment-replies-count", id],
    queryFn: async () => {
      const response = await countPublicCollection({
        collection: "comments",
        where: { parent: { equals: id } },
      });

      return response.data || 0;
    },
    // Skip query for optimistic comments (they have no replies yet)
    enabled: Boolean(id) && !isOptimisticId(id),
    // Return 0 for optimistic comments
    placeholderData: isOptimisticId(id) ? 0 : undefined,
  });
};

export const useComment = function useComment(user: User | undefined | null) {
  const queryClient = useQueryClient();

  const createCommentMutation = useMutation({
    mutationKey: ["create-comment"],
    mutationFn: async (
      data: Omit<Comment, "id" | "createdAt" | "updatedAt">,
    ) => {
      const response = await createComment(data);
      return response;
    },
    onMutate: async (newComment) => {
      if (!user) return { previousQueries: [], optimisticComment: null };

      // Skip optimistic update for replies - they're handled in ReplyCommentForm
      if (newComment.parent)
        return { previousQueries: [], optimisticComment: null };

      await queryClient.cancelQueries({ queryKey: ["comments"] });

      const optimisticComment: Comment = {
        id: 1_000_000_000_000_000 + Date.now(),
        ...newComment,
        // Use full user object for optimistic rendering (newComment.user is just ID)
        user,
        status: "approved",
        votes: [],
        votesScore: 0,
        updatedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      };

      const previousQueries = queryClient.getQueriesData<InfiniteDataComments>({
        queryKey: ["comments"],
      });

      queryClient.setQueriesData<InfiniteDataComments>(
        { queryKey: ["comments"] },
        (old) => {
          // if no data exists yet, create initial structure
          if (!old?.pages)
            return {
              pages: [
                {
                  docs: [optimisticComment],
                  hasPrevPage: false,
                  hasNextPage: false,
                  limit: 5,
                  pagingCounter: 1,
                  totalDocs: 1,
                  totalPage: 1,
                  totalPages: 1,
                },
              ],
              pageParams: [1],
            };

          return {
            ...old,
            pages: old.pages.map((page, index) => {
              // if first page is null (no comments), create it with our comment
              if (index === 0 && !page?.docs)
                return {
                  docs: [optimisticComment],
                  hasPrevPage: false,
                  hasNextPage: false,
                  limit: 5,
                  pagingCounter: 1,
                  totalDocs: 1,
                  totalPage: 1,
                  totalPages: 1,
                };

              if (!page?.docs) return page;
              if (index === 0)
                return { ...page, docs: [optimisticComment, ...page.docs] };

              return page;
            }),
          };
        },
      );

      return { previousQueries, optimisticComment };
    },
    onSuccess: (response) => {
      if (!response.data || response.error) {
        toast.error(response.error);
        return;
      }
      toast.success(response.data);
    },
    onError: (_error, _, context) => {
      if (context?.previousQueries)
        context.previousQueries.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
    },
    onSettled: () => {
      toast.dismiss("create-comment");
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });

  const deleteCommentMutation = useMutation({
    mutationKey: ["delete-comment"],
    mutationFn: async ({ id, parentId }: { id: number; parentId?: number }) => {
      // Replies are cascade deleted via Payload collection hook
      const response = await deleteComment(id);
      return { id, parentId, ...response };
    },
    onMutate: async ({ id, parentId }) => {
      await queryClient.cancelQueries({ queryKey: ["comments"] });
      await queryClient.cancelQueries({ queryKey: ["comment-replies"] });
      await queryClient.cancelQueries({ queryKey: ["comment-replies-count"] });

      const previousComments = queryClient.getQueriesData<InfiniteDataComments>(
        { queryKey: ["comments"] },
      );

      const previousReplies = queryClient.getQueriesData<InfiniteDataComments>({
        queryKey: ["comment-replies"],
      });

      const previousRepliesCount = parentId
        ? queryClient.getQueryData<number>(["comment-replies-count", parentId])
        : undefined;

      queryClient.setQueriesData<InfiniteDataComments>(
        { queryKey: ["comments"] },
        (old) => {
          if (!old?.pages) return old;

          return {
            ...old,
            pages: old.pages.map((page) => {
              if (!page?.docs) return page;
              return {
                ...page,
                docs: page.docs.filter((c) => c.id !== id),
              };
            }),
          };
        },
      );

      queryClient.setQueriesData<InfiniteDataComments>(
        { queryKey: ["comment-replies"] },
        (old) => {
          if (!old?.pages) return old;

          return {
            ...old,
            pages: old.pages.map((page) => {
              if (!page?.docs) return page;

              return {
                ...page,
                docs: page.docs.filter((c) => c.id !== id),
              };
            }),
          };
        },
      );

      // Optimistically update replies count when deleting a reply
      if (parentId && previousRepliesCount !== undefined) {
        queryClient.setQueryData<number>(
          ["comment-replies-count", parentId],
          Math.max(0, previousRepliesCount - 1),
        );
      }

      return {
        previousComments,
        previousReplies,
        previousRepliesCount,
        parentId,
      };
    },
    onSuccess: (response) => {
      if (!response.data || response.error) {
        toast.error(response.error);
        return;
      }

      toast.success(response.data);
    },
    onError: (_error, _, context) => {
      if (context?.previousComments)
        context.previousComments.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });

      if (context?.previousReplies)
        context.previousReplies.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });

      // Restore replies count on error
      if (context?.parentId && context?.previousRepliesCount !== undefined)
        queryClient.setQueryData(
          ["comment-replies-count", context.parentId],
          context.previousRepliesCount,
        );
    },
    onSettled: (response) => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
      queryClient.invalidateQueries({ queryKey: ["comment-replies"] });

      // Only invalidate specific parent's replies count
      if (response?.parentId)
        queryClient.invalidateQueries({
          queryKey: ["comment-replies-count", response.parentId],
        });
    },
  });

  const voteOnCommentMutation = useMutation({
    mutationKey: ["vote-on-comment"],
    mutationFn: async ({ id, vote }: { id: number; vote: "up" | "down" }) => {
      const response = await voteOnComment({ id, vote });
      return response;
    },
    onMutate: async ({ id, vote }) => {
      await queryClient.cancelQueries({ queryKey: ["comment-replies"] });
      await queryClient.cancelQueries({ queryKey: ["comments"] });

      const previousComments = queryClient.getQueriesData<InfiniteDataComments>(
        { queryKey: ["comments"] },
      );

      const previousReplies = queryClient.getQueriesData<InfiniteDataComments>({
        queryKey: ["comment-replies"],
      });

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
        } else {
          votesUpdated.push({ user: user!, vote });
          votesScoreUpdated += vote === "up" ? 1 : -1;
        }

        return {
          ...comment,
          votes: votesUpdated,
          votesScore: votesScoreUpdated,
        };
      };

      queryClient.setQueriesData<InfiniteDataComments>(
        { queryKey: ["comment-replies"] },
        (previous) => {
          if (!previous?.pages) return previous;

          return {
            ...previous,
            pages: previous.pages.map((page) => {
              if (!page?.docs) return page;

              return {
                ...page,
                docs: page.docs.map(updateVotesOptimistically),
              };
            }),
          };
        },
      );

      queryClient.setQueriesData<InfiniteDataComments>(
        { queryKey: ["comments"] },
        (previous) => {
          if (!previous?.pages) return previous;

          return {
            ...previous,
            pages: previous.pages.map((page) => {
              if (!page?.docs) return page;
              return {
                ...page,
                docs: page.docs.map(updateVotesOptimistically),
              };
            }),
          };
        },
      );

      return { previousComments, previousReplies };
    },
    onError: (_error, _, context) => {
      if (context?.previousReplies)
        context.previousReplies.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });

      if (context?.previousComments)
        context.previousComments.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["comment-replies"] });
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });

  return {
    createComment: createCommentMutation,
    voteOnComment: voteOnCommentMutation,
    deleteComment: deleteCommentMutation,
  };
};
