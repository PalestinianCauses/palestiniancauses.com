// REVIEWED - 02

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { createDiaryEntry } from "@/actions/diary-entry";
import { queryClient } from "@/app/(app)/providers";
import { DiaryEntry } from "@/payload-types";

export const useDiaryEntry = function useDiaryEntry() {
  const router = useRouter();

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
    onSuccess: (response) => {
      if (!response.data || response.error) {
        toast.error(response.error);
        return;
      }

      toast.success(response.data);
      queryClient.invalidateQueries({ queryKey: ["diary-entry"] });
      router.push("/humans-but-from-gaza");
    },
    onSettled: () => {
      toast.dismiss("create-diary-entry");
    },
  });

  return { createDiaryEntry: createDiaryEntryMutation };
};
