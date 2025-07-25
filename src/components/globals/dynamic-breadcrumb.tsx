"use client";

// REVIEWED

import Link from "next/link";
import { Fragment, HTMLAttributes } from "react";

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

  const breadcrumbsFiltered = isHomePageDisplayed
    ? breadcrumbs
    : breadcrumbs.filter((item) => item.href !== "/");

  const breadcrumbsLimited = itemsMaximum
    ? breadcrumbsFiltered.slice(-itemsMaximum)
    : breadcrumbsFiltered;

  if (breadcrumbsLimited.length <= 1 && !isHomePageDisplayed) return null;

  if (breadcrumbsLimited.length === 1 && breadcrumbsLimited[0].href === "/")
    return null;

  return (
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
  );
};

export { DynamicBreadcrumb };
