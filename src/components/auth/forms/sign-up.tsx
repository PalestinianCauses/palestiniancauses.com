"use client";

// REVIEWED - 04

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
import { messages } from "@/lib/errors";
import { motions } from "@/lib/motion";
import { signUpSchema, SignUpSchema } from "@/lib/schemas/auth";

export const SignUpForm = function SignUpForm() {
  const { signUp } = useUser();

  const form = useForm<SignUpSchema>({
    mode: "onBlur",
    defaultValues: { firstName: "", lastName: "", email: "", password: "" },
    resolver: zodResolver(signUpSchema),
  });

  const handleSubmit = async function handleSubmit(data: SignUpSchema) {
    toast.info(messages.actions.auth.signUp.pending);
    signUp.mutate({
      ...data,
      email: data.email.trim().toLowerCase(),
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col items-stretch justify-center">
        <div className="mb-4 grid w-full grid-cols-2 items-start gap-4">
          <MotionDiv
            initial={motions.fadeIn.initial}
            animate={motions.fadeIn.whileInView}
            transition={motions.transition({ duration: "fast", delay: 0.3 })}>
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={signUp.isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </MotionDiv>
          <MotionDiv
            initial={motions.fadeIn.initial}
            animate={motions.fadeIn.whileInView}
            transition={motions.transition({ duration: "fast", delay: 0.4 })}>
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={signUp.isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </MotionDiv>
        </div>
        <MotionDiv
          initial={motions.fadeIn.initial}
          animate={motions.fadeIn.whileInView}
          transition={motions.transition({ duration: "fast", delay: 0.5 })}
          className="mb-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} disabled={signUp.isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </MotionDiv>
        <MotionDiv
          initial={motions.fadeIn.initial}
          animate={motions.fadeIn.whileInView}
          transition={motions.transition({ duration: "fast", delay: 0.6 })}
          className="mb-6">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    disabled={signUp.isPending}
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
          transition={motions.transition({ duration: "fast", delay: 0.7 })}
          className="flex flex-col items-stretch justify-center">
          <Button type="submit" disabled={signUp.isPending} className="mb-6">
            Sign up
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            A family member already?{" "}
            <Button variant="link" className="h-auto p-0" asChild>
              <Label>
                <Link href="/signin">Sign in</Link>
              </Label>
            </Button>
            .
          </p>
        </MotionDiv>
      </form>
    </Form>
  );
};
