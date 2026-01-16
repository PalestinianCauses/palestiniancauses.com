"use client";

// REVIEWED - 01

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowUpRightIcon, MailCheckIcon, MailXIcon } from "lucide-react";
import Link from "next/link";
import { Fragment } from "react";
import { toast } from "sonner";

import { verifyEmail } from "@/actions/email-verification";
import { Loading } from "@/components/globals/loading";
import { Paragraph, SectionHeading } from "@/components/globals/typography";
import { Button } from "@/components/ui/button";

export const ClientVerifyEmail = function ClientVerifyEmail({
  token,
}: {
  token: string;
}) {
  const queryClient = useQueryClient();

  const { isLoading, data: response } = useQuery({
    queryKey: ["verify-email", token],
    queryFn: async () => {
      const responseVerifyEmail = await verifyEmail(token);

      if (!responseVerifyEmail.data || responseVerifyEmail.error)
        toast.error(responseVerifyEmail.error);
      else {
        toast.success(responseVerifyEmail.data);
        queryClient.invalidateQueries({ queryKey: ["user"] });
      }

      return responseVerifyEmail;
    },
  });

  if (!response || isLoading) return <Loading />;

  return (
    <div className="flex flex-col items-start justify-start gap-2.5">
      {response.data ? (
        <div className="mb-2.5 flex size-20 items-center justify-center border border-green-500/10 bg-green-500/10 text-green-500">
          <MailCheckIcon className="size-10 stroke-1" />
        </div>
      ) : (
        <div className="mb-2.5 flex size-20 items-center justify-center border border-red-500/10 bg-red-500/10 text-red-500">
          <MailXIcon className="size-10 stroke-1" />
        </div>
      )}
      <SectionHeading as="h1" className="max-w-md lg:max-w-xl xl:max-w-3xl">
        {response.data
          ? "Email Verification Completed"
          : "We weren't able to verify email address"}
      </SectionHeading>
      <Paragraph className="mb-5 max-w-5xl">
        {response.data ? (
          "Thank you for confirming your email address. Your account is now fully activated, granting you complete access to our platform's features. We appreciate your trust in us."
        ) : (
          <Fragment>
            {" "}
            Regrettably, we were not able to verify your email address. Please
            confirm that your verification link is correct or consider
            requesting a new one. Should you need assistance, do not hesitate to{" "}
            <Button
              variant="link"
              className="p-0"
              style={{ fontSize: "inherit" }}
              asChild>
              <Link href="mailto:hello@palestiniancauses.com">reach out</Link>
            </Button>{" "}
            to our support team.
          </Fragment>
        )}
      </Paragraph>
      <Button size="lg" asChild>
        <Link href={["/profile", "tab=settings"].join("?")}>
          <ArrowUpRightIcon />
          Profile Settings
        </Link>
      </Button>
    </div>
  );
};

export default ClientVerifyEmail;
