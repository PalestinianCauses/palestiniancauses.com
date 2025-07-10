// REVIEWED - 09

import Image from "next/image";
import { PropsWithChildren } from "react";

import { withAuthenticationPreFetch } from "@/components/auth/providers";
import { Container } from "@/components/globals/container";

const AuthLayout = async function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex h-full max-h-screen min-h-[48rem] items-center justify-center">
      <Container className="relative">
        <Image
          src="/logo-primary.png"
          alt="PalestinianCauses Logo"
          priority
          fill
          sizes="3rem"
          className="!static mx-auto mb-6 !h-auto !w-24 object-cover"
        />
        <main className="mx-auto flex h-full max-w-lg flex-col items-stretch justify-center">
          {children}
        </main>
      </Container>
    </div>
  );
};

export default withAuthenticationPreFetch(AuthLayout);
