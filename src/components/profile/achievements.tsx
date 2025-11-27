"use client";

// REVIEWED

import { format } from "date-fns";
import {
  BicepsFlexedIcon,
  BrickWallFireIcon,
  BrickWallShieldIcon,
  CircleFadingPlusIcon,
  FlameIcon,
  GlobeIcon,
  GlobeLockIcon,
  GraduationCapIcon,
  HandHeartIcon,
  LandmarkIcon,
  LibraryIcon,
  LucideIcon,
  RadioTowerIcon,
  TrophyIcon,
  WifiPenIcon,
} from "lucide-react";

import { Achievement } from "@/actions/user-achievements";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@/hooks/use-user";
import { useUserAchievements } from "@/hooks/use-user-achievements";
import { cn } from "@/lib/utils/styles";

import { Paragraph, SubSectionHeading } from "../globals/typography";
import { Progress } from "../ui/progress";

import { StatusBadge } from "./globals";

const achievementIcons: Record<string, { color: string; icon: LucideIcon }> = {
  "comment-1": { color: "green", icon: WifiPenIcon },
  "comment-5": { color: "green", icon: GlobeIcon },
  "comment-10": { color: "green", icon: GlobeLockIcon },
  "comment-25": { color: "green", icon: BicepsFlexedIcon },
  "comment-50": { color: "green", icon: RadioTowerIcon },
  "comment-100": { color: "green", icon: HandHeartIcon },
  "diary-1": { color: "teal", icon: FlameIcon },
  "diary-5": { color: "teal", icon: BrickWallFireIcon },
  "diary-10": { color: "teal", icon: BrickWallShieldIcon },
  "diary-25": { color: "teal", icon: LandmarkIcon },
  "diary-50": { color: "teal", icon: CircleFadingPlusIcon },
  "diary-100": { color: "teal", icon: GraduationCapIcon },
  "book-order": { color: "yellow", icon: LibraryIcon },
};

export const AchievementCard = function AchievementCard({
  achievement,
}: {
  achievement: Achievement;
}) {
  const { color } = achievementIcons[achievement.id];
  const Icon = achievementIcons[achievement.id].icon;

  return (
    <div
      className={cn(
        "flex flex-col items-start justify-start gap-2.5 border p-5",
        {
          "border-yellow-500/50 bg-yellow-500/5": color === "yellow",
          "border-green-500/50 bg-green-500/5": color === "green",
          "border-teal-500/50 bg-teal-500/5": color === "teal",
        },
      )}>
      <div
        className={cn(
          "-mb-5 flex size-16 -translate-y-10 items-center justify-center bg-foreground text-background",
          {
            "bg-yellow-500 text-yellow-100 shadow-xl shadow-yellow-500/25":
              color === "yellow",
            "bg-green-500 text-green-100 shadow-xl shadow-green-500/25":
              color === "green",
            "bg-teal-500 text-teal-100 shadow-xl shadow-teal-500/25":
              color === "teal",
          },
        )}>
        <Icon className="size-10" />
      </div>
      <SubSectionHeading
        as="h4"
        className="flex items-center gap-2.5 text-xl font-semibold !leading-none lg:text-xl lg:!leading-none xl:text-xl xl:!leading-none">
        {achievement.name}
        <StatusBadge
          label={achievement.type}
          className={cn({
            "border-yellow-500/10 bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/10":
              color === "yellow",
            "border-green-500/10 bg-green-500/10 text-green-500 hover:bg-green-500/10":
              color === "green",
            "border-teal-500/10 bg-teal-500/10 text-teal-500 hover:bg-teal-500/10":
              color === "teal",
          })}
        />
      </SubSectionHeading>
      <Paragraph className="mb-5 text-base text-foreground opacity-75 lg:text-base">
        {achievement.description}
      </Paragraph>
      <Progress
        value={
          achievement.target && achievement.target > 0
            ? Math.min(
                Math.round(
                  ((achievement.progress || 0) / achievement.target) * 100,
                ),
                100,
              )
            : 0
        }
        className={cn("mb-2.5 w-3/4 rounded-none", {
          "bg-yellow-500/10 [&_div]:bg-yellow-500": color === "yellow",
          "bg-green-500/10 [&_div]:bg-green-500": color === "green",
          "bg-teal-500/10 [&_div]:bg-teal-500": color === "teal",
        })}
      />
      <div className="flex w-full flex-wrap items-center justify-between gap-2.5">
        <Paragraph
          className={cn(
            "text-xs font-medium uppercase tracking-[0.2em] text-foreground/75 lg:text-xs",
          )}>
          <span className="font-semibold text-foreground">
            {achievement.progress}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-foreground">
            {achievement.target}
          </span>{" "}
          milestone
          {achievement.target === 1 ? "" : "s"} achieved
        </Paragraph>
        {achievement.unlockedAt ? (
          <Paragraph className="text-xs font-medium uppercase tracking-[0.2em] text-foreground lg:text-xs">
            {format(achievement.unlockedAt, "MMMM d, yyyy")}
          </Paragraph>
        ) : null}
      </div>
    </div>
  );
};

