"use client";

// REVIEWED - 09

import { zodResolver } from "@hookform/resolvers/zod";
import { InfiniteData, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { UserAvatar } from "@/components/globals/user-avatar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useComment } from "@/hooks/use-comment";
import { PublicCollectionResponse } from "@/lib/api/public";
import { messages } from "@/lib/messages";
import {
  createCommentSchema,
  CreateCommentSchema,
} from "@/lib/schemas/comment";
import { Comment, User } from "@/payload-types";

type InfiniteDataComments = InfiniteData<PublicCollectionResponse<"comments">>;

export const ReplyCommentForm = function ReplyCommentForm({
  user,
  on,
  parent,
  setIsRepliesOpen,
  onSuccess,
}: {
  user: User;
  // eslint-disable-next-line no-unused-vars
  setIsRepliesOpen?: (boolean: boolean) => void;
  onSuccess: () => void;
} & Pick<Comment, "on" | "parent">) {
  const queryClient = useQueryClient();

  const { createComment } = useComment(user);

  const form = useForm<CreateCommentSchema>({
    mode: "onBlur",
    defaultValues: { content: "" },
    resolver: zodResolver(createCommentSchema),
  });

  if (!parent) return null;

  const handleSubmit = function handleSubmit(data: CreateCommentSchema) {
    toast.loading(messages.actions.comment.pendingCreate, {
      id: "create-comment",
    });

    const parentId = typeof parent === "object" ? parent.id : parent;
    const queryKey = ["comment-replies", parentId];

    const optimisticReply: Comment = {
      id: 1_000_000_000_000_000 + Date.now(),
      on,
      parent,
      user,
      content: data.content,
      status: "approved",
      votes: [],
      votesScore: 0,
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };

    queryClient.setQueryData<InfiniteDataComments>(queryKey, (old) => {
      if (!old?.pages)
        return {
          pages: [
            {
              docs: [optimisticReply],
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
          if (!page?.docs) return page;
          if (index === old.pages.length - 1)
            return {
              ...page,
              docs: [...page.docs, optimisticReply],
            };

          return page;
        }),
      };
    });

    queryClient.setQueryData<number>(
      ["comment-replies-count", parentId],
      (old) => (old ?? 0) + 1,
    );

    form.reset();
    setIsRepliesOpen?.(true);

    createComment.mutate(
      {
        user: user.id,
        on,
        parent,
        content: data.content,
        status: "approved",
      },
      {
        onSuccess: () => {
          onSuccess();
        },
        onError: () => {
          form.setValue("content", data.content);
        },
        onSettled: () => {
          queryClient.invalidateQueries({ queryKey });
          queryClient.invalidateQueries({
            queryKey: ["comment-replies-count", parentId],
          });
        },
      },
    );
  };

  return (
    <div className="flex w-full flex-col items-start gap-5 md:flex-row">
      <UserAvatar user={user} size="user-avatar" className="w-8" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="relative flex w-full flex-col gap-2.5">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="w-full flex-1 space-y-0">
                <FormLabel className="sr-only">Reply Content</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    data-testid="comment-reply-content-input"
                    disabled={createComment.isPending}
                    rows={4}
                    className="!mb-2 resize-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            data-testid="comment-reply-submit-button"
            disabled={createComment.isPending}
            className="w-full self-end text-center md:w-max">
            {createComment.isPending ? "Replying..." : "Reply"}
          </Button>
        </form>
      </Form>
    </div>
  );
};
