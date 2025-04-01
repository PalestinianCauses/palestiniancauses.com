"use client";

// REVIEWED - 02

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
import { signUpSchema, SignUpSchema } from "@/lib/schemas/auth";

export const SignUpForm = function SignUpForm() {
  const router = useRouter();
  const { signUp } = useUser();
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
    signUp.mutate(data, {
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
            true: signUp.isPending,
            message: messages.actions.auth.signUp.pending,
          }}
          success={{
            true: !signUp.isPending && Boolean(response.data),
            message: messages.actions.auth.signUp.success,
          }}
          failure={{
            true: !signUp.isPending && Boolean(response.error),
            message: response.error || "",
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
                  <Input {...field} disabled={signUp.isPending} />
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
                  <Input {...field} disabled={signUp.isPending} />
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
                <Input {...field} disabled={signUp.isPending} />
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
                <Input {...field} type="password" disabled={signUp.isPending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
      </form>
    </Form>
  );
};
