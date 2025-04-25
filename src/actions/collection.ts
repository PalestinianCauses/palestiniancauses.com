"use server";

// REVIEWED - 03

import { GeneratedTypes, PaginatedDocs, Where } from "payload";

import { messages } from "@/lib/errors";
import { payload } from "@/lib/payload";
import { CollectionTypes, SelectOptions } from "@/lib/payload/types";
import { selectDefaults } from "@/lib/payload/utils";
import { actionTryCatch } from "@/lib/utils";

type CollectionOptions<TSlug extends CollectionTypes> = {
  collection: TSlug;
  selects: SelectOptions;
  fields?: (keyof GeneratedTypes["collections"][TSlug])[];
  depth?: number;
};

type CollectionResponseData<TSlug extends CollectionTypes> = PaginatedDocs<
  GeneratedTypes["collections"][TSlug]
>;

type CollectionResponse<TSlug extends CollectionTypes> = {
  data: CollectionResponseData<TSlug> | null;
  error: string | null;
};

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
  const response: CollectionResponse<TSlug> = {
    data: null,
    error: messages.actions.collection.serverError,
  };

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

  const collectionPromise = payload.find({
    collection,
    page,
    limit,
    sort,
    where,
    depth,
  });

  const collectionResponse = await actionTryCatch(collectionPromise);

  if (!collectionResponse.data || collectionResponse.error) return response;

  response.data = collectionResponse.data;
  response.error = null;

  return response;
};
