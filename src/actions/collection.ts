"use server";

// REVIEWED - 04

import { GeneratedTypes, PaginatedDocs, Where } from "payload";

import { messages } from "@/lib/errors";
import { payload } from "@/lib/payload";
import { CollectionTypes, SelectOptions } from "@/lib/payload/types";
import { selectDefaults } from "@/lib/payload/utils";
import { actionSafeExecute } from "@/lib/utils";

type CollectionOptions<TSlug extends CollectionTypes> = {
  collection: TSlug;
  selects: SelectOptions;
  fields?: (keyof GeneratedTypes["collections"][TSlug])[];
  depth?: number;
};

type CollectionResponseData<TSlug extends CollectionTypes> = PaginatedDocs<
  GeneratedTypes["collections"][TSlug]
>;

type CollectionResponse<TSlug extends CollectionTypes> =
  | { data: CollectionResponseData<TSlug>; error: null }
  | { data: null; error: string };

export const getCollection = async function getCollection<
  TSlug extends CollectionTypes,
>({
  collection,
  selects: {
    page = selectDefaults.page,
    limit = selectDefaults.limit,
    sort = selectDefaults.sort,
    search = selectDefaults.search,
    ...otherSelects
  },
  fields,
  depth = 0,
}: CollectionOptions<TSlug>): Promise<CollectionResponse<TSlug>> {
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
      collection,
      page,
      limit,
      sort,
      where,
      depth,
    }),
    messages.actions.collection.serverError,
  );

  if (!response.data || response.error) return response;

  return response;
};
