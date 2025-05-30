// REVIEWED - 08

import Image from "next/image";
import { PropsWithChildren } from "react";

import { Container } from "@/components/globals/container";
import { MotionDiv } from "@/components/globals/motion";
import { motions } from "@/lib/motion";

export default async function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex h-full max-h-screen min-h-[48rem] items-center justify-center">
      <Container>
        <MotionDiv
          initial={motions.fadeIn.initial}
          animate={motions.fadeIn.whileInView}
          transition={motions.transition({ duration: "fast" })}
          className="relative">
          <Image
            src="/logo-primary.png"
            alt="PalestinianCauses Logo"
            priority
            fill
            sizes="3rem"
            className="!static mx-auto mb-6 !h-auto !w-24 object-cover"
          />
        </MotionDiv>
        <main className="mx-auto flex h-full max-w-lg flex-col items-stretch justify-center">
          {children}
        </main>
      </Container>
    </div>
  );
}
