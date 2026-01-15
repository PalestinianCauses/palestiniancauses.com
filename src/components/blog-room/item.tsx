"use client";

// REVIEWED - 03

import { ArrowUpRightIcon, GlobeIcon, UserIcon } from "lucide-react";
import Link from "next/link";

import { isObject } from "@/lib/types/guards";
import { BlogsRoom } from "@/payload-types";

import { Paragraph, SectionHeading } from "../globals/typography";
import { UserAvatar } from "../globals/user-avatar";
import { InformationBadges } from "../room/globals";
import { Button } from "../ui/button";

export const BlogRoomListItem = function BlogRoomListItem({
  room,
}: {
  room: BlogsRoom;
}) {
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
        {isObject(room.roomOwner) ? (
          <UserAvatar
            user={room.roomOwner}
            size="user-avatar"
            className="w-16"
            fallbackClassName="!font-[Gilroy]"
          />
        ) : null}
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
        <Button asChild>
          <Link href={`/blogs/${room.slug}`}>
            <ArrowUpRightIcon />
            {room.language === "arabic"
              ? "إستكشف وإستعرض المزيد"
              : "Discover and explore more"}
          </Link>
        </Button>
      </div>
    </div>
  );
};
