"use client";

// REVIEWED

import { ClipboardIcon, QrCodeIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { SuspenseImage } from "@/components/globals/suspense-image";
import { SubSectionHeading } from "@/components/globals/typography";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { messages } from "@/lib/messages";
import { cn } from "@/lib/utils/styles";

export default function CryptoItem({
  index,
  name,
  address,
  qrCode,
  icon,
}: {
  index: number;
  name: string;
  address: string;
  qrCode: string;
  icon: string;
}) {
  const [isQrCodeOpen, setIsQrCodeOpen] = useState(false);

  const handleCopyAddress = async function handleCopyAddress() {
    toast.loading(messages.crypto.copy.pending, { id: "copy-address" });

    try {
      await navigator.clipboard.writeText(address);
      toast.success(messages.crypto.copy.success, { id: "copy-address" });
    } catch (error) {
      console.error("Error in `handleCopyAddress` in `CryptoItem`", error);
      toast.error(messages.crypto.copy.error, { id: "copy-address" });
    }
  };

  return (
    <li
      className={cn("flex flex-col items-center border-r border-input", {
        "xl:border-r-transparent": index === 2 || index === 5,
        "md:border-r-transparent xl:border-input":
          index === 1 || index === 3 || index === 5,
      })}>
      <div className="relative m-6 flex h-[16rem] items-center justify-center overflow-hidden lg:h-[20rem]">
        {isQrCodeOpen ? (
          <SuspenseImage
            isLoadingElement={<Skeleton className="h-full w-full" />}
            src={qrCode}
            alt={name}
            fill
            sizes="16rem"
            containerClassName="flex items-center justify-center"
            className="!static object-contain mix-blend-hard-light"
          />
        ) : (
          <SuspenseImage
            isLoadingElement={<Skeleton className="h-full w-full" />}
            src={icon}
            alt={name}
            fill
            sizes="16rem"
            className="!static object-contain"
          />
        )}
      </div>
      <SubSectionHeading small className="mb-6">
        {name}.
      </SubSectionHeading>
      <div className="flex w-full flex-col">
        <Button
          variant="default"
          size="lg"
          className="w-full bg-muted text-muted-foreground"
          onClick={() => handleCopyAddress()}>
          <ClipboardIcon className="!h-5 !w-5" /> Copy wallet address
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="w-full border-b border-input ring-0"
          onClick={() => setIsQrCodeOpen((previous) => !previous)}>
          <QrCodeIcon className="!h-5 !w-5 stroke-[1.5]" />{" "}
          {isQrCodeOpen ? "Hide" : "Show"} QR Code
        </Button>
      </div>
    </li>
  );
}
