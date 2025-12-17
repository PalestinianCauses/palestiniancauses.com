"use client";

// REVIEWED

import { ArrowUpRightIcon, GlobeIcon, UserIcon } from "lucide-react";
import { useState } from "react";

import { isObject } from "@/lib/types/guards";
import { getMediaAltText, getMediaURL } from "@/lib/utils/media";
import { BlogsRoom } from "@/payload-types";

import { SuspenseAvatar } from "../globals/suspense-avatar";
import { Paragraph, SectionHeading } from "../globals/typography";
import { InformationBadges } from "../room/globals";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

export const BlogRoomListItem = function BlogRoomListItem({
  room,
}: {
  room: BlogsRoom;
}) {
  const [isAvatarLoading, setIsAvatarLoading] = useState(
    Boolean(isObject(room.roomOwner) ? room.roomOwner.avatar : undefined),
  );

  return (
    <div
      className="group relative flex flex-col items-start justify-start gap-10 py-10 sm:flex-row [&_*]:font-[inherit]"
      style={{
        direction: room.language === "arabic" ? "rtl" : "ltr",
        fontFamily: room.language === "arabic" ? "ShamelSansOne" : "Gilroy",
      }}>
      <div className="absolute left-0 top-0 flex w-full items-center justify-start gap-2.5">
        <div className="h-px w-5 shrink-0 bg-foreground" />
        <div className="h-px w-full bg-input/50" />
      </div>
      <div>
        <SuspenseAvatar
          className="aspect-square size-16 border border-input"
          isLoading={isAvatarLoading}
          isLoadingProps={{
            className: "relative aspect-square w-full",
            children: <Skeleton className="absolute inset-0 h-full w-full" />,
          }}
          avatarImageProps={{
            src:
              getMediaURL(
                isObject(room.roomOwner) ? room.roomOwner.avatar : undefined,
              ) || undefined,
            alt:
              getMediaAltText(
                isObject(room.roomOwner) ? room.roomOwner.avatar : undefined,
              ) || "Comments's User's Avatar",
            className: "object-cover object-center",
            onLoad: () => setIsAvatarLoading(false),
            onError: () => setIsAvatarLoading(false),
          }}
          avatarFallbackProps={{
            children: isObject(room.roomOwner)
              ? room.roomOwner.firstName?.charAt(0).toUpperCase()
              : "A",
            className: "text-2xl xl:text-3xl text-foreground bg-background",
            style: { fontFamily: "Gilroy" },
          }}
        />
      </div>
      <div className="flex flex-col items-start justify-start">
        <InformationBadges
          className="mb-5"
          badges={[
            {
              icon: GlobeIcon,
              label:
                room.language === "arabic"
                  ? "هذه المدونة باللغة العربية"
                  : "This blog room is in English",
            },
            {
              icon: UserIcon,
              label:
                // eslint-disable-next-line prefer-template
                "+" +
                String(room.authors?.length || 1) +
                " " +
                (room.language === "arabic" ? "مؤلفون" : "Authors"),
            },
          ]}
        />
        <SectionHeading as="h2" className="mb-5">
          {room.name}
        </SectionHeading>
        <Paragraph className="mb-10 line-clamp-4">{room.description}</Paragraph>
        <Button>
          <ArrowUpRightIcon />
          {room.language === "arabic"
            ? "إستكشف وإستعرض المزيد"
            : "Discover and explore more"}
        </Button>
      </div>
    </div>
  );
};
