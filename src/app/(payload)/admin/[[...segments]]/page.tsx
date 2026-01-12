// REVIEWED - 10
/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import { RootPage, generatePageMetadata } from "@payloadcms/next/views";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { hasAnyRole } from "@/lib/permissions";
import { getAuthentication } from "@/lib/server/auth";
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

  if (!auth || !hasAnyRole(auth, ["admin-user", "system-user", "author-user"]))
    redirect("/");

  return RootPage({ config, params, searchParams, importMap });
};

export default Page;
