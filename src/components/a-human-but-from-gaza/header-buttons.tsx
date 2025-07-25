"use client";

// REVIEWED - 07

import { ArrowRightIcon, DownloadIcon, HeartIcon } from "lucide-react";
import Link from "next/link";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import { getProductFreeLinksExternal } from "@/actions/product";
import { messages } from "@/lib/messages";
import { Product } from "@/payload-types";

import { navigation } from "../globals/navigation";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export const HeaderButtons = function HeaderButtons() {
  const [isPending, startTransition] = useTransition();
  const [dataLinks, setDataLinks] = useState<Pick<Product, "links">>({
    links: [],
  });

  if (!dataLinks.links) return null;

  return (
    <div className="flex w-full flex-col items-stretch justify-center gap-2.5 sm:w-max sm:flex-row sm:items-center sm:gap-5">
      <div className="w-full">
        <Popover defaultOpen={dataLinks.links.length > 0 || false}>
          <PopoverTrigger asChild>
            <Button
              size="lg"
              disabled={isPending}
              className="w-full"
              onClick={() => {
                if (dataLinks && dataLinks.links && dataLinks.links.length)
                  return;

                startTransition(async () => {
                  const responseProductLinks =
                    await getProductFreeLinksExternal(
                      "a-human-but-from-gaza",
                      "/a-human-but-from-gaza",
                    );

                  if (
                    !responseProductLinks.data ||
                    !responseProductLinks.data.links ||
                    !responseProductLinks.data.links.length ||
                    responseProductLinks.error
                  ) {
                    toast.error(
                      responseProductLinks.error ||
                        messages.actions.product.external.serverError,
                    );
                    return;
                  }

                  setDataLinks(responseProductLinks.data);
                });
              }}>
              {isPending ? "Ordering..." : "Order For Free"}
              <ArrowRightIcon />
            </Button>
          </PopoverTrigger>
          {dataLinks.links.length > 0 && (
            <PopoverContent
              side="top"
              align="start"
              sideOffset={12}
              className="w-72 max-w-lg p-0 sm:w-[32rem]">
              <ul>
                {dataLinks.links.filter(Boolean).map((link) => (
                  <li key={link.id || link.url}>
                    <Button
                      variant="ghost"
                      size="lg"
                      className="w-full justify-between"
                      asChild>
                      <Link href={link.url} download={link.isFile && link.url}>
                        <span className="truncate">
                          {link.title}
                          {link.isFile && link.fileSize ? (
                            <span className="ml-2 font-mono text-sm text-muted-foreground">
                              ({Math.round(link.fileSize)} MB)
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
      </div>
      <div className="w-full">
        <Button variant="outline" size="lg" className="w-full" asChild>
          <Link href={navigation[3].href}>
            Support Gazans
            <HeartIcon />
          </Link>
        </Button>
      </div>
    </div>
  );
};
