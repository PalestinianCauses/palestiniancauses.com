"use client";

// REVIEWED - 14

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

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
import { useAuth } from "@/hooks/use-auth";
import { messages } from "@/lib/messages";
import { signUpSchema, SignUpSchema } from "@/lib/schemas/auth";

export const SignUpForm = function SignUpForm() {
  const { signUp } = useAuth();

  const form = useForm<SignUpSchema>({
    mode: "onBlur",
    defaultValues: { firstName: "", lastName: "", email: "", password: "" },
    resolver: zodResolver(signUpSchema),
  });

  const handleSubmit = async function handleSubmit(data: SignUpSchema) {
    toast.loading(messages.actions.auth.signUp.pending, {
      id: "sign-up",
    });

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
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={signUp.isPending}
                    data-testid="first-name-input"
                  />
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
                  <Input
                    {...field}
                    disabled={signUp.isPending}
                    data-testid="last-name-input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="mb-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={signUp.isPending}
                    autoComplete="email"
                    data-testid="email-input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="mb-6">
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
                    autoComplete="new-password"
                    data-testid="password-input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col items-stretch justify-center">
          <Button
            type="submit"
            disabled={signUp.isPending}
            data-testid="signup-button"
            className="mb-6">
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
        </div>
      </form>
    </Form>
  );
};
