"use client";

// REVIEWED - 04

import { BarChart3Icon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import colors from "tailwindcss/colors";

import { UserStats } from "@/actions/user-stats";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import { ResponseSafeExecute } from "@/lib/types";

import { Paragraph, SubSectionHeading } from "../globals/typography";

const chartConfig = {
  comments: {
    label: "Comments",
    color: colors.green["200"],
  },
  diary: {
    label: "Diary Entries",
    color: colors.green["500"],
  },
  orders: {
    label: "Orders",
    color: colors.green["800"],
  },
};

export const ProfileStatistics = function ProfileStatistics({
  isStatsLoading,
  stats,
}: {
  isStatsLoading: boolean;
  stats: ResponseSafeExecute<UserStats[]> | undefined;
}) {
  const [offsetMonth, setOffsetMonth] = useState(0);

  const chartData = useMemo(() => {
    if (isStatsLoading || !stats || !stats.data || stats.error) return null;

    // Group activities by month for 6 months based on offset
    const months: Record<
      string,
      { comments: number; diary: number; orders: number }
    > = {};

    const now = new Date();
    const startMonth = now.getMonth() - offsetMonth;
    const startYear = now.getFullYear();

    // Calculate starting month accounting for year roll-over
    let currentMonth = startMonth;
    let currentYear = startYear;

    while (currentMonth < 0) {
      currentMonth += 12;
      currentYear -= 1;
    }

    for (let i = 5; i >= 0; i -= 1) {
      const indexMonth = currentMonth - i;
      let month = indexMonth;
      let year = currentYear;

      // Handle year roll-over
      while (month < 0) {
        month += 12;
        year -= 1;
      }

      while (month >= 12) {
        month -= 12;
        year += 1;
      }

      const date = new Date(year, month, 1);
      const keyMonth = date.toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      });

      months[keyMonth] = { comments: 0, diary: 0, orders: 0 };
    }

    // Count diary comments, diary entries, and orders by month from `activityRecent`
    stats.data.forEach((stat) => {
      const date = new Date(stat.createdAt);
      const monthKey = date.toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      });

      if (months[monthKey]) {
        if (stat.type === "comment") months[monthKey].comments += 1;
        else if (stat.type === "diary-entry") months[monthKey].diary += 1;
        else if (stat.type === "order") months[monthKey].orders += 1;
      }
    });

    return Object.keys(months).map((label) => ({
      month: label,
      comments: months[label].comments,
      diary: months[label].diary,
      orders: months[label].orders,
    }));
  }, [isStatsLoading, stats, offsetMonth]);

  // Show skeleton only on initial load (when no data exists yet)
  if (isStatsLoading)
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-1/2 bg-foreground/5" />
          <Skeleton className="h-4 w-3/4 bg-foreground/5" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-60 w-full bg-foreground/5" />
        </CardContent>
      </Card>
    );

  if (!stats || !stats.data || !chartData)
    return (
      <Card>
        <CardHeader>
          <CardTitle>Activity Statistics Overview</CardTitle>
          <CardDescription>
            At this time, there is no statistical activity data available for
            your profile. Please continue engaging with our platform—your future
            activities will be reflected here in a comprehensive summary.
          </CardDescription>
        </CardHeader>
      </Card>
    );

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between gap-5">
          <div className="space-y-0.5">
            <SubSectionHeading
              as="h2"
              className="flex items-center gap-2.5 text-xl !leading-none lg:text-xl lg:!leading-none xl:text-xl xl:!leading-none">
              <BarChart3Icon className="size-6 stroke-[1.5]" />
              Activity Statistics
            </SubSectionHeading>
            <Paragraph className="text-base lg:text-base">
              {offsetMonth === 0
                ? "Your activity over the last 6 months"
                : `Your activity from ${chartData[0].month} to ${chartData[chartData.length - 1].month}`}
            </Paragraph>
          </div>
          <div className="flex items-center gap-2.5">
            <Button
              variant="outline"
              size="icon"
              disabled={isStatsLoading}
              onClick={() => setOffsetMonth((p) => p + 6)}>
              <ChevronLeftIcon />
            </Button>
            <Button
              variant="outline"
              size="icon"
              disabled={isStatsLoading || offsetMonth === 0}
              onClick={() => setOffsetMonth((p) => Math.max(0, p - 6))}>
              <ChevronRightIcon />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-10">
          <ChartContainer config={chartConfig} className="h-96 w-full">
            <BarChart
              accessibilityLayer
              data={chartData}
              margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <CartesianGrid
                strokeDasharray="5 5"
                className="stroke-muted/50"
              />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tickMargin={10}
                tickFormatter={(value) => value}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tickMargin={10}
                tickFormatter={(value) => value.toString()}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Bar
                dataKey="comments"
                name="comments"
                fill={chartConfig.comments.color}
              />
              <Bar
                dataKey="diary"
                name="diary"
                fill={chartConfig.diary.color}
              />
              <Bar
                dataKey="orders"
                name="orders"
                fill={chartConfig.orders.color}
              />
              <ChartLegend content={<ChartLegendContent />} />
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};
