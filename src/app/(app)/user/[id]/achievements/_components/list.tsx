"use client";

// REVIEWED - 01

import { TrophyIcon } from "lucide-react";

import { Paragraph, SubSectionHeading } from "@/components/globals/typography";
import {
  AchievementCard,
  ProfileAchievementsLoading,
} from "@/components/profile/achievements";
import { usePublicUserAchievements } from "@/hooks/use-public-user-achievements";

export const PublicProfileAchievementsList =
  function PublicProfileAchievementsList({ userId }: { userId: number }) {
    const { isLoading: isLoadingAchievements, data: achievements } =
      usePublicUserAchievements({ userId });

    if (isLoadingAchievements) return ProfileAchievementsLoading;

    const achievementsGained = achievements?.filter((a) => a.unlocked) || [];

    return (
      <div className="space-y-10">
        {achievementsGained.length !== 0 ? (
          <div className="grid w-full grid-cols-1 gap-x-5 gap-y-10 xl:grid-cols-2">
            {achievementsGained.map((achievement) => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
          </div>
        ) : (
          <div className="mx-auto flex max-w-4xl flex-col items-center justify-center pt-10 text-center">
            <div className="relative mb-6 flex w-max items-end lg:mb-8">
              <TrophyIcon className="relative h-12 w-12 stroke-[1] lg:h-20 lg:w-20" />
            </div>
            <SubSectionHeading small className="mb-4 lg:mb-6">
              This user has not attained any achievements yet
            </SubSectionHeading>
            <Paragraph small className="mb-6 lg:mb-12">
              There are currently no achievements available for this user.
              Explore other profiles or check back soon to discover new
              accomplishments.
            </Paragraph>
          </div>
        )}
      </div>
    );
  };
