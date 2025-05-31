"use client";

// REVIEWED - 14

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { MotionDiv } from "@/components/globals/motion";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUser } from "@/hooks/use-user";
import { messages } from "@/lib/messages";
import { motions } from "@/lib/motion";
import { signInSchema, SignInSchema } from "@/lib/schemas/auth";

export const SignInForm = function SignInForm() {
  const { signIn } = useUser(false);

  const form = useForm<SignInSchema>({
    mode: "onBlur",
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(signInSchema),
  });

  const handleSubmit = function handleSubmit(data: SignInSchema) {
    toast.loading(messages.actions.auth.signIn.pending, {
      id: "sign-in",
    });

    signIn.mutate({
      email: data.email.trim().toLowerCase(),
      password: data.password,
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col items-stretch justify-center">
        <MotionDiv
          initial={motions.fadeIn.initial}
          animate={motions.fadeIn.whileInView}
          transition={motions.transition({ duration: "fast", delay: 0.3 })}
          className="mb-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={signIn.isPending}
                    autoComplete="email"
                    data-testid="email-input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </MotionDiv>
        <MotionDiv
          initial={motions.fadeIn.initial}
          animate={motions.fadeIn.whileInView}
          transition={motions.transition({ duration: "fast", delay: 0.4 })}
          className="mb-6">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex w-full items-center justify-between gap-3">
                  <FormLabel>Password</FormLabel>
                  <Button variant="link" className="h-auto p-0" asChild>
                    <Label>
                      <Link href="/password-forgot">Forgot password?</Link>
                    </Label>
                  </Button>
                </div>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    disabled={signIn.isPending}
                    autoComplete="current-password"
                    data-testid="password-input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </MotionDiv>
        <MotionDiv
          initial={motions.fadeIn.initial}
          animate={motions.fadeIn.whileInView}
          transition={motions.transition({ duration: "fast", delay: 0.5 })}
          className="flex w-full flex-col items-stretch justify-center">
          <Button
            type="submit"
            disabled={signIn.isPending}
            data-testid="signin-button"
            className="mb-6">
            Sign in
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            Not a family member yet?{" "}
            <Button variant="link" className="h-auto p-0" asChild>
              <Label>
                <Link href="/sign-up">Be one</Link>
              </Label>
            </Button>
            .
          </p>
        </MotionDiv>
      </form>
    </Form>
  );
};
