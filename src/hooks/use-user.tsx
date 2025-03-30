// REVIEWED - 01

import { useMutation, useQuery } from "@tanstack/react-query";

import { AuthResponse, signIn } from "@/actions/auth";
import { queryClient } from "@/app/(app)/providers";
import { messages } from "@/lib/errors";
import { AuthResponsePayload } from "@/lib/payload";
import { SignInSchema } from "@/lib/schemas/auth";
import { actionTryCatch } from "@/lib/utils";

export const useUser = function useUser() {
  const {
    isLoading: isPending,
    data,
    refetch,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response: AuthResponse = { data: null, error: null };
      const meResponse = await actionTryCatch(
        fetch("http://localhost:3000/api/user/me", { credentials: "include" }),
      );

      if (meResponse.error) {
        response.error = messages.actions.user.serverError;
        return response;
      }

      if (meResponse.data) {
        if (!meResponse.data.ok) {
          if (meResponse.data.status === 401 || meResponse.data.status === 403)
            response.error = messages.actions.user.unAuthenticated;
          else response.error = messages.actions.user.serverError;

          return response;
        }

        const meData = (await meResponse.data.json()) as AuthResponsePayload;
        response.data = meData;
      }

      return response;
    },
  });

  const signInMutation = useMutation({
    mutationFn: async (credentials: SignInSchema) => {
      const response = await signIn(credentials);
      return response;
    },
    onSuccess: (mutationData) => {
      queryClient.setQueryData(["user"], mutationData.data?.user);
    },
  });

  return {
    isPending,
    data,
    refetch,
    signInMutation,
  };
};
