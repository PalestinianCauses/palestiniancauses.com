"use client";

// REVIEWED - 04

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import { signIn, SignInResponse } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";
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
import { messages } from "@/lib/errors";
import { signInSchema, SignInSchema } from "@/lib/schemas/auth";

export const SignInForm = function SignInForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [response, setResponse] = useState<SignInResponse>({
    data: null,
    error: null,
  });

  const form = useForm<SignInSchema>({
    mode: "onBlur",
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(signInSchema),
  });

  const handleSubmit = function handleSubmit(data: SignInSchema) {
    startTransition(async () => {
      const signInResponse = await signIn(data);
      setResponse(signInResponse);
    });
  };

  useEffect(() => {
    if (!isPending && response.data?.token)
      setTimeout(() => {
        router.push("/");
      }, 250);
  }, [router, isPending, response.data]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col items-stretch justify-center">
        {isPending && (
          <Card className="mb-4 rounded-md border-yellow-500/50 bg-yellow-500/25">
            <CardHeader className="px-5 py-4">
              <CardDescription className="font-medium text-foreground">
                {messages.actions.auth.signIn.pending}
              </CardDescription>
            </CardHeader>
          </Card>
        )}
        {!isPending && response.data && (
          <Card className="mb-4 rounded-md border-tertiary-2/50 bg-tertiary-2/25">
            <CardHeader className="px-5 py-4">
              <CardDescription className="font-medium text-foreground">
                {messages.actions.auth.signIn.success}
              </CardDescription>
            </CardHeader>
          </Card>
        )}
        {!isPending && response.error && (
          <Card className="mb-4 rounded-md border-destructive/50 bg-destructive/25">
            <CardHeader className="px-5 py-4">
              <CardDescription className="font-medium text-foreground">
                {response.error}
              </CardDescription>
            </CardHeader>
          </Card>
        )}
        <FormField
          name="email"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="password"
          render={({ field }) => (
            <FormItem className="mb-8">
              <div className="flex w-full items-center justify-between gap-3">
                <FormLabel>Password</FormLabel>
                <Button variant="link" className="h-auto p-0" asChild>
                  <Label>
                    <Link href="/password-forgot">Forgot password?</Link>
                  </Label>
                </Button>
              </div>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending} className="mb-8">
          Sign in
        </Button>
        <p className="text-center text-sm text-muted-foreground">
          Not a member of our family?{" "}
          <Button variant="link" className="h-auto p-0" asChild>
            <Label>
              <Link href="/sign-up ">Join us</Link>
            </Label>
          </Button>
        </p>
      </form>
    </Form>
  );
};
