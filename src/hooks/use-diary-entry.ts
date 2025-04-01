// REVIEWED

import { useMutation } from "@tanstack/react-query";

import { createDiaryEntry } from "@/actions/diary-entry";
import { DiaryEntry } from "@/payload-types";

export const useDiaryEntry = function useDiaryEntry() {
  const createDiaryEntryMutation = useMutation({
    mutationFn: async (
      diaryEntryData: Omit<
        DiaryEntry,
        "id" | "status" | "createdAt" | "updatedAt"
      >,
    ) => {
      const response = await createDiaryEntry(diaryEntryData);
      return response;
    },
  });

  return { createDiaryEntryMutation };
};
