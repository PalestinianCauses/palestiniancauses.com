"use client";

// REVIEWED - 02

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";

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
import { signInSchema, SignInSchema } from "@/lib/schemas/auth";

export const SignInForm = function SignInForm() {
  const form = useForm<SignInSchema>({
    mode: "onBlur",
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(signInSchema),
  });

  return (
    <Form {...form}>
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
      <Button type="submit" className="mb-8">
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
    </Form>
  );
};
