// REVIEWED

import { payload } from "@/lib/payload";

export const runtime = "nodejs";

export const GET = async function GET(request: Request) {
  const headers = new Headers();

  /* eslint-disable-next-line no-restricted-syntax */
  for (const [key, value] of request.headers) {
    headers.set(key, value);
  }

  const { user } = await payload.auth({ headers });
  if (!user) return new Response(null, { status: 401 });

  return new Response(JSON.stringify({ message: "success" }), { status: 200 });
};
