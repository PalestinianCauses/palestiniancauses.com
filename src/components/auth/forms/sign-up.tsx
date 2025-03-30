"use client";

// REVIEWED - 01

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import { AuthResponse, signUp } from "@/actions/auth";
import { FormStatus } from "@/components/globals/form-status";
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
import { messages } from "@/lib/errors";
import { signUpSchema, SignUpSchema } from "@/lib/schemas/auth";

export const SignUpForm = function SignUpForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [response, setResponse] = useState<AuthResponse>({
    data: null,
    error: null,
  });

  const form = useForm<SignUpSchema>({
    mode: "onBlur",
    defaultValues: { firstName: "", lastName: "", email: "", password: "" },
    resolver: zodResolver(signUpSchema),
  });

  const handleSubmit = async function handleSubmit(data: SignUpSchema) {
    startTransition(async () => {
      const signUpResponse = await signUp(data);
      setResponse(signUpResponse);
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
        <FormStatus
          isPending={{
            true: isPending,
            message: messages.actions.auth.signUp.pending,
          }}
          success={{
            true: !isPending && Boolean(response.data),
            message: messages.actions.auth.signUp.success,
          }}
          failure={{
            true: !isPending && Boolean(response.error),
            message: response.error ?? "",
          }}
        />
        <div className="mb-4 grid w-full grid-cols-2 items-start gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
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
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="mb-6">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending} className="mb-6">
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
      </form>
    </Form>
  );
};
