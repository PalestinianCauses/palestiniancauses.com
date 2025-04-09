// REVIEWED - 04

import Image from "next/image";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

import { getAuth } from "@/actions/auth";
import { Container } from "@/components/globals/container";
import { MotionDiv } from "@/components/globals/motion";
import { motions } from "@/lib/motion";

export default async function AuthLayout({ children }: PropsWithChildren) {
  const auth = await getAuth();

  if (auth) if (auth.user) redirect("/");

  return (
    <div className="flex h-full max-h-screen min-h-[48rem] items-center justify-center">
      <Container>
        <MotionDiv
          initial={motions.fadeIn.initial}
          animate={motions.fadeIn.whileInView}
          transition={motions.transition({ duration: "fast" })}>
          <Image
            src="/pc-logo-primary-foreground.png"
            alt="PalestinianCauses Logo"
            sizes="3rem"
            fill
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
