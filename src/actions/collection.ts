"use server";

// REVIEWED - 02

import { GeneratedTypes, PaginatedDocs, PopulateType, Where } from "payload";

import { messages } from "@/lib/errors";
import { payload } from "@/lib/payload";
import { SelectOptions } from "@/lib/payload/types";
import { selectDefaults } from "@/lib/payload/utils";
import { actionTryCatch } from "@/lib/utils";

type CollectionOptions<TSlug extends keyof GeneratedTypes["collections"]> = {
  collection: TSlug;
  selects: SelectOptions;
  fields?: (keyof GeneratedTypes["collections"][TSlug])[];
  populate?: PopulateType;
};

type CollectionResponseData<TSlug extends keyof GeneratedTypes["collections"]> =
  PaginatedDocs<GeneratedTypes["collections"][TSlug]>;

type CollectionResponse<TSlug extends keyof GeneratedTypes["collections"]> = {
  data: CollectionResponseData<TSlug> | null;
  error: string | null;
};

export const getCollection = async function getCollection<
  TSlug extends keyof GeneratedTypes["collections"],
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
  populate,
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
    populate,
  });

  const collectionResponse = await actionTryCatch(collectionPromise);

  if (collectionResponse.error) return response;

  response.data = collectionResponse.data;

  return response;
};
