// REVIEWED - 06

import {
  ArrowUpRightIcon,
  DownloadIcon,
  ExternalLinkIcon,
  InfoIcon,
  PackageCheckIcon,
  ShareIcon,
} from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { Fragment } from "react";

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
import { messages } from "@/lib/messages";
import { getUserProductOrder } from "@/lib/server/order";
import { isObject } from "@/lib/types/guards";
import { createProductDownloadingURLs } from "@/lib/utils/product-download-urls";
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

  let order: Order | null = null;
  let product: number | Product | null = null;

  if (sessionId) {
    const responseSession = await getStripeCheckoutSession(sessionId);

    if (responseSession.data) {
      order = responseSession.data.order;

      if (
        order.orderStatus !== "completed" ||
        order.productOrderStatus !== "paid"
      )
        return (
          <RedirectProvider
            path="/a-human-but-from-gaza"
            messageToast={messages.actions.order.paymentNotCompleted}
          />
        );

      if (responseSession.data.order.items[0].product)
        product = responseSession.data.order.items[0].product;
    } else
      return (
        <RedirectProvider
          path="/a-human-but-from-gaza"
          messageToast={responseSession.error}
        />
      );
  }

  if (!sessionId || !order || !product) {
    const responseUserProductOrder = await getUserProductOrder(
      "a-human-but-from-gaza",
    );

    if (responseUserProductOrder.data) {
      order = responseUserProductOrder.data.order;
      product = responseUserProductOrder.data.product;
    } else
      return (
        <RedirectProvider
          path="/a-human-but-from-gaza"
          messageToast={responseUserProductOrder.error}
        />
      );
  }

  const downloadingURLs = isObject(product)
    ? createProductDownloadingURLs(product)
    : [];

  if (downloadingURLs.length === 0) return <RedirectProvider path="/404" />;

  return (
    <Fragment>
      <Container className="section-padding-start-xl max-w-5xl">
        <div className="flex flex-col items-center justify-center gap-10">
          <div className="flex size-20 items-center justify-center border border-green-500/10 bg-green-500/10 text-green-500">
            <PackageCheckIcon className="size-10 stroke-1" />
          </div>

          <div className="space-y-2.5 text-center">
            <SectionHeading as="h1">Thank You for Your Purchase</SectionHeading>
            <Paragraph className="text-base lg:text-base">
              Your payment has been processed successfully. We have sent your
              download links to{" "}
              {isObject(order.user) && order.user.email ? (
                <span className="font-semibold text-foreground">
                  {order.user.email}
                </span>
              ) : (
                "your email address"
              )}
              . You may access your files below at any time.
            </Paragraph>
          </div>

          {downloadingURLs.length !== 0 ? (
            <Card className="w-full border-none">
              <CardHeader className="p-0 pb-5">
                <CardTitle className="flex items-center gap-2.5">
                  <DownloadIcon className="size-5" />
                  Your Download Links
                </CardTitle>
                <CardDescription>
                  Select any link below to access your purchased files.
                </CardDescription>
              </CardHeader>
              <div className="mb-5 space-y-2.5 p-0">
                {downloadingURLs.map((link, index) => (
                  <Button
                    key={link.url || index}
                    variant="outline"
                    size="lg"
                    className="w-full justify-start px-5"
                    asChild>
                    <Link
                      href={link.url}
                      target="_blank"
                      rel="noreferrer noopener">
                      <ExternalLinkIcon />
                      <span className="mr-auto truncate">
                        {link.title}
                        {link.isFile && link.fileSize ? (
                          <span className="ml-2.5 font-mono text-sm leading-none text-muted-foreground">
                            ({Math.round(link.fileSize / 1024 / 1024)} MB)
                          </span>
                        ) : null}
                      </span>
                      <DownloadIcon className="!size-5" />
                    </Link>
                  </Button>
                ))}
              </div>

              <div className="space-y-5">
                <CardTitle className="flex items-center gap-2.5">
                  <InfoIcon className="size-5" />
                  Download Instructions
                </CardTitle>

                <div className="space-y-2.5 font-normal leading-relaxed text-muted-foreground">
                  <div className="space-y-2.5 border bg-background p-2.5">
                    <p className="font-medium text-foreground">
                      PDFs &amp; Images
                    </p>
                    <p>
                      These file types will open in your browser for preview. To
                      save them to your device, please follow these steps:
                    </p>
                    <ul className="space-y-1.5 px-2.5 pr-0">
                      <li>
                        <span className="font-medium text-foreground">
                          Chrome, Edge, or FireFox:
                        </span>{" "}
                        Use the download button in the preview, right-click the
                        file and select &quot;Save as&quot;, or on mobile
                        devices, long-press and select &quot;Save as&quot;.
                      </li>
                      <li className="flex items-start gap-2.5">
                        <ShareIcon className="size-5 shrink-0 text-foreground" />
                        <span>
                          <span className="font-medium text-foreground">
                            Safari (iPhone, iPad, or Mac):
                          </span>{" "}
                          Tap the{" "}
                          <span className="font-medium text-foreground">
                            Share
                          </span>{" "}
                          icon in your browser, then select{" "}
                          <span className="font-medium text-foreground">
                            &quot;Save to Files&quot;
                          </span>
                          .
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-2.5 border bg-background p-2.5">
                    <p className="font-medium text-foreground">
                      ZIP &amp; Other Archive Files
                    </p>
                    <p>
                      These files will begin downloading automatically when you
                      click the link. Please check your browser&apos;s download
                      manager or your device&apos;s Downloads folder to locate
                      the file.
                    </p>
                  </div>
                </div>
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
              In case you have not received the email with your download links,
              please check your spam or junk folder. Should you require any
              assistance, please{" "}
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
              Continue Browsing
            </Link>
          </Button>
        </div>
      </Container>
      <Footer />
    </Fragment>
  );
}
