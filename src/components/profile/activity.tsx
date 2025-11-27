"use client";

// REVIEWED

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@/hooks/use-user";

import { ActivityComments } from "./activity-comments";
import { ActivityDiaryEntries } from "./activity-diary-entries";
import { ActivityOrders } from "./activity-orders";
import { ProfileStatistics } from "./statistics";

export const ProfileActivity = function ProfileActivity() {
  const { isLoading: isUserLoading, data: user } = useUser();

  if (isUserLoading)
    return (
      <div className="space-y-10">
        <Skeleton className="h-64 w-full bg-foreground/5" />
        <Skeleton className="h-96 w-full bg-foreground/5" />
        <Skeleton className="h-96 w-full bg-foreground/5" />
        <Skeleton className="h-96 w-full bg-foreground/5" />
      </div>
    );

  if (!user)
    return (
      <Card>
        <CardHeader>
          <CardTitle>Authentication Required</CardTitle>
          <CardDescription>
            Kindly sign in to access your personalized activity overview and
            engage fully with our platform&apos;s features.
          </CardDescription>
        </CardHeader>
      </Card>
    );

  return (
    <div className="space-y-20">
      <ProfileStatistics userId={user.id} />
      <ActivityComments user={user} />
      <ActivityDiaryEntries user={user} />
      <ActivityOrders user={user} />
    </div>
  );
};
