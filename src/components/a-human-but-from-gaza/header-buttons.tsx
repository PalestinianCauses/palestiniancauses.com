"use client";

// REVIEWED - 04

import { ArrowRightIcon, DownloadIcon, HeartIcon } from "lucide-react";
import Link from "next/link";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import { getFreeProductFiles } from "@/actions/product";
import { motions } from "@/lib/motion";
import { Media } from "@/payload-types";

import { MotionDiv } from "../globals/motion";
import { navigation } from "../globals/navigation";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export const HeaderButtons = function HeaderButtons() {
  const [isPending, startTransition] = useTransition();
  const [files, setFiles] = useState<
    { title: string; file: Omit<Media, "url"> & { url: string } }[]
  >([]);

  return (
    <div className="flex w-full flex-col items-stretch justify-center gap-2.5 sm:w-max sm:flex-row sm:items-center sm:gap-5">
      <MotionDiv
        viewport={{ once: true }}
        initial={motions.fadeIn.initial}
        animate={motions.fadeIn.whileInView}
        transition={motions.transition({ delay: 0.4 })}
        className="w-full">
        <Popover defaultOpen={files.length > 0}>
          <PopoverTrigger asChild>
            <Button
              size="lg"
              disabled={isPending}
              className="w-full"
              onClick={() => {
                if (files.length) return;

                startTransition(async () => {
                  const responseProductFiles = await getFreeProductFiles(
                    "a-human-but-from-gaza",
                    "/a-human-but-from-gaza",
                  );

                  if (
                    !responseProductFiles.data ||
                    responseProductFiles.error
                  ) {
                    toast.error(responseProductFiles.error);
                    return;
                  }

                  setFiles(responseProductFiles.data);
                });
              }}>
              {isPending ? "Ordering..." : "Order For Free"}
              <ArrowRightIcon />
            </Button>
          </PopoverTrigger>
          {files.length > 0 && (
            <PopoverContent
              side="top"
              align="start"
              sideOffset={12}
              className="w-72 max-w-lg p-0 sm:w-[32rem]">
              <ul>
                {files.filter(Boolean).map((file) => (
                  <li key={file.file.id}>
                    <Button
                      variant="ghost"
                      size="lg"
                      className="w-full justify-between"
                      asChild>
                      <Link href={file.file.url}>
                        <span className="truncate">
                          {file.title}
                          {file.file.filesize ? (
                            <span className="ml-2 font-mono text-sm text-muted-foreground">
                              ({Math.round(file.file.filesize / 1024 / 1024)}{" "}
                              MB)
                            </span>
                          ) : null}
                        </span>
                        <DownloadIcon className="!h-5 !w-5 stroke-[1.5]" />
                      </Link>
                    </Button>
                  </li>
                ))}
              </ul>
            </PopoverContent>
          )}
        </Popover>
      </MotionDiv>
      <MotionDiv
        viewport={{ once: true }}
        initial={motions.fadeIn.initial}
        animate={motions.fadeIn.whileInView}
        transition={motions.transition({ delay: 0.5 })}
        className="w-full">
        <Button variant="outline" size="lg" className="w-full" asChild>
          <Link href={navigation[3].href}>
            Support Gazans
            <HeartIcon />
          </Link>
        </Button>
      </MotionDiv>
    </div>
  );
};
