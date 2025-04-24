"use server";

// REVIEWED - 01

import {
  CollectionSlug,
  DataFromCollectionSlug,
  PaginatedDocs,
  PopulateType,
  Where,
} from "payload";

import { messages } from "@/lib/errors";
import { payload } from "@/lib/payload";
import { SelectOptions } from "@/lib/payload/types";
import { selectDefaults } from "@/lib/payload/utils";
import { actionTryCatch } from "@/lib/utils";

type CollectionOptions = {
  collection: CollectionSlug;
  selects: SelectOptions;
  fields?: string[];
  populate?: PopulateType;
};

type CollectionResponseData = PaginatedDocs<
  DataFromCollectionSlug<CollectionSlug>
>;

type CollectionResponse = {
  data: CollectionResponseData | null;
  error: string | null;
};

export const getCollection = async function getCollection({
  collection,
  selects: {
    page = selectDefaults.page,
    limit = selectDefaults.limit,
    sort = selectDefaults.sort,
    search = selectDefaults.search,
    ...otherSelects
  },
  fields = ["title"],
  populate,
}: CollectionOptions): Promise<CollectionResponse> {
  const response: CollectionResponse = {
    data: null,
    error: messages.actions.collection.serverError,
  };

  const where: Where = {};

  if (search && fields.length > 0) {
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
