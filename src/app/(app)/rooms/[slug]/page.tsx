// REVIEWED - 01

import { Metadata } from "next";

import { Header } from "@/components/room/header";

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

  return (
    <div className="py-16 lg:py-28 xl:py-36">
      <Header
        name="Shawqi Hatem"
        title="Next.JS Full Stack Developer"
        headline="Delivering Scalable & User-Centric Web Experiences."
        status="available"
        photograph={{
          id: 0,
          alt: "Shawqi ",
          url: "https://nwdtauhmkupvkywh.public.blob.vercel-storage.com/photo-17-03.jpg",
          createdAt: "",
          updatedAt: "",
        }}
      />
    </div>
  );
}
