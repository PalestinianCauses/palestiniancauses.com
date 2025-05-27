// REVIEWED - 06

import { getPayload } from "payload";

import configPromise from "@payload-config";

let existingPayload: Awaited<ReturnType<typeof getPayload>> | null = null;

export const getExistingPayload = async function getExistingPayload() {
  if (existingPayload) return existingPayload;

  existingPayload = await getPayload({ config: configPromise });
  return existingPayload;
};

export const payload = await getExistingPayload();
