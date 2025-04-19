// REVIEWED - 01

import { deleteUser } from "@/actions/user";
import { messages } from "@/lib/errors";

export const DELETE = async function DELETE(request: Request) {
  const response = {
    data: null as null | string,
    error: null as null | string,
  };

  const { headers, json } = request;

  if (
    headers.get("X-Testing-Clean-Up-Secret") !==
    process.env.PLAYWRIGHT_TESTING_USER_CLEAN_UP_SECRET
  ) {
    response.error = messages.http.unAuthorized;
    return new Response(JSON.stringify(response.error), {
      status: 401,
    });
  }

  const body = (await json()) as { email: string };
  const deleteResponse = await deleteUser(body.email);

  if (deleteResponse.error) {
    response.error = deleteResponse.error;
    return new Response(JSON.stringify(response.error), {
      status: 400,
    });
  }

  response.data = deleteResponse.data;

  if (
    (response.data && response.error) ||
    (!response.data && !response.error)
  ) {
    response.data = null;
    response.error = messages.http.serverError;
    return new Response(JSON.stringify(response.error), {
      status: 500,
    });
  }

  return new Response(JSON.stringify(response.data), {
    status: 200,
  });
};
