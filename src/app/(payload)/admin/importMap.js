// REVIEWED - 02

import { VercelBlobClientUploadHandler } from "@payloadcms/storage-vercel-blob/client";

import SlugField from "@/components/payload/fields/slug";

export const importMap = {
  "../components/payload/fields/slug#default": SlugField,
  "@payloadcms/storage-vercel-blob/client#VercelBlobClientUploadHandler":
    VercelBlobClientUploadHandler,
};
