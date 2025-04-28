// REVIEWED - 02
import { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/globals/container";
import { MotionOl } from "@/components/globals/motion";
import {
  Paragraph,
  SectionHeading,
  SectionHeadingBadge,
  SubSectionHeading,
} from "@/components/globals/typography";
import { Button } from "@/components/ui/button";
import { motions } from "@/lib/motion";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "PalestinianCauses LLC: Terms of Service",
};

export default function TermsOfServicePage() {
  return (
    <main className="relative py-32 xl:py-48">
      <Container className="max-w-4xl">
        <SectionHeading className="mb-6">Terms of Service.</SectionHeading>
        <SectionHeadingBadge className="mb-4">
          This policy is effective as of January 9, 2025
        </SectionHeadingBadge>
        <SectionHeadingBadge className="mb-12">
          Last updated: January 9, 2025
        </SectionHeadingBadge>
        <div className="flex flex-col items-start justify-start gap-8 text-xl font-normal !leading-relaxed text-muted-foreground lg:text-2xl [&_strong]:font-medium [&_strong]:text-foreground">
          <Paragraph>
            These Terms of Service govern your use of the website at{" "}
            <span>
              <Button
                variant="link"
                className="p-0 font-medium text-foreground"
                style={{ fontSize: "inherit" }}
                asChild>
                <Link href="https://palestiniancauses.com">
                  palestiniancauses.com
                </Link>
              </Button>
            </span>{" "}
            and any related services provided by PalestinianCauses LLC.
          </Paragraph>
          <Paragraph>
            By accessing{" "}
            <span>
              <Button
                variant="link"
                className="p-0 font-medium text-foreground"
                style={{ fontSize: "inherit" }}
                asChild>
                <Link href="https://palestiniancauses.com">
                  palestiniancauses.com
                </Link>
              </Button>
            </span>
            , you agree to abide by these Terms of Service and to comply with
            all applicable laws and regulations. Suppose you do not agree with
            these Terms of Service. In that case, you are prohibited from using
            or accessing this website or any other services provided by
            PalestinianCauses LLC.
          </Paragraph>
          <Paragraph>
            We, PalestinianCauses LLC, reserve the right to review and amend any
            of these Terms of Service at our sole discretion. Upon doing so, we
            will update this page. Any changes to these Terms of Service will
            take effect immediately after publication.
          </Paragraph>
          <Paragraph>
            These Terms of Service were last updated on January 9, 2025.
          </Paragraph>
          <SubSectionHeading>Limitations of Use.</SubSectionHeading>
          <Paragraph>
            By using this website, you warrant on behalf of yourself, your
            users, and other parties you represent that you will not:
          </Paragraph>
          <MotionOl
            viewport={{ once: true }}
            initial={motions.fadeIn.initial}
            whileInView={motions.fadeIn.whileInView}
            transition={motions.transition({})}
            className="flex list-decimal flex-col items-start justify-start gap-3">
            <li>
              Modify, copy, prepare derivative works of, decompile, or reverse
              engineer any materials and software on this website.
            </li>
            <li>
              Remove copyright or other proprietary notations from any materials
              and software on this website.
            </li>
            <li>
              Transfer the materials to another person or &ldquo;mirror&ldquo;
              the materials on any other server.
            </li>
            <li>
              Knowingly or negligently use this website or any of its associated
              services in a way that abuses or disrupts our networks or any
              other service PalestinianCauses LLC provides.
            </li>
            <li>
              Use this website or related services to transmit or publish
              harassing, indecent, obscene, fraudulent, or unlawful material.
            </li>
            <li>
              Use this website or its associated services in violation of any
              applicable laws or regulations.
            </li>
            <li>
              Use this website in conjunction with sending unauthorized
              advertising or spam.
            </li>
            <li>
              Harvest, collect, or gather user data without the user&apos;s
              consent.
            </li>
            <li>
              Use this website or its associated services in such a way that may
              infringe the privacy, intellectual property rights, or other
              rights of third parties.
            </li>
          </MotionOl>
          <SubSectionHeading>Intellectual Property.</SubSectionHeading>
          <Paragraph>
            The intellectual property in the materials contained in this website
            are owned by or licensed to PalestinianCauses LLC and are protected
            by applicable copyright and trademark law. We grant our users
            permission to download one copy of the materials for personal,
            non-commercial transitory use.
          </Paragraph>
          <Paragraph>
            This constitutes the grant of a license, not a transfer of title.
            This license shall automatically terminate if you violate any of
            these restrictions or the Terms of Service and may be terminated by
            PalestinianCauses LLC at any time.
          </Paragraph>
          <SubSectionHeading>User-Generated Content.</SubSectionHeading>
          <Paragraph>
            You retain your intellectual property ownership rights over the
            content you submit to us for publication on our website. We will
            never claim ownership of your content, but we require your license
            to use it.
          </Paragraph>
          <Paragraph>
            When you use our website or its associated services to post, upload,
            share, or otherwise transmit content covered by intellectual
            property rights, you grant to us a non-exclusive, royalty-free,
            transferable, sub-licensable, worldwide license to use, distribute,
            modify, run, copy, publicly display, translate, or otherwise create
            derivative works of your content in a manner that is consistent with
            your privacy preferences and our Privacy Policy.
          </Paragraph>
          <Paragraph>
            The license you grant us can be terminated anytime by deleting your
            content or account. However, to the extent that we (or our partners)
            have used your content in connection with commercial or sponsored
            content, the license will continue until we have discontinued the
            relevant commercial or post.
          </Paragraph>
          <Paragraph>
            You permit us to use your username and other identifying information
            associated with your account in a manner consistent with your
            privacy preferences and our Privacy Policy.
          </Paragraph>
          <SubSectionHeading>Liability.</SubSectionHeading>
          <Paragraph>
            Our website and the materials on our website are provided on an
            &apos;as is&apos; basis. To the extent permitted by law,
            PalestinianCauses LLC makes no warranties, expressed or implied, and
            hereby disclaims and negates all other warranties, including,
            without limitation, implied warranties or conditions of
            merchantability, fitness for a particular purpose, or
            non-infringement of intellectual property, or other violation of
            rights.
          </Paragraph>
          <Paragraph>
            In no event shall PalestinianCauses LLC or its suppliers be liable
            for any consequential loss suffered or incurred by you or any third
            party arising from the use or inability to use this website or the
            materials on this website, even if PalestinianCauses LLC or an
            authorized representative has been notified, orally or in writing,
            of the possibility of such damage.
          </Paragraph>
          <Paragraph>
            In the context of this agreement, &ldquo;consequential loss&ldquo;
            includes any consequential loss, indirect loss, actual or
            anticipated loss of profit, loss of benefit, loss of revenue, loss
            of business, loss of goodwill, loss of opportunity, loss of savings,
            loss of reputation, loss of use and/or loss or corruption of data,
            whether under statute, contract, equity, tort (including
            negligence), indemnity or otherwise.
          </Paragraph>
          <Paragraph>
            Because some jurisdictions do not allow limitations on implied
            warranties or limitations of liability for consequential or
            incidental damages, these limitations may not apply to you.
          </Paragraph>
          <SubSectionHeading>Accuracy of Materials.</SubSectionHeading>
          <Paragraph>
            The materials appearing on our website are not comprehensive and are
            for general information purposes only. PalestinianCauses LLC does
            not warrant or make any representations concerning the accuracy,
            likely results, or reliability of the use of the materials on this
            website or otherwise relating to such materials or on any resources
            linked to this website.
          </Paragraph>
          <SubSectionHeading>Links.</SubSectionHeading>
          <Paragraph>
            PalestinianCauses LLC has not reviewed all of the sites linked to
            its website and is not responsible for the contents of any such
            linked site. The inclusion of any link does not imply endorsement,
            approval, or control by PalestinianCauses LLC of the site. Use of
            any such linked site is at your own risk, and we strongly advise you
            to conduct your investigations concerning the suitability of those
            sites.
          </Paragraph>
          <SubSectionHeading>Right to Terminate.</SubSectionHeading>
          <Paragraph>
            We may suspend or terminate your right to use our website and
            terminate these Terms of Service immediately upon written notice for
            any breach.
          </Paragraph>
          <SubSectionHeading>Severance.</SubSectionHeading>
          <Paragraph>
            Any term of these Terms of Service that is wholly or partially void
            or unenforceable is severed to the extent that it is void or
            unenforceable. The validity of the remainder of these Terms of
            Service is not affected.
          </Paragraph>
          <SubSectionHeading>Governing Law.</SubSectionHeading>
          <Paragraph>
            These Terms of Service are governed by and construed by the laws of
            the USA. You irrevocably submit to the exclusive jurisdiction of the
            courts in that state or location.
          </Paragraph>
        </div>
      </Container>
    </main>
  );
}
