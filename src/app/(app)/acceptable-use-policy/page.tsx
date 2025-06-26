// REVIEWED - 02

import { Metadata } from "next";

import { Container } from "@/components/globals/container";
import {
  Paragraph,
  SectionHeading,
  SectionHeadingBadge,
  SubSectionHeading,
} from "@/components/globals/typography";

export const metadata: Metadata = {
  title: "Acceptable Use Policy",
  description: "PalestinianCauses LLC: Acceptable Use Policy",
};

export default function AcceptableUsePolicyPage() {
  return (
    <main className="relative py-32 xl:py-48">
      <Container className="max-w-4xl">
        <SectionHeading className="mb-6">Acceptable Use Policy.</SectionHeading>
        <SectionHeadingBadge className="mb-4">
          This policy is effective as of January 9, 2025
        </SectionHeadingBadge>
        <SectionHeadingBadge className="mb-12">
          Last updated: January 9, 2025
        </SectionHeadingBadge>
        <div className="flex flex-col items-start justify-start gap-8 text-xl font-normal !leading-relaxed text-muted-foreground lg:text-2xl [&_strong]:font-medium [&_strong]:text-foreground">
          <Paragraph>
            This acceptable use policy covers the products, services, and
            technologies (collectively called the &ldquo;Products&ldquo;)
            provided by PalestinianCauses LLC under any ongoing agreement.
            It&apos;s designed to protect us, our customers, and the general
            Internet community from unethical, irresponsible, and illegal
            activity.
          </Paragraph>
          <Paragraph>
            PalestinianCauses LLC customers found engaging in activities
            prohibited by this acceptable use policy can be liable for service
            suspension and account termination. In extreme cases, we may be
            legally obliged to report such customers to the relevant
            authorities.
          </Paragraph>
          <SubSectionHeading>Fair use.</SubSectionHeading>
          <Paragraph>
            We provide our facilities with the assumption that your use will be
            &ldquo;business as usual&ldquo; as per our offer schedule. If your
            use is excessive, additional fees may be charged, or capacity may be
            restricted.
          </Paragraph>
          <Paragraph>
            We are opposed to all forms of abuse, discrimination, rights
            infringement, and/or any action that harms or disadvantages any
            group, individual, or resource. We expect our customers and, where
            applicable, their users (&ldquo;end-users&ldquo;) to engage our
            products with similar intent.
          </Paragraph>
          <SubSectionHeading>Customer accountability.</SubSectionHeading>
          <Paragraph>
            We regard our customers as being responsible for their actions and
            those of anyone using our Products with the customer&apos;s
            permission. This responsibility also applies to anyone using our
            Products on an unauthorized basis due to the customer&apos;s failure
            to put reasonable security measures in place.
          </Paragraph>
          <Paragraph>
            By accepting Products from us, our customers agree to ensure
            adherence to this policy on behalf of anyone using the Products as
            their end users. Complaints regarding customer or end-user actions
            will be forwarded to the nominated contact for the account in
            question.
          </Paragraph>
          <Paragraph>
            Suppose a customer — or their end-user or anyone using our Products
            as a result of the customer — violates our acceptable use policy. In
            that case, we reserve the right to terminate any Products associated
            with the offending account or the account itself or take any
            remedial or preventative action we deem appropriate without notice.
            To the extent permitted by law, no credit will be available for
            interruptions of service resulting from violating our acceptable use
            policy.
          </Paragraph>
          <SubSectionHeading>Prohibited activities.</SubSectionHeading>
          <SubSectionHeading small as="h3">
            Copyright infringement and access to unauthorized material.
          </SubSectionHeading>
          <Paragraph>
            Our Products must not be used to transmit, distribute, or store any
            material violating applicable law, including but not limited to:
          </Paragraph>
          <Paragraph>
            Any material protected by copyright, trademark, trade secret, or
            other intellectual property right used without proper authorization
            and any obscene or defamatory material constitutes an illegal threat
            or violates export control laws.
          </Paragraph>
          <Paragraph>
            The customer is solely responsible for all material they input,
            upload, disseminate, transmit, create, or publish through or on our
            Products and for obtaining legal permission to use any works
            included in such material.
          </Paragraph>
          <SubSectionHeading small as="h3">
            SPAM and unauthorized message activity.
          </SubSectionHeading>
          <Paragraph>
            Our Products must not be used to send unsolicited bulk or commercial
            messages violating the laws and regulations applicable to your
            jurisdiction (&ldquo;spam&ldquo;), including but not limited to
            sending spam, soliciting customers from spam sent from other service
            providers, and collecting replies to spam sent from other service
            providers.
          </Paragraph>
          <Paragraph>
            Our products must not be used to run unconfirmed mailing lists or
            telephone number lists (&ldquo;messaging lists&ldquo;), including
            but not limited to subscribing email addresses or telephone numbers
            to any messaging list without the permission of the email address or
            telephone number owner and storing any email addresses or telephone
            numbers subscribed in this way. All messaging lists run on or hosted
            by our Products must be &ldquo;confirmed opt-in&ldquo;. Verification
            of the address or telephone number owner&apos;s express permission
            must be available for the lifespan of the messaging list.
          </Paragraph>
          <Paragraph>
            We prohibit using email lists, telephone number lists, or databases
            purchased from third parties intended for spam or unconfirmed
            messaging list purposes on our Products.
          </Paragraph>
          <Paragraph>
            This spam and unauthorized message activity policy applies to
            messages sent using our Products or to messages sent from any
            network by the customer or any person on the customer&apos;s behalf
            that directly or indirectly refers the recipient to a site hosted
            via our Products.
          </Paragraph>
          <SubSectionHeading small as="h3">
            Unethical, exploitative, and malicious activity.
          </SubSectionHeading>
          <Paragraph>
            Our Products must not be used for advertising, transmitting, or
            otherwise making available any software, program, product, or
            service designed to violate this acceptable use policy or the
            acceptable use policy of other service providers, including but not
            limited to facilitating the means to send spam and the initiation of
            network sniffing, pinging, packet spoofing, flooding, mail-bombing
            and denial-of-service attacks.
          </Paragraph>
          <Paragraph>
            Our Products must not be used to access any account or electronic
            resource where the group or individual attempting to gain access
            does not own or is not authorized to access the resource (e.g.,
            &ldquo;hacking,&ldquo; &ldquo;cracking,&ldquo;
            &ldquo;phreaking,&ldquo; etc.).
          </Paragraph>
          <Paragraph>
            Our Products must not be used to intentionally or recklessly
            introduce viruses or malicious code into our Products and systems.
          </Paragraph>
          <Paragraph>
            Our Products must not be used for purposely engaging in activities
            designed to harass another group or individual. Our definition of
            harassment includes but is not limited to denial-of-service attacks,
            hate speech, advocacy of racial or ethnic intolerance, and any
            activity intended to threaten, abuse, infringe upon the rights of,
            or discriminate against any group or individual.
          </Paragraph>
          <SubSectionHeading small as="h3">
            Other activities considered unethical, exploitative, and malicious
            include:
          </SubSectionHeading>
          <ol className="flex list-decimal flex-col items-start justify-start gap-3">
            <li>
              Using our facilities to obtain (or attempt to obtain) services
              from another provider with the intent to avoid payment.
            </li>
            <li>
              The unauthorized access, alteration, or destruction (or any
              attempt thereof) of any information about our customers or
              end-users by any means or device.
            </li>
            <li>
              Using our facilities to interfere with the use of our facilities
              and network by other customers or authorized individuals.
            </li>
            <li>
              Publishing or transmitting any content of/or links that incite
              violence, depict a violent act, depict child pornography, or
              threaten anyone&apos;s health and safety.
            </li>
            <li>
              Any act or omission in violation of consumer protection laws and
              regulations.
            </li>
            <li>Any violation of a person&apos;s privacy.</li>
          </ol>
          <Paragraph>
            Our Products may not be used by any person or entity that is
            involved with or suspected of involvement in activities or causes
            relating to illegal gambling, terrorism, narcotics trafficking, arms
            trafficking, or the proliferation, development, design, manufacture,
            production, stockpiling, or use of nuclear, chemical or biological
            weapons, weapons of mass destruction, or missiles; in each case
            including any affiliation with others whatsoever who support the
            above such activities or causes.
          </Paragraph>
          <SubSectionHeading small as="h3">
            Unauthorized use of PalestinianCauses LLC property.
          </SubSectionHeading>
          <Paragraph>
            We prohibit the impersonation of PalestinianCauses LLC, the
            representation of a significant business relationship with
            PalestinianCauses LLC, or ownership of any PalestinianCauses LLC
            property (including our Products and brand) to fraudulently gain
            service, custom, patronage, or user trust.
          </Paragraph>
          <SubSectionHeading>About this policy.</SubSectionHeading>
          <Paragraph>
            This policy outlines a non-exclusive list of activities and intent
            we deem unacceptable and incompatible with our brand.
          </Paragraph>
          <Paragraph>
            We reserve the right to modify this policy at any time by publishing
            the revised version on our website. The revised version will be
            effective from the earlier date the customer uses our products after
            we publish the revised version on our website or 30 days after we
            publish the revised version on our website.
          </Paragraph>
        </div>
      </Container>
    </main>
  );
}
