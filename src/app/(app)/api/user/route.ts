// REVIEWED - 02

import { deleteUser } from "@/actions/user";
import { messages } from "@/lib/errors";

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
  const deleteResponse = await deleteUser(body.email);

  if (!deleteResponse.data || deleteResponse.error) {
    return new Response(JSON.stringify(deleteResponse.error), {
      status: 400,
    });
  }

  return new Response(JSON.stringify(deleteResponse.data), {
    status: 200,
  });
};
