"use client";

// REVIEWED - 07

import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
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
import { messages } from "@/lib/messages";
import {
  createCommentSchema,
  CreateCommentSchema,
} from "@/lib/schemas/comment";
import { Comment, User } from "@/payload-types";

export const ReplyCommentForm = function ReplyCommentForm({
  user,
  on,
  parent,
  onSuccess,
}: {
  user: User;
  onSuccess: () => void;
} & Pick<Comment, "on" | "parent">) {
  const queryClient = useQueryClient();

  const { createComment } = useComment();

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

    createComment.mutate(
      {
        user,
        on,
        parent,
        content: data.content,
        status: "approved",
      },
      {
        onSettled: (response) => {
          if (!response || !response.data || response.error) return;

          form.reset();

          try {
            const parentId = typeof parent === "object" ? parent.id : parent;
            queryClient.invalidateQueries({
              queryKey: ["comment-replies", parentId],
            });

            queryClient.invalidateQueries({
              queryKey: ["comment-replies-count", parentId],
            });
          } catch (error) {
            console.error(
              "Error in `createComment.mutate.onSettled` in `ReplyCommentForm` while trying to in-validate queries after reply:",
              error,
            );
          }

          onSuccess();
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
