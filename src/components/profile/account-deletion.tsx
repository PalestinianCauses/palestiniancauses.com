"use client";

// REVIEWED

import { AlertTriangleIcon, TrashIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDeleteAccount } from "@/hooks/use-delete-account";
import { cn } from "@/lib/utils/styles";
import { User } from "@/payload-types";

import { Paragraph, SubSectionHeading } from "../globals/typography";

export const AccountDeletion = function AccountDeletion({
  user,
}: {
  user: User;
}) {
  const deleteAccount = useDeleteAccount();

  const [confirmText, setConfirmText] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    if (confirmText !== "DELETE") {
      toast.error('Please type "DELETE" to confirm');
      return;
    }

    deleteAccount.mutate(undefined, {
      onSuccess: () => {
        setIsOpen(false);
        setConfirmText("");
      },
    });
  };

  if (!user) return null;

  return (
    <Card>
      <CardHeader>
        <div className="space-y-0.5">
          <SubSectionHeading
            as="h2"
            className="flex items-center gap-2.5 text-xl !leading-none lg:text-xl lg:!leading-none xl:text-xl xl:!leading-none">
            <AlertTriangleIcon className="size-6 stroke-[1.5]" />
            Danger Zone
          </SubSectionHeading>
          <Paragraph className="text-base text-foreground/50 lg:text-base">
            Permanently remove your account and all related information from our
            platform.
          </Paragraph>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="border border-input bg-foreground/5 p-5">
          <Paragraph className="text-base text-muted-foreground lg:text-base">
            <span className="font-medium text-foreground">
              Important Notice:
            </span>{" "}
            This is an irreversible action. Proceeding will result in the
            permanent removal of your account, profile, and all associated
            data—including your comments, diary entries, and orders. Please
            ensure that you wish to permanently exit our platform before
            confirming this request.
          </Paragraph>
        </div>

        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" disabled={deleteAccount.isPending}>
              <TrashIcon />
              Delete Account
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Confirm Permanent Account Deletion
              </AlertDialogTitle>
              <AlertDialogDescription>
                Deleting your account is a permanent and irreversible action.
                All of your data and presence on our platform will be completely
                removed. If you are certain you wish to proceed, please confirm
                below.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="space-y-5 py-5">
              <div className="space-y-2.5">
                <Label htmlFor="confirm-delete">
                  Type <strong>DELETE</strong> to confirm:
                </Label>
                <Input
                  id="confirm-delete"
                  value={confirmText}
                  onChange={(e) => setConfirmText(e.target.value)}
                  placeholder="DELETE"
                />
              </div>
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setConfirmText("")}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                disabled={confirmText !== "DELETE" || deleteAccount.isPending}
                onClick={handleDelete}
                className={cn(buttonVariants({ variant: "destructive" }))}>
                {deleteAccount.isPending ? "Deleting..." : "Delete Account"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
};
