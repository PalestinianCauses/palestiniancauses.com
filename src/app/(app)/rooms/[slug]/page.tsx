// REVIEWED - 09

import { Metadata } from "next";
import { Fragment } from "react";

import { Container } from "@/components/globals/container";
import { Paragraph } from "@/components/globals/typography";
import { About } from "@/components/room/about";
import { Contact } from "@/components/room/contact";
import { Education } from "@/components/room/education";
import { Experience } from "@/components/room/experience";
import { Header } from "@/components/room/header";
import { Packages } from "@/components/room/package";
import { Qualification } from "@/components/room/qualification";
import { RoomInteractive } from "@/components/room/room-interactive";
import { Services } from "@/components/room/service";
import { Skills } from "@/components/room/skills";
import { messages } from "@/lib/messages";
import { actionSafeExecute } from "@/lib/network";
import { payload } from "@/lib/payload";
import { isNumber, isObject } from "@/lib/types/guards";
import { getMediaURL } from "@/lib/utils/media";

import { RedirectProvider } from "../../providers";

// eslint-disable-next-line func-style
export async function generateStaticParams() {
  const response = await actionSafeExecute(
    payload.find({
      collection: "rooms",
      where: { status: { equals: "published" } },
      depth: 0,
    }),
    messages.actions.room.serverError,
  );

  if (!response.data || response.error || response.data.docs.length !== 0)
    return [];

  return response.data.docs.map((room) => ({
    slug: room.slug,
  }));
}

// eslint-disable-next-line func-style
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  // eslint-disable-next-line prefer-destructuring
  const slug = (await params).slug;
  const response = await actionSafeExecute(
    payload.find({
      collection: "rooms",
      where: { slug: { equals: slug }, status: { equals: "published" } },
      depth: 2,
    }),
    messages.actions.room.serverError,
  );

  if (!response.data || response.error || response.data.docs.length !== 1)
    return { title: "Room Not Found" };

  const room = response.data.docs[0];
  const { name, title } = room.information;
  const description =
    room.about.paragraphs.length !== 0 && room.about.paragraphs[0].paragraph;
  const photograph = getMediaURL(room.information.photograph);

  const siteURL =
    process.env.NEXT_PUBLIC_URL || "https://palestiniancauses.com";
  const roomURL = `${siteURL}/rooms/${slug}`;

  return {
    title: `${name} | ${title}`,
    description: description || undefined,
    openGraph: {
      type: "profile",
      siteName: "PalestinianCauses Digital Agency",
      url: roomURL,
      title: `${name} | ${title}`,
      description: description || undefined,
      images: photograph
        ? [
            {
              url: photograph,
              width: 1200,
              height: 630,
              alt: `Professional photograph for ${name}`,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${name} | ${title}`,
      description: description || undefined,
      images: photograph ? [photograph] : [],
    },
    alternates: { canonical: roomURL },
  };
}

export default async function RoomPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // eslint-disable-next-line prefer-destructuring
  const slug = (await params).slug;
  const response = await actionSafeExecute(
    payload.find({
      collection: "rooms",
      where: { slug: { equals: slug }, status: { equals: "published" } },
      depth: 2,
    }),
    messages.actions.room.serverError,
  );

  if (!response.data || response.error || response.data.docs.length !== 1)
    return {
      title: "Room Not Found",
    };

  if (!response.data || response.error) return <RedirectProvider path="/" />;

  const room = response.data.docs[0];

  const educationList = room.education.list;
  const experienceList = room.experience.list;
  const qualificationList = room.qualification.list;
  const skillsList = room.skills.list;
  const servicesList = room.services?.list;
  const packagesList = room.packages?.list;

  const { name, title } = room.information;

  const siteURL =
    process.env.NEXT_PUBLIC_URL || "https://palestiniancauses.com";
  const roomURL = `${siteURL}/rooms/${slug}`;

  const photograph = getMediaURL(room.information.photograph);

  // Structured Data (JSON-LD)
  const dataStructured = {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    "jobTitle": title,
    "url": roomURL,
    ...(photograph && { image: photograph }),
    ...(room.about.paragraphs.length !== 0 && {
      description: room.about.paragraphs[0].paragraph,
    }),
    ...(room.contact &&
      room.contact.length !== 0 && {
        contactPoint: room.contact
          .filter(
            (c) =>
              isObject(c) &&
              c.status === "active" &&
              (c.type === "email" || c.type === "whatsapp"),
          )
          .map((c) => {
            if (isNumber(c)) return null;
            return {
              "@type": "ContactPoint",
              "contactType": c.type === "email" ? "email" : "whatsapp",
              "email": c.type === "email" ? c.value : undefined,
              "telephone": c.type === "whatsapp" ? c.value : undefined,
            };
          })
          .filter(Boolean),
      }),
    ...(servicesList &&
      servicesList.length !== 0 && {
        knowsAbout: servicesList
          .filter((s) => isObject(s))
          .map((s) => {
            if (isNumber(s)) return null;
            return s.name;
          })
          .filter(Boolean),
      }),
  };

  return (
    <Fragment>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(dataStructured) }}
      />

      <main
        id="main-content"
        className="section-padding-start-xl section-padding-end-xl">
        <RoomInteractive room={room} roomOwner={room.information.name} />
        <Header
          user={room.user}
          name={room.information.name}
          title={room.information.title}
          headline={room.information.headline}
          status={room.information.status}
          photograph={room.information.photograph}
        />

        <About about={room.about} />

        {educationList && educationList.length !== 0 ? (
          <Education
            education={{
              ...room.education,
              list: educationList,
            }}
          />
        ) : null}

        {experienceList && experienceList.length !== 0 ? (
          <Experience
            experience={{
              ...room.experience,
              list: experienceList,
            }}
          />
        ) : null}

        {qualificationList && qualificationList.length !== 0 ? (
          <Qualification
            qualification={{
              ...room.qualification,
              list: qualificationList,
            }}
          />
        ) : null}

        {skillsList && skillsList.length !== 0 ? (
          <Skills
            skills={{
              ...room.skills,
              list: skillsList,
            }}
          />
        ) : null}

        {room.services && servicesList && servicesList.length !== 0 ? (
          <Services
            services={{
              ...room.services,
              list: servicesList,
            }}
            roomOwner={typeof room.user === "number" ? room.user : room.user.id}
          />
        ) : null}

        {room.packages && packagesList && packagesList.length !== 0 ? (
          <Packages
            packages={{
              ...room.packages,
              list: packagesList,
            }}
            roomOwner={typeof room.user === "number" ? room.user : room.user.id}
          />
        ) : null}

        {room.contact && room.contact.length !== 0 ? (
          <Contact contact={room.contact} />
        ) : null}

        <footer>
          <Container id="footer" className="section-padding-start-lg max-w-7xl">
            <Paragraph className="text-center text-sm lg:text-lg">
              &copy; {new Date().getFullYear()}{" "}
              <span className="font-medium text-foreground">
                {room.information.name}
              </span>
              . All Rights Reserved. <br /> A Room within{" "}
              <span className="font-medium text-foreground">
                The PalestinianCauses Collective
              </span>
              .
            </Paragraph>
          </Container>
        </footer>
      </main>
    </Fragment>
  );
}
