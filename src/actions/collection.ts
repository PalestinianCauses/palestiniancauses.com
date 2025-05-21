"use server";

// REVIEWED - 05

import { GeneratedTypes, PaginatedDocs, Where } from "payload";

import { messages } from "@/lib/messages";
import { actionSafeExecute } from "@/lib/network";
import { payload, selectOptionsDefaults } from "@/lib/payload";
import { CollectionTypes, SelectOptions } from "@/lib/types";

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
    page = selectOptionsDefaults.page,
    limit = selectOptionsDefaults.limit,
    sort = selectOptionsDefaults.sort,
    search = selectOptionsDefaults.search,
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
