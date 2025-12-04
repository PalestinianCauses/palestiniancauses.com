"use client";

// REVIEWED - 02

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { cancelingPendingEmail as actionCancelingPendingEmail } from "@/actions/cancel-pending-email";
import { requestChangeEmail as actionRequestChangeEmail } from "@/actions/email-change";
import { mediaDelete, mediaUpload } from "@/actions/media-upload";
import { resendingVerificationEmail as actionResendingVerificationEmail } from "@/actions/resend-verification-email";
import {
  updatePassword as updatePassAction,
  updateUser as updateUserAction,
} from "@/actions/user";
import { messages } from "@/lib/messages";

export const useUpdateUser = function useUpdateUser() {
  const queryClient = useQueryClient();

  const updateUser = useMutation({
    mutationFn: updateUserAction,
    onSuccess: (response) => {
      if (!response.data || response.error) {
        toast.error(response.error);
        return;
      }

      toast.success(messages.actions.user.update.success);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const updateUserAvatar = useMutation({
    mutationFn: async ({ file, alt }: { file: File; alt: string }) => {
      const responseMedia = await mediaUpload({
        file,
        alt,
      });

      if (!responseMedia.data || responseMedia.error) return responseMedia;

      const responseUpdateUser = await updateUserAction({
        avatar: responseMedia.data.id,
      });

      return responseUpdateUser;
    },
    onSuccess: (response) => {
      if (!response.data || response.error) {
        toast.error(response.error);
        return;
      }

      toast.success(messages.actions.media.upload.success);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const removeUserAvatar = useMutation({
    mutationFn: async ({ id }: { id: number | null | undefined }) => {
      if (!id)
        return { data: null, error: messages.actions.media.upload.noFile };

      const responseUpdateUser = await updateUserAction({
        avatar: null,
      });

      if (!responseUpdateUser.data || responseUpdateUser.error)
        return responseUpdateUser;

      const responseMedia = await mediaDelete({ id });

      if (!responseMedia.data || responseMedia.error) return responseMedia;

      return responseUpdateUser;
    },
    onSuccess: (response) => {
      if (!response.data || response.error) {
        toast.error(response.error);
        return;
      }

      toast.success(messages.actions.media.upload.successRemove);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const updatePassword = useMutation({
    mutationFn: updatePassAction,
    onSuccess: (response) => {
      if (!response.data || response.error) {
        toast.error(response.error);
        return;
      }

      toast.success(response.data);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const resendingVerificationEmail = useMutation({
    mutationFn: actionResendingVerificationEmail,
    onSuccess: (response) => {
      if (!response.data || response.error) {
        toast.error(response.error);
        return;
      }

      toast.success(response.data);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const resendingVerificationPendingEmail = useMutation({
    mutationFn: () => actionRequestChangeEmail(), // No params = resend for existing pending email
    onSuccess: (response) => {
      if (!response.data || response.error) {
        toast.error(response.error);
        return;
      }

      toast.success(response.data);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const cancelingPendingEmail = useMutation({
    mutationFn: actionCancelingPendingEmail,
    onSuccess: (response) => {
      if (!response.data || response.error) {
        toast.error(response.error);
        return;
      }

      toast.success(response.data);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  return {
    updateUser,
    updateUserAvatar,
    removeUserAvatar,
    updatePassword,
    resendingVerificationEmail,
    resendingVerificationPendingEmail,
    cancelingPendingEmail,
  };
};
