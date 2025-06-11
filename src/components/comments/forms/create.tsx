"use client";

// REVIEWED - 01

import Link from "next/link";
import { useForm } from "react-hook-form";

import { Paragraph } from "@/components/globals/typography";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

export const CreateCommentForm = function CreateCommentForm() {
  const form = useForm();

  return (
    <div>
      <Form {...form}>
        <form className="relative flex flex-col gap-5">
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/70 ring-1 ring-background/70">
            <Paragraph small className="max-w-xl text-center text-foreground">
              Join the conversation -{" "}
              <Button
                variant="link"
                className="p-0 underline underline-offset-4"
                style={{ fontSize: "inherit" }}
                asChild>
                <Link href="/signin">sign in</Link>
              </Button>{" "}
              to share your thoughts and show your support.
            </Paragraph>
          </div>
          <div className="flex items-start gap-5">
            <Avatar className="h-12 w-12 ring-1 ring-primary/20">
              <AvatarFallback className="bg-muted/40">A</AvatarFallback>
            </Avatar>
            <Textarea rows={6} className="resize-none" />
          </div>
          <Button className="justify-end self-end">Comment</Button>
        </form>
      </Form>
    </div>
  );
};
