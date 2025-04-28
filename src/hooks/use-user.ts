// REVIEWED - 07

import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";

import { getAuth, signIn, signOut, signUp } from "@/actions/auth";
import { queryClient } from "@/app/(app)/providers";
import { messages } from "@/lib/errors";
import { SignInSchema, SignUpSchema } from "@/lib/schemas/auth";
import { httpSafeExecute } from "@/lib/utils";

export const useUser = function useUser() {
  const router = useRouter();

  const {
    isLoading: isPending,
    data,
    refetch,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await getAuth();

      if (!response || !response.user) return null;

      return response.user;
    },
  });

  const signInMutation = useMutation({
    mutationFn: async (signInData: SignInSchema) => {
      const response = await signIn(signInData);
      return response;
    },
    onSuccess: (response) => {
      if (!response.data || response.error) {
        toast.error(response.error);
        return;
      }

      toast.success(messages.actions.auth.signIn.success);
      queryClient.setQueryData(["user"], response.data.user);
      router.push("/");
    },
  });

  const signUpMutation = useMutation({
    mutationFn: async (userData: SignUpSchema) => {
      const response = await signUp(userData);
      return response;
    },
    onSuccess: (response) => {
      if (!response.data || response.error) {
        toast.error(response.error);
        return;
      }

      toast.success(messages.actions.auth.signUp.success);
      queryClient.setQueryData(["user"], response.data.user);
      router.push("/");
    },
  });

  const signOutMutation = useMutation({
    mutationFn: async () => {
      const response = await httpSafeExecute<{ message: string }, string>(
        fetch("/api/users/logout", {
          method: "POST",
          credentials: "include",
        }),
        messages.actions.auth.signOut.serverError,
        (d): d is { message: string } => {
          const validate = z.object({ message: z.string() }).safeParse(d);

          if (!validate.success) return false;

          return true;
        },
      );

      return response;
    },
    onSuccess: async (response) => {
      if (!response.data || response.error) {
        toast.error(response.error);
        return;
      }

      await signOut();

      toast.success(messages.actions.auth.signOut.success);
      queryClient.setQueryData(["user"], null);
      router.refresh();
    },
  });

  return {
    isPending,
    data,
    refetch,
    signIn: signInMutation,
    signUp: signUpMutation,
    signOut: signOutMutation,
  };
};
