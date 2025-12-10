// REVIEWED

import { ArrowUpRightIcon, DownloadIcon, PackageCheckIcon } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { Fragment } from "react";

import { getAuthentication } from "@/actions/auth";
import { getUserProductOrder } from "@/actions/order";
import { getStripeCheckoutSession } from "@/actions/stripe-get-checkout-session";
import { Container } from "@/components/globals/container";
import { Footer } from "@/components/globals/footer";
import { Paragraph, SectionHeading } from "@/components/globals/typography";
import { OrderItem } from "@/components/profile/activity-orders";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { isObject } from "@/lib/types/guards";
import { Order, Product } from "@/payload-types";

import { RedirectProvider } from "../../providers";

export const metadata: Metadata = {
  title: "Thank You",
};

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id: string }>;
}) {
  const paramsSearch = await searchParams;
  const sessionId = paramsSearch.session_id;

  const user = await getAuthentication();

  if (!user) return <RedirectProvider path="/a-human-but-from-gaza" />;

  let order: Order | null = null;
  let product: number | Product | null = null;

  if (sessionId) {
    const responseSession = await getStripeCheckoutSession(sessionId);

    if (responseSession.data) {
      order = responseSession.data.order;

      if (responseSession.data.order.items[0].product)
        product = responseSession.data.order.items[0].product;
    } else return <RedirectProvider path="/404" />;
  }

  if (!sessionId || !order || !product) {
    const responseUserProductOrder = await getUserProductOrder(
      "a-human-but-from-gaza",
    );

    if (responseUserProductOrder.data) {
      order = responseUserProductOrder.data.order;
      product = responseUserProductOrder.data.product;
    } else return <RedirectProvider path="/404" />;
  }

  const downloadingURLs = (isObject(product) && product.links) || [];

  if (downloadingURLs.length === 0) return <RedirectProvider path="/404" />;

  return (
    <Fragment>
      <Container className="section-padding-start-xl max-w-5xl">
        <div className="flex flex-col items-center justify-center gap-10">
          <div className="flex size-20 items-center justify-center border border-green-500/10 bg-green-500/10 text-green-500">
            <PackageCheckIcon className="size-10 stroke-1" />
          </div>

          <div className="space-y-2.5 text-center">
            <SectionHeading as="h1">
              We Appreciate Your Purchase!
            </SectionHeading>
            <Paragraph className="text-base lg:text-base">
              Your payment was processed successfully. To make things seamless,
              we&apos;ve delivered your download links to{" "}
              {user.email ? (
                <span className="font-semibold text-foreground">
                  {user.email}
                </span>
              ) : (
                "your email address"
              )}
              . You are welcome to access your files below at your convenience.
            </Paragraph>
          </div>

          {downloadingURLs.length !== 0 ? (
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2.5">
                  <DownloadIcon className="size-5" />
                  Access Your Downloads
                </CardTitle>
                <CardDescription>
                  Choose any of these links below to retrieve your files.
                </CardDescription>
              </CardHeader>
              <div className="space-y-2.5 p-5 pt-0">
                {downloadingURLs.map((link) => (
                  <Button
                    key={link.id || link.url}
                    variant="outline"
                    size="lg"
                    className="w-full justify-between"
                    asChild>
                    <Link href={link.url} download={link.url}>
                      <span className="truncate">
                        {link.title}
                        {link.isFile && link.fileSize ? (
                          <span className="ml-2.5 font-mono text-sm leading-none text-muted-foreground">
                            ({Math.round(link.fileSize)} MB)
                          </span>
                        ) : null}
                      </span>
                      <DownloadIcon className="!size-5" />
                    </Link>
                  </Button>
                ))}
              </div>
            </Card>
          ) : null}

          {order ? (
            <Accordion type="single" collapsible className="w-full">
              <OrderItem order={order} />
            </Accordion>
          ) : null}

          <div className="flex flex-col items-center gap-5">
            <div className="mx-auto max-w-xl text-center text-sm leading-relaxed text-muted-foreground">
              In case you have not received any email, please check your spam
              folder. For further assistance, feel free to{" "}
              <Link
                href="mailto:hello@palestiniancauses.com"
                className="font-semibold text-foreground underline">
                contact our support team
              </Link>
              .
            </div>
          </div>
          <Button size="lg" asChild>
            <Link href="/a-human-but-from-gaza">
              <ArrowUpRightIcon />
              Return to Product Page
            </Link>
          </Button>
        </div>
      </Container>
      <Footer />
    </Fragment>
  );
}
