"use client";

// REVIEWED - 04

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Loading } from "@/components/globals/loading";
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
import { Textarea } from "@/components/ui/textarea";
import { useComment } from "@/hooks/use-comment";
import { useUser } from "@/hooks/use-user";
import { messages } from "@/lib/messages";
import {
  createCommentSchema,
  CreateCommentSchema,
} from "@/lib/schemas/comment";
import { Comment } from "@/payload-types";

export const CreateCommentForm = function CreateCommentForm({
  on,
}: Pick<Comment, "on">) {
  const { isPending, data: user } = useUser();

  const { createComment } = useComment();
  const form = useForm<CreateCommentSchema>({
    mode: "onBlur",
    defaultValues: { content: "" },
    resolver: zodResolver(createCommentSchema),
  });

  const handleSubmit = function handleSubmit(data: CreateCommentSchema) {
    if (isPending || !user) return;

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
        },
      },
    );
  };

  if (isPending)
    return <Loading className="-mb-12 min-h-80 lg:-mb-24 xl:-mb-32" />;

  return (
    <div>
      <Form {...form}>
        <form
          {...(user ? { onSubmit: form.handleSubmit(handleSubmit) } : {})}
          className="relative flex flex-col gap-5">
          {!user ? (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/70 ring-1 ring-background/70">
              <Paragraph
                isMotion={false}
                small
                className="max-w-xl text-center text-foreground">
                Join the conversation -{" "}
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
          <div className="flex items-start gap-5">
            <Avatar className="h-12 w-12 ring-1 ring-primary/20">
              <AvatarFallback className="bg-muted/40 text-xl">
                {user && user.firstName
                  ? user.firstName.charAt(0).toUpperCase()
                  : "A"}
              </AvatarFallback>
            </Avatar>
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem className="flex-1 space-y-0">
                  <FormLabel className="sr-only">Comment Content</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      rows={6}
                      className="!mb-2 resize-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            className="justify-end self-end"
            {...(user
              ? { type: "submit", disabled: createComment.isPending }
              : { type: "button", disabled: true })}>
            {createComment.isPending ? "Posting..." : "Comment"}
          </Button>
        </form>
      </Form>
    </div>
  );
};
