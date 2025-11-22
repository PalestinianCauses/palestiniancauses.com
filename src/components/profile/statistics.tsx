"use client";

// REVIEWED

import {
  BarChart3Icon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MessagesSquareIcon,
  Package2Icon,
  PencilLineIcon,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import colors from "tailwindcss/colors";

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
import { useUserStats } from "@/hooks/use-user-stats";

import { Paragraph, SubSectionHeading } from "../globals/typography";

const chartConfig = {
  comments: {
    label: "Comments",
    color: colors.yellow["500"],
  },
  diary: {
    label: "Diary Entries",
    color: colors.teal["500"],
  },
  orders: {
    label: "Orders",
    color: "rgb(var(--tertiary))",
  },
} as const;

export const ProfileStatistics = function ProfileStatistics() {
  const { isLoading, data: stats } = useUserStats();
  const [offsetMonth, setOffsetMonth] = useState(0);

  const chartData = useMemo(() => {
    if (
      !stats ||
      !stats.data ||
      stats.error ||
      stats.data.activityRecent.length === 0
    )
      return null;

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
    stats.data.activityRecent.forEach((activity) => {
      const date = new Date(activity.date);
      const monthKey = date.toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      });

      if (months[monthKey]) {
        if (activity.type === "comment") months[monthKey].comments += 1;
        else if (activity.type === "diary-entry") months[monthKey].diary += 1;
        else if (activity.type === "order") months[monthKey].orders += 1;
      }
    });

    return Object.keys(months).map((label) => ({
      month: label,
      comments: months[label].comments,
      diary: months[label].diary,
      orders: months[label].orders,
    }));
  }, [stats, offsetMonth]);

  // Show skeleton only on initial load (when no data exists yet)
  if (isLoading)
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-1/2" />
          <Skeleton className="h-4 w-3/4" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-60 w-full" />
        </CardContent>
      </Card>
    );

  if (!stats || !stats.data || !chartData || chartData.length === 0)
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
              <BarChart3Icon className="size-5 stroke-[1.5]" />
              Activity Statistics
            </SubSectionHeading>
            <Paragraph className="text-sm lg:text-sm">
              {offsetMonth === 0
                ? "Your activity over the last 6 months"
                : `Your activity from ${chartData[0].month} to ${chartData[chartData.length - 1].month}`}
            </Paragraph>
          </div>
          <div className="flex items-center gap-2.5">
            <Button
              variant="outline"
              size="icon"
              disabled={isLoading}
              onClick={() => setOffsetMonth((p) => p + 6)}>
              <ChevronLeftIcon />
            </Button>
            <Button
              variant="outline"
              size="icon"
              disabled={isLoading || offsetMonth === 0}
              onClick={() => setOffsetMonth((p) => Math.max(0, p - 6))}>
              <ChevronRightIcon />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-10">
          <ChartContainer config={chartConfig} className="h-96 w-full">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 10, left: 10, bottom: 40 }}>
              <defs>
                <linearGradient id="commentsFill" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={chartConfig.comments.color}
                    stopOpacity={0.95}
                  />
                  <stop
                    offset="95%"
                    stopColor={chartConfig.comments.color}
                    stopOpacity={0.05}
                  />
                </linearGradient>
                <linearGradient id="diaryFill" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={chartConfig.diary.color}
                    stopOpacity={0.95}
                  />
                  <stop
                    offset="95%"
                    stopColor={chartConfig.diary.color}
                    stopOpacity={0.05}
                  />
                </linearGradient>
                <linearGradient id="ordersFill" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={chartConfig.orders.color}
                    stopOpacity={0.95}
                  />
                  <stop
                    offset="95%"
                    stopColor={chartConfig.orders.color}
                    stopOpacity={0.05}
                  />
                </linearGradient>
              </defs>
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
              <Area
                type="monotone"
                dataKey="comments"
                name="comments"
                stroke={chartConfig.comments.color}
                stackId="1"
                strokeWidth={0}
                fill="url(#commentsFill)"
              />
              <Area
                type="monotone"
                dataKey="diary"
                name="diary"
                stroke={chartConfig.diary.color}
                stackId="1"
                strokeWidth={0}
                fill="url(#diaryFill)"
              />
              <Area
                type="monotone"
                dataKey="orders"
                name="orders"
                stroke={chartConfig.orders.color}
                stackId="1"
                strokeWidth={0}
                fill="url(#ordersFill)"
              />
              <ChartLegend content={<ChartLegendContent />} />
            </AreaChart>
          </ChartContainer>
          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
            <div className="flex flex-col items-start justify-center gap-2.5 border-l-2 border-yellow-500 bg-yellow-500/5 p-5">
              <SubSectionHeading
                as="h3"
                className="flex items-center gap-2.5 text-lg !leading-none lg:text-lg lg:!leading-none xl:text-lg xl:!leading-none">
                <MessagesSquareIcon className="size-6 stroke-[1.5]" />
                <span className="truncate">Total Comments</span>
              </SubSectionHeading>
              <SubSectionHeading
                as="p"
                className="!leading-none text-yellow-500 lg:!leading-none xl:!leading-none">
                {stats.data.comments ?? 0}
              </SubSectionHeading>
            </div>
            <div className="flex flex-col items-start justify-center gap-2.5 border-l-2 border-teal-500 bg-teal-500/5 p-5">
              <SubSectionHeading
                as="h3"
                className="flex items-center gap-2.5 text-lg !leading-none lg:text-lg lg:!leading-none xl:text-lg xl:!leading-none">
                <PencilLineIcon className="size-6 stroke-[1.5]" />
                <span className="truncate">Total Diary Entries</span>
              </SubSectionHeading>
              <SubSectionHeading
                as="p"
                className="!leading-none text-teal-500 lg:!leading-none xl:!leading-none">
                {stats.data.diaryEntries ?? 0}
              </SubSectionHeading>
            </div>
            <div className="flex flex-col items-start justify-center gap-2.5 border-l-2 border-tertiary bg-tertiary/5 p-5">
              <SubSectionHeading
                as="h3"
                className="flex items-center gap-2.5 text-lg !leading-none lg:text-lg lg:!leading-none xl:text-lg xl:!leading-none">
                <Package2Icon className="size-6 stroke-[1.5]" />
                <span className="truncate">Total Orders</span>
              </SubSectionHeading>
              <SubSectionHeading
                as="p"
                className="!leading-none text-tertiary lg:!leading-none xl:!leading-none">
                {stats.data.orders ?? 0}
              </SubSectionHeading>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
