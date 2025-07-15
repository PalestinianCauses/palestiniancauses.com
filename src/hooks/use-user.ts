// REVIEWED  - 18

import { useQuery } from "@tanstack/react-query";

import { getAuthentication } from "@/actions/auth";

export const useUser = function useUser() {
  const query = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await getAuthentication();

      if (!response || !response.user) return null;

      return response.user;
    },
  });

  return {
    ...query,
  };
};
