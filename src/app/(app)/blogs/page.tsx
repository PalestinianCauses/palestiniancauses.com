// REVIEWED - 01

import { Fragment } from "react";

import { BlogRoomList } from "@/components/blog-room/list";
import { Container } from "@/components/globals/container";
import { Footer } from "@/components/globals/footer";
import { Paragraph, SectionHeading } from "@/components/globals/typography";

export default function BlogsRoomsPage() {
  return (
    <Fragment>
      <main className="section-padding-start-xl relative">
        <Container className="mb-12 max-w-7xl xl:mb-24">
          <SectionHeading className="mb-8 max-w-xl lg:!max-w-3xl">
            The Riwaq: PalestinianCauses&apos; Blog Rooms
          </SectionHeading>
          <Paragraph className="mb-8">
            Welcome to The Riwaq, the intellectual gallery of the
            PalestinianCauses collective. Just as a riwaq is a structured arcade
            leading to different rooms of knowledge, this is your gateway to the
            individual journals of our artisans. Choose a path and immerse
            yourself in a curated collection of writings on craft, resilience,
            and creative excellence.
          </Paragraph>
        </Container>
        <Container className="mb-12 max-w-7xl xl:mb-24">
          <BlogRoomList />
        </Container>
      </main>
      <Footer />
    </Fragment>
  );
}
