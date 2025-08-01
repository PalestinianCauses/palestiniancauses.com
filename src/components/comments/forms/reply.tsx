"use client";

// REVIEWED - 05

import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
      <Avatar className="h-8 w-8 ring-1 ring-input md:h-9 md:w-9">
        <AvatarFallback className="bg-muted/50">
          {user.firstName ? user.firstName.charAt(0).toUpperCase() : "A"}
        </AvatarFallback>
      </Avatar>
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
            disabled={createComment.isPending}
            className="w-full self-end text-center md:w-max">
            {createComment.isPending ? "Replying..." : "Reply"}
          </Button>
        </form>
      </Form>
    </div>
  );
};
