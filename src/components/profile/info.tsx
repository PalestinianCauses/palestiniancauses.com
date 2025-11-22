"use client";

// REVIEWED

import { format } from "date-fns";
import {
  CalendarDaysIcon,
  ExternalLinkIcon,
  MailIcon,
  UserIcon,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import {
  RiGithubFill,
  RiGlobalFill,
  RiInstagramFill,
  RiLinkedinFill,
  RiTwitterXFill,
} from "react-icons/ri";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@/hooks/use-user";
import { isObject } from "@/lib/types/guards";
import { getMediaAltText, getMediaURL } from "@/lib/utils/media";
import { cn } from "@/lib/utils/styles";

import { SuspenseAvatar } from "../globals/suspense-avatar";
import { Paragraph, SubSectionHeading } from "../globals/typography";

export const ProfileInfo = function ProfileInfo() {
  const { isLoading, data: user } = useUser();

  const [isAvatarLoading, setIsAvatarLoading] = useState(Boolean(user?.avatar));

  if (isLoading) {
    return (
      <div className="space-y-5">
        <Skeleton className="h-32 w-full bg-foreground/5" />
        <Skeleton className="h-64 w-full bg-foreground/5" />
      </div>
    );
  }

  if (!user)
    return (
      <Card className="border-input">
        <CardHeader>
          <CardTitle>Authentication Required</CardTitle>
          <CardDescription>
            Kindly sign in to access and explore your personal profile details.
            We look forward to welcoming you.
          </CardDescription>
        </CardHeader>
      </Card>
    );

  const avatarURL = getMediaURL(user.avatar);
  const avatarAlt = getMediaAltText(user.avatar) || "Profile picture";

  return (
    <div className="space-y-10">
      <div className="flex flex-col items-start gap-2.5 xs:flex-row xs:items-center xs:gap-5">
        <SuspenseAvatar
          className="h-24 w-24 border border-input"
          isLoading={isAvatarLoading}
          isLoadingProps={{
            className: "relative aspect-square w-full",
            children: <Skeleton className="absolute inset-0 h-full w-full" />,
          }}
          avatarImageProps={{
            src: avatarURL || undefined,
            alt: avatarAlt,
            onLoad: () => setIsAvatarLoading(false),
            onError: () => setIsAvatarLoading(false),
          }}
          avatarFallbackProps={{
            children: user.firstName ? user.firstName.charAt(0) : "A",
            className:
              "text-3xl lg:text-4xl xl:text-5xl text-sidebar-primary bg-background",
          }}
        />
        <div className="flex-1">
          <div className="mb-0.5 flex items-center gap-2.5">
            <SubSectionHeading
              as="h2"
              className="text-xl !leading-none lg:text-xl lg:!leading-none xl:text-xl xl:!leading-none">
              {user.firstName && user.lastName
                ? `${user.firstName} ${user.lastName}`
                : user.firstName || "Anonymous User"}
            </SubSectionHeading>
            <Button variant="ghost" size="icon" asChild>
              <Link href={`/user/${user.id}`}>
                <ExternalLinkIcon />
                <span className="sr-only">View public profile</span>
              </Link>
            </Button>
          </div>
          {user.accountVerified ? (
            <Badge
              size="sm"
              className={cn(
                "border border-tertiary-2/10 bg-tertiary-2/10 px-2 py-1 text-xs text-tertiary-2 ring-0 hover:bg-tertiary-2/10",
              )}>
              Account has been verified
            </Badge>
          ) : (
            <Badge
              size="sm"
              className={cn(
                "border border-secondary/10 bg-secondary/10 px-2 py-1 text-xs text-secondary ring-0 hover:bg-secondary/10",
              )}>
              Account has not been verified yet
            </Badge>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex items-center gap-2.5">
          <MailIcon className="h-5 w-5 stroke-[1.5] text-foreground" />
          <Paragraph className="text-base font-medium !leading-none text-foreground lg:text-base">
            <span className="sr-only">Email:</span> {user.email}
          </Paragraph>
        </div>
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

      {user.linksSocial &&
        (user.linksSocial.github ||
          user.linksSocial.twitter ||
          user.linksSocial.instagram ||
          user.linksSocial.linkedin ||
          user.linksSocial.website) && (
          <div className="space-y-5">
            <SubSectionHeading
              as="h3"
              className="text-lg font-semibold !leading-none tracking-normal lg:text-lg lg:!leading-none xl:text-lg xl:!leading-none">
              Social Links
            </SubSectionHeading>
            <div className="flex flex-wrap gap-2.5">
              {user.linksSocial.github && (
                <Button variant="outline" className="gap-2.5" asChild>
                  <Link href={user.linksSocial.github}>
                    <RiGithubFill />
                    GitHub
                  </Link>
                </Button>
              )}

              {user.linksSocial.twitter && (
                <Button variant="outline" className="gap-2.5" asChild>
                  <Link href={user.linksSocial.twitter}>
                    <RiTwitterXFill />
                    Twitter
                  </Link>
                </Button>
              )}

              {user.linksSocial.instagram && (
                <Button variant="outline" className="gap-2.5" asChild>
                  <Link href={user.linksSocial.instagram}>
                    <RiInstagramFill />
                    Instagram
                  </Link>
                </Button>
              )}

              {user.linksSocial.linkedin && (
                <Button variant="outline" className="gap-2.5" asChild>
                  <Link href={user.linksSocial.linkedin}>
                    <RiLinkedinFill />
                    LinkedIn
                  </Link>
                </Button>
              )}

              {user.linksSocial.website && (
                <Button variant="outline" className="gap-2.5" asChild>
                  <Link href={user.linksSocial.website}>
                    <RiGlobalFill />
                    Website
                  </Link>
                </Button>
              )}
            </div>
          </div>
        )}

      <div className="space-y-5">
        <SubSectionHeading
          as="h3"
          className="text-lg font-semibold !leading-none tracking-normal lg:text-lg lg:!leading-none xl:text-lg xl:!leading-none">
          Roles and Permissions
        </SubSectionHeading>
        <div className="flex flex-wrap gap-2.5">
          {user.roles.map((role) =>
            isObject(role) ? (
              <Badge
                key={role.id}
                size="sm"
                className={cn(
                  "border-l-2 border-tertiary bg-tertiary/10 text-sm capitalize text-tertiary ring-0 hover:bg-tertiary/10",
                )}>
                <UserIcon className="size-4" />
                {role.name.split("-").join(" ")}
              </Badge>
            ) : null,
          )}
        </div>
      </div>
    </div>
  );
};
