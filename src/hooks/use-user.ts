"use client";

// REVIEWED - 16

import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { PaginatedDocs } from "payload";
import { toast } from "sonner";
import { z } from "zod";

import { getAuthentication } from "@/actions/auth";
import { deleteCookie, getCookie } from "@/actions/cookies";
import { createUser, getUserByEmail } from "@/actions/user";
import { messages } from "@/lib/messages";
import { actionSafeExecute, httpSafeExecute } from "@/lib/network";
import { SignInSchema, SignUpSchema } from "@/lib/schemas/auth";
import {
  ErrorPayload,
  ResponseDataAuthenticationTokenPayload,
  ResponseSafeExecute,
  SafeExecuteConfig,
} from "@/lib/types";
import {
  isResponseDataAuthentication,
  isResponseDataAuthenticationHasRefreshedToken,
  isResponseError,
} from "@/lib/types/guards";
import { User } from "@/payload-types";

export const useUser = function useUser() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { isPending, isFetching, data, refetch } = useSuspenseQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await getAuthentication();

      if (!response || !response.user) return null;

      return response.user;
    },
  });

  const signIn = useMutation({
    mutationFn: async (
      signInData: SignInSchema,
    ): Promise<ResponseSafeExecute<ResponseDataAuthenticationTokenPayload>> => {
      const responseSignIn = await httpSafeExecute<
        ResponseDataAuthenticationTokenPayload,
        ErrorPayload
      >({
        http: fetch("/api/users/login", {
          credentials: "include",
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: signInData.email,
            password: signInData.password,
          }),
        }),
        errorDefault: messages.actions.auth.signIn.serverError,
        isData: isResponseDataAuthentication,
        isError: isResponseError,
        config: { skip: { errors: [401] } },
      });

      if (!responseSignIn.data || responseSignIn.error) {
        if (typeof responseSignIn.error === "string")
          return { data: null, error: responseSignIn.error };

        if (responseSignIn.error === 401) {
          const responseUserExists = await actionSafeExecute<
            PaginatedDocs<User>,
            string
          >(
            getUserByEmail(signInData.email),
            messages.actions.auth.signIn.serverError,
          );

          if (!responseUserExists.data || responseUserExists.error)
            return responseUserExists;

          if (responseUserExists.data.docs.length === 0)
            return {
              data: null,
              error: messages.actions.auth.signIn.notFound(signInData.email),
            };

          return {
            data: null,
            error: messages.actions.auth.signIn.unAuthenticated(
              signInData.email,
            ),
          };
        }

        return {
          data: null,
          error: messages.actions.auth.signIn.serverError,
        };
      }

      if (!responseSignIn.data.token) {
        return { data: null, error: messages.actions.auth.signIn.serverError };
      }

      return { data: responseSignIn.data, error: null };
    },
    onSuccess: (response) => {
      if (!response.data || response.error) {
        toast.error(response.error);
        return;
      }

      toast.success(messages.actions.auth.signIn.success);
      queryClient.setQueryData(["user"], response.data.user);
      router.refresh();
    },
    onSettled: () => {
      toast.dismiss("sign-in");
    },
  });

  const signUp = useMutation({
    mutationFn: async (
      signUpData: SignUpSchema,
    ): Promise<ResponseSafeExecute<{ email: string; password: string }>> => {
      const response = await createUser(signUpData);

      if (!response.data || response.error)
        return { data: null, error: response.error };

      return {
        data: { email: signUpData.email, password: signUpData.password },
        error: null,
      };
    },
    onSuccess: (response) => {
      if (!response.data || response.error) {
        toast.error(response.error);
        return;
      }

      signIn.mutate({
        email: response.data.email,
        password: response.data.password,
      });
    },
    onSettled: () => {
      toast.dismiss("sign-up");
    },
  });

  const signOut = useMutation({
    mutationFn: async (config?: SafeExecuteConfig) => {
      const response =
        !config || !config.skip || !config.skip.http
          ? await httpSafeExecute<{ message: string }>({
              http: fetch("/api/users/logout", {
                method: "POST",
                credentials: "include",
              }),
              errorDefault: messages.actions.auth.signOut.serverError,
              isData: (d): d is { message: string } => {
                const validate = z.object({ message: z.string() }).safeParse(d);

                if (!validate.success) return false;

                return true;
              },
              config,
            })
          : {
              data: null,
              error: messages.http.skip,
            };

      return { ...response, config };
    },
    onSuccess: async (response) => {
      // check if HTTP request was not skipped
      if (
        !response.config ||
        !response.config.skip ||
        !response.config.skip.http
      ) {
        if (response.data) toast.success(messages.actions.auth.signOut.success);
        else if (response.error && typeof response.error === "string")
          toast.error(response.error);
      }

      // check if token cookie exists: delete it
      const tokenCookie = await getCookie("payload-token");
      if (tokenCookie && (tokenCookie.value || tokenCookie.value === ""))
        await deleteCookie("payload-token");

      queryClient.setQueryData(["user"], null);
      router.refresh();
    },
    onSettled: () => {
      toast.dismiss("sign-out");
    },
  });

  const tokenRefresh = useMutation({
    mutationFn: async () => {
      const response = await httpSafeExecute({
        http: fetch("/api/users/refresh-token", {
          credentials: "include",
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }),
        errorDefault: messages.actions.auth.tokenRefresh.serverError,
        isData: isResponseDataAuthenticationHasRefreshedToken,
      });

      return response;
    },
    onSuccess: (response) => {
      if (!response.data || response.error) {
        toast.error(response.error);
        signOut.mutate({ skip: { http: true } });
        return;
      }

      toast.success(messages.actions.auth.tokenRefresh.success);
    },
    onSettled: () => {
      toast.dismiss("token-refresh");
    },
    retry: 2,
    retryDelay: 1000,
  });

  return {
    isPending: isPending || isFetching,
    data,
    refetch,
    signIn,
    signUp,
    signOut,
    tokenRefresh,
  };
};