export const ProfileAchievements = function ProfileAchievements() {
  const { isLoading: isUserLoading, data: user } = useUser();
  const { isLoading: isLoadingAchievements, data: achievements } =
    useUserAchievements();

  if (isUserLoading || isLoadingAchievements) {
    return (
      <div className="space-y-5">
        <Skeleton className="h-32 w-full bg-foreground/5" />
        <Skeleton className="h-64 w-full bg-foreground/5" />
      </div>
    );
  }

  if (!user) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Authentication Required</CardTitle>
          <CardDescription>
            Kindly sign in to access and celebrate your personal achievements.
            We look forward to recognizing your milestones.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const achievementsGained = achievements?.filter((a) => a.unlocked) || [];
  const achievementsLocked = achievements?.filter((a) => !a.unlocked) || [];

  return (
    <div className="space-y-10">
      <div className="space-y-0.5">
        <SubSectionHeading
          as="h2"
          className="flex items-center gap-2.5 text-xl !leading-none lg:text-xl lg:!leading-none xl:text-xl xl:!leading-none">
          <TrophyIcon className="size-6 stroke-[1.5]" />
          Achievements
        </SubSectionHeading>
        <Paragraph className="max-w-2xl text-base lg:text-base">
          You have attained {achievementsGained.length} out of{" "}
          {achievements?.length || 0} achievements. Each milestone is a
          testament to your dedication and progress—let us continue striving for
          excellence together.
        </Paragraph>
      </div>
      <div className="flex flex-col items-start justify-start gap-10">
        <SubSectionHeading
          as="h3"
          className="flex items-center gap-2.5 text-base uppercase !leading-none tracking-[0.2em] lg:text-base lg:!leading-none xl:text-base xl:!leading-none">
          Attained
        </SubSectionHeading>
        <div className="grid w-full grid-cols-1 gap-x-5 gap-y-10 xl:grid-cols-2">
          {achievementsGained.map((achievement) => (
            <AchievementCard key={achievement.id} achievement={achievement} />
          ))}
        </div>
      </div>
      <div className="flex flex-col items-start justify-start gap-10">
        <SubSectionHeading
          as="h3"
          className="flex items-center gap-2.5 text-base uppercase !leading-none tracking-[0.2em] lg:text-base lg:!leading-none xl:text-base xl:!leading-none">
          Locked
        </SubSectionHeading>
        <div className="grid w-full grid-cols-1 gap-x-5 gap-y-10 opacity-75 xl:grid-cols-2">
          {achievementsLocked.map((achievement) => (
            <AchievementCard key={achievement.id} achievement={achievement} />
          ))}
        </div>
      </div>
    </div>
  );
};
