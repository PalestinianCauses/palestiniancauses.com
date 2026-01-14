// REVIEWED - 06

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { createDiaryEntry, deleteDiaryEntry } from "@/actions/diary-entry";
import { HumansButFromGazaPageLink } from "@/lib/utils/strings";
import { DiaryEntry } from "@/payload-types";

export const useDiaryEntry = function useDiaryEntry() {
  const router = useRouter();

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
      router.push(HumansButFromGazaPageLink);
    },
    onSettled: () => {
      toast.dismiss("create-diary-entry");
    },
  });

  const deleteDiaryEntryMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await deleteDiaryEntry(id);
      return response;
    },
    onSuccess: (response) => {
      if (!response.data || response.error) {
        toast.error(response.error);
        return;
      }

      toast.success(response.data);
    },
    onSettled: () => {
      toast.dismiss("delete-diary-entry-loading");
    },
  });

  return {
    createDiaryEntry: createDiaryEntryMutation,
    deleteDiaryEntry: deleteDiaryEntryMutation,
  };
};
