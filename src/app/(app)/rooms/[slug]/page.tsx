// REVIEWED - 03

import { Metadata } from "next";

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
import { Services } from "@/components/room/service";
import { Skills } from "@/components/room/skills";

import { RedirectProvider } from "../../providers";

export const metadata: Metadata = {
  title: "Shawqi's Room",
};

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

  return (
    <div className="py-48 lg:py-32 xl:py-48">
      <Header
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
    </div>
  );
}
