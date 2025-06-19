"use server";

// REVIEWED - 11

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
  user,
  collection,
  filters: {
    page = filtersOptionsDefaults.page,
    limit = filtersOptionsDefaults.limit,
    sort = filtersOptionsDefaults.sort,
    search = filtersOptionsDefaults.search,
    fields: selectFields,
  },
  fieldsSearch,
  depth = 0,
}: CollectionOptions<TSlug>): Promise<ResponseCollection<TSlug>> {
  const where: Where = {};

  if (search && fieldsSearch && fieldsSearch.length > 0) {
    where.or = fieldsSearch.map((field) => ({
      [field]: { contains: search },
    }));
  }

  if (selectFields)
    selectFields.forEach((field) => {
      /* eslint-disable no-restricted-syntax */
      for (const key in field) {
        if (Object.hasOwn(field, key)) where[key] = field[key];
      }
    });

  const response = await actionSafeExecute(
    payload.find({
      req,
      user,
      collection,
      page,
      limit,
      sort,
      where,
      depth,
      ...(user ? { overrideAccess: false } : {}),
    }),
    messages.actions.collection.serverError,
  );

  if (!response.data || response.error) return response;

  return response;
};
