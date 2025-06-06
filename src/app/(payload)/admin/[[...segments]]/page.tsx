// REVIEWED - 07
/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import { RootPage, generatePageMetadata } from "@payloadcms/next/views";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { getAuthentication } from "@/actions/auth";
import config from "@payload-config";

import { importMap } from "../importMap";

type Args = {
  params: Promise<{ segments: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] }>;
};

export const generateMetadata = ({
  params,
  searchParams,
}: Args): Promise<Metadata> =>
  generatePageMetadata({ config, params, searchParams });

const Page = async ({ params, searchParams }: Args) => {
  const auth = await getAuthentication();

  if (
    !auth ||
    !auth.user ||
    (auth.user.role !== "admin" && auth.user.role !== "system-user")
  )
    redirect("/");

  return RootPage({ config, params, searchParams, importMap });
};

export default Page;
