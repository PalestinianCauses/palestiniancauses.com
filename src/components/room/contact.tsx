// REVIEWED - 01

import { AtSignIcon, MailIcon } from "lucide-react";
import Link from "next/link";
import { ElementType } from "react";
import {
  RiGithubLine,
  RiInstagramLine,
  RiLinkedinLine,
  RiTelegram2Line,
  RiTwitterXFill,
  RiWhatsappLine,
} from "react-icons/ri";

import { isDefined, isNumber, isObject } from "@/lib/types/guards";
import { cn } from "@/lib/utils/styles";
import { Room } from "@/payload-types";

import { Container } from "../globals/container";
import {
  Paragraph,
  SectionHeading,
  SectionHeadingBadge,
  SubSectionHeading,
} from "../globals/typography";

const contactIcons: Record<string, { icon: ElementType; label: string }> = {
  email: {
    icon: MailIcon,
    label: "Email",
  },
  whatsapp: {
    icon: RiWhatsappLine,
    label: "WhatsApp",
  },
  telegram: {
    icon: RiTelegram2Line,
    label: "Telegram",
  },
  twitter: {
    icon: RiTwitterXFill,
    label: "Twitter/X",
  },
  instagram: {
    icon: RiInstagramLine,
    label: "Instagram",
  },
  linkedin: {
    icon: RiLinkedinLine,
    label: "LinkedIn",
  },
  github: {
    icon: RiGithubLine,
    label: "GitHub",
  },
  other: {
    icon: AtSignIcon,
    label: "Other",
  },
};

const getContactLink = (type: string, value: string): string | null => {
  switch (type) {
    case "email":
      return `mailto:${value}`;
    case "whatsapp":
      return `https://wa.me/${value.replace(/[^0-9]/g, "")}`;
    case "telegram":
      return `https://t.me/${value.replace("@", "")}`;
    case "twitter":
      return `https://twitter.com/${value.replace("@", "")}`;
    case "instagram":
      return `https://instagram.com/${value.replace("@", "")}`;
    case "linkedin":
      return `https://linkedin.com/in/${value.replace(/^\/|\//g, "")}`;
    case "github":
      return `https://github.com/${value.replace("@", "")}`;
    default:
      return null;
  }
};

const ContactItem = function ContactItem({
  contact,
}: {
  contact: NonNullable<NonNullable<Room["contact"]>>[number];
}) {
  if (typeof contact === "number") return null;

  const contactConfig = contactIcons[contact.type] || contactIcons.other;
  const Icon = contactConfig.icon;
  const label = contact.label || contactConfig.label;
  const link = getContactLink(contact.type, contact.value);

  if (!isDefined(link)) return null;

  return (
    <Link
      href={link}
      aria-label={label}
      className={cn(
        "group relative flex flex-col items-start justify-start gap-5",
      )}>
      <div className="flex h-20 w-20 flex-col items-center justify-center bg-background text-foreground ring-1 ring-input transition duration-300 ease-in-out group-hover:bg-foreground group-hover:text-background">
        <Icon className={cn("h-10 w-10")} />
      </div>
      <SubSectionHeading
        as="h4"
        className="text-sm uppercase tracking-widest lg:text-sm xl:text-sm">
        <span className="text-muted-foreground">Through</span> {label}
      </SubSectionHeading>
    </Link>
  );
};

export const Contact = function Contact({
  contact,
}: {
  contact: Room["contact"];
}) {
  if (!contact || typeof contact === "number") return null;

  const activeContacts = contact
    .filter((c) => isObject(c) && c.status === "active")
    .sort((a, b) => {
      if (isNumber(a) || isNumber(b)) return 0;
      // Primary contacts first
      if (a.primary && !b.primary) return -1;
      if (!a.primary && b.primary) return 1;
      // Then by order
      return a.order - b.order;
    });

  if (activeContacts.length === 0) return null;

  return (
    <Container
      as="section"
      id="contact"
      className="section-padding-start-lg flex max-w-7xl flex-col gap-24 lg:flex-row">
      <div className="flex-1">
        <SectionHeadingBadge as="h2" className="mb-3 lg:mb-6">
          An Invitation to Connect{" "}
        </SectionHeadingBadge>
        <SectionHeading as="h3" className="mb-6 lg:mb-12">
          Let&apos;s Turn Your Vision into Reality.{" "}
        </SectionHeading>
        <Paragraph className="mb-12 lg:mb-24">
          Every great outcome begins with a conversation. Whether you have a
          specific project in mind, a goal you&apos;re ready to pursue, or an
          idea for collaboration, I look forward to hearing from you. Let&apos;s
          explore how we can achieve something remarkable together.
        </Paragraph>
      </div>
      <div className="grid flex-1 grid-cols-1 gap-12 sm:grid-cols-2">
        {activeContacts.map((contactItem) => (
          <ContactItem
            key={typeof contactItem === "number" ? contactItem : contactItem.id}
            contact={contactItem}
          />
        ))}
      </div>
    </Container>
  );
};
