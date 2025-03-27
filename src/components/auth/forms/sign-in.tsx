"use client";

// REVIEWED

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signInSchema, SignInSchema } from "@/lib/schemas/auth";

export const SignInForm = function SignInForm() {
  const form = useForm<SignInSchema>({
    mode: "onBlur",
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(signInSchema),
  });

  return (
    <Form {...form}>
      <FormItem className="mb-4">
        <FormLabel>Email</FormLabel>
        <FormControl>
          <Input />
        </FormControl>
        <FormMessage />
      </FormItem>
      <FormItem className="mb-8">
        <FormLabel>Password</FormLabel>
        <FormControl>
          <Input />
        </FormControl>
        <FormMessage />
      </FormItem>
      <Button type="submit" className="mb-4">
        Sign in
      </Button>
      <p className="text-center text-sm text-muted-foreground">
        Not a member of our family?{" "}
        <Link
          href="/sign-up"
          className="font-medium text-foreground transition-all duration-300 ease-linear hover:text-secondary-foreground hover:underline hover:underline-offset-4">
          Join us
        </Link>
        .
      </p>
    </Form>
  );
};
