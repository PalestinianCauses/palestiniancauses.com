// REVIEWED - 05

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { createDiaryEntry } from "@/actions/diary-entry";
import { HumansButFromGazaPageLink } from "@/lib/utils/strings";
import { DiaryEntry } from "@/payload-types";

export const useDiaryEntry = function useDiaryEntry() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const createDiaryEntryMutation = useMutation({
    mutationFn: async (
      diaryEntryData: Omit<
        DiaryEntry,
        "id" | "status" | "author" | "createdAt" | "updatedAt"
      >,
    ) => {
      const response = await createDiaryEntry(diaryEntryData);
      return response;
    },
    onSuccess: (response) => {
      if (!response.data || response.error) {
        toast.error(response.error);
        return;
      }

      toast.success(response.data);
      queryClient.invalidateQueries({ queryKey: ["diary-entry"] });
      router.push(HumansButFromGazaPageLink);
    },
    onSettled: () => {
      toast.dismiss("create-diary-entry");
    },
  });

  return { createDiaryEntry: createDiaryEntryMutation };
};
