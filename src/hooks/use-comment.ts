// REVIEWED

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { createComment } from "@/actions/comments";
import { Comment } from "@/payload-types";

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
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
    onSettled: () => {
      toast.dismiss("create-comment");
    },
  });

  return { createComment: createCommentMutation };
};
