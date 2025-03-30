// REVIEWED

import { useQuery } from "@tanstack/react-query";

import { AuthResponse } from "@/actions/auth";
import { messages } from "@/lib/errors";
import { AuthResponsePayload } from "@/lib/payload";
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

  return {
    isPending,
    data,
    refetch,
  };
};
