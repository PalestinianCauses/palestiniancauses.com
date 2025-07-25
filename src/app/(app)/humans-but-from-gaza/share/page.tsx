// REVIEWED - 09

import { Metadata } from "next";

import { CreateDiaryEntryForm } from "@/components/diary-entry/forms/create-diary-entry";
import { Container } from "@/components/globals/container";
import { Footer } from "@/components/globals/footer";
import { Paragraph, SectionHeading } from "@/components/globals/typography";

export const metadata: Metadata = {
  title: "Share Your Diary With The Truth Museum",
  description:
    'Sharing your Gaza war experiences is profound. We stand in solidarity. Contribute your diary to "The Truth Museum" to amplify authentic voices and build our collective testimony. Together, we illuminate truth.',
};

const SharePage = function SharePage() {
  return (
    <main className="relative pt-24 lg:pt-32 xl:pt-48">
      <Container className="mb-8 max-w-7xl xl:mb-12">
        <SectionHeading className="mb-4 !max-w-none lg:mb-8 lg:!max-w-xl xl:!max-w-3xl">
          Share Your Diary With The Truth Museum.
        </SectionHeading>
        <Paragraph className="!max-w-5xl">
          Sharing your Gaza war experiences is profound. We stand in solidarity.
          Contribute your diary to &ldquo;The Truth Museum&ldquo; to amplify
          authentic voices and build our collective testimony. Together, we
          illuminate truth.
        </Paragraph>
      </Container>
      <Container className="mb-12 max-w-7xl xl:mb-24">
        <CreateDiaryEntryForm />
      </Container>
      <Footer />
    </main>
  );
};

export default SharePage;
