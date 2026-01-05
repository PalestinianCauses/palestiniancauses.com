"use client";

// REVIEWED - 05

import { format } from "date-fns/format";
import {
  ActivityIcon,
  CalendarDaysIcon,
  MailIcon,
  MessagesSquareIcon,
  Package2Icon,
  PencilLineIcon,
  TrophyIcon,
} from "lucide-react";

import { usePublicUserStats } from "@/hooks/use-public-user-stats";
import { User } from "@/payload-types";

import {
  Paragraph,
  SectionHeading,
  SubSectionHeading,
} from "../globals/typography";
import { UserAvatar } from "../globals/user-avatar";
import { Skeleton } from "../ui/skeleton";

import { ProfileInfoRoles, ProfileInfoSocial } from "./info";
import { ProfileNavigation } from "./navigation";

export const PublicProfileStats = function PublicProfileStats({
  user,
}: {
  user: User;
}) {
  const { isLoading, data: publicUserStats } = usePublicUserStats({
    userId: user.id,
  });

  if (isLoading)
    return (
      <div className="flex flex-row flex-wrap items-start justify-start gap-2.5">
        <div className="flex flex-col items-start justify-start gap-2.5">
          <Skeleton className="h-5 w-32 max-w-sm bg-foreground/5" />
          <Skeleton className="h-5 w-32 max-w-sm bg-foreground/5" />
        </div>
        <div className="flex flex-col items-start justify-start gap-2.5">
          <Skeleton className="h-5 w-32 max-w-sm bg-foreground/5" />
          <Skeleton className="h-5 w-32 max-w-sm bg-foreground/5" />
        </div>
        <div className="flex flex-col items-start justify-start gap-2.5">
          <Skeleton className="h-5 w-32 max-w-sm bg-foreground/5" />
          <Skeleton className="h-5 w-32 max-w-sm bg-foreground/5" />
        </div>
      </div>
    );

  if (!publicUserStats || !publicUserStats.data || publicUserStats.error)
    return null;

  return (
    <div className="flex flex-row flex-wrap items-start justify-start gap-x-10 gap-y-5">
      <div className="flex flex-col items-start justify-start gap-2.5">
        <SubSectionHeading
          as="h3"
          className="flex flex-row items-center justify-start gap-2.5 border-l-2 border-foreground px-5 pr-0 text-base font-semibold !leading-none text-foreground lg:text-base lg:!leading-none xl:text-base xl:!leading-none">
          <MessagesSquareIcon className="size-5 stroke-[1.5]" />
          Comments
        </SubSectionHeading>
        <Paragraph className="border-l-2 border-input px-5 py-0.5 pr-0 text-xl font-semibold !leading-none text-foreground lg:text-xl">
          {publicUserStats.data.comments}
        </Paragraph>
      </div>
      <div className="flex flex-col items-start justify-start gap-2.5">
        <SubSectionHeading
          as="h3"
          className="flex flex-row items-center justify-start gap-2.5 border-l-2 border-foreground px-5 pr-0 text-base font-semibold !leading-none text-foreground lg:text-base lg:!leading-none xl:text-base xl:!leading-none">
          <PencilLineIcon className="size-5 stroke-[1.5]" />
          Diary Entries
        </SubSectionHeading>
        <Paragraph className="border-l-2 border-input px-5 py-0.5 pr-0 text-xl font-semibold !leading-none text-foreground lg:text-xl">
          {publicUserStats.data.diaryEntries}
        </Paragraph>
      </div>
      <div className="flex flex-col items-start justify-start gap-2.5">
        <SubSectionHeading
          as="h3"
          className="flex flex-row items-center justify-start gap-2.5 border-l-2 border-foreground px-5 pr-0 text-base font-semibold !leading-none text-foreground lg:text-base lg:!leading-none xl:text-base xl:!leading-none">
          <Package2Icon className="size-5 stroke-[1.5]" />
          Orders
        </SubSectionHeading>
        <Paragraph className="border-l-2 border-input px-5 py-0.5 pr-0 text-xl font-semibold !leading-none text-foreground lg:text-xl">
          {publicUserStats.data.orders}
        </Paragraph>
      </div>
    </div>
  );
};

export const PublicProfile = function PublicProfile({ user }: { user: User }) {
  return (
    <div className="space-y-10">
      <div className="flex flex-col items-start gap-5 sm:flex-row">
        <UserAvatar
          user={user}
          size="user-avatar"
          className="w-24"
          fallbackClassName="text-3xl font-light md:text-5xl"
        />
        <div className="flex-1">
          <div className="mb-5 flex items-center gap-2.5">
            <SectionHeading
              as="h1"
              className="text-3xl font-semibold !leading-none lg:text-3xl lg:!leading-none xl:text-3xl xl:!leading-none">
              {user.firstName && user.lastName
                ? `${user.firstName} ${user.lastName}`
                : user.firstName || "Anonymous User"}
            </SectionHeading>
          </div>
          <PublicProfileStats user={user} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {user.privacySettings.showEmail ? (
          <div className="flex items-center gap-2.5">
            <MailIcon className="h-5 w-5 stroke-[1.5] text-foreground" />
            <Paragraph className="text-base font-medium !leading-none text-foreground lg:text-base">
              <span className="sr-only">Email:</span> {user.email}
            </Paragraph>
          </div>
        ) : null}
        <div className="flex items-center gap-2.5">
          <CalendarDaysIcon className="mb-0.5 h-5 w-5 stroke-[1.5] text-foreground" />
          <Paragraph className="text-base font-medium !leading-none text-foreground lg:text-base">
            Joined on {format(new Date(user.createdAt), "MMMM d, yyyy")}
          </Paragraph>
        </div>
      </div>

      {user.bio && (
        <div className="space-y-2.5">
          <SubSectionHeading
            as="h3"
            className="text-lg font-semibold !leading-none tracking-normal lg:text-lg lg:!leading-none xl:text-lg xl:!leading-none">
            Biography
          </SubSectionHeading>
          <Paragraph className="text-base lg:text-base">{user.bio}</Paragraph>
        </div>
      )}

      <ProfileInfoSocial linksSocial={user.linksSocial} />

      <ProfileInfoRoles roles={user.roles} />

      <ProfileNavigation
        items={[
          {
            key: "comments",
            href: `/user/${user.id}/comments`,
            label: "Comments",
            icon: MessagesSquareIcon,
          },
          {
            key: "diary-entries",
            href: `/user/${user.id}/diary-entries`,
            label: "Diary Entries",
            icon: PencilLineIcon,
          },
          ...(user.privacySettings.showOrders
            ? [
                {
                  key: "orders",
                  href: `/user/${user.id}/orders`,
                  label: "Orders",
                  icon: Package2Icon,
                },
              ]
            : []),
          ...(user.privacySettings.showAchievements
            ? [
                {
                  key: "achievements",
                  href: `/user/${user.id}/achievements`,
                  label: "Achievements",
                  icon: TrophyIcon,
                },
              ]
            : []),
          ...(user.privacySettings.showActivity
            ? [
                {
                  key: "activity",
                  href: `/user/${user.id}/activity`,
                  label: "Activity",
                  icon: ActivityIcon,
                },
              ]
            : []),
        ]}
      />
    </div>
  );
};
