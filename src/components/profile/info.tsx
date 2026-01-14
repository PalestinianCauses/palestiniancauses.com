// REVIEWED - 09

import { format } from "date-fns";
import {
  CalendarDaysIcon,
  ExternalLinkIcon,
  MailIcon,
  UserIcon,
} from "lucide-react";
import Link from "next/link";
import {
  RiGithubFill,
  RiGlobalFill,
  RiInstagramFill,
  RiLinkedinFill,
  RiTwitterXFill,
} from "react-icons/ri";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { isObject } from "@/lib/types/guards";
import { cn } from "@/lib/utils/styles";
import { User } from "@/payload-types";

import { Paragraph, SubSectionHeading } from "../globals/typography";
import { UserAvatar } from "../globals/user-avatar";

import { StatusBadge } from "./globals";
import { ProfileCompletion } from "./profile-completion";

export const ProfileInfoSocial = function ProfileInfoSocial({
  linksSocial,
}: {
  linksSocial: User["linksSocial"];
}) {
  return (
    linksSocial &&
    (linksSocial.github ||
      linksSocial.twitter ||
      linksSocial.instagram ||
      linksSocial.linkedin ||
      linksSocial.website) && (
      <div className="space-y-5">
        <SubSectionHeading
          as="h3"
          className="text-lg font-semibold !leading-none tracking-normal lg:text-lg lg:!leading-none xl:text-lg xl:!leading-none">
          Social Links
        </SubSectionHeading>
        <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
          {linksSocial.github && (
            <Button variant="outline" className="gap-2.5" asChild>
              <Link
                href={`https://github.com/${linksSocial.github}`}
                target="_blank">
                <RiGithubFill />
                GitHub
              </Link>
            </Button>
          )}

          {linksSocial.twitter && (
            <Button variant="outline" className="gap-2.5" asChild>
              <Link
                href={`https://x.com/${linksSocial.twitter}`}
                target="_blank">
                <RiTwitterXFill />
                Twitter/X
              </Link>
            </Button>
          )}

          {linksSocial.instagram && (
            <Button variant="outline" className="gap-2.5" asChild>
              <Link
                href={`https://instagram.com/${linksSocial.instagram}`}
                target="_blank">
                <RiInstagramFill />
                Instagram
              </Link>
            </Button>
          )}

          {linksSocial.linkedin && (
            <Button variant="outline" className="gap-2.5" asChild>
              <Link
                href={`https://linkedin.com/in/${linksSocial.linkedin}`}
                target="_blank">
                <RiLinkedinFill />
                LinkedIn
              </Link>
            </Button>
          )}

          {linksSocial.website && (
            <Button variant="outline" className="gap-2.5" asChild>
              <Link href={linksSocial.website} target="_blank">
                <RiGlobalFill />
                Website
              </Link>
            </Button>
          )}
        </div>
      </div>
    )
  );
};

export const ProfileInfoRoles = function ProfileInfoRoles({
  roles,
}: {
  roles: User["roles"];
}) {
  return (
    <div className="space-y-5">
      <SubSectionHeading
        as="h3"
        className="text-lg font-semibold !leading-none tracking-normal lg:text-lg lg:!leading-none xl:text-lg xl:!leading-none">
        Roles and Permissions
      </SubSectionHeading>
      <div className="flex flex-wrap gap-2.5">
        {roles.map((role) =>
          isObject(role) ? (
            <Badge
              key={role.id}
              size="sm"
              className={cn("border-l-2 text-sm capitalize ring-0", {
                "border-blue-500 bg-blue-500/10 text-blue-500 hover:bg-blue-500/10":
                  role.name === "admin-user",
                "border-teal-500 bg-teal-500/10 text-teal-500 hover:bg-teal-500/10":
                  role.name === "system-user",
                "border-green-500 bg-green-500/10 text-green-500 hover:bg-green-500/10":
                  role.name === "author-user",
                "border-yellow-500 bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/10":
                  role.name === "website-user",
              })}>
              <UserIcon className="size-4" />
              {role.name.split("-").join(" ")}
            </Badge>
          ) : null,
        )}
      </div>
    </div>
  );
};

export const ProfileInfo = function ProfileInfo({ user }: { user: User }) {
  return (
    <div className="space-y-10">
      <ProfileCompletion user={user} />
      <div className="flex flex-col items-start gap-2.5 xs:flex-row xs:items-center xs:gap-5">
        <UserAvatar
          user={user}
          size="user-avatar"
          className="w-24"
          fallbackClassName="text-3xl font-light md:text-5xl"
        />
        <div className="flex-1">
          <div className="mb-0.5 flex items-center gap-2.5">
            <SubSectionHeading
              as="h2"
              className="text-xl font-semibold !leading-none lg:text-xl lg:!leading-none xl:text-xl xl:!leading-none">
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
          <StatusBadge
            label={
              user.accountVerified
                ? "Account has been verified"
                : "Account has not been verified yet"
            }
            className={cn({
              "border-tertiary-2/10 bg-tertiary-2/10 text-tertiary-2 hover:bg-tertiary-2/10":
                user.accountVerified,
              "border-secondary/10 bg-secondary/10 text-secondary hover:bg-secondary/10":
                !user.accountVerified,
            })}
          />
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

      <ProfileInfoSocial linksSocial={user.linksSocial} />

      <ProfileInfoRoles roles={user.roles} />
    </div>
  );
};
