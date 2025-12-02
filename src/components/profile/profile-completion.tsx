"use client";

// REVIEWED

import { CheckCheckIcon, CircleIcon } from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useProfileCompletion } from "@/hooks/use-profile-completion";
import { User } from "@/payload-types";

import { Paragraph, SubSectionHeading } from "../globals/typography";

export const ProfileCompletion = function ProfileCompletion({
  user,
}: {
  user: User;
}) {
  const { completion, suggestions } = useProfileCompletion({ user });

  if (suggestions.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <div className="space-y-0.5">
          <SubSectionHeading
            as="h2"
            className="flex items-center gap-2.5 text-xl !leading-none lg:text-xl lg:!leading-none xl:text-xl xl:!leading-none">
            <CheckCheckIcon className="size-6 stroke-[1.5]" />
            Profile Completion
          </SubSectionHeading>
          <Paragraph className="text-base lg:text-base">
            Elevate your experience by completing your profile and gaining
            access to additional features.
          </Paragraph>
        </div>
      </CardHeader>

      <CardContent className="space-y-5">
        <div className="space-y-2.5">
          <div className="flex flex-wrap items-center justify-between gap-2.5">
            <Paragraph className="text-sm font-medium text-foreground lg:text-sm">
              {completion}% Completed
            </Paragraph>
            <Paragraph className="text-sm font-medium text-muted-foreground lg:text-sm">
              {suggestions.length} remaining
            </Paragraph>
          </div>
          <Progress value={completion} className="h-2.5 rounded-none" />
        </div>

        <div className="space-y-2.5">
          <Paragraph className="text-sm font-medium text-foreground lg:text-sm">
            Please address the following items to further enhance your profile:
          </Paragraph>
          <ul className="space-y-1.5">
            {suggestions.map((suggestion) => (
              <li
                key={suggestion.name}
                className="flex items-start justify-start gap-2.5">
                <CircleIcon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                <Paragraph className="text-sm lg:text-sm">
                  {suggestion.suggestion}
                </Paragraph>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
