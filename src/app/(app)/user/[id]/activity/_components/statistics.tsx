// REVIEWED - 02

import { ProfileStatistics } from "@/components/profile/statistics";
import { messages } from "@/lib/messages";
import { actionSafeExecute } from "@/lib/network";
import { payload } from "@/lib/payload";
import { User } from "@/payload-types";

export const PublicProfileStatistics = async function PublicProfileStatistics({
  user,
}: {
  user: User;
}) {
  const [responseComments, responseDiaryEntries, responseOrders] =
    await Promise.all([
      actionSafeExecute(
        payload.find({
          collection: "comments",
          where: { user: { equals: user.id }, status: { equals: "approved" } },
        }),
        messages.actions.comment.serverErrorGet,
      ),
      actionSafeExecute(
        payload.find({
          collection: "diary-entries",
          where: {
            author: { equals: user.id },
            status: { equals: "approved" },
            isAnonymous: { equals: false },
          },
        }),
        messages.actions.diaryEntry.serverErrorGet,
      ),
      actionSafeExecute(
        payload.find({
          collection: "orders",
          where: {
            user: { equals: user.id },
            and: [
              { orderStatus: { not_equals: "in-progress" } },
              { orderStatus: { not_equals: "cancelled" } },
              {
                or: [
                  { productOrderType: { equals: "paid" } },
                  { productOrderType: { equals: "not-applicable" } },
                ],
              },
            ],
          },
        }),
        messages.actions.order.serverErrorGet,
      ),
    ]);

  const statsData: {
    id: number;
    type: "comment" | "diary-entry" | "order";
    createdAt: string;
  }[] = [];

  statsData.push(
    ...(responseComments.data
      ? responseComments.data.docs.map((comment) => ({
          id: comment.id,
          type: "comment" as const,
          createdAt: comment.createdAt,
        }))
      : []),
  );
  statsData.push(
    ...(responseDiaryEntries.data
      ? responseDiaryEntries.data.docs.map((diaryEntry) => ({
          id: diaryEntry.id,
          type: "diary-entry" as const,
          createdAt: diaryEntry.createdAt,
        }))
      : []),
  );

  statsData.push(
    ...(responseOrders.data
      ? responseOrders.data.docs.map((order) => ({
          id: order.id,
          type: "order" as const,
          createdAt: order.createdAt,
        }))
      : []),
  );

  return <ProfileStatistics isPublicProfile stats={statsData} />;
};
