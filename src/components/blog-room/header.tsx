// REVIEWED - 02

import {
  ExternalLinkIcon,
  GlobeIcon,
  UserIcon,
  UserPenIcon,
} from "lucide-react";
import Link from "next/link";
import { ElementType } from "react";

import { isObject } from "@/lib/types/guards";
import { cn } from "@/lib/utils/styles";
import { BlogsRoom, User } from "@/payload-types";

import { Paragraph, SectionHeading } from "../globals/typography";
import { Button } from "../ui/button";

import { BlogRoomHeaderAvatar } from "./header-avatar";

export const BlogRoomHeaderIcon = function BlogRoomHeaderIcon({
  color,
  Icon,
}: {
  color: BlogsRoom["color"];
  Icon: ElementType;
}) {
  return (
    <div
      className={cn("flex h-10 w-10 items-center justify-center border", {
        "border-red-500/20 bg-red-500/20": color === "red",
        "border-yellow-500/20 bg-yellow-500/20": color === "yellow",
        "border-green-500/20 bg-green-500/20": color === "green",
        "border-teal-500/20 bg-teal-500/20": color === "teal",
        "border-blue-500/20 bg-blue-500/20": color === "blue",
      })}>
      <Icon className="stroke[1.5] size-5 shrink-0" />
    </div>
  );
};

export const BlogRoomHeader = function BlogRoomHeader({
  room,
}: {
  room: BlogsRoom;
}) {
  const authors =
    room.authors?.filter((author): author is User => isObject(author)) || [];

  return (
    <header className="flex flex-col items-center justify-center">
      <BlogRoomHeaderAvatar room={room} />
      <SectionHeading as="h1" className="mb-10 text-center">
        {room.name}
      </SectionHeading>
      <div className="grid grid-cols-1 items-start gap-5 sm:grid-cols-2 lg:flex lg:flex-row lg:justify-center lg:gap-20">
        <div className="flex items-center justify-start gap-2.5 [&_*]:font-[inherit]">
          <BlogRoomHeaderIcon color={room.color} Icon={GlobeIcon} />
          <Paragraph className="text-base font-medium text-foreground lg:text-lg">
            {room.language === "arabic"
              ? "هذه المدونة باللغة العربية"
              : "This blog room is in English"}
          </Paragraph>
        </div>

        {isObject(room.roomOwner) ? (
          <div className="flex items-center justify-start gap-2.5 [&_*]:font-[inherit]">
            <BlogRoomHeaderIcon color={room.color} Icon={UserIcon} />
            <Paragraph className="text-base font-medium text-foreground lg:text-lg">
              {room.language === "arabic" ? "مالك المدونة" : "Owned by"}{" "}
              <Button
                variant="link"
                className="p-0 !font-[Gilroy] text-foreground"
                style={{ fontSize: "inherit" }}
                dir="ltr"
                asChild>
                <Link href={`/user/${room.roomOwner.id}`}>
                  <ExternalLinkIcon />
                  {room.roomOwner.firstName}
                </Link>
              </Button>
            </Paragraph>
          </div>
        ) : null}

        {authors.length !== 0 ? (
          <div className="flex flex-col items-start justify-start gap-2.5">
            <div className="flex items-center justify-start gap-2.5 [&_*]:font-[inherit]">
              <BlogRoomHeaderIcon color={room.color} Icon={UserPenIcon} />
              <Paragraph className="text-base font-medium text-foreground lg:text-lg">
                {room.language === "arabic" ? "مؤلفو المدونة" : "Blog Authors"}{" "}
              </Paragraph>
            </div>
            <div
              dir="ltr"
              className="flex w-full flex-col items-start justify-start gap-2.5">
              {authors.map((author) => (
                <Button
                  key={author.id}
                  variant="link"
                  className="p-0 !font-[Gilroy] text-base font-medium leading-none text-foreground lg:text-lg"
                  dir="ltr"
                  asChild>
                  <Link href={`/user/${author.id}`}>
                    <ExternalLinkIcon />
                    {author.firstName}
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
};
