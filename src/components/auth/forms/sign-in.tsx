"use client";

// REVIEWED - 06

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { AuthResponse } from "@/actions/auth";
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
import { useUser } from "@/hooks/use-user";
import { messages } from "@/lib/errors";
import { signInSchema, SignInSchema } from "@/lib/schemas/auth";

export const SignInForm = function SignInForm() {
  const router = useRouter();
  const { signIn } = useUser();
  const [response, setResponse] = useState<AuthResponse>({
    data: null,
    error: null,
  });

  const form = useForm<SignInSchema>({
    mode: "onBlur",
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(signInSchema),
  });

  const handleSubmit = function handleSubmit(data: SignInSchema) {
    signIn.mutate(data, {
      onSuccess: (responseData) => {
        setResponse(responseData);
        if (!responseData.error) {
          setTimeout(() => {
            router.push("/book");
          }, 500);
        }
      },
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col items-stretch justify-center">
        <FormStatus
          isPending={{
            true: signIn.isPending,
            message: messages.actions.auth.signIn.pending,
          }}
          success={{
            true: !signIn.isPending && Boolean(response.data),
            message: messages.actions.auth.signIn.success,
          }}
          failure={{
            true: !signIn.isPending && Boolean(response.error),
            message: response.error || "",
          }}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} disabled={signIn.isPending} />
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
              <div className="flex w-full items-center justify-between gap-3">
                <FormLabel>Password</FormLabel>
                {/* <Button variant="link" className="h-auto p-0" asChild>
                  <Label>
                    <Link href="/password-forgot">Forgot password?</Link>
                  </Label>
                </Button> */}
              </div>
              <FormControl>
                <Input {...field} type="password" disabled={signIn.isPending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={signIn.isPending} className="mb-6">
          Sign in
        </Button>
        <p className="text-center text-sm text-muted-foreground">
          Not a family member yet?{" "}
          <Button variant="link" className="h-auto p-0" asChild>
            <Label>
              <Link href="/signup">Be one</Link>
            </Label>
          </Button>
          .
        </p>
      </form>
    </Form>
  );
};
