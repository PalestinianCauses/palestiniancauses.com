// REVIEWED

import type { Metadata } from "next";

import { Container } from "@/components/globals/container";

import { ClientVerifyEmail } from "./_components/ClientVerifyEmail";

export const metadata: Metadata = {
  title: "Verify Email",
  robots: { index: false, follow: false },
};

const PageVerificationEmail = async function PageVerificationEmail({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  return (
    <Container
      as="main"
      className="section-padding-start-xl section-padding-end-xl max-w-7xl">
      <ClientVerifyEmail token={token} />
    </Container>
  );
};

export default PageVerificationEmail;
