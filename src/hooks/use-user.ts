// REVIEWED - 03

import { useMutation, useQuery } from "@tanstack/react-query";

import { signIn, signOut, signUp } from "@/actions/auth";
import { queryClient } from "@/app/(app)/providers";
import { AuthResponsePayload } from "@/lib/payload";
import { SignInSchema, SignUpSchema } from "@/lib/schemas/auth";
import { httpTryCatch } from "@/lib/utils";

export const useUser = function useUser() {
  const {
    isLoading: isPending,
    data: user,
    refetch,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await httpTryCatch<AuthResponsePayload, unknown>(
        fetch("/api/users/me", { credentials: "include" }),
      );

      if (response.data && response.data.user && !response.error)
        return response.data.user;
      return null;
    },
  });

  const signInMutation = useMutation({
    mutationFn: async (signInData: SignInSchema) => {
      const response = await signIn(signInData);
      return response;
    },
    onSuccess: (response) => {
      if (response.data && !response.error) {
        queryClient.setQueryData(["user"], response.data.user);
      }
    },
  });

  const signUpMutation = useMutation({
    mutationFn: async (userData: SignUpSchema) => {
      const response = await signUp(userData);
      return response;
    },
    onSuccess: (response) => {
      if (response.data && !response.error) {
        queryClient.setQueryData(["user"], response.data.user);
      }
    },
  });

  const signOutMutation = useMutation({
    mutationFn: async () => {
      const response = await httpTryCatch(
        fetch("/api/users/logout", {
          method: "POST",
          credentials: "include",
        }),
      );

      return response;
    },
    onSuccess: async (response) => {
      if (response.data && !response.error) {
        await signOut();
        queryClient.setQueryData(["user"], null);
      }
    },
  });

  return {
    isPending,
    user,
    refetch,
    signIn: signInMutation,
    signUp: signUpMutation,
    signOut: signOutMutation,
  };
};
