// REVIEWED  - 17

import { useQuery } from "@tanstack/react-query";

import { getAuthentication } from "@/actions/auth";

export const useUser = function useUser() {
  const { isPending, isFetching, data } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await getAuthentication();

      if (!response || !response.user) return null;

      return response.user;
    },
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    staleTime: 0,
    gcTime: 0,
  });

  return {
    isPending: isPending || isFetching,
    user: data,
  };
};
