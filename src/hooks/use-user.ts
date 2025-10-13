// REVIEWED  - 19

import { useQuery } from "@tanstack/react-query";

import { getAuthentication } from "@/actions/auth";

export const useUser = function useUser() {
  const query = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await getAuthentication();

      if (!response) return null;

      return response;
    },
  });

  return {
    ...query,
  };
};
