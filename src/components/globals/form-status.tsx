// REVIEWED

import { cn } from "@/lib/utils";

import { Card, CardDescription, CardHeader } from "../ui/card";

export const FormStatus = function FormStatus({
  isPending,
  success,
  failure,
}: {
  isPending: { true: boolean; message: string };
  success: { true: boolean; message: string };
  failure: { true: boolean; message: string };
}) {
  return isPending.true || success.true || failure.true ? (
    <Card
      className={cn("mb-4 rounded-md", {
        "border-yellow-500/50 bg-yellow-500/25": isPending.true,
        "border-tertiary-2/50 bg-tertiary-2/25": success.true,
        "border-destructive/50 bg-destructive/25": failure.true,
      })}>
      <CardHeader className="px-5 py-4">
        <CardDescription className="font-medium text-foreground">
          {(isPending.true && isPending.message) ||
            (success.true && success.message) ||
            (failure.true && failure.message)}
        </CardDescription>
      </CardHeader>
    </Card>
  ) : null;
};
