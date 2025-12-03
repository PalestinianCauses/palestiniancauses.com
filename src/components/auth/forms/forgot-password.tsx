"use client";

// REVIEWED

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
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
import { useAuth } from "@/hooks/use-auth";
import { forgotPassSchema, ForgotPassSchema } from "@/lib/schemas/auth";

export const ForgotPassForm = function ForgotPassForm() {
  const router = useRouter();
  const { forgotPassword } = useAuth();

  const form = useForm<ForgotPassSchema>({
    mode: "onBlur",
    defaultValues: { email: "" },
    resolver: zodResolver(forgotPassSchema),
  });

  const handleSubmit = async (data: ForgotPassSchema) => {
    forgotPassword.mutate(data, {
      onSuccess: (response) => {
        if (response.data) router.push("/signin");
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="your.email@example.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={forgotPassword.isPending}
          className="w-full">
          {forgotPassword.isPending
            ? "Sending reset link..."
            : "Send Reset Link"}
        </Button>
      </form>
    </Form>
  );
};
