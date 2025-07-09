// REVIEWED

import { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/globals/container";
import { Paragraph, SectionHeading } from "@/components/globals/typography";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import CryptoItem from "./item";

export const metadata: Metadata = {
  title: "Gym Rat In Gaza's Crypto Hub",
  description:
    "Welcome to Gym Rat In Gaza's Crypto Hub. On this page, you will find a comprehensive list of my crypto-currency addresses, thoughtfully organized for your convenience. Whether you wish to support my efforts through a contribution or simply explore the available options, you can easily copy and paste the address of your preferred crypto-currency or scan the corresponding QR code. Your generosity and engagement are greatly appreciated, and every contribution helps make a meaningful difference. Thank you for considering a contribution and for being a part of this journey.",
};

const addresses = [
  {
    name: "Bitcoin",
    address: "bc1qq8at0e225saegxxwj76g63mfz4mrf7wxn0d4cs",
    qrCode: "/g-crypto-bitcoin.jpg",
    icon: "/bitcoin-3D.png",
  },
  {
    name: "Ethereum",
    address: "0xC4D6c04E2F2F41Eb1DFDC14d7206eBF7C94f48b7",
    qrCode: "/g-crypto-ethereum.jpg",
    icon: "/ethereum-3D.png",
  },
  {
    name: "Solana",
    address: "8RDgWMMCJvskhhWSQNfD3169ir4VH6jZ4wr4JRoqGQCc",
    qrCode: "/g-crypto-solana.jpg",
    icon: "/solana-3D.png",
  },
];

export default function GCryptoPage() {
  return (
    <main className="relative py-12 lg:py-24 xl:py-32">
      <Container className="max-w-4xl">
        <SectionHeading className="mb-6 text-muted-foreground lg:max-w-xl xl:max-w-3xl">
          Welcome To{" "}
          <span className="text-primary">Gym Rat In Gaza&apos;s</span> Crypto
          Hub.
        </SectionHeading>
        <div className="flex flex-col items-start justify-start gap-6">
          <Paragraph>
            On this page, you will find a comprehensive list of my
            crypto-currency addresses, thoughtfully organized for your
            convenience. Whether you wish to support my efforts through a
            contribution or simply explore the available options, you can easily
            copy and paste the address of your preferred crypto-currency or scan
            the corresponding QR code.
          </Paragraph>
          <Paragraph>
            Your generosity and engagement are greatly appreciated, and every
            contribution helps make a meaningful difference. Thank you for
            considering a contribution and for being a part of this journey.
          </Paragraph>
        </div>
      </Container>
      <Separator className="mt-12 lg:mt-24 xl:mt-32" />
      <ul className="grid grid-cols-1 grid-rows-3 lg:grid-cols-3 lg:grid-rows-1">
        {addresses.map((address) => (
          <CryptoItem key={address.name} {...address} />
        ))}
      </ul>
      <Container className="mt-12 max-w-md lg:mt-24 xl:mt-32">
        <p className="text-center text-base font-medium leading-normal text-muted-foreground">
          Designed and developed by{" "}
          <Button variant="link" className="p-0" asChild>
            <Link href="https://instagram.com/shawqicauses">Shawqi Hatem</Link>
          </Button>{" "}
          at{" "}
          <Button variant="link" className="p-0" asChild>
            <Link href="/">PalestinianCauses.</Link>
          </Button>
        </p>
      </Container>
    </main>
  );
}
