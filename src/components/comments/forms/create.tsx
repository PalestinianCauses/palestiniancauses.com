"use client";

// REVIEWED - 10

import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { SafeHydrate } from "@/components/globals/safe-hydrate";
import { Paragraph } from "@/components/globals/typography";
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
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useComment } from "@/hooks/use-comment";
import { useUser } from "@/hooks/use-user";
import { messages } from "@/lib/messages";
import {
  createCommentSchema,
  CreateCommentSchema,
} from "@/lib/schemas/comment";
import { Comment } from "@/payload-types";

const CreateCommentFormLoading = function CreateCommentFormLoading() {
  return (
    <div className="relative flex flex-col gap-5">
      <div className="flex flex-col items-start gap-5 md:flex-row">
        <Skeleton className="h-11 w-11 ring-1 ring-input md:h-12 md:w-12" />
        <div className="w-full flex-1">
          <Skeleton className="h-[9rem] w-full" />
        </div>
      </div>
      <Skeleton className="h-10 w-full self-end md:w-24" />
    </div>
  );
};

export const CreateCommentForm = function CreateCommentForm({
  on,
}: Pick<Comment, "on">) {
  const queryClient = useQueryClient();

  const { isLoading, data: user } = useUser();

  const { createComment } = useComment();

  const form = useForm<CreateCommentSchema>({
    mode: "onBlur",
    defaultValues: { content: "" },
    resolver: zodResolver(createCommentSchema),
  });

  const handleSubmit = function handleSubmit(data: CreateCommentSchema) {
    if (!user) return;

    toast.loading(messages.actions.comment.pendingCreate, {
      id: "create-comment",
    });

    createComment.mutate(
      {
        user,
        on,
        content: data.content,
        status: "approved",
      },
      {
        onSuccess: () => {
          form.reset();
          queryClient.invalidateQueries({ queryKey: ["comments"] });
        },
      },
    );
  };

  return (
    <SafeHydrate
      isLoading={isLoading}
      isLoadingComponent={<CreateCommentFormLoading />}>
      <Form {...form}>
        <form
          {...(user ? { onSubmit: form.handleSubmit(handleSubmit) } : {})}
          className="relative flex flex-col gap-5">
          {!user ? (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/70 ring-1 ring-background/70">
              <Paragraph small className="max-w-xl text-center text-foreground">
                Join this conversation -{" "}
                <Button
                  variant="link"
                  className="p-0 underline decoration-1 underline-offset-4"
                  style={{ fontSize: "inherit" }}
                  asChild>
                  <Link href="/signin">sign in</Link>
                </Button>{" "}
                to share your thoughts and show your support.
              </Paragraph>
            </div>
          ) : null}
          <div className="flex flex-col items-start gap-5 md:flex-row">
            <Avatar className="h-11 w-11 ring-1 ring-input md:h-12 md:w-12">
              <AvatarFallback className="bg-muted/50 text-xl">
                {user && user.firstName
                  ? user.firstName.charAt(0).toUpperCase()
                  : "A"}
              </AvatarFallback>
            </Avatar>
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem className="w-full flex-1 space-y-0">
                  <FormLabel className="sr-only">Comment Content</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      data-testid="comment-content-input"
                      rows={6}
                      disabled={createComment.isPending}
                      className="!mb-2 resize-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            data-testid="comment-submit-button"
            className="w-full self-end text-center md:w-max"
            {...(user
              ? { type: "submit", disabled: createComment.isPending }
              : { type: "button", disabled: true })}>
            {createComment.isPending ? "Posting..." : "Comment"}
          </Button>
        </form>
      </Form>
    </SafeHydrate>
  );
};
