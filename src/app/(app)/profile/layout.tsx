// REVIEWED

import { Fragment, PropsWithChildren, Suspense } from "react";

import { Container } from "@/components/globals/container";
import { Footer } from "@/components/globals/footer";
import { Loading } from "@/components/globals/loading";
import { SectionHeading } from "@/components/globals/typography";
import { ProfileNavigation } from "@/components/profile/navigation";
import { ProfileTabsProvider } from "@/components/profile/tabs-provider";

export default function ProfileLayout({ children }: PropsWithChildren) {
  return (
    <Fragment>
      <Container
        as="main"
        id="main-content"
        className="section-padding-start-xl section-padding-end-xl max-w-7xl space-y-10">
        <SectionHeading as="h1" className="font-semibold">
          Profile
        </SectionHeading>
        <Suspense fallback={<Loading />}>
          <ProfileTabsProvider>
            <ProfileNavigation />
            {children}
          </ProfileTabsProvider>
        </Suspense>
      </Container>
      <Footer />
    </Fragment>
  );
}
