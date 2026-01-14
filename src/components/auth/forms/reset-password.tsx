"use client";

// REVIEWED

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
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
import { useAuth } from "@/hooks/use-auth";
import { messages } from "@/lib/messages";
import { resetPassSchema, ResetPassSchema } from "@/lib/schemas/auth";

export const ResetPassForm = function ResetPassForm({
  token,
}: {
  token: string;
}) {
  const router = useRouter();
  const { resetPassword } = useAuth();

  const form = useForm<ResetPassSchema>({
    mode: "onBlur",
    defaultValues: { password: "", confirmPassword: "" },
    resolver: zodResolver(resetPassSchema),
  });

  const handleSubmit = function handleSubmit(data: ResetPassSchema) {
    toast.loading(messages.actions.auth.resetPassword.pending, {
      id: "reset-password",
    });

    resetPassword.mutate(
      { token, password: data.password },
      {
        onSuccess: (response) => {
          if (response.data) router.push("/signin");
        },
      },
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm New Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={resetPassword.isPending}
          className="w-full">
          {resetPassword.isPending ? "Resetting password..." : "Reset Password"}
        </Button>
      </form>
    </Form>
  );
};
