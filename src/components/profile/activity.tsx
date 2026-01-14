// REVIEWED - 02

import { messages } from "@/lib/messages";
import { actionSafeExecute } from "@/lib/network";
import { payload } from "@/lib/payload";
import { User } from "@/payload-types";

import { ActivityComments } from "./activity-comments";
import { ActivityDiaryEntries } from "./activity-diary-entries";
import { ActivityOrders } from "./activity-orders";
import { ProfileStatistics } from "./statistics";

export const ProfileActivity = async function ProfileActivity({
  user,
}: {
  user: User;
}) {
  // fetching user's all comments, diary entries, and orders
  const [responseComments, responseDiaryEntries, responseOrders] =
    await Promise.all([
      actionSafeExecute(
        payload.find({
          collection: "comments",
          where: { user: { equals: user.id } },
          limit: 0,
        }),
        messages.actions.comment.serverErrorGet,
      ),
      actionSafeExecute(
        payload.find({
          collection: "diary-entries",
          where: { author: { equals: user.id } },
          limit: 0,
        }),
        messages.actions.diaryEntry.serverErrorGet,
      ),
      actionSafeExecute(
        payload.find({
          collection: "orders",
          where: { user: { equals: user.id } },
          limit: 0,
        }),
        messages.actions.order.serverErrorGet,
      ),
    ]);

  // filtering by approved comments, approved diary entries, and new, completed, not-applicable orders for activity statistics
  const statsData: {
    id: number;
    type: "comment" | "diary-entry" | "order";
    createdAt: string;
  }[] = [];

  statsData.push(
    ...(responseComments.data
      ? responseComments.data.docs
          .filter((comment) => comment.status === "approved")
          .map((comment) => ({
            id: comment.id,
            type: "comment" as const,
            createdAt: comment.createdAt,
          }))
      : []),
  );

  statsData.push(
    ...(responseDiaryEntries.data
      ? responseDiaryEntries.data.docs
          .filter((diaryEntry) => diaryEntry.status === "approved")
          .map((diaryEntry) => ({
            id: diaryEntry.id,
            type: "diary-entry" as const,
            createdAt: diaryEntry.createdAt,
          }))
      : []),
  );

  statsData.push(
    ...(responseOrders.data
      ? responseOrders.data.docs
          .filter(
            (order) =>
              order.orderStatus !== "in-progress" &&
              order.orderStatus !== "cancelled",
          )
          .map((order) => ({
            id: order.id,
            type: "order" as const,
            createdAt: order.createdAt,
          }))
      : []),
  );

  return (
    <div className="space-y-20">
      <ProfileStatistics stats={statsData} />

      {responseComments.data && responseComments.data.docs.length !== 0 ? (
        <ActivityComments comments={responseComments.data.docs} />
      ) : null}

      {responseDiaryEntries.data &&
      responseDiaryEntries.data.docs.length !== 0 ? (
        <ActivityDiaryEntries diaryEntries={responseDiaryEntries.data.docs} />
      ) : null}

      {responseOrders.data && responseOrders.data.docs.length !== 0 ? (
        <ActivityOrders orders={responseOrders.data.docs} />
      ) : null}
    </div>
  );
};
