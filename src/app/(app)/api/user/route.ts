// REVIEWED - 04

import { messages } from "@/lib/messages";
import { actionSafeExecute } from "@/lib/network";
import { payload } from "@/lib/payload";

export const DELETE = async function DELETE(request: Request) {
  const { headers, json } = request;

  if (
    headers.get("X-Testing-Clean-Up-Secret") !==
    process.env.PLAYWRIGHT_TESTING_USER_CLEAN_UP_SECRET
  ) {
    return new Response(JSON.stringify(messages.http.unAuthorized), {
      status: 401,
    });
  }

  const body = (await json()) as { email: string };
  const response = await actionSafeExecute(
    payload.delete({
      collection: "users",
      where: { email: { equals: body.email } },
    }),
    messages.actions.user.delete.serverError,
  );

  if (!response.data || response.data.errors.length > 0 || response.error) {
    return new Response(JSON.stringify(response.error), {
      status: 400,
    });
  }

  return new Response(JSON.stringify(response.data), {
    status: 200,
  });
};
