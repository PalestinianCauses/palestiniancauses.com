// REVIEWED - 01
import { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/globals/container";
import {
  Paragraph,
  SectionHeading,
  SectionHeadingBadge,
  SubSectionHeading,
} from "@/components/globals/typography";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Returns Policy",
  description: "PalestinianCauses LLC: Returns Policy",
};

export default function ReturnsPolicyPage() {
  return (
    <main className="relative py-32 xl:py-48">
      <Container className="max-w-4xl">
        <SectionHeading className="mb-6">Returns Policy.</SectionHeading>
        <SectionHeadingBadge className="mb-4">
          This policy is effective as of January 9, 2025
        </SectionHeadingBadge>
        <SectionHeadingBadge className="mb-12">
          Last updated: January 9, 2025
        </SectionHeadingBadge>
        <div className="flex flex-col items-start justify-start gap-8">
          <Paragraph>
            We understand there may be a time to return a purchase, and we aim
            to make the return process as simple as possible.
          </Paragraph>
          <Paragraph>
            If you want to return or exchange your order, we offer returns
            within 30 days of purchase. You can return your product for store
            credit or a refund using the original payment method.
          </Paragraph>
          <Paragraph>
            Please note: All returned items must be in new and unused condition,
            with the original tags and labels attached.
          </Paragraph>
          <SubSectionHeading>Return Process.</SubSectionHeading>
          <Paragraph>
            To return an item, email us at{" "}
            <span>
              <Button
                variant="link"
                className="p-0 text-lg/9 font-medium text-foreground"
                style={{ fontSize: "inherit" }}
                asChild>
                <Link href="mailto:hello@palestiniancauses.com">
                  hello@palestiniancauses.com
                </Link>
              </Button>
            </span>{" "}
            with your Order Number and return reason, and our support team will
            be happy to assist you with the next steps.
          </Paragraph>
          <SubSectionHeading>Refunds.</SubSectionHeading>
          <Paragraph>
            After receiving your item/s and inspecting the condition, we will
            process your refund or exchange. Please allow at least 3 days from
            receiving your item/s to process your return.
          </Paragraph>
          <SubSectionHeading>Questions.</SubSectionHeading>
          <Paragraph>
            For questions about our returns policy, please contact us at{" "}
            <span>
              <Button
                variant="link"
                className="p-0 text-lg/9 font-medium text-foreground"
                style={{ fontSize: "inherit" }}
                asChild>
                <Link href="mailto:hello@palestiniancauses.com">
                  hello@palestiniancauses.com
                </Link>
              </Button>
            </span>{" "}
            .
          </Paragraph>
        </div>
      </Container>
    </main>
  );
}
