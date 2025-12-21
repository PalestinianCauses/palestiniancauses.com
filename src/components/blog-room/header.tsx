// REVIEWED - 01

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
        "border-red-500/10 bg-red-500/10": color === "red",
        "bg-yellow-500": color === "yellow",
        "bg-green-500": color === "green",
        "bg-teal-500": color === "teal",
        "bg-blue-500": color === "blue",
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
              className="flex w-full flex-col items-start justify-start gap-0.5">
              {authors.map((author) => (
                <Paragraph
                  key={author.id}
                  className="text-base font-medium text-foreground lg:text-lg">
                  <Button
                    variant="link"
                    className="p-0 !font-[Gilroy] text-foreground"
                    style={{ fontSize: "inherit" }}
                    asChild>
                    <Link href={`/user/${author.id}`}>
                      <ExternalLinkIcon />
                      {author.firstName}
                    </Link>
                  </Button>
                </Paragraph>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
};
