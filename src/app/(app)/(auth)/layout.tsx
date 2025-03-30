// REVIEWED - 02

import Image from "next/image";
import { PropsWithChildren } from "react";

import { Container } from "@/components/globals/container";

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="my-48 xs:my-40">
      <Container className="max-w-lg">
        <Image
          src="/pc-logo-primary-foreground.png"
          alt="PalestinianCauses Logo"
          sizes="3rem"
          fill
          className="!static mx-auto mb-8 !h-auto !w-24 object-cover"
        />
        <div className="flex flex-col items-stretch justify-center">
          {children}
        </div>
      </Container>
    </div>
  );
}
