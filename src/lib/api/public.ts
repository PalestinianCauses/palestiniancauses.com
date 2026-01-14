// REVIEWED - 01

import { GeneratedTypes, PaginatedDocs, Where } from "payload";
import { z } from "zod";

import { messages } from "../messages";
import { httpSafeExecute } from "../network";
import { ResponseSafeExecute } from "../types";

type PublicCollection =
  | "blogs-rooms"
  | "blogs-posts"
  | "comments"
  | "diary-entries";

type GetPublicCollectionOptions<T extends PublicCollection> = {
  collection: T;
  page?: number;
  limit?: number;
  sort?: string;
  depth?: number;
  where?: Where;
};

type CountPublicCollectionOptions = {
  collection: PublicCollection;
  where?: Where;
};

export type PublicCollectionResponse<T extends PublicCollection> =
  PaginatedDocs<GeneratedTypes["collections"][T]>;

export const getPublicCollection = async function getPublicCollection<
  T extends PublicCollection,
>({
  collection,
  page = 1,
  limit = 10,
  sort = "-createdAt",
  depth = 0,
  where,
}: GetPublicCollectionOptions<T>): Promise<
  ResponseSafeExecute<PublicCollectionResponse<T>, string | number>
> {
  const baseURL = process.env.NEXT_PUBLIC_URL || "";
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    sort,
    depth: String(depth),
  });

  if (where) params.set("where", JSON.stringify(where));

  try {
    const response = await httpSafeExecute({
      http: fetch([`${baseURL}/api/public/${collection}`, params].join("?"), {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
      }),
      errorDefault: messages.http.serverError,
      isData: (data): data is PublicCollectionResponse<T> => {
        const validate = z
          .object({ docs: z.array(z.object({ id: z.number() })) })
          .safeParse(data);

        return validate.success;
      },
    });

    return response;
  } catch (error) {
    console.error("Failed to get public collection:", error);
    return { data: null, error: messages.http.serverError };
  }
};

export const countPublicCollection = async function countPublicCollection({
  collection,
  where,
}: CountPublicCollectionOptions): Promise<
  ResponseSafeExecute<number, string | number>
> {
  const baseURL = process.env.NEXT_PUBLIC_URL || "";
  const params = new URLSearchParams();

  if (where) params.set("where", JSON.stringify(where));

  try {
    const response = await httpSafeExecute({
      http: fetch(
        [`${baseURL}/api/public/${collection}/count`, params].join("?"),
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          cache: "no-store",
        },
      ),
      errorDefault: messages.http.serverError,
      isData: (data): data is { totalDocs: number } => {
        const validate = z.object({ totalDocs: z.number() }).safeParse(data);
        return validate.success;
      },
    });

    if (!response.data || response.error)
      return { data: null, error: response.error };

    return { data: response.data.totalDocs, error: null };
  } catch (error) {
    console.error("Failed to count public collection:", error);
    return { data: null, error: messages.http.serverError };
  }
};
