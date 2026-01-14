// REVIEWED - 01

import { RedirectProvider } from "@/app/(app)/providers";
import { OrderItem } from "@/components/profile/activity-orders";
import { Accordion } from "@/components/ui/accordion";
import { messages } from "@/lib/messages";
import { actionSafeExecute } from "@/lib/network";
import { payload } from "@/lib/payload";
import { cn } from "@/lib/utils/styles";
import { User } from "@/payload-types";

export const PublicProfileOrdersList = async function PublicProfileOrdersList({
  user,
}: {
  user: User;
}) {
  const response = await actionSafeExecute(
    payload.find({
      collection: "orders",
      where: {
        user: { equals: user.id },
        and: [
          { orderStatus: { not_equals: "in-progress" } },
          { orderStatus: { not_equals: "cancelled" } },
        ],
      },
    }),
    messages.actions.order.serverErrorGet,
  );

  if (!response.data || response.error)
    return <RedirectProvider path={`/user/${user.id}`} />;

  return (
    <div className="space-y-10">
      <section className={cn("flex w-full flex-col gap-5", {})}>
        <Accordion type="single" collapsible>
          {response.data.docs.map((order) => (
            <OrderItem key={order.id} isPublicProfile order={order} />
          ))}
        </Accordion>
      </section>
    </div>
  );
};
