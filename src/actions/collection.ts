"use server";

// REVIEWED - 14

import {
  GeneratedTypes,
  PaginatedDocs,
  PayloadRequest,
  User,
  Where,
} from "payload";

import { messages } from "@/lib/messages";
import { actionSafeExecute } from "@/lib/network";
import { payload } from "@/lib/payload";
import { CollectionTypes, FiltersOptions } from "@/lib/types";
import { filtersOptionsDefaults } from "@/lib/utils/filters";

type CollectionOptions<TSlug extends CollectionTypes> = {
  req?: Partial<PayloadRequest>;
  user?: User | null;
  collection: TSlug;
  filters: FiltersOptions;
  fieldsSearch?: (keyof GeneratedTypes["collections"][TSlug])[];
  depth?: number;
  overrideAccess?: boolean;
};

export type ResponseDataCollection<TSlug extends CollectionTypes> =
  PaginatedDocs<GeneratedTypes["collections"][TSlug]>;

type ResponseCollection<TSlug extends CollectionTypes> =
  | { data: ResponseDataCollection<TSlug>; error: null }
  | { data: null; error: string };

export const getCollection = async function getCollection<
  TSlug extends CollectionTypes,
>({
  req,
  user,
  collection,
  filters: {
    page = filtersOptionsDefaults.page,
    limit = filtersOptionsDefaults.limit,
    sort = filtersOptionsDefaults.sort,
    search = filtersOptionsDefaults.search,
    fields: fieldsFilter,
  },
  fieldsSearch,
  depth = 0,
  overrideAccess = false,
}: CollectionOptions<TSlug>): Promise<ResponseCollection<TSlug>> {
  const where: Where = { ...fieldsFilter };

  if (search && fieldsSearch && fieldsSearch.length > 0) {
    where.or = fieldsSearch.map((field) => ({
      [field]: { contains: search },
    }));
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
      ...(user ? { user, overrideAccess: overrideAccess || false } : {}),
    }),
    messages.actions.collection.serverError,
  );

  if (!response.data || response.error) return response;

  return response;
};
