"use server";

// REVIEWED - 10

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
import { CollectionTypes, SelectOptions } from "@/lib/types";
import { selectOptionsDefaults } from "@/lib/utils/filters";

type CollectionOptions<TSlug extends CollectionTypes> = {
  req?: Partial<PayloadRequest>;
  user?: User | null;
  collection: TSlug;
  selects: SelectOptions;
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
  selects: {
    page = selectOptionsDefaults.page,
    limit = selectOptionsDefaults.limit,
    sort = selectOptionsDefaults.sort,
    search = selectOptionsDefaults.search,
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
