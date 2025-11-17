// REVIEWED - 07

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

  if (!body.email || typeof body.email !== "string")
    return new Response(
      JSON.stringify("Email is required and must be a string"),
      { status: 400 },
    );

  const userResponse = await payload.find({
    collection: "users",
    where: { email: { equals: body.email } },
    limit: 1,
  });

  if (!userResponse.docs.length)
    return new Response(JSON.stringify(messages.actions.user.notFound), {
      status: 404,
    });

  const userId = userResponse.docs[0].id;

  const diaryEntriesResponse = await payload.find({
    collection: "diary-entries",
    where: { author: { equals: userId } },
    limit: 1000,
  });

  const commentsResponse = await payload.find({
    collection: "comments",
    where: { user: { equals: userId } },
    limit: 1000,
  });

  if (diaryEntriesResponse.docs.length)
    // eslint-disable-next-line no-restricted-syntax
    for (const entry of diaryEntriesResponse.docs) {
      // eslint-disable-next-line no-await-in-loop
      await actionSafeExecute(
        payload.delete({
          collection: "diary-entries",
          id: entry.id,
        }),
        messages.actions.user.delete.serverError,
      );
    }

  if (commentsResponse.docs.length)
    // eslint-disable-next-line no-restricted-syntax
    for (const comment of commentsResponse.docs) {
      // eslint-disable-next-line no-await-in-loop
      await actionSafeExecute(
        payload.delete({
          collection: "comments",
          id: comment.id,
        }),
        messages.actions.user.delete.serverError,
      );
    }

  const response = await actionSafeExecute(
    payload.delete({
      collection: "users",
      id: userId,
    }),
    messages.actions.user.delete.serverError,
  );

  if (!response.data || response.error) {
    return new Response(JSON.stringify(response.error), {
      status: 400,
    });
  }

  return new Response(JSON.stringify(messages.actions.user.delete.success), {
    status: 200,
  });
};
