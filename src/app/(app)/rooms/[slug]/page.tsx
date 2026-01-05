// REVIEWED - 08

import { Metadata } from "next";
import { Fragment } from "react";

import { getRoom } from "@/actions/room";
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
import { isNumber, isObject } from "@/lib/types/guards";
import { getMediaURL } from "@/lib/utils/media";

import { RedirectProvider } from "../../providers";

// eslint-disable-next-line func-style
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  // eslint-disable-next-line prefer-destructuring
  const slug = (await params).slug;
  const response = await getRoom(slug);

  if (!response.data || response.error)
    return {
      title: "Room Not Found",
    };

  const room = response.data;
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
  const response = await getRoom(slug);

  if (!response.data || response.error) return <RedirectProvider path="/" />;

  const educationList = response.data.education.list;
  const experienceList = response.data.experience.list;
  const qualificationList = response.data.qualification.list;
  const skillsList = response.data.skills.list;
  const servicesList = response.data.services?.list;
  const packagesList = response.data.packages?.list;

  const room = response.data;
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
        <RoomInteractive
          room={response.data}
          roomOwner={response.data.information.name}
        />
        <Header
          user={response.data.user}
          name={response.data.information.name}
          title={response.data.information.title}
          headline={response.data.information.headline}
          status={response.data.information.status}
          photograph={response.data.information.photograph}
        />

        <About about={response.data.about} />

        {educationList && educationList.length !== 0 ? (
          <Education
            education={{
              ...response.data.education,
              list: educationList,
            }}
          />
        ) : null}

        {experienceList && experienceList.length !== 0 ? (
          <Experience
            experience={{
              ...response.data.experience,
              list: experienceList,
            }}
          />
        ) : null}

        {qualificationList && qualificationList.length !== 0 ? (
          <Qualification
            qualification={{
              ...response.data.qualification,
              list: qualificationList,
            }}
          />
        ) : null}

        {skillsList && skillsList.length !== 0 ? (
          <Skills
            skills={{
              ...response.data.skills,
              list: skillsList,
            }}
          />
        ) : null}

        {response.data.services && servicesList && servicesList.length !== 0 ? (
          <Services
            services={{
              ...response.data.services,
              list: servicesList,
            }}
            roomOwner={
              typeof response.data.user === "number"
                ? response.data.user
                : response.data.user.id
            }
          />
        ) : null}

        {response.data.packages && packagesList && packagesList.length !== 0 ? (
          <Packages
            packages={{
              ...response.data.packages,
              list: packagesList,
            }}
            roomOwner={
              typeof response.data.user === "number"
                ? response.data.user
                : response.data.user.id
            }
          />
        ) : null}

        {response.data.contact && response.data.contact.length !== 0 ? (
          <Contact contact={response.data.contact} />
        ) : null}

        <footer>
          <Container id="footer" className="section-padding-start-lg max-w-7xl">
            <Paragraph className="text-center text-sm lg:text-lg">
              &copy; {new Date().getFullYear()}{" "}
              <span className="font-medium text-foreground">
                {response.data.information.name}
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
