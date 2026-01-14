"use client";

// REVIEWED - 01

import Link from "next/link";
import { Fragment, HTMLAttributes, useEffect, useState } from "react";

import { useBreadcrumbs } from "@/hooks/use-breadcrumbs";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";

const DynamicBreadcrumb = function DynamicBreadcrumb({
  isHomePageDisplayed = true,
  itemsMaximum = 3,
  className,
}: {
  isHomePageDisplayed?: boolean;
  itemsMaximum?: number;
} & HTMLAttributes<HTMLElement>) {
  const breadcrumbs = useBreadcrumbs();
  const [baseURL, setBaseURL] = useState("https://palestiniancauses.com");

  useEffect(() => {
    if (typeof window !== "undefined") setBaseURL(window.location.origin);
  }, []);

  const breadcrumbsFiltered = isHomePageDisplayed
    ? breadcrumbs
    : breadcrumbs.filter((item) => item.href !== "/");

  const breadcrumbsLimited = itemsMaximum
    ? breadcrumbsFiltered.slice(-itemsMaximum)
    : breadcrumbsFiltered;

  if (breadcrumbsLimited.length <= 1 && !isHomePageDisplayed) return null;

  if (breadcrumbsLimited.length === 1 && breadcrumbsLimited[0].href === "/")
    return null;

  // Generate BreadcrumbList structured data
  const listSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbsLimited.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": `${baseURL}${item.href}`,
    })),
  };

  return (
    <Fragment>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(listSchema),
        }}
      />

      <Breadcrumb className={className}>
        <BreadcrumbList>
          {breadcrumbsLimited.map((item, index) => (
            <Fragment key={item.href}>
              <BreadcrumbItem>
                {item.isPageCurrent ? (
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={item.href}>{item.label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {index < breadcrumbsLimited.length - 1 && <BreadcrumbSeparator />}
            </Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </Fragment>
  );
};

export { DynamicBreadcrumb };
