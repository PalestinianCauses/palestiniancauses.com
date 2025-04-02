// REVIEWED - 02

import { Metadata } from "next";

import { Protected } from "@/components/auth/protected";
import { CreateDiaryEntryForm } from "@/components/diary-entry/forms/create-diary-entry";
import { Container } from "@/components/globals/container";

export const metadata: Metadata = {
  title: "Share Your Diary With The Truth Museum.",
  description:
    "Your voice matters. Share your diary entries from Gaza's war with The Truth Museum and help us preserve and amplify these crucial stories.",
};

export default function SharePage() {
  return (
    <Protected>
      <main className="flex flex-col items-center justify-center py-48 xs:py-40">
        <Container>
          <div className="mx-auto mb-10 flex w-full flex-col items-center justify-center gap-3">
            <h1
              className="font-stretch mt-10 w-full max-w-3xl text-pretty bg-gradient-to-b from-foreground/25 via-foreground to-foreground/50 bg-cover bg-clip-text bg-center bg-no-repeat text-center text-5xl font-bold tracking-tight text-foreground sm:text-7xl"
              style={{ WebkitTextFillColor: "transparent" }}>
              Share Your Diary With The Truth Museum.
            </h1>
            <p className="mx-auto w-full max-w-4xl text-center leading-normal text-muted-foreground">
              We understand the weight of sharing experiences from Gaza&apos;s
              war. Like you, our team has witnessed the same heartache. Join us
              in amplifying Gaza&apos;s stories and ensuring every voice is
              heard. Together, we can make a difference.
            </p>
          </div>
          <CreateDiaryEntryForm />
        </Container>
      </main>
    </Protected>
  );
}
