// REVIEWED - 05

import {
  ArrowUpRightIcon,
  DownloadIcon,
  ExternalLinkIcon,
  PackageCheckIcon,
} from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { Fragment } from "react";

import { getStripeCheckoutSession } from "@/actions/stripe-get-checkout-session";
import { Container } from "@/components/globals/container";
import { Footer } from "@/components/globals/footer";
import { Paragraph, SectionHeading } from "@/components/globals/typography";
import { AutoDownload } from "@/components/product/auto-download";
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
            <SectionHeading as="h1">
              We Appreciate Your Purchase!
            </SectionHeading>
            <Paragraph className="text-base lg:text-base">
              Your payment has been processed successfully. We&apos;ve sent your
              download links to{" "}
              {isObject(order.user) && order.user.email ? (
                <span className="font-semibold text-foreground">
                  {order.user.email}
                </span>
              ) : (
                "your email address"
              )}
              . You can access your files below at your convenience.
            </Paragraph>
          </div>

          {downloadingURLs.length !== 0 ? (
            <Fragment>
              <AutoDownload downloadingURLs={downloadingURLs} />
              <Card className="w-full">
                <CardHeader className="p-5">
                  <CardTitle className="flex items-center gap-2.5">
                    <DownloadIcon className="size-5" />
                    Open Files Individually (Managed by Your Browser)
                  </CardTitle>
                  <CardDescription>
                    {downloadingURLs.some((link) => link.isFile) ? (
                      <Fragment>
                        Click any file link below to open it individually. Each
                        link will open the file in a new browser tab. Depending
                        on the file type and your browser settings, it may
                        preview the file (like images or PDFs) or download it
                        automatically. In case it previews, you can download it
                        manually from the preview page using your browser&apos;s
                        download option.
                      </Fragment>
                    ) : (
                      <Fragment>
                        Select any link below to access your content.
                      </Fragment>
                    )}
                  </CardDescription>
                </CardHeader>
                <div className="space-y-2.5 p-5 pt-0">
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
              </Card>
            </Fragment>
          ) : null}

          {order ? (
            <Accordion type="single" collapsible className="w-full">
              <OrderItem order={order} />
            </Accordion>
          ) : null}

          <div className="flex flex-col items-center gap-5">
            <div className="mx-auto max-w-xl text-center text-sm leading-relaxed text-muted-foreground">
              In case you haven&apos;t received the email, please check your
              spam folder. For further assistance, please{" "}
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
