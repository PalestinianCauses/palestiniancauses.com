"use server";

// REVIEWED

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
import { actionTryCatch } from "@/lib/utils";

type FilterOptions = {
  collection: CollectionSlug;
  filters: SelectOptions;
  fields?: string[];
  populate?: PopulateType;
};

type FilterResponseData = PaginatedDocs<DataFromCollectionSlug<CollectionSlug>>;

type FilterResponse = {
  data: FilterResponseData | null;
  error: string | null;
};

export const getCollectionFiltered = async function getCollectionFiltered({
  collection,
  filters: {
    search = "",
    sort = ["-created", "At"].join(""),
    page = 1,
    limit = 10,
    ...otherFilters
  },
  fields = ["title"],
  populate,
}: FilterOptions): Promise<FilterResponse> {
  const response: FilterResponse = {
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
  for (const key in otherFilters) {
    if (otherFilters[key] !== undefined && otherFilters[key] !== "") {
      where[key] = { equals: otherFilters[key] };
    }
  }

  const collectionPromise = payload.find({
    collection,
    where,
    limit,
    page,
    sort,
    populate,
  });

  const collectionResponse = await actionTryCatch(collectionPromise);

  if (collectionResponse.error) return response;

  response.data = collectionResponse.data;

  return response;
};
