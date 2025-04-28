"use client";

// REVIEWED - 02

import { ArrowUpRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useTransition } from "react";

import {
  createCartPlusSetCookie,
  getCheckoutUrl,
  insertItem,
  removeCartPlusRemoveCookie,
} from "@/actions/cart";
import { motions } from "@/lib/motion";
import { Product } from "@/lib/shopify/types";

import { Container } from "../globals/container";
import { MotionLi } from "../globals/motion";
import {
  Paragraph,
  SectionHeading,
  SectionHeadingBadge,
  SubSectionHeading,
} from "../globals/typography";
import { Button } from "../ui/button";

export const CTA = function CTA({ product }: { product: Product }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const ctas = useMemo(
    () => [
      {
        title: 'Get "A Human But From Gaza"',
        action: () => {
          startTransition(async () => {
            await createCartPlusSetCookie("internal-cart-id");
            await insertItem("internal-cart-id", product.variants[0].id);

            const checkoutUrl = await getCheckoutUrl("internal-cart-id");
            window.open(checkoutUrl, "_blank");

            await removeCartPlusRemoveCookie("internal-cart-id");
          });
        },
      },
      {
        title: "Support Our Mission",
        action: () => {
          window.open("https://palestiniancauses.com/support", "_blank");
        },
      },
      {
        title: "Amplify Our Voice: Follow and Share",
        action: () => {
          window.open("https://www.instagram.com/palestiniancauses", "_blank");
        },
      },
      {
        title: "Contact Us",
        action: () => {
          router.push("/contact-us");
        },
      },
    ],
    [router, product.variants],
  );

  return (
    <Container as="section" className="my-12 max-w-7xl xl:my-24">
      <SectionHeadingBadge as="h2" number="05" className="mb-8">
        Join Our Mission
      </SectionHeadingBadge>
      <SectionHeading
        as="h3"
        className="mb-8 max-w-none lg:!max-w-2xl xl:!max-w-3xl">
        Amplify Truth, Foster Resilience: Join Our Mission.
      </SectionHeading>
      <Paragraph className="mb-12 xl:mb-24">
        You&apos;ve learned about our commitment to illuminating the Gazan
        experience and standing in unwavering solidarity with Gaza. Now, help us
        transform awareness into meaningful action. Your support enables us to
        share authentic narratives like those in &ldquo;A Human But From
        Gaza,&ldquo; challenge harmful stereotypes, and invest in the long-term
        vision of empowering Gazan creativity and expertise for a
        self-sufficient future.
      </Paragraph>
      <ul className="grid h-full grid-rows-4">
        {ctas.map(({ title, action }) => (
          <MotionLi
            key={title}
            viewport={{ once: true }}
            initial={motions.fadeIn.initial}
            whileInView={motions.fadeIn.whileInView}
            transition={motions.transition({})}>
            <Button
              variant="outline"
              disabled={isPending}
              onClick={action}
              className="h-full w-full justify-start gap-5 whitespace-break-spaces p-5 text-left font-normal md:p-10">
              <ArrowUpRight className="!h-7 !w-7 stroke-[1.5] md:!h-10 md:!w-10" />
              <SubSectionHeading
                as="p"
                className="font-normal !leading-relaxed">
                {title}
              </SubSectionHeading>
            </Button>
          </MotionLi>
        ))}
      </ul>
    </Container>
  );
};
