// REVIEWED - 02
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
  title: "Cookie Policy",
  description: "PalestinianCauses LLC: Cookie Policy",
};

export default function CookiePolicyPage() {
  return (
    <main className="relative py-32 xl:py-48">
      <Container className="max-w-4xl">
        <SectionHeading className="mb-6">Cookie Policy.</SectionHeading>
        <SectionHeadingBadge className="mb-4">
          This policy is effective as of January 9, 2025
        </SectionHeadingBadge>
        <SectionHeadingBadge className="mb-12">
          Last updated: January 9, 2025
        </SectionHeadingBadge>
        <div className="flex flex-col items-start justify-start gap-8">
          <Paragraph>
            We use cookies to help improve your experience of our website at{" "}
            <span>
              <Button
                variant="link"
                className="p-0 font-medium text-foreground"
                style={{ fontSize: "inherit" }}
                asChild>
                <Link href="https://www.palestiniancauses.com">
                  palestiniancauses.com
                </Link>
              </Button>
            </span>
            . This cookie policy is part of PalestinianCauses LLC&apos;s privacy
            policy. It covers the use of cookies between your device and our
            site.
          </Paragraph>
          <Paragraph>
            We also provide basic information on third-party services we may
            use, who may also use cookies as part of their service. This policy
            does not cover their cookies.
          </Paragraph>
          <Paragraph>
            If you don&apos;t wish to accept cookies from us, you should
            instruct your browser to refuse cookies from{" "}
            <span>
              <Button
                variant="link"
                className="p-0 font-medium text-foreground"
                style={{ fontSize: "inherit" }}
                asChild>
                <Link href="https://www.palestiniancauses.com">
                  palestiniancauses.com
                </Link>
              </Button>
            </span>
            . In such a case, we may be unable to provide you with some of your
            desired content and services.
          </Paragraph>
          <SubSectionHeading>What is a cookie?</SubSectionHeading>
          <Paragraph>
            A cookie is a small piece of data that a website stores on your
            device when you visit. It typically contains information about the
            website itself, a unique identifier that allows the site to
            recognize your web browser when you return, additional data that
            serves the cookie&apos;s purpose, and the cookie&apos;s lifespan.
          </Paragraph>
          <Paragraph>
            Cookies are used to enable certain features (e.g., logging in),
            track site usage (e.g., analytics), store your user settings (e.g.,
            time zone, notification preferences), and personalize your content
            (e.g., advertising, language).
          </Paragraph>
          <Paragraph>
            Cookies set by the website you visit are usually called first-party
            cookies. They typically only track your activity on that particular
            site.
          </Paragraph>
          <Paragraph>
            Cookies set by other sites and companies (i.e., third parties) are
            called third-party cookies. They can track you on other websites
            that use the same third-party service.
          </Paragraph>
          <SubSectionHeading>
            How Can You Control Our Website&apos;s Use of Cookies?
          </SubSectionHeading>
          <Paragraph>
            You can decide whether to accept or reject cookies on our website.
            You can manage your cookie preferences in our Cookie Consent
            Manager. The Cookie Consent Manager allows you to select which
            categories of cookies you accept or reject. Essential cookies can
            not be dismissed as they are strictly necessary to provide you with
            the services on our website.
          </Paragraph>
          <Paragraph>
            You can also set or amend your cookie preferences by managing your
            web browser settings. As each web browser is different, please
            consult the instructions provided by your web browser (typically in
            the &ldquo;help&ldquo; section). You may still use the website if
            you refuse to use it or turn off cookies. However, some of its
            functionality may not be available to you.
          </Paragraph>
          <SubSectionHeading>
            How Often Will We Update This Cookie Policy?
          </SubSectionHeading>
          <Paragraph>
            We may update this Cookie Policy occasionally to reflect any changes
            to the cookies and related technologies we use or for other
            operational, legal, or regulatory reasons.
          </Paragraph>
          <Paragraph>
            Each time you use our website, the current version of the Cookie
            Policy will apply. When you use our website, you should check the
            date of this Cookie Policy (which appears at the top of this
            document) and review any changes since the last version.
          </Paragraph>
          <SubSectionHeading>
            Where Can You Obtain Further Information?
          </SubSectionHeading>
          <Paragraph>
            For any questions or concerns regarding our Cookie Policy, you may
            contact us using the following details:
          </Paragraph>
          <Paragraph>
            PalestinianCauses resolution team{" "}
            <span>
              <Button
                variant="link"
                className="p-0 font-medium text-foreground"
                style={{ fontSize: "inherit" }}
                asChild>
                <Link href="mailto:hello@palestiniancauses.com">
                  hello@palestiniancauses.com
                </Link>
              </Button>
            </span>
            .
          </Paragraph>
        </div>
      </Container>
    </main>
  );
}
