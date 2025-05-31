"use server";

// REVIEWED - 07

import { GeneratedTypes, PaginatedDocs, PayloadRequest, Where } from "payload";

import { messages } from "@/lib/messages";
import { actionSafeExecute } from "@/lib/network";
import { payload } from "@/lib/payload";
import { CollectionTypes, SelectOptions } from "@/lib/types";
import { selectOptionsDefaults } from "@/lib/utils/filters";

type CollectionOptions<TSlug extends CollectionTypes> = {
  req?: PayloadRequest;
  collection: TSlug;
  selects: SelectOptions;
  fields?: (keyof GeneratedTypes["collections"][TSlug])[];
  depth?: number;
};

type ResponseDataCollection<TSlug extends CollectionTypes> = PaginatedDocs<
  GeneratedTypes["collections"][TSlug]
>;

type ResponseCollection<TSlug extends CollectionTypes> =
  | { data: ResponseDataCollection<TSlug>; error: null }
  | { data: null; error: string };

export const getCollection = async function getCollection<
  TSlug extends CollectionTypes,
>({
  req,
  collection,
  selects: {
    page = selectOptionsDefaults.page,
    limit = selectOptionsDefaults.limit,
    sort = selectOptionsDefaults.sort,
    search = selectOptionsDefaults.search,
    ...otherSelects
  },
  fields,
  depth = 0,
}: CollectionOptions<TSlug>): Promise<ResponseCollection<TSlug>> {
  const where: Where = {};

  if (search && fields && fields.length > 0) {
    where.or = fields.map((field) => ({
      [field]: { contains: search },
    }));
  }

  /* eslint-disable no-restricted-syntax */
  for (const key in otherSelects) {
    if (otherSelects[key] !== undefined && otherSelects[key] !== "") {
      where[key] = { equals: otherSelects[key] };
    }
  }

  const response = await actionSafeExecute(
    payload.find({
      req,
      collection,
      page,
      limit,
      sort,
      where,
      depth,
      overrideAccess: false,
    }),
    messages.actions.collection.serverError,
  );

  if (!response.data || response.error) return response;

  return response;
};
