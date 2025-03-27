// REVIEWED - 01

import Image from "next/image";
import { PropsWithChildren } from "react";

import { HeroBackgroundPattern } from "@/components/book/hero-background-pattern";
import { Container } from "@/components/globals/container";

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="xs:my-40 my-48">
      <HeroBackgroundPattern />
      <Container className="max-w-lg">
        <Image
          src="/pc-logo-primary-foreground.png"
          alt="PalestinianCauses Logo"
          sizes="3rem"
          fill
          className="!static mx-auto mb-10 !h-auto !w-24 object-cover"
        />
        <div className="flex flex-col items-stretch justify-center">
          {children}
        </div>
      </Container>
    </div>
  );
}
